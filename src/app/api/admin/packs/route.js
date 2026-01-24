import { supabase } from '@/lib/supabaseClient';
import { getCurrentUser } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(req) {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    try {
        const { title, description } = await req.json();
        const { error } = await supabase
            .from('video_packs')
            .insert([{ title, description }]);

        if (error) throw error;
        return NextResponse.json({ message: 'Pack created successfully' });
    } catch (error) {
        return NextResponse.json({ message: 'Error creating pack' }, { status: 500 });
    }
}
