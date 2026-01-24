'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, User, Phone, Loader2, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // 1. Sign Up/Register in Supabase Auth
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
            });

            if (authError) throw authError;

            if (authData.user) {
                // 2. Create Entry in Approvals Table
                const { error: dbError } = await supabase
                    .from('user_approvals')
                    .insert([
                        {
                            user_id: authData.user.id,
                            email: formData.email,
                            name: formData.name,
                            phone: formData.phone,
                            is_approved: false // Default to pending
                        }
                    ]);

                if (dbError) {
                    // Cleanup auth user if db fails (optional but good practice)
                    console.error(dbError);
                    throw new Error('Failed to create profile. Please try again.');
                }

                setSuccess(true);
            }

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
                <div className="w-full max-w-md bg-slate-800 p-8 rounded-2xl border border-slate-700 text-center">
                    <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail className="w-8 h-8 text-emerald-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Registration Successful!</h2>
                    <p className="text-slate-400 mb-6">
                        Your account has been created and is pending approval from the administrator.
                        Please wait for confirmation.
                    </p>
                    <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium">
                        Back to Login
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-900 p-4">
            <div className="w-full max-w-md space-y-8 rounded-2xl bg-slate-800 p-8 shadow-xl border border-slate-700">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white">Create Account</h1>
                    <p className="mt-2 text-slate-400">Join our learning community</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-500 text-center border border-red-500/20">
                            {error}
                        </div>
                    )}

                    <div className="relative">
                        <User className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Full Name"
                            required
                            className="w-full rounded-lg border border-slate-600 bg-slate-900/50 p-3 pl-10 text-white focus:border-blue-500 focus:outline-none"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div className="relative">
                        <Phone className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Phone Number"
                            required
                            className="w-full rounded-lg border border-slate-600 bg-slate-900/50 p-3 pl-10 text-white focus:border-blue-500 focus:outline-none"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>

                    <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
                        <input
                            type="email"
                            placeholder="Email Address"
                            required
                            className="w-full rounded-lg border border-slate-600 bg-slate-900/50 p-3 pl-10 text-white focus:border-blue-500 focus:outline-none"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-500" />
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            className="w-full rounded-lg border border-slate-600 bg-slate-900/50 p-3 pl-10 text-white focus:border-blue-500 focus:outline-none"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 p-3 font-semibold text-white shadow-lg hover:from-blue-500 hover:to-blue-400 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Create Account'}
                    </button>
                </form>

                <div className="text-center text-sm text-slate-500">
                    <p>Already have an account? <Link href="/login" className="text-blue-400 hover:underline">Sign In</Link></p>
                </div>
            </div>
        </div>
    );
}
