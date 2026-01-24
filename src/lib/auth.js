import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

export async function getCurrentUser() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) return null;

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key-change-this');
        const { payload } = await jwtVerify(token, secret);
        return payload; // { userId, role, name, ... }
    } catch (err) {
        return null;
    }
}
