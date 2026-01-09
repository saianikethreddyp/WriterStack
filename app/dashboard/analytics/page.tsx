import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/db';
import Article from '@/models/Article';
import DailyStat from '@/models/DailyStat';
import { redirect } from 'next/navigation';
import { BarChart, TrendingUp, Eye, Calendar } from 'lucide-react';

// Returns array of last 7 days strings [Mon, Tue, ...] and dates
const getLast7Days = () => {
    const days = [];
    const labels = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        d.setHours(0, 0, 0, 0);
        days.push(d);
        labels.push(d.toLocaleDateString('en-US', { weekday: 'short' }));
    }
    return { days, labels };
};

export default async function AnalyticsPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/auth/login');
    }

    await dbConnect();

    // 1. Fetch Top Articles
    const topArticles = await Article.find({ authorId: session.user.id })
        .sort({ views: -1 })
        .limit(5)
        .lean();

    const totalViews = await Article.aggregate([
        { $match: { authorId: new mongoose.Types.ObjectId(session.user.id) } },
        { $group: { _id: null, total: { $sum: '$views' } } }
    ]);
    const viewCount = totalViews[0]?.total || 0;

    // 2. Fetch Last 7 Days Stats
    const { days, labels } = getLast7Days();
    // Fetch stats for these days
    const stats = await DailyStat.aggregate([
        {
            $match: {
                userId: new mongoose.Types.ObjectId(session.user.id),
                date: { $gte: days[0] }
            }
        },
        {
            $group: {
                _id: "$date",
                totalViews: { $sum: "$views" }
            }
        }
    ]);

    // Map database results to the 7-day array, filling gaps with 0
    const chartData = days.map(day => {
        const found = stats.find(s => new Date(s._id).getTime() === day.getTime());
        return found ? found.totalViews : 0;
    });

    const maxVal = Math.max(...chartData, 10); // Scale chart relative to max, min 10

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-8">Analytics</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8">
                <div className="bg-white overflow-hidden shadow rounded-xl border border-gray-100 p-5">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 bg-indigo-50 p-3 rounded-lg">
                            <Eye className="h-6 w-6 text-indigo-600" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                            <dl>
                                <dt className="text-sm font-medium text-gray-500 truncate">Total Views</dt>
                                <dd>
                                    <div className="text-2xl font-bold text-gray-900">{viewCount}</div>
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-xl border border-gray-100 p-5">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 bg-green-50 p-3 rounded-lg">
                            <TrendingUp className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                            <dl>
                                <dt className="text-sm font-medium text-gray-500 truncate">Growth (7d)</dt>
                                <dd>
                                    <div className="text-2xl font-bold text-gray-900">
                                        +{chartData.reduce((a, b) => a + b, 0)}
                                    </div>
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chart Section */}
            <div className="bg-white shadow rounded-xl border border-gray-100 p-6 mb-8">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-6">Views (Last 7 Days)</h3>
                <div className="relative h-64 flex items-end space-x-2 sm:space-x-6">
                    {chartData.map((val, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center group">
                            <div
                                className="w-full bg-indigo-500 rounded-t-sm transition-all duration-500 ease-out group-hover:bg-indigo-600 relative"
                                style={{ height: `${(val / maxVal) * 100}%`, minHeight: '4px' }}
                            >
                                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded">
                                    {val}
                                </div>
                            </div>
                            <span className="text-xs text-gray-500 mt-2">{labels[i]}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Top Articles Table */}
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Top Performing Articles</h3>
            <div className="bg-white shadow border border-gray-200 rounded-xl overflow-hidden">
                {topArticles.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No data available yet.</div>
                ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Article</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Published</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {topArticles.map((article: any) => (
                                <tr key={article._id.toString()}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                                        {article.title}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(article.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-bold">
                                        {article.views}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

import mongoose from 'mongoose';
