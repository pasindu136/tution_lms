import { supabase } from '@/lib/supabaseClient';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Users, ArrowLeft } from 'lucide-react';
import LogoutButton from '@/components/LogoutButton';
import UserManagementTable from '@/components/UserManagementTable';

export default async function ManageUsersPage() {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') redirect('/login');

    // Fetch Users
    const { data: users } = await supabase
        .from('user_approvals')
        .select('*')
        .order('created_at', { ascending: false });

    // Fetch Packs
    const { data: packs } = await supabase
        .from('video_packs')
        .select('*, pack_videos(count)');

    // Simplify pack data for frontend
    const formattedPacks = packs?.map(p => ({
        ...p,
        videos_count: p.pack_videos?.[0]?.count || 0
    })) || [];

    // Fetch Assignments
    const { data: assignments } = await supabase
        .from('student_packs')
        .select('*');

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col">
            <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="font-bold text-xl text-white flex items-center gap-2">
                        <span className="text-emerald-400">Teacher</span> Dashboard
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-slate-400 text-sm hidden sm:block">{user.name}</span>
                        <LogoutButton />
                    </div>
                </div>
            </nav>

            <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
                <div className="mb-6">
                    <Link href="/dashboard" className="inline-flex items-center text-slate-400 hover:text-white mb-4 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Dashboard
                    </Link>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Users className="w-6 h-6 text-blue-400" />
                        Manage Students & Enrollment
                    </h1>
                </div>

                <UserManagementTable
                    users={users || []}
                    packs={formattedPacks}
                    assignments={assignments || []}
                />
            </main>
        </div>
    );
}
