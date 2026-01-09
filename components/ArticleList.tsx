'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, Plus, FileText } from 'lucide-react';
import ArticleActions from '@/components/ArticleActions';

interface Article {
    _id: string;
    title: string;
    slug: string;
    published: boolean;
    createdAt: string;
}

export default function ArticleList({ initialArticles }: { initialArticles: any[] }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');

    const filteredArticles = initialArticles.filter(article => {
        const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus =
            filterStatus === 'all'
                ? true
                : filterStatus === 'published'
                    ? article.published
                    : !article.published;

        return matchesSearch && matchesStatus;
    });

    return (
        <div>
            {/* Search and Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="sm:w-48">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Filter className="h-4 w-4 text-gray-400" />
                        </div>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value as any)}
                            className="block w-full pl-10 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                            <option value="all">All Status</option>
                            <option value="published">Published</option>
                            <option value="draft">Drafts</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* List */}
            <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
                {filteredArticles.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="mx-auto h-12 w-12 text-gray-300">
                            <FileText className="h-full w-full" />
                        </div>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No articles found</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            {searchQuery ? 'Try adjusting your search terms.' : 'Get started by creating a new article.'}
                        </p>
                        {!searchQuery && (
                            <div className="mt-6">
                                <Link
                                    href="/dashboard/create"
                                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                                >
                                    <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                                    New Article
                                </Link>
                            </div>
                        )}
                    </div>
                ) : (
                    <ul role="list" className="divide-y divide-gray-100">
                        {filteredArticles.map((article: any) => (
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
                                        <div className="mt-2">
                                            <ArticleActions articleId={article._id.toString()} />
                                        </div>
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
