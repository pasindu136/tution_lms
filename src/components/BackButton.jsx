'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BackButton({ className }) {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className={className}
        >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
        </button>
    );
}
