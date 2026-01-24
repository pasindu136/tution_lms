import { supabase } from '@/lib/supabaseClient';
import { SignJWT } from 'jose';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
        }

        // 1. Authenticate with Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (authError) {
            console.error('Supabase Auth Error:', authError.message);
            // Return specific error message to help debugging (e.g. "Email not confirmed")
            return NextResponse.json({ message: authError.message }, { status: 401 });
        }

        if (!authData.user) {
            return NextResponse.json({ message: 'User not found' }, { status: 401 });
        }

        // 2. Admin Check
        let role = 'student';
        if (email.toLowerCase() === 'pasindu@gmail.com') {
            role = 'admin';
        }

        // 3. Approval Check (Only for students)
        if (role === 'student') {
            const { data: approvalData, error: approvalError } = await supabase
                .from('user_approvals')
                .select('*')
                .eq('email', email)
                .single();

            if (approvalError || !approvalData) {
                return NextResponse.json({ message: 'Account status unknown. Contact Admin.' }, { status: 403 });
            }

            if (approvalData.is_suspended) {
                return NextResponse.json({ message: 'Your account has been suspended.' }, { status: 403 });
            }

            if (!approvalData.is_approved) {
                return NextResponse.json({ message: 'Your account is pending approval.' }, { status: 403 });
            }
        }

        // 4. Create Custom JWT Token
        let name = email.split('@')[0];
        if (role === 'student') {
            const { data: userData } = await supabase.from('user_approvals').select('name').eq('email', email).single();
            if (userData) name = userData.name;
        } else {
            name = 'Admin';
        }

        const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key-change-this');
        const token = await new SignJWT({
            userId: authData.user.id,
            role: role,
            name: name,
            email: email
        })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('24h')
            .sign(secret);

        // 5. Set Cookie
        const response = NextResponse.json({ message: 'Login successful', role: role });
        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24, // 24 hours
            path: '/',
        });

        return response;
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
