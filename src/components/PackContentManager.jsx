'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash, CheckCircle, Upload, Link as LinkIcon, Loader2 } from 'lucide-react';

export default function PackContentManager({ pack, packVideos }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('list'); // 'list' or 'add'

    // New Video Form State
    const [videoData, setVideoData] = useState({
        title: '',
        description: '',
        youtube_url: '',
        category: 'Lecture'
    });

    const handleAddNewVideo = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // 1. Create Video
            const createRes = await fetch('/api/admin/videos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(videoData)
            });

            if (!createRes.ok) throw new Error('Failed to create video');
            const video = await createRes.json(); // Assuming API now returns the created video object

            // 2. Link to Pack (API needs to support returning video object to do this immediately)
            // Since our current add-video API might not return the ID, we might need to adjust it or fetch it.
            // Let's assume we update the API to return the video details.

            await fetch('/api/admin/packs/content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    packId: pack.id,
                    videoId: video.data[0].id, // Check structure of response
                    action: 'add'
                })
            });

            // Reset
            setVideoData({ title: '', description: '', youtube_url: '', category: 'Lecture' });
            setActiveTab('list');
            router.refresh();

        } catch (e) {
            console.error(e);
            alert('Error adding video. Make sure the YouTube URL is valid.');
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveVideo = async (videoId) => {
        if (!confirm('Remove this video from the pack?')) return;
        try {
            await fetch('/api/admin/packs/content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ packId: pack.id, videoId: videoId, action: 'remove' }),
            });
            router.refresh();
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Current Videos List */}
            <div className="lg:col-span-2 space-y-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-white">Pack Content</h2>
                    <button
                        onClick={() => setActiveTab('add')}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm transition shadow-lg"
                    >
                        <Upload className="w-4 h-4" />
                        Upload New Video
                    </button>
                </div>

                {packVideos.length === 0 ? (
                    <div className="bg-slate-800 rounded-xl p-12 text-center text-slate-500 border border-slate-700 border-dashed flex flex-col items-center">
                        <LinkIcon className="w-12 h-12 mb-4 opacity-20" />
                        <p className="text-lg">This pack is empty.</p>
                        <p className="text-sm">Click "Upload New Video" to add content.</p>
                    </div>
                ) : (
                    <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                        {packVideos.map(({ videos: video }) => (
                            <div key={video.id} className="p-4 flex items-center justify-between border-b border-slate-700 last:border-0 hover:bg-slate-700/30">
                                <div className="flex items-center gap-4">
                                    <div className="relative w-24 aspect-video bg-black rounded overflow-hidden hidden sm:block">
                                        <img src={`https://img.youtube.com/vi/${video.youtube_id}/default.jpg`} className="object-cover w-full h-full opacity-70" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-white">{video.title}</p>
                                        <p className="text-xs text-slate-400">{video.category} • {new Date(video.created_at).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleRemoveVideo(video.id)}
                                    className="p-2 text-red-400 hover:bg-red-500/10 rounded transition"
                                    title="Remove from pack"
                                >
                                    <Trash className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Right/Overlay: Add Video Form */}
            {activeTab === 'add' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-slate-800 w-full max-w-lg rounded-2xl border border-slate-700 shadow-2xl overflow-hidden">
                        <div className="p-6 border-b border-slate-700 flex justify-between items-center bg-slate-900/50">
                            <h3 className="text-xl font-bold text-white">Add Video to Pack</h3>
                        </div>

                        <form onSubmit={handleAddNewVideo} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Video Title</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500"
                                    placeholder="e.g. Introduction to Physics"
                                    value={videoData.title}
                                    onChange={e => setVideoData({ ...videoData, title: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">YouTube URL</label>
                                <input
                                    type="url"
                                    required
                                    className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500"
                                    placeholder="https://youtube.com/watch?v=..."
                                    value={videoData.youtube_url}
                                    onChange={e => setVideoData({ ...videoData, youtube_url: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Category</label>
                                    <select
                                        className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:outline-none"
                                        value={videoData.category}
                                        onChange={e => setVideoData({ ...videoData, category: e.target.value })}
                                    >
                                        <option>Lecture</option>
                                        <option>Tutorial</option>
                                        <option>Q&A</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Description (Optional)</label>
                                <textarea
                                    className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500"
                                    rows={3}
                                    placeholder="Brief summary of the lesson..."
                                    value={videoData.description}
                                    onChange={e => setVideoData({ ...videoData, description: e.target.value })}
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('list')}
                                    className="flex-1 px-4 py-3 rounded-lg bg-slate-700 text-slate-300 font-medium hover:bg-slate-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 px-4 py-3 rounded-lg bg-purple-600 text-white font-bold hover:bg-purple-500 disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Add & Link Video'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
