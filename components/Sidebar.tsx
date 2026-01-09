'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Key, LogOut, User as UserIcon, Layers, FileText, Plus, BarChart } from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function Sidebar({ user }: { user: any }) {
    const pathname = usePathname();

    const navigation = [
        { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart },
        { name: 'My Articles', href: '/dashboard', icon: FileText },
        { name: 'API Keys', href: '/dashboard/api-keys', icon: Key },
        { name: 'New Article', href: '/dashboard/create', icon: Plus },
    ];

    return (
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-gray-900">
            {/* Logo */}
            <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900 border-b border-gray-800">
                <Layers className="h-8 w-8 text-indigo-500" />
                <span className="ml-2 text-xl font-bold text-white tracking-tight">WriterStack</span>
            </div>

            <div className="flex-1 flex flex-col overflow-y-auto">
                <nav className="flex-1 px-2 py-4 space-y-1">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive
                                    ? 'bg-gray-800 text-white'
                                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                    }`}
                            >
                                <item.icon
                                    className={`mr-3 flex-shrink-0 h-5 w-5 ${isActive ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-300'
                                        }`}
                                    aria-hidden="true"
                                />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="flex-shrink-0 flex border-t border-gray-800 p-4">
                <div className="flex-shrink-0 w-full group block">
                    <div className="flex items-center">
                        <div>
                            <div className="h-9 w-9 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                                {user?.name?.[0] || 'U'}
                            </div>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-white group-hover:text-gray-200">
                                {user?.name}
                            </p>
                            <p className="text-xs font-medium text-gray-400 group-hover:text-gray-300">
                                <a href={`/${user?.username}`} target="_blank" className='hover:text-indigo-400'>
                                    @{user?.username}
                                </a>
                            </p>
                        </div>
                        <button
                            onClick={() => signOut({ callbackUrl: '/' })}
                            className='ml-auto text-gray-400 hover:text-white'
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
