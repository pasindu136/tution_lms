import { supabase } from '@/lib/supabaseClient';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Plus, Package, ArrowLeft, Layers } from 'lucide-react';
import LogoutButton from '@/components/LogoutButton';

export default async function ManagePacksPage() {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') redirect('/login');

    const { data: packs, error } = await supabase
        .from('video_packs')
        .select('*, pack_videos(count)')
        .order('created_at', { ascending: false });

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
                <div className="mb-6 flex justify-between items-end">
                    <div>
                        <Link href="/dashboard" className="inline-flex items-center text-slate-400 hover:text-white mb-4 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Dashboard
                        </Link>
                        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                            <Layers className="w-6 h-6 text-purple-400" />
                            Video Packs
                        </h1>
                        <p className="text-slate-400 text-sm mt-1">Organize your lessons into bundles (e.g. "Grade 11 - May")</p>
                    </div>
                    <Link
                        href="/dashboard/packs/create"
                        className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition shadow-lg"
                    >
                        <Plus className="w-4 h-4" />
                        Create Pack
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {packs?.map(pack => (
                        <div key={pack.id} className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-purple-500/50 transition-all group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                                    <Package className="w-6 h-6" />
                                </div>
                                <span className="text-xs font-mono text-slate-500 bg-slate-900 px-2 py-1 rounded">
                                    {pack.pack_videos?.[0]?.count || 0} Videos
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{pack.title}</h3>
                            <p className="text-sm text-slate-400 mb-6 line-clamp-2">
                                {pack.description || "No description provided."}
                            </p>
                            <Link
                                href={`/dashboard/packs/${pack.id}`}
                                className="w-full block text-center py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium transition-colors"
                            >
                                Manage Content
                            </Link>
                        </div>
                    ))}

                    {(!packs || packs.length === 0) && (
                        <div className="col-span-full border border-dashed border-slate-700 rounded-xl p-12 text-center text-slate-500">
                            <Package className="w-12 h-12 mx-auto mb-4 opacity-20" />
                            <p>No video packs created yet.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
