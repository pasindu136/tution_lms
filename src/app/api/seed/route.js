import { supabase } from '@/lib/supabaseClient';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Check if admin exists
        const { data: users, error: fetchError } = await supabase
            .from('users')
            .select('*')
            .eq('email', 'admin@school.com');

        if (fetchError) throw fetchError;

        if (users && users.length > 0) {
            return NextResponse.json({ message: 'Admin user already exists.' });
        }

        // Hash passwords
        const adminPass = await bcrypt.hash('admin123', 10);
        const studentPass = await bcrypt.hash('student123', 10);

        // Insert Users
        const { error: insertError } = await supabase
            .from('users')
            .insert([
                { name: 'Admin Teacher', email: 'admin@school.com', phone: '0771234567', role: 'admin', password: adminPass },
                { name: 'John Student', email: 'student@school.com', phone: '0711111111', role: 'student', password: studentPass }
            ]);

        if (insertError) throw insertError;

        return NextResponse.json({
            message: 'Database seeded successfully with Supabase!',
            admin: { email: 'admin@school.com', password: 'admin123' },
            student: { email: 'student@school.com', password: 'student123' }
        });
    } catch (error) {
        console.error('Seeding error:', error);
        return NextResponse.json({ message: 'Error seeding database', error: error.message }, { status: 500 });
    }
}
