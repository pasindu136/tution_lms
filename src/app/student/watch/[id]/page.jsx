import { supabase } from '@/lib/supabaseClient';
import { getCurrentUser } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import SecurePlayer from '@/components/SecurePlayer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import BackButton from '@/components/BackButton';

export default async function WatchVideoPage({ params }) {
    const user = await getCurrentUser();
    if (!user) redirect('/login');

    const { id } = await params;

    // Fetch Video (Need to check if user has access to a pack containing this video)
    const { data: video } = await supabase
        .from('videos')
        .select('*')
        .eq('id', id)
        .single();

    if (!video) notFound();

    // Check Access: Does the user have a pack that contains this video?
    // 1. Get packs containing this video
    const { data: packVideos } = await supabase
        .from('pack_videos')
        .select('pack_id')
        .eq('video_id', id);

    const packIdsToCheck = packVideos?.map(pv => pv.pack_id) || [];

    // 2. Check strict access (Only allows watching if in an assigned pack)
    // If packIdsToCheck is empty, it means the video is not in any pack, so maybe allow or deny? 
    // Let's Assume DENY if not in a pack or user doesn't have the pack.

    let hasAccess = false;
    if (packIdsToCheck.length > 0) {
        const { data: access } = await supabase
            .from('student_packs')
            .select('id')
            .eq('user_email', user.email)
            .in('pack_id', packIdsToCheck);

        if (access && access.length > 0) hasAccess = true;
    }

    // NOTE: For Admin/Teacher, always allow
    if (user.role === 'admin' || user.role === 'teacher') hasAccess = true;

    if (!hasAccess) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center flex-col text-slate-400 gap-4">
                <p>You do not have access to watch this video.</p>
                <Link href="/student/videos" className="text-blue-400 hover:underline">Return to Library</Link>
            </div>
        );
    }

    const studentInfo = {
        name: user.name || user.email,
        phone: user.email
    };

    return (
        <div className="min-h-screen bg-slate-950 p-4 lg:p-8 flex flex-col items-center">
            <div className="w-full max-w-5xl">
                <BackButton className="inline-flex items-center text-slate-400 hover:text-white mb-6 transition-colors" />

                <div className="bg-black/50 p-1 rounded-2xl border border-slate-800 shadow-2xl mb-6">
                    <SecurePlayer
                        videoId={video.youtube_id}
                        studentInfo={studentInfo}
                    />
                </div>

                <div className="prose prose-invert max-w-none">
                    <h1 className="text-2xl font-bold text-white mb-2">{video.title}</h1>
                    <div className="flex gap-4 text-sm text-slate-500 mb-6 border-b border-slate-800 pb-4">
                        <span>{video.category}</span>
                        <span>•</span>
                        <span>{new Date(video.created_at).toLocaleDateString()}</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                        {video.description}
                    </p>
                </div>
            </div>
        </div>
    );
}
