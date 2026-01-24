'use client';

import { useState } from 'react';
import { Layers, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AssignPackModal({ user, packs, existingAssignments, onClose }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Set of pack IDs this user already has
    const assignedSet = new Set(
        existingAssignments
            .filter(a => a.user_email === user.email)
            .map(a => a.pack_id)
    );

    const handleTogglePack = async (packId, isAssigned) => {
        setLoading(true);
        try {
            await fetch('/api/admin/users/assign', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: user.email,
                    packId,
                    action: isAssigned ? 'remove' : 'assign'
                })
            });
            router.refresh();
        } catch (e) {
            alert('Error updating assignment');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-800 rounded-2xl w-full max-w-lg border border-slate-700 shadow-2xl overflow-hidden">
                <div className="p-6 border-b border-slate-700 flex justify-between items-center bg-slate-900/50">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Layers className="w-5 h-5 text-purple-400" />
                        Assign Packs
                    </h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-white">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6">
                    <p className="text-slate-300 mb-4">Managing access for <span className="text-white font-bold">{user.name}</span></p>

                    <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                        {packs.map(pack => {
                            const isAssigned = assignedSet.has(pack.id);
                            return (
                                <div key={pack.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-700">
                                    <div>
                                        <p className="font-medium text-white">{pack.title}</p>
                                        <p className="text-xs text-slate-500">{pack.videos_count} Videos</p>
                                    </div>
                                    <button
                                        onClick={() => handleTogglePack(pack.id, isAssigned)}
                                        disabled={loading}
                                        className={`px-3 py-1.5 rounded-md text-xs font-bold transition ${isAssigned
                                                ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
                                                : 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20'
                                            }`}
                                    >
                                        {isAssigned ? 'Revoke' : 'Assign'}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
