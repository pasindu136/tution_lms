'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, Loader2, ArrowRight, GraduationCap } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [focusedField, setFocusedField] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Login failed');
            }

            if (data.role === 'admin' || data.role === 'teacher') {
                router.push('/dashboard');
            } else {
                router.push('/student/videos');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#020617] relative overflow-hidden font-sans selection:bg-blue-500/30">
            {/* Background Elements - Deep Space Vibe */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
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
                    <h1 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h1>
                    <p className="text-slate-400 mt-2 text-sm font-medium">Please sign in to your dashboard</p>
                </div>

                {/* Card Container - Dark Glass */}
                <div className="bg-[#0f172a]/60 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] shadow-2xl ring-1 ring-white/5">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium flex items-center gap-2 animate-pulse">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
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

                            <div className="space-y-2">
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
                                <div className="flex justify-end">
                                    <Link href="#" className="text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors hover:underline">
                                        Forgot Password?
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full relative overflow-hidden group rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-4 font-bold text-white shadow-xl shadow-blue-900/20 transition-all hover:scale-[1.02] hover:shadow-blue-900/40 disabled:opacity-70 disabled:cursor-not-allowed mt-2 border border-white/10"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            <div className="relative flex items-center justify-center gap-2">
                                {loading ? <Loader2 className="animate-spin h-5 w-5" /> : (
                                    <>
                                        Sign In <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </div>
                        </button>
                    </form>
                </div>

                {/* Footer Links */}
                <div className="text-center mt-8">
                    <p className="text-slate-400 text-sm">
                        Don't have an account? <Link href="/register" className="font-bold text-blue-400 hover:text-blue-300 transition-colors">Create Account</Link>
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
