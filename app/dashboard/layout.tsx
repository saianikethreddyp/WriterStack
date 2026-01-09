'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === 'loading') return null;

    if (status === 'unauthenticated') {
        router.push('/auth/login');
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar for Desktop */}
            <Sidebar user={session?.user} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col md:pl-72 min-w-0">
                <main className="flex-1">
                    <div className="py-8 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto w-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
