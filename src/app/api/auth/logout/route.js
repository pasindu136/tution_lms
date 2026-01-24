import { NextResponse } from 'next/server';

export async function POST() {
    const response = NextResponse.json({ message: 'Logged out successfully' });

    response.cookies.set('token', '', {
        httpOnly: true,
        expires: new Date(0), // Set expiration to past date to delete
        path: '/',
    });

    return response;
}
