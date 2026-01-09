import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/db';
import Article from '@/models/Article';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Plus, FileText, Globe, Pencil } from 'lucide-react';
import ArticleList from '@/components/ArticleList';

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/auth/login');
    }

    await dbConnect();

    // Fetch articles created by this user
    const articles = await Article.find({ authorId: session.user.id })
        .sort({ createdAt: -1 })
        .lean();

    const publishedCount = articles.filter((a: any) => a.published).length;
    const draftCount = articles.length - publishedCount;

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Overview</h1>
                <p className="mt-2 text-gray-500">Welcome back, {session.user.name}. Here's what's happening with your content.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-10">
                <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 bg-indigo-50 p-3 rounded-lg">
                                <FileText className="h-6 w-6 text-indigo-600" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Total Articles</dt>
                                    <dd>
                                        <div className="text-2xl font-bold text-gray-900">{articles.length}</div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 bg-green-50 p-3 rounded-lg">
                                <Globe className="h-6 w-6 text-green-600" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Published</dt>
                                    <dd>
                                        <div className="text-2xl font-bold text-gray-900">{publishedCount}</div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 bg-yellow-50 p-3 rounded-lg">
                                <Pencil className="h-6 w-6 text-yellow-600" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Drafts</dt>
                                    <dd>
                                        <div className="text-2xl font-bold text-gray-900">{draftCount}</div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Table */}
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-gray-400" />
                Recent Content
            </h2>
            <ArticleList initialArticles={JSON.parse(JSON.stringify(articles))} />
        </div>
    );
}
