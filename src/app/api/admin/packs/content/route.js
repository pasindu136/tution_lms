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

        if (action === 'add') {
            const { error } = await supabase
                .from('pack_videos')
                .insert([{ pack_id: packId, video_id: videoId }]);
            if (error) throw error;
        }

        if (action === 'remove') {
            const { error } = await supabase
                .from('pack_videos')
                .delete()
                .match({ pack_id: packId, video_id: videoId });
            if (error) throw error;
        }

        return NextResponse.json({ message: 'Success' });
    } catch (error) {
        return NextResponse.json({ message: 'Error updating content' }, { status: 500 });
    }
}
