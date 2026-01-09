import dbConnect from '@/lib/db';
import User from '@/models/User';
import Article from '@/models/Article';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';

export default async function SingleArticlePage({ params }: { params: Promise<{ username: string, slug: string }> }) {
    const { username, slug } = await params;

    await dbConnect();

    const user = await User.findOne({ username });
    if (!user) return notFound();

    // Start session check in parallel with DB query for speed
    const sessionPromise = (async () => {
        const { getServerSession } = await import('next-auth');
        const { authOptions } = await import('@/app/api/auth/[...nextauth]/route');
        return getServerSession(authOptions);
    })();

    const article = await Article.findOne({ authorId: user._id, slug }).lean();
    if (!article) return notFound();

    // If draft, only allow author to view
    if (!article.published) {
        const session = await sessionPromise;
        if (session?.user?.id !== user._id.toString()) {
            return notFound();
        }
    }

    // Track view asynchronously (fire and forget)
    await import('@/lib/analytics').then(mod => mod.trackView(article._id, user._id));

    return (
        <div className="min-h-screen bg-white">
            {/* Preview Banner */}
            {!article.published && (
                <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-3 sm:px-6">
                    <div className="max-w-3xl mx-auto flex items-center justify-between">
                        <div className="flex items-center">
                            <span className="flex p-2 rounded-lg bg-yellow-100">
                                <Clock className="h-6 w-6 text-yellow-600" aria-hidden="true" />
                            </span>
                            <p className="ml-3 font-medium text-yellow-700 truncate">
                                <span className="md:hidden">Draft Preview</span>
                                <span className="hidden md:inline">You are viewing a draft. This page is not public.</span>
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Navigation */}
            <nav className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-100">
                <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href={`/${username}`} className="flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 transition">
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        Back to {user.name}
                    </Link>
                    <Link href="/" className="text-sm font-bold text-gray-900 tracking-tight">
                        WriterStack
                    </Link>
                </div>
            </nav>

            <main className="max-w-3xl mx-auto px-4 py-16">
                <article>
                    <header className="text-center mb-16">
                        <div className="inline-flex items-center justify-center space-x-2 text-sm text-gray-500 mb-6">
                            <span className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {new Date(article.createdAt).toLocaleDateString()}
                            </span>
                            <span>•</span>
                            <span className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                5 min read
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-8">
                            {article.title}
                        </h1>
                        {article.image_url && (
                            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg mb-10">
                                <img
                                    src={article.image_url}
                                    alt={article.title}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        )}
                    </header>

                    <div className="prose prose-lg prose-indigo mx-auto text-gray-600 leading-relaxed">
                        <div
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />
                    </div>

                    {/* Author Footer */}
                    <div className="mt-20 pt-10 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-lg font-bold text-indigo-600">
                                {user.name[0]}
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-bold text-gray-900">Written by {user.name}</p>
                                <p className="text-sm text-gray-500">@{user.username}</p>
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            {/* Share buttons placeholder */}
                        </div>
                    </div>
                </article>
            </main>
        </div>
    );
}
