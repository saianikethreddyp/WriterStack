import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/db';
import Article from '@/models/Article';
import DailyStat from '@/models/DailyStat';
import { redirect } from 'next/navigation';
import { BarChart, TrendingUp, Eye, Calendar, FileText } from 'lucide-react';

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

// Force dynamic rendering to ensure analytics are real-time
export const dynamic = 'force-dynamic';

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

    const totalViewsAggr = await Article.aggregate([
        { $match: { authorId: new mongoose.Types.ObjectId(session.user.id) } },
        { $group: { _id: null, total: { $sum: '$views' } } }
    ]);
    const viewCount = totalViewsAggr[0]?.total || 0;

    const totalArticles = await Article.countDocuments({ authorId: session.user.id });
    const avgViews = totalArticles > 0 ? Math.round(viewCount / totalArticles) : 0;

    // 2. Fetch Last 14 Days Stats (Current 7 + Previous 7 for trend)
    const { days, labels } = getLast7Days();
    const prev7DaysStart = new Date(days[0]); // Earliest of current 7 days
    prev7DaysStart.setDate(prev7DaysStart.getDate() - 7);

    // Fetch stats for last 14 days
    const stats = await DailyStat.aggregate([
        {
            $match: {
                userId: new mongoose.Types.ObjectId(session.user.id),
                date: { $gte: prev7DaysStart }
            }
        },
        {
            $group: {
                _id: "$date",
                totalViews: { $sum: "$views" }
            }
        }
    ]);

    // Current 7 days sum
    const current7DaysViews = days.map(day => {
        const found = stats.find(s => new Date(s._id).getTime() === day.getTime());
        return found ? found.totalViews : 0;
    }).reduce((a, b) => a + b, 0);

    // Previous 7 days sum
    let prev7DaysViews = 0;
    for (let i = 1; i <= 7; i++) {
        const d = new Date(days[0]); // Start from earliest of current week
        d.setDate(d.getDate() - i); // Go back 1 to 7 days
        d.setHours(0, 0, 0, 0);
        const found = stats.find(s => new Date(s._id).getTime() === d.getTime());
        if (found) prev7DaysViews += found.totalViews;
    }

    // Calculate Trend
    let trendPercent = 0;
    if (prev7DaysViews > 0) {
        trendPercent = Math.round(((current7DaysViews - prev7DaysViews) / prev7DaysViews) * 100);
    } else if (current7DaysViews > 0) {
        trendPercent = 100; // 100% growth if previous was 0 and now is > 0
    }

    // Chart Data (Current 7 days)
    const chartData = days.map(day => {
        const found = stats.find(s => new Date(s._id).getTime() === day.getTime());
        return found ? found.totalViews : 0;
    });

    const maxVal = Math.max(...chartData, 10); // Scale chart relative to max, min 10

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Analytics</h1>
                <form>
                    <button
                        formAction={async () => {
                            'use server';
                            // This empty action triggers a revalidation
                        }}
                        className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                        Refresh Data
                    </button>
                </form>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                {/* Total Views */}
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

                {/* Total Articles */}
                <div className="bg-white overflow-hidden shadow rounded-xl border border-gray-100 p-5">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 bg-purple-50 p-3 rounded-lg">
                            <FileText className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                            <dl>
                                <dt className="text-sm font-medium text-gray-500 truncate">Total Articles</dt>
                                <dd>
                                    <div className="text-2xl font-bold text-gray-900">{totalArticles}</div>
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>

                {/* Avg Views/Article */}
                <div className="bg-white overflow-hidden shadow rounded-xl border border-gray-100 p-5">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 bg-blue-50 p-3 rounded-lg">
                            <BarChart className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                            <dl>
                                <dt className="text-sm font-medium text-gray-500 truncate">Avg. Views/Article</dt>
                                <dd>
                                    <div className="text-2xl font-bold text-gray-900">{avgViews}</div>
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>

                {/* Growth Trend */}
                <div className="bg-white overflow-hidden shadow rounded-xl border border-gray-100 p-5">
                    <div className="flex items-center">
                        <div className={`flex-shrink-0 p-3 rounded-lg ${trendPercent >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                            <TrendingUp className={`h-6 w-6 ${trendPercent >= 0 ? 'text-green-600' : 'text-red-600'}`} />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                            <dl>
                                <dt className="text-sm font-medium text-gray-500 truncate">Growth (7d)</dt>
                                <dd className="flex items-baseline">
                                    <div className="text-2xl font-bold text-gray-900">
                                        {trendPercent > 0 ? '+' : ''}{trendPercent}%
                                    </div>
                                    <div className={`ml-2 text-sm font-medium ${trendPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        vs last week
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
