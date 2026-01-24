'use client';

import { useState } from 'react';
import { CheckCircle, Ban, RefreshCw, Layers } from 'lucide-react';
import { useRouter } from 'next/navigation';
import AssignPackModal from './AssignPackModal';

export default function UserManagementTable({ users, packs, assignments }) {
    const router = useRouter();
    const [loadingId, setLoadingId] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleAction = async (id, action) => {
        setLoadingId(id);
        try {
            await fetch('/api/admin/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, action }),
            });
            router.refresh();
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingId(null);
        }
    };

    return (
        <>
            <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-900/50 text-slate-400 text-sm border-b border-slate-700">
                            <th className="p-4 font-medium">Name</th>
                            <th className="p-4 font-medium">Email</th>
                            <th className="p-4 font-medium">Status</th>
                            <th className="p-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700 text-slate-300 text-sm">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-slate-700/30 transition">
                                <td className="p-4 font-medium text-white">{user.name}</td>
                                <td className="p-4">{user.email}</td>
                                <td className="p-4">
                                    {user.is_suspended ? (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/10 text-red-500">
                                            Suspended
                                        </span>
                                    ) : user.is_approved ? (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500">
                                            Active
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-500">
                                            Pending
                                        </span>
                                    )}
                                </td>
                                <td className="p-4 text-right flex items-center justify-end gap-2">
                                    {/* Packs Button */}
                                    {user.is_approved && !user.is_suspended && (
                                        <button
                                            onClick={() => setSelectedUser(user)}
                                            className="p-1 hover:bg-purple-500/20 rounded text-purple-400 mr-2"
                                            title="Assign Packs"
                                        >
                                            <Layers className="w-5 h-5" />
                                        </button>
                                    )}

                                    {loadingId === user.id ? (
                                        <RefreshCw className="w-4 h-4 animate-spin text-slate-500" />
                                    ) : (
                                        <>
                                            {!user.is_approved && (
                                                <button
                                                    onClick={() => handleAction(user.id, 'approve')}
                                                    className="p-1 hover:bg-emerald-500/20 rounded text-emerald-400" title="Approve">
                                                    <CheckCircle className="w-5 h-5" />
                                                </button>
                                            )}
                                            {user.is_suspended ? (
                                                <button
                                                    onClick={() => handleAction(user.id, 'unsuspend')}
                                                    className="p-1 hover:bg-blue-500/20 rounded text-blue-400" title="Unsuspend">
                                                    <RefreshCw className="w-5 h-5" />
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleAction(user.id, 'suspend')}
                                                    className="p-1 hover:bg-red-500/20 rounded text-red-400" title="Suspend">
                                                    <Ban className="w-5 h-5" />
                                                </button>
                                            )}
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr><td colSpan="5" className="p-8 text-center text-slate-500">No students found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {selectedUser && (
                <AssignPackModal
                    user={selectedUser}
                    packs={packs}
                    existingAssignments={assignments}
                    onClose={() => setSelectedUser(null)}
                />
            )}
        </>
    );
}
