import { dbRequest } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Plus, Video, Users, Layers } from 'lucide-react';
import LogoutButton from '@/components/LogoutButton';
import { supabase } from '@/lib/supabaseClient';
import DeleteVideoButton from '@/components/DeleteVideoButton';

export default async function Dashboard() {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') redirect('/login');

    // List all videos from all packs (Since we moved to a Pack-based system)
    const { data: videos, error } = await supabase
        .from('pack_videos')
        .select(`
            *,
            video_packs (
                title
            )
        `)
        .order('created_at', { ascending: false });

    if (error) console.error("Error loading videos:", error);

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
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                    <div className="flex flex-wrap items-center gap-4">
                        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                            <Video className="w-6 h-6 text-emerald-400" />
                            Manage Videos
                        </h1>
                        <Link
                            href="/dashboard/users"
                            className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm border border-slate-700 transition flex items-center gap-2"
                        >
                            <Users className="w-4 h-4 text-blue-400" />
                            Students
                        </Link>
                        <Link
                            href="/dashboard/packs"
                            className="bg-slate-800 hover:bg-purple-900/50 text-white px-4 py-2 rounded-lg text-sm border border-slate-700 hover:border-purple-500/50 transition flex items-center gap-2"
                        >
                            <Layers className="w-4 h-4 text-purple-400" />
                            Packs
                        </Link>
                    </div>
                    <Link
                        href="/dashboard/add-video"
                        className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
                    >
                        <Plus className="w-4 h-4" />
                        Add New Video
                    </Link>
                </div>

                <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-xl">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-900/50 text-slate-400 text-sm border-b border-slate-700">
                                <th className="p-4 font-medium">Video Title</th>
                                <th className="p-4 font-medium">Pack</th>
                                <th className="p-4 font-medium">Added On</th>
                                <th className="p-4 font-medium">YouTube ID</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700 text-slate-300 text-sm">
                            {videos && videos.map(video => (
                                <tr key={video.id} className="hover:bg-slate-700/30 transition">
                                    <td className="p-4 font-medium text-white">{video.title}</td>
                                    <td className="p-4">
                                        <span className="bg-slate-700 px-2 py-1 rounded text-xs">
                                            {video.video_packs?.title || 'Unassigned'}
                                        </span>
                                    </td>
                                    <td className="p-4">{new Date(video.created_at).toLocaleDateString()}</td>
                                    <td className="p-4 font-mono text-xs text-slate-500">{video.youtube_id}</td>
                                    <td className="p-4 text-right">
                                        <button className="text-blue-400 hover:text-blue-300 mr-3">Edit</button>
                                        <DeleteVideoButton videoId={video.id} title={video.title} />
                                    </td>
                                </tr>
                            ))}
                            {(!videos || videos.length === 0) && (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-slate-500">
                                        No videos found. Upload your first lesson.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
