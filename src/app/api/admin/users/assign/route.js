import { supabase } from '@/lib/supabaseClient';
import { getCurrentUser } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(req) {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    try {
        const { email, packId, action } = await req.json();

        if (action === 'assign') {
            const { error } = await supabase
                .from('student_packs')
                .insert([{ user_email: email, pack_id: packId }]);
            if (error) throw error;
        }

        if (action === 'remove') {
            const { error } = await supabase
                .from('student_packs')
                .delete()
                .match({ user_email: email, pack_id: packId });
            if (error) throw error;
        }

        return NextResponse.json({ message: 'Success' });
    } catch (error) {
        return NextResponse.json({ message: 'Error updating assignment' }, { status: 500 });
    }
}
