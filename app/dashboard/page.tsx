import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/db';
import Article from '@/models/Article';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Plus, FileText, Globe, Pencil } from 'lucide-react';

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
            <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
                {articles.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="mx-auto h-12 w-12 text-gray-300">
                            <FileText className="h-full w-full" />
                        </div>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No articles</h3>
                        <p className="mt-1 text-sm text-gray-500">Get started by creating a new article.</p>
                        <div className="mt-6">
                            <Link
                                href="/dashboard/create"
                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                            >
                                <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                                New Article
                            </Link>
                        </div>
                    </div>
                ) : (
                    <ul role="list" className="divide-y divide-gray-100">
                        {articles.map((article: any) => (
                            <li key={article._id.toString()} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                                <div className="px-6 py-5 flex items-center justify-between">
                                    <div className="flex min-w-0 gap-x-4">
                                        <div className="min-w-0 flex-auto">
                                            <p className="text-sm font-semibold leading-6 text-gray-900">
                                                <Link href={`/dashboard/edit/${article._id}`} className="hover:underline">
                                                    {article.title}
                                                </Link>
                                            </p>
                                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                                /{article.slug}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-y-1">
                                        <p className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${article.published
                                                ? 'bg-green-50 text-green-700 ring-green-600/20'
                                                : 'bg-yellow-50 text-yellow-800 ring-yellow-600/20'
                                            }`}>
                                            {article.published ? 'Published' : 'Draft'}
                                        </p>
                                        <p className="text-xs leading-5 text-gray-500">
                                            {new Date(article.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
