'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DeleteVideoButton({ videoId, title }) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) {
            return;
        }

        setIsDeleting(true);
        try {
            const res = await fetch(`/api/admin/videos/${videoId}`, {
                method: 'DELETE',
            });
            
            if (!res.ok) throw new Error('Failed to delete');
            
            router.refresh();
        } catch (error) {
            console.error(error);
            alert('An error occurred while deleting the video');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <button 
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-400 hover:text-red-300 disabled:opacity-50 transition"
        >
            {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
    );
}
