import Link from 'next/link';
import { Trophy, ArrowRight, GraduationCap, Phone, CheckCircle2, Zap, Shield } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

export default function Home() {
    return (
        <main className="min-h-screen relative overflow-hidden flex flex-col font-sans selection:bg-blue-500/30">

            {/* Background Decoration (Adaptive) */}
            <div className="absolute inset-0 -z-10 bg-base overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900/10 dark:to-transparent opacity-70"></div>

                {/* Blobs */}
                <div className="absolute top-[10%] left-[10%] w-96 h-96 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-[100px] animate-blob mix-blend-multiply dark:mix-blend-screen"></div>
                <div className="absolute top-[20%] right-[10%] w-96 h-96 bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-[100px] animate-blob animation-delay-2000 mix-blend-multiply dark:mix-blend-screen"></div>

                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
            </div>

            {/* Navbar */}
            <nav className="w-full glass z-50 fixed top-0">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/20">
                            <GraduationCap className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <span className="block text-xl font-bold text-base-content tracking-tight leading-none">
                                APEX <span className="text-blue-600 dark:text-blue-500">Institute</span>
                            </span>
                            <span className="text-[10px] text-muted uppercase tracking-widest font-bold">
                                Excellence Redefined
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <Link href="/login" className="px-6 py-2.5 rounded-full text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 transition-all hover:scale-105 flex items-center gap-2">
                            LMS Login <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="flex-1 flex items-center justify-center pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

                    <div className="space-y-8 relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-base shadow-sm text-sm text-blue-600 dark:text-blue-400 font-semibold animate-fade-in-up">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            Admissions Open for 2026 Batch
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight text-base-content tracking-tight">
                            Smart Education <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                                For Everyone
                            </span>
                        </h1>

                        <p className="text-lg text-muted max-w-xl leading-relaxed">
                            The simplest, fastest, and most effective way to prepare for your A/L & O/L exams. Experience clean, distraction-free learning designed for results.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-2">
                            <Link href="/register" className="px-8 py-4 rounded-2xl bg-base-content text-surface font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2 dark:bg-white dark:text-slate-900 invert-0">
                                Join For Free
                            </Link>
                            <Link href="/login" className="px-8 py-4 rounded-2xl bg-surface border border-base text-base-content font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center gap-2 shadow-sm">
                                View Courses
                            </Link>
                        </div>

                        <div className="grid grid-cols-3 gap-6 pt-8 border-t border-base">
                            <div>
                                <h3 className="text-3xl font-bold text-base-content">500+</h3>
                                <p className="text-sm text-muted font-medium">Free Lessons</p>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-base-content">24/7</h3>
                                <p className="text-sm text-muted font-medium">Online Access</p>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-base-content">10k+</h3>
                                <p className="text-sm text-muted font-medium">Students</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative hidden lg:block">
                        <div className="relative glass-card p-2 rounded-3xl transform rotate-2 hover:rotate-0 transition-duration-500 shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2670&auto=format&fit=crop"
                                alt="Sri Lankan Students"
                                className="rounded-2xl w-full object-cover aspect-[4/5] filter contrast-105"
                            />

                            {/* Cards floating */}
                            <div className="absolute top-12 -left-12 glass-card p-4 rounded-2xl flex items-center gap-4 animate-bounce shadow-xl bg-white/80 dark:bg-slate-800/80">
                                <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl">
                                    <Trophy className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                                </div>
                                <div>
                                    <p className="font-bold text-base-content">Island Rank 1</p>
                                    <p className="text-xs text-muted">Target Excellence</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Features Simple Grid */}
            <section className="py-24 bg-surface">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16 max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold text-base-content mb-4">Why Tution.LK?</h2>
                        <p className="text-muted text-lg">Simple. Fast. Effective. Everything you need without the clutter.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: Zap, title: "Lightning Fast", desc: "Optimized for low bandwidth connections across Sri Lanka.", color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-900/10" },
                            { icon: CheckCircle2, title: "Clear Curriculum", desc: "Structured lessons that cover the entire local syllabus.", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/10" },
                            { icon: Shield, title: "Secure Platform", desc: "Your data and progress are always safe with us.", color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/10" },
                        ].map((feature, i) => (
                            <div key={i} className="p-8 rounded-3xl bg-base border border-base hover:shadow-lg transition-all">
                                <div className={`p-4 rounded-2xl w-fit mb-6 ${feature.bg} ${feature.color}`}>
                                    <feature.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-base-content mb-3">{feature.title}</h3>
                                <p className="text-muted leading-relaxed">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Simple Footer */}
            <footer className="py-12 border-t border-base bg-base">
                <div className="max-w-5xl mx-auto px-6 flex flex-col items-center gap-6 text-center">
                    <div className="flex items-center gap-2 font-bold text-2xl text-base-content">
                        <GraduationCap className="w-6 h-6 text-blue-600" />
                        APEX Institute
                    </div>

                    <div className="flex gap-6 text-sm text-muted font-medium">
                        <Link href="#" className="hover:text-blue-500">Terms</Link>
                        <Link href="#" className="hover:text-blue-500">Privacy</Link>
                        <Link href="#" className="hover:text-blue-500">Contact</Link>
                    </div>

                    <p className="text-muted text-sm border-t border-base pt-6 w-full max-w-md">
                        © {new Date().getFullYear()} All rights reserved. Made for SL Students.
                    </p>
                </div>
            </footer>
        </main>
    );
}
