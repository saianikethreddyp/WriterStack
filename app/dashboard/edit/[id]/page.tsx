'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ArticleEditor from '@/components/ArticleEditor';

export default function EditArticlePage() {
    const params = useParams();
    const router = useRouter();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const res = await fetch(`/api/articles/${params.id}`);
                if (!res.ok) throw new Error('Failed to fetch article');
                const data = await res.json();
                setArticle(data);
            } catch (error) {
                alert('Error loading article');
                router.push('/dashboard');
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchArticle();
        }
    }, [params.id, router]);

    if (loading) return <div>Loading...</div>;
    if (!article) return <div>Article not found</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Article</h1>
            <ArticleEditor initialData={article} isEditMode={true} />
        </div>
    );
}
