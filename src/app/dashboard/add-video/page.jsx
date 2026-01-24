'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload, Link as LinkIcon, Save, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function AddVideoPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        youtube_url: '',
        category: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/admin/videos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!res.ok) throw new Error('Failed to add video');

            router.push('/dashboard');
            router.refresh();
        } catch (error) {
            alert('Error adding video');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 p-6 flex flex-col items-center">
            <div className="w-full max-w-2xl">
                <Link href="/dashboard" className="inline-flex items-center text-slate-400 hover:text-white mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                </Link>

                <div className="bg-slate-800 rounded-xl p-8 border border-slate-700 shadow-2xl">
                    <h1 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <Upload className="w-6 h-6 text-emerald-400" />
                        Add New Lesson
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Video Title</label>
                            <input
                                type="text"
                                required
                                className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:ring-1 focus:ring-emerald-500 outline-none transition"
                                placeholder="e.g., Mathematics - Algebra Week 1"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">YouTube URL (Unlisted)</label>
                            <div className="relative">
                                <LinkIcon className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 pl-10 text-white focus:ring-1 focus:ring-emerald-500 outline-none transition"
                                    placeholder="https://youtu.be/..."
                                    value={formData.youtube_url}
                                    onChange={e => setFormData({ ...formData, youtube_url: e.target.value })}
                                />
                            </div>
                            <p className="text-xs text-slate-500 mt-1">Paste the full Unlisted YouTube link here.</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
                                <select
                                    className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:ring-1 focus:ring-emerald-500 outline-none"
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option value="">Select Category</option>
                                    <option value="Mathematics">Mathematics</option>
                                    <option value="Science">Science</option>
                                    <option value="English">English</option>
                                    <option value="History">History</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                            <textarea
                                rows={4}
                                className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:ring-1 focus:ring-emerald-500 outline-none transition"
                                placeholder="Lesson summary..."
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg shadow-lg flex items-center justify-center gap-2 transition disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : (
                                <>
                                    <Save className="w-5 h-5" />
                                    Publish Video
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
