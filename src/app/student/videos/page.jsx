import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { BookOpen, Package, Search, Filter, PlayCircle, Clock, ArrowRight } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import LogoutButton from '@/components/LogoutButton';

export default async function StudentDashboard() {
    const user = await getCurrentUser();
    if (!user) redirect('/login');

    // 1. Fetch Packs assigned to this student
    let myPacks = [];
    let errorMsg = null;

    try {
        // Step A: Get assigned pack IDs from student_packs table
        const { data: assignments, error: assignmentError } = await supabase
            .from('student_packs')
            .select('pack_id')
            .eq('user_email', user.email);

        if (assignmentError) {
            console.error('Error fetching student assignments:', JSON.stringify(assignmentError, null, 2));
            throw new Error('Failed to load your class assignments.');
        }

        const packIds = assignments?.map(a => a.pack_id).filter(Boolean) || [];

        if (packIds.length > 0) {
            // Step B: Fetch details for these packs from video_packs table
            // We select pack_videos(count) to show number of videos. 
            // If this count fails, we can remove it, but usually it works if relations exist.
            const { data: packsData, error: packsError } = await supabase
                .from('video_packs')
                .select('id, title, description, created_at, pack_videos(count)')
                .in('id', packIds);

            if (packsError) {
                console.error('Error fetching pack details:', JSON.stringify(packsError, null, 2));
                throw new Error('Failed to load class details.');
            }

            // Step C: Format data
            myPacks = packsData?.map(pack => ({
                ...pack,
                video_count: pack.pack_videos?.[0]?.count || 0
            })) || [];
        }

    } catch (err) {
        console.error('Dashboard Data Load Error:', err);
        errorMsg = err.message || "An unexpected error occurred.";
    }

    return (
        <div className="min-h-screen relative flex flex-col bg-slate-950">

            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

            <nav className="sticky top-0 z-50 glass border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-white">
                            <span className="text-blue-500">APEX</span> LMS
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-right mr-2 hidden sm:block">
                            <p className="text-sm font-semibold text-white leading-tight">{user.name}</p>
                            <p className="text-xs text-slate-400">Student ID: {user.userId?.substring(0, 8)}</p>
                        </div>
                        <LogoutButton className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-300 hover:text-white" />
                    </div>
                </div>
            </nav>

            <main className="flex-1 max-w-7xl mx-auto w-full p-6 lg:p-10 relative z-10">

                {/* Modern Header */}
                <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-white/10 rounded-3xl p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-sm">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">My Classrooms</h1>
                        <p className="text-blue-200/80">Access your Theory, Revision, and Paper class materials here.</p>
                    </div>
                    <div className="bg-white/10 px-6 py-3 rounded-2xl border border-white/10 backdrop-blur-md">
                        <span className="block text-2xl font-bold text-white text-center">{myPacks.length}</span>
                        <span className="text-xs text-blue-200 uppercase tracking-wider font-semibold">Active Courses</span>
                    </div>
                </div>

                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Package className="w-5 h-5 text-blue-500" />
                    Your Enrolled Batches
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {errorMsg ? (
                        <div className="col-span-full p-6 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
                            <h3 className="font-bold mb-2">Error Loading Classes</h3>
                            <p>{errorMsg}</p>
                            <p className="text-sm mt-2 opacity-70">Please contact support or try again later.</p>
                        </div>
                    ) : myPacks.length === 0 ? (
                        <div className="col-span-full flex flex-col items-center justify-center py-24 text-slate-500 border-2 border-dashed border-slate-800 rounded-3xl bg-slate-900/50">
                            <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mb-4">
                                <BookOpen className="w-10 h-10 text-slate-600" />
                            </div>
                            <p className="text-xl font-medium text-white mb-2">No Classes Assigned</p>
                            <p className="text-sm">Contact the hotline (077 123 4567) to activate your account.</p>
                        </div>
                    ) : (
                        myPacks.map((pack) => (
                            <Link href={`/student/packs/${pack.id}`} key={pack.id} className="group">
                                <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden glass-card h-full flex flex-col hover:border-blue-500/50 transition-all duration-300">
                                    {/* Decorative Banner */}
                                    <div className="h-24 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                                        <div className="absolute bottom-4 left-4 p-2 bg-slate-900/90 backdrop-blur-md rounded-lg border border-white/10">
                                            <Package className="w-6 h-6 text-blue-400" />
                                        </div>
                                    </div>

                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-bold text-white text-lg group-hover:text-blue-400 transition-colors line-clamp-1">
                                                {pack.title}
                                            </h3>
                                        </div>

                                        <p className="text-sm text-slate-400 line-clamp-2 mb-6 h-10">
                                            {pack.description || "Comprehensive syllabus coverage and advanced revision materials."}
                                        </p>

                                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-800">
                                            <span className="text-xs font-medium text-slate-500 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                                                {pack.video_count} Lessons
                                            </span>
                                            <span className="text-sm font-bold text-blue-500 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                                                Enter Class <ArrowRight className="w-4 h-4" />
                                            </span>
                                        </div>
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
