'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';

interface ArticleActionsProps {
    articleId: string;
}

export default function ArticleActions({ articleId }: ArticleActionsProps) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this article? This action cannot be undone.')) {
            return;
        }

        setIsDeleting(true);

        try {
            const res = await fetch(`/api/articles/${articleId}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                throw new Error('Failed to delete article');
            }

            router.refresh();
        } catch (error) {
            console.error(error);
            alert('Failed to delete article');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-gray-400 hover:text-red-600 transition-colors p-2 rounded-md hover:bg-red-50 disabled:opacity-50"
            title="Delete Article"
        >
            <Trash2 className="h-4 w-4" />
        </button>
    );
}
