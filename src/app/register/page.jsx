'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, User, Phone, Loader2, ArrowRight, CheckCircle2, GraduationCap } from 'lucide-react';
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
    const [focusedField, setFocusedField] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
            });

            if (authError) throw authError;

            if (authData.user) {
                const { error: dbError } = await supabase
                    .from('user_approvals')
                    .insert([{
                        user_id: authData.user.id,
                        email: formData.email,
                        name: formData.name,
                        phone: formData.phone,
                        is_approved: false
                    }]);

                if (dbError) throw new Error('Failed to create profile.');
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
            <div className="min-h-screen flex items-center justify-center bg-[#020617] relative overflow-hidden font-sans">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse"></div>
                </div>
                <div className="w-full max-w-sm bg-[#0f172a]/60 backdrop-blur-xl p-8 rounded-[2rem] border border-emerald-500/20 shadow-2xl text-center animate-[fade-in-up_0.5s_ease-out] relative z-10 ring-1 ring-emerald-500/10">
                    <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                        <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Registration Successful!</h2>
                    <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                        Your account is pending approval. You will be able to login once verified.
                    </p>
                    <Link href="/login" className="w-full inline-flex items-center justify-center px-6 py-4 rounded-xl bg-[#1e293b] border border-white/5 hover:bg-[#2d3b55] hover:border-white/10 text-white font-bold transition-all hover:scale-105 shadow-lg">
                        Back to Login
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#020617] relative overflow-hidden font-sans selection:bg-blue-500/30">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
            </div>

            <div className="w-full max-w-md p-6 relative z-10 animate-fade-in-up">

                {/* Top Logo Area */}
                <div className="text-center mb-10">
                    <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
                        <div className="p-3.5 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-xl shadow-blue-900/40 text-white transform group-hover:scale-105 transition-all duration-300 ring-1 ring-white/10">
                            <GraduationCap className="w-8 h-8" />
                        </div>
                    </Link>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Create Account</h1>
                    <p className="text-slate-400 mt-2 text-sm font-medium">Join the APEX community today</p>
                </div>

                {/* Card Container */}
                <div className="bg-[#0f172a]/60 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] shadow-2xl ring-1 ring-white/5">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium flex items-center gap-2 animate-pulse">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                {error}
                            </div>
                        )}

                        <InputField
                            label="Full Name"
                            icon={User}
                            type="text"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={v => setFormData({ ...formData, name: v })}
                            focusKey="name"
                            currentFocus={focusedField}
                            setFocus={setFocusedField}
                        />

                        <InputField
                            label="Phone Number"
                            icon={Phone}
                            type="text"
                            placeholder="07X XXXXXXX"
                            value={formData.phone}
                            onChange={v => setFormData({ ...formData, phone: v })}
                            focusKey="phone"
                            currentFocus={focusedField}
                            setFocus={setFocusedField}
                        />

                        <InputField
                            label="Email Address"
                            icon={Mail}
                            type="email"
                            placeholder="student@example.com"
                            value={formData.email}
                            onChange={v => setFormData({ ...formData, email: v })}
                            focusKey="email"
                            currentFocus={focusedField}
                            setFocus={setFocusedField}
                        />

                        <InputField
                            label="Password"
                            icon={Lock}
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={v => setFormData({ ...formData, password: v })}
                            focusKey="password"
                            currentFocus={focusedField}
                            setFocus={setFocusedField}
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full relative overflow-hidden group rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-4 font-bold text-white shadow-xl shadow-blue-900/20 transition-all hover:scale-[1.02] hover:shadow-blue-900/40 disabled:opacity-70 disabled:cursor-not-allowed mt-4 border border-white/10"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            <div className="relative flex items-center justify-center gap-2">
                                {loading ? <Loader2 className="animate-spin h-5 w-5" /> : (
                                    <>
                                        Sign Up <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </div>
                        </button>
                    </form>
                </div>

                {/* Footer Links */}
                <div className="text-center mt-8">
                    <p className="text-slate-400 text-sm">
                        Already have an account? <Link href="/login" className="font-bold text-blue-400 hover:text-blue-300 transition-colors">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

function InputField({ label, icon: Icon, type, placeholder, value, onChange, focusKey, currentFocus, setFocus }) {
    const isFocused = currentFocus === focusKey;
    return (
        <div className="space-y-1.5">
            <label className={`block text-[11px] font-bold uppercase tracking-wider transition-colors duration-300 ml-1 ${isFocused ? 'text-blue-400' : 'text-slate-500'}`}>{label}</label>
            <div className="relative group">
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-sm transition-opacity duration-300 ${isFocused ? 'opacity-100' : 'opacity-0'}`}></div>
                <div className="relative">
                    <Icon className={`absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors duration-300 ${isFocused ? 'text-blue-400' : 'text-slate-500'}`} />
                    <input
                        type={type}
                        required
                        className={`w-full rounded-xl border bg-[#1e293b]/50 p-3.5 pl-11 text-white text-sm outline-none transition-all duration-300 placeholder:text-slate-600
                            ${isFocused
                                ? 'border-blue-500/50 bg-[#1e293b] shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                                : 'border-white/5 hover:border-white/10 hover:bg-[#1e293b]/80'
                            }`}
                        placeholder={placeholder}
                        value={value || ''}
                        onChange={(e) => onChange(e.target.value)}
                        onFocus={() => setFocus(focusKey)}
                        onBlur={() => setFocus(null)}
                    />
                </div>
            </div>
        </div>
    );
}
