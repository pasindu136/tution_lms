'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Loader2, Layers } from 'lucide-react';
import Link from 'next/link';

export default function CreatePackPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/admin/packs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description }),
            });
            if (!res.ok) throw new Error('Failed to create pack');
            router.push('/dashboard/packs');
            router.refresh();
        } catch (error) {
            alert('Error creating pack');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 p-6 flex flex-col items-center">
            <div className="w-full max-w-2xl">
                <Link href="/dashboard/packs" className="inline-flex items-center text-slate-400 hover:text-white mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Packs
                </Link>

                <div className="bg-slate-800 rounded-xl p-8 border border-slate-700 shadow-2xl">
                    <h1 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <Layers className="w-6 h-6 text-purple-400" />
                        Create New Pack
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Pack Title</label>
                            <input
                                type="text"
                                required
                                className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:ring-1 focus:ring-purple-500 outline-none transition"
                                placeholder="e.g. Advanced Level - 2026 Batch"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                            <textarea
                                rows={4}
                                className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:ring-1 focus:ring-purple-500 outline-none transition"
                                placeholder="What does this pack contain?"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-lg shadow-lg flex items-center justify-center gap-2 transition disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : (
                                <>
                                    <Save className="w-5 h-5" />
                                    Create Pack
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
