import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { BookOpen, Package, Search, Filter } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import LogoutButton from '@/components/LogoutButton';

export default async function StudentDashboard() {
    const user = await getCurrentUser();
    if (!user) redirect('/login');

    // Fetch Packs assigned to this student
    const { data: assignments } = await supabase
        .from('student_packs')
        .select('pack_id, video_packs(id, title, description, created_at, pack_videos(count))')
        .eq('user_email', user.email);

    const myPacks = assignments?.map(a => ({
        ...a.video_packs,
        video_count: a.video_packs.pack_videos?.[0]?.count || 0
    })) || [];

    return (
        <div className="min-h-screen relative flex flex-col">
            <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-950"></div>

            <nav className="sticky top-0 z-50 glass border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-blue-600 rounded-lg shadow-lg shadow-blue-500/20">
                            <BookOpen className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-lg hidden sm:block">My Library</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center px-4 py-1.5 rounded-full bg-slate-900/50 border border-slate-700/50 text-sm text-slate-400">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
                            Active Student
                        </div>
                        <div className="h-6 w-px bg-slate-700/50"></div>
                        <div className="text-right mr-2 hidden sm:block">
                            <p className="text-sm font-semibold text-white leading-tight">{user.name}</p>
                            <p className="text-xs text-slate-400">Student</p>
                        </div>
                        <LogoutButton className="p-2 hover:bg-red-500/10 hover:text-red-400 rounded-full transition-colors" />
                    </div>
                </div>
            </nav>

            <main className="flex-1 max-w-7xl mx-auto w-full p-6 lg:p-10">

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Welcome Back, <span className="text-blue-400">{user.name.split(' ')[0]}</span> 👋</h1>
                        <p className="text-slate-400">You have access to <span className="text-white font-semibold">{myPacks.length}</span> course packs.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myPacks.length === 0 ? (
                        <div className="col-span-full flex flex-col items-center justify-center py-20 text-slate-500 border border-dashed border-slate-800 rounded-3xl">
                            <Package className="w-16 h-16 mb-4 opacity-20" />
                            <p className="text-lg">No courses assigned to you yet.</p>
                            <p className="text-sm">Please contact your teacher to enroll.</p>
                        </div>
                    ) : (
                        myPacks.map((pack) => (
                            <Link href={`/student/packs/${pack.id}`} key={pack.id} className="group">
                                <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden glass-card h-full p-6 hover:border-blue-500/30 transition-all">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
                                            <Package className="w-8 h-8" />
                                        </div>
                                        <span className="px-3 py-1 bg-slate-800 rounded-full text-xs font-medium text-slate-400 border border-slate-700">
                                            {pack.video_count} Lessons
                                        </span>
                                    </div>

                                    <h3 className="font-bold text-white text-xl mb-3 group-hover:text-blue-400 transition-colors">
                                        {pack.title}
                                    </h3>

                                    <p className="text-sm text-slate-400 line-clamp-3 mb-6">
                                        {pack.description}
                                    </p>

                                    <div className="flex items-center text-blue-400 text-sm font-bold group-hover:translate-x-1 transition-transform">
                                        View Content →
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}
