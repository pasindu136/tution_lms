import { supabase } from '@/lib/supabaseClient';
import { getCurrentUser } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(req) {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    try {
        const { packId, videoId, action } = await req.json();

        if (action === 'remove') {
            // In the new schema, "Removing" a video from a pack means DELETING the video itself
            // because videos are strictly children of packs (pack_videos table).
            // videoId here effectively is the PRIMARY KEY ID of the pack_videos record.
            const { error } = await supabase
                .from('pack_videos')
                .delete()
                .eq('id', videoId); // Match by Primary Key

            if (error) throw error;
        }

        return NextResponse.json({ message: 'Success' });
    } catch (error) {
        return NextResponse.json({ message: 'Error updating content' }, { status: 500 });
    }
}
