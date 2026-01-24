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
        const { title, description, youtube_url, category } = await req.json();

        if (!title || !youtube_url) {
            return NextResponse.json({ message: 'Title and YouTube URL are required' }, { status: 400 });
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

        const { data, error } = await supabase
            .from('videos')
            .insert([
                { title, description, youtube_id, category }
            ])
            .select(); // IMPORTANT: Return the created record

        if (error) throw error;

        return NextResponse.json({ message: 'Video added successfully', data: data });
    } catch (error) {
        console.error('Add video error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
