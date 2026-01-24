import { supabase } from '@/lib/supabaseClient';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Layers } from 'lucide-react';
import PackContentManager from '@/components/PackContentManager';
import LogoutButton from '@/components/LogoutButton';

export default async function ManagePackDetailsPage({ params }) {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') redirect('/login');

    const { id } = await params;

    // Fetch Pack Details
    const { data: pack } = await supabase
        .from('video_packs')
        .select('*')
        .eq('id', id)
        .single();

    // Fetch Videos ALREADY in this pack
    const { data: packVideos } = await supabase
        .from('pack_videos')
        .select('*, videos(*)') // Join with videos table
        .eq('pack_id', id);

    if (!pack) return <div className="text-white p-10">Pack not found</div>;

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
                <div className="mb-8">
                    <Link href="/dashboard/packs" className="inline-flex items-center text-slate-400 hover:text-white mb-4 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Packs
                    </Link>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <Layers className="w-8 h-8 text-purple-400" />
                        {pack.title}
                    </h1>
                    <p className="text-slate-400 mt-2">{pack.description}</p>
                </div>

                {/* Removed allVideos prop since we create them directly now */}
                <PackContentManager
                    pack={pack}
                    packVideos={packVideos || []}
                />
            </main>
        </div>
    );
}
