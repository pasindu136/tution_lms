import { supabase } from '@/lib/supabaseClient';
import { getCurrentUser } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function DELETE(req, { params }) {
    const user = await getCurrentUser();
    
    // Role check
    if (!user || user.role !== 'admin') {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    try {
        const { id } = await params;
        
        if (!id) {
            return NextResponse.json({ message: 'Video ID is required' }, { status: 400 });
        }

        const { error } = await supabase
            .from('pack_videos')
            .delete()
            .eq('id', id);

        if (error) throw error;

        return NextResponse.json({ message: 'Video deleted successfully' });
    } catch (error) {
        console.error('Delete video error:', error);
        return NextResponse.json({ message: 'Error deleting video' }, { status: 500 });
    }
}
