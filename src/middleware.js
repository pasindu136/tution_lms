import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    // Paths that are always accessible
    const publicPaths = ['/login', '/', '/api/auth/login', '/register'];
    if (publicPaths.includes(pathname)) {
        // If user is already logged in and tries to visit login, redirect to appropriate dashboard
        if (token && pathname === '/login') {
            try {
                const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key-change-this');
                const { payload } = await jwtVerify(token, secret);

                if (payload.role === 'admin' || payload.role === 'teacher') {
                    return NextResponse.redirect(new URL('/dashboard', request.url));
                } else {
                    return NextResponse.redirect(new URL('/student/videos', request.url));
                }
            } catch (err) {
                // Token invalid, allow access to login
            }
        }
        return NextResponse.next();
    }

    // Protect other routes
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key-change-this');
        const { payload } = await jwtVerify(token, secret);

        // Role based protection
        if (pathname.startsWith('/dashboard') && !['admin', 'teacher'].includes(payload.role)) {
            return NextResponse.redirect(new URL('/student/videos', request.url));
        }

        if (pathname.startsWith('/student') && payload.role !== 'student') {
            // Teachers typically might want to see student view too, but for strictness:
            // return NextResponse.redirect(new URL('/dashboard', request.url));
        }

        const requestHeaders = new Headers(request.headers);
        requestHeaders.set('x-user-id', payload.userId);
        requestHeaders.set('x-user-role', payload.role);

        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });

    } catch (err) {
        console.error('Middleware auth error:', err);
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
