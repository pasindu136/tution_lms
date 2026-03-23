import { supabase } from '@/lib/supabaseClient';
import { getCurrentUser } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(req) {
    const user = await getCurrentUser();

    // Role check
    if (!user || !['admin', 'teacher'].includes(user.role)) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    try {
        const { title, description, youtube_url, category, pack_id } = await req.json();

        if (!title || !youtube_url || !pack_id) {
            return NextResponse.json({ message: 'Title, YouTube URL, and Pack ID are required' }, { status: 400 });
        }

        // Basic extraction of ID from URL
        let youtube_id = youtube_url;
        try {
            const url = new URL(youtube_url);
            if (url.hostname.includes('youtube.com')) {
                youtube_id = url.searchParams.get('v');
            } else if (url.hostname.includes('youtu.be')) {
                youtube_id = url.pathname.slice(1);
            }
        } catch (e) {
            // Assume it's an ID if not a valid URL
        }

        if (!youtube_id) {
            return NextResponse.json({ message: 'Invalid YouTube URL' }, { status: 400 });
        }

        // Note: 'category' is not in the new schema for pack_videos, it's implied by the pack. 
        // We can ignore it or add it if schema changes, but for now ignoring.
        const { data, error } = await supabase
            .from('pack_videos')
            .insert([
                { title, description, youtube_id, pack_id, category: category || 'Lecture' }
            ])
            .select(); // IMPORTANT: Return the created record

        if (error) throw error;

        return NextResponse.json({ message: 'Video added successfully', data: data });
    } catch (error) {
        console.error('Add video error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
