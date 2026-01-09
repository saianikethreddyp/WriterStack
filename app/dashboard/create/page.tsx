'use client';

import ArticleEditor from '@/components/ArticleEditor';

export default function CreateArticlePage() {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Article</h1>
            <ArticleEditor />
        </div>
    );
}
