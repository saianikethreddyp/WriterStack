import dbConnect from '@/lib/db';
import User from '@/models/User';
import Article from '@/models/Article';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Clock, BookOpen, Twitter, Github, Globe } from 'lucide-react';

export const revalidate = 60; // Revalidate every minute

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
        <div className="min-h-screen bg-slate-50/50">
            {/* Minimalist Header */}
            <div className="bg-white border-b border-gray-100">
                <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
                    <div className="flex flex-col items-center text-center">
                        <div className="relative group">
                            <div className="h-32 w-32 rounded-full p-1 bg-white ring-2 ring-gray-100 shadow-sm mb-6">
                                {user.image ? (
                                    <img
                                        src={user.image}
                                        alt={user.name}
                                        className="h-full w-full rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="h-full w-full rounded-full bg-slate-100 flex items-center justify-center text-4xl font-bold text-slate-400">
                                        {user.name[0]}
                                    </div>
                                )}
                            </div>
                        </div>

                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-2">
                            {user.name}
                        </h1>
                        <p className="text-lg text-gray-500 font-medium mb-6">@{user.username}</p>

                        <p className="max-w-2xl text-lg text-gray-600 leading-relaxed mb-8">
                            {user.bio || "Writing about technology, code, and the future. Exploring new ideas one article at a time."}
                        </p>

                        {/* Social Links - Refined */}
                        {user.socialLinks && (
                            <div className="flex items-center space-x-6 text-gray-400">
                                {user.socialLinks.twitter && (
                                    <a href={`https://twitter.com/${user.socialLinks.twitter}`} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500 hover:scale-110 transition-all duration-200">
                                        <Twitter className="h-6 w-6" />
                                    </a>
                                )}
                                {user.socialLinks.github && (
                                    <a href={`https://github.com/${user.socialLinks.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 hover:scale-110 transition-all duration-200">
                                        <Github className="h-6 w-6" />
                                    </a>
                                )}
                                {user.socialLinks.website && (
                                    <a href={user.socialLinks.website} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-500 hover:scale-110 transition-all duration-200">
                                        <Globe className="h-6 w-6" />
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                </main>
            </div>

            {/* Content Area */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex items-center justify-between mb-10 border-b border-gray-200 pb-4">
                    <h2 className="text-xl font-bold text-gray-900 tracking-tight">Articles</h2>
                    <span className="bg-gray-100 text-gray-600 py-1 px-3 rounded-full text-xs font-semibold uppercase tracking-wide">
                        {articles.length} Published
                    </span>
                </div>

                {articles.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
                        <div className="mx-auto h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
                            <BookOpen className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-medium text-gray-900 mb-2">No articles yet</h3>
                        <p className="text-gray-500">When {user.name} publishes, it will show up here.</p>
                    </div>
                ) : (
                    <div className="grid gap-10">
                        {articles.map((article: any) => (
                            <Link
                                key={article._id.toString()}
                                href={`/${username}/${article.slug}`}
                                className="group block"
                            >
                                <article className="flex flex-col md:flex-row gap-8 items-start">
                                    {/* Image - Right side on desktop for magazine feel, or top on mobile */}
                                    {article.image_url && (
                                        <div className="w-full md:w-64 h-48 md:h-40 shrink-0 rounded-xl overflow-hidden bg-gray-100 shadow-sm group-hover:shadow-md transition-all order-1 md:order-2">
                                            <img
                                                src={article.image_url}
                                                alt={article.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                    )}

                                    {/* Content */}
                                    <div className="flex-1 order-2 md:order-1">
                                        <div className="flex items-center space-x-2 text-xs font-medium text-gray-500 mb-3">
                                            <time dateTime={article.createdAt}>
                                                {new Date(article.createdAt).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </time>
                                            <span>•</span>
                                            <span>5 min read</span>
                                        </div>

                                        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors leading-tight">
                                            {article.title}
                                        </h3>

                                        <p className="text-gray-600 leading-relaxed line-clamp-2 md:line-clamp-3 mb-4">
                                            {article.summary || "Click to read the full story. This article explores deep technical concepts and provides actionable insights."}
                                        </p>

                                        <div className="flex items-center text-indigo-600 font-medium text-sm group-hover:translate-x-1 transition-transform">
                                            Read article
                                            <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
