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
        <div className="space-y-6">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="relative w-full sm:w-96">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-white shadow-sm"
                    />
                </div>

                <div className="flex gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 sm:flex-none">
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value as any)}
                            className="block w-full pl-3 pr-8 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white shadow-sm"
                        >
                            <option value="all">All Status</option>
                            <option value="published">Published</option>
                            <option value="draft">Drafts</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                {filteredArticles.length === 0 ? (
                    <div className="text-center py-16 px-4">
                        <div className="mx-auto h-12 w-12 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <FileText className="h-6 w-6 text-gray-400" />
                        </div>
                        <h3 className="text-base font-semibold text-gray-900">No articles found</h3>
                        <p className="mt-1 text-sm text-gray-500 max-w-sm mx-auto">
                            {searchQuery ? `No results for "${searchQuery}"` : 'Get started by creating your first article to share with the world.'}
                        </p>
                        {!searchQuery && (
                            <div className="mt-6">
                                <Link
                                    href="/dashboard/create"
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all"
                                >
                                    <Plus className="-ml-1 mr-2 h-4 w-4" />
                                    Create Article
                                </Link>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50/50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Article
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredArticles.map((article: any) => (
                                    <tr key={article._id.toString()} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex flex-col">
                                                <Link href={`/dashboard/edit/${article._id}`} className="text-sm font-medium text-gray-900 hover:text-indigo-600 transition-colors">
                                                    {article.title}
                                                </Link>
                                                <span className="text-xs text-gray-500 font-mono mt-0.5">/{article.slug}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${article.published
                                                ? 'bg-green-50 text-green-700 border-green-200'
                                                : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                                                }`}>
                                                <span className={`h-1.5 w-1.5 rounded-full mr-1.5 ${article.published ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                                                {article.published ? 'Published' : 'Draft'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(article.createdAt).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={`/dashboard/edit/${article._id}`}
                                                    className="text-gray-400 hover:text-indigo-600 transition-colors"
                                                >
                                                    Edit
                                                </Link>
                                                <ArticleActions articleId={article._id.toString()} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
