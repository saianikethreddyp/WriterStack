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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Overview</h1>
                    <p className="mt-1 text-gray-500">Welcome back, {session.user.name}</p>
                </div>
                <div className="mt-4 sm:mt-0">
                    <Link
                        href="/dashboard/create"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Create Article
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8">
                <div className="bg-white overflow-hidden shadow rounded-xl border border-gray-100">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <FileText className="h-6 w-6 text-gray-400" />
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

                <div className="bg-white overflow-hidden shadow rounded-xl border border-gray-100">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <Globe className="h-6 w-6 text-green-400" />
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

                <div className="bg-white overflow-hidden shadow rounded-xl border border-gray-100">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <Pencil className="h-6 w-6 text-yellow-400" />
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
            <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Content</h2>
            {/* Content Table (Client Component with Search) */}
            <ArticleList initialArticles={JSON.parse(JSON.stringify(articles))} />
        </div>
    );
}
