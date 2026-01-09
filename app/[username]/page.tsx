import dbConnect from '@/lib/db';
import User from '@/models/User';
import Article from '@/models/Article';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Clock, BookOpen } from 'lucide-react';

export default async function UserBlogPage({ params }: { params: Promise<{ username: string }> }) {
    const { username } = await params;

    await dbConnect();

    const user = await User.findOne({ username });
    if (!user) {
        notFound();
    }

    const articles = await Article.find({ authorId: user._id, published: true })
        .sort({ createdAt: -1 })
        .lean();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Profile Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
                    <div className="flex flex-col items-center sm:items-start sm:flex-row sm:space-x-5">
                        <div className="h-24 w-24 rounded-full bg-white p-1 shadow-lg">
                            {user.image ? (
                                <img src={user.image} alt={user.name} className="h-full w-full rounded-full object-cover" />
                            ) : (
                                <div className="h-full w-full rounded-full bg-indigo-100 flex items-center justify-center text-3xl font-bold text-indigo-600">
                                    {user.name[0]}
                                </div>
                            )}
                        </div>
                        <div className="mt-4 sm:mt-12 sm:pt-1 text-center sm:text-left">
                            <p className="text-2xl font-bold text-gray-900">{user.name}</p>
                            <p className="text-sm font-medium text-gray-500">@{user.username}</p>
                        </div>
                    </div>
                </div>
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    {/* Bio Area - Placeholder if no bio field yet */}
                    <p className="text-gray-600 max-w-2xl">
                        Putting thoughts into words. Exploring technology, design, and the future of SaaS.
                    </p>
                </div>
            </div>

            {/* Articles Grid */}
            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-lg font-semibold text-gray-900">Latest Articles</h2>
                    <span className="text-sm text-gray-500">{articles.length} posts</span>
                </div>

                {articles.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                        <div className="mx-auto h-12 w-12 text-gray-300 mb-4">
                            <BookOpen className="h-full w-full" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No content yet</h3>
                        <p className="mt-1 text-gray-500">Check back later for updates.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.map((article: any) => (
                            <Link
                                key={article._id.toString()}
                                href={`/${username}/${article.slug}`}
                                className="group flex flex-col bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                            >
                                <div className="h-48 bg-gray-100 relative overflow-hidden">
                                    {article.image_url ? (
                                        <img
                                            src={article.image_url}
                                            alt={article.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-indigo-50">
                                            <BookOpen className="h-10 w-10 text-indigo-200" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 p-6 flex flex-col">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                                        {article.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm mb-4 line-clamp-3 flex-1">
                                        {article.summary || "No summary available."}
                                    </p>
                                    <div className="flex items-center text-xs text-gray-400 mt-auto pt-4 border-t border-gray-100">
                                        <Calendar className="h-3 w-3 mr-1" />
                                        {new Date(article.createdAt).toLocaleDateString()}
                                        <span className="mx-2">•</span>
                                        <Clock className="h-3 w-3 mr-1" />
                                        <span>5 min read</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
