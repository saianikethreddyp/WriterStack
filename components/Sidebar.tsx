'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Key, LogOut, User as UserIcon, Layers, FileText, Plus, BarChart, Settings } from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function Sidebar({ user }: { user: any }) {
    const pathname = usePathname();

    const navigation = [
        { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart },
        { name: 'Articles', href: '/dashboard', icon: FileText }, // Renamed from My Articles
        { name: 'API Keys', href: '/dashboard/api-keys', icon: Key },
        { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    ];

    return (
        <div className="hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-slate-900 border-r border-slate-800">
            {/* Logo */}
            <div className="flex items-center h-20 flex-shrink-0 px-6 bg-slate-900">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-600 rounded-lg">
                        <Layers className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight">WriterStack</span>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 flex flex-col overflow-y-auto pt-6 px-4">
                {/* Primary Action */}
                <div className="mb-8">
                    <Link
                        href="/dashboard/create"
                        className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-500 transition-all active:transform active:scale-95"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        New Article
                    </Link>
                </div>

                <nav className="space-y-1.5">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ${isActive
                                    ? 'bg-slate-800 text-white shadow-sm ring-1 ring-white/10'
                                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                                    }`}
                            >
                                <item.icon
                                    className={`mr-3 flex-shrink-0 h-5 w-5 transition-colors ${isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-400'
                                        }`}
                                    aria-hidden="true"
                                />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Use Profile */}
            <div className="flex-shrink-0 flex border-t border-slate-800 p-4 bg-slate-900/50">
                <div className="flex-shrink-0 w-full group block">
                    <div className="flex items-center">
                        <div className="relative">
                            {user?.image ? (
                                <img
                                    className="h-10 w-10 number-full rounded-full object-cover border-2 border-slate-700"
                                    src={user.image}
                                    alt=""
                                />
                            ) : (
                                <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm border-2 border-slate-700">
                                    {user?.name?.[0] || 'U'}
                                </div>
                            )}
                            <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-slate-900 bg-green-400" />
                        </div>
                        <div className="ml-3 min-w-0 flex-1">
                            <p className="text-sm font-medium text-white group-hover:text-white truncate">
                                {user?.name}
                            </p>
                            <a href={`/${user?.username}`} target="_blank" className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors truncate block mt-0.5">
                                View Public Profile ↗
                            </a>
                        </div>
                        <button
                            onClick={() => signOut({ callbackUrl: '/' })}
                            className="ml-2 p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                            title="Logout"
                        >
                            <LogOut className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
