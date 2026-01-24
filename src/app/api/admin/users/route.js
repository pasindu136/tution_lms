import { supabase } from '@/lib/supabaseClient';
import { getCurrentUser } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(req) {
    const user = await getCurrentUser();

    if (!user || user.role !== 'admin') {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    try {
        const { id, action } = await req.json(); // action: 'approve', 'suspend', 'unsuspend'

        let updateData = {};
        if (action === 'approve') updateData = { is_approved: true };
        if (action === 'suspend') updateData = { is_suspended: true };
        if (action === 'unsuspend') updateData = { is_suspended: false };

        const { error } = await supabase
            .from('user_approvals')
            .update(updateData)
            .eq('id', id);

        if (error) throw error;

        return NextResponse.json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Update user error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
