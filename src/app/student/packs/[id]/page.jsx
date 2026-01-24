import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { PlayCircle, Clock, ArrowLeft } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import LogoutButton from '@/components/LogoutButton';

export default async function PackVideosPage({ params }) {
    const user = await getCurrentUser();
    if (!user) redirect('/login');

    const { id } = await params;

    // Verify Access (Security Check)
    const { data: access } = await supabase
        .from('student_packs')
        .select('id')
        .eq('user_email', user.email)
        .eq('pack_id', id)
        .single();

    if (!access) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center text-slate-400">
                Access Denied. You are not enrolled in this pack.
            </div>
        );
    }

    // Fetch Pack Info
    const { data: pack } = await supabase
        .from('video_packs')
        .select('*')
        .eq('id', id)
        .single();

    // Fetch Videos in Pack
    const { data: videos } = await supabase
        .from('pack_videos')
        .select('videos(*)')
        .eq('pack_id', id);

    const content = videos?.map(v => v.videos) || [];

    return (
        <div className="min-h-screen relative flex flex-col">
            <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-950"></div>

            <nav className="sticky top-0 z-50 glass border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/student/videos" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Library</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-semibold text-white hidden sm:block">{user.name}</span>
                        <LogoutButton className="p-2 hover:bg-red-500/10 hover:text-red-400 rounded-full transition-colors" />
                    </div>
                </div>
            </nav>

            <main className="flex-1 max-w-7xl mx-auto w-full p-6 lg:p-10">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-white mb-2">{pack.title}</h1>
                    <p className="text-slate-400">{pack.description}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {content.map((video) => (
                        <Link href={`/student/watch/${video.id}`} key={video.id} className="group flex flex-col">
                            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden glass-card h-full flex flex-col hover:border-blue-500/30 transition-all">
                                <div className="relative aspect-video overflow-hidden">
                                    <img
                                        src={`https://img.youtube.com/vi/${video.youtube_id}/mqdefault.jpg`}
                                        alt={video.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all"></div>
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-100">
                                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full border border-white/30 shadow-xl">
                                            <PlayCircle className="w-8 h-8 text-white fill-blue-500" />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 flex-1 flex flex-col">
                                    <h3 className="font-bold text-white text-lg leading-snug mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                                        {video.title}
                                    </h3>
                                    <div className="mt-auto flex items-center gap-2 text-xs text-slate-500">
                                        <Clock className="w-3 h-3" />
                                        {new Date(video.created_at).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                    {content.length === 0 && (
                        <p className="text-slate-500 col-span-full">No videos in this pack yet.</p>
                    )}
                </div>
            </main>
        </div>
    );
}
