'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function LogoutButton({ className }) {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            router.push('/login');
            router.refresh(); // Refresh to ensure middleware catches the missing cookie
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <button
            onClick={handleLogout}
            className={`flex items-center gap-2 text-sm text-slate-400 hover:text-red-400 transition-colors ${className}`}
        >
            <LogOut className="w-4 h-4" />
            Log Out
        </button>
    );
}
