import Link from 'next/link';
import { BookOpen, ShieldCheck, PlayCircle, Star, Users, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Home() {
    return (
        <main className="min-h-screen relative overflow-hidden flex flex-col">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-emerald-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-32 left-20 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            {/* Navbar */}
            <nav className="w-full glass z-50 fixed top-0">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-gradient-to-tr from-blue-600 to-emerald-500 rounded-lg">
                            <BookOpen className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                            LMS Portal
                        </span>
                    </div>
                    <div className="flex gap-4">
                        <Link href="/register" className="px-5 py-2.5 rounded-full text-sm font-medium text-slate-300 hover:text-white transition-colors">
                            Register
                        </Link>
                        <Link href="/login" className="px-5 py-2.5 rounded-full text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 transition-all hover:scale-105 flex items-center gap-2">
                            Sign In <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="flex-1 flex items-center justify-center pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-emerald-400 font-medium animate-fade-in">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            New Platform V2.0 Live
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                            Master Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-400">
                                Future Today
                            </span>
                        </h1>

                        <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
                            Access premium educational content in a secure, distraction-free environment.
                            Your personal gateway to academic excellence starts here.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link href="/login" className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 transition-all hover:-translate-y-1 flex items-center gap-2">
                                <PlayCircle className="w-5 h-5 white" />
                                Start Learning Now
                            </Link>
                            <button className="px-8 py-4 rounded-xl glass text-white font-semibold hover:bg-slate-800/50 transition-all flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                                Verify Certificate
                            </button>
                        </div>

                        <div className="pt-8 flex items-center gap-8 text-slate-500 text-sm font-medium">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-blue-500" />
                                <span>Secure HD Video</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-blue-500" />
                                <span>24/7 Access</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-blue-500" />
                                <span>Device Protection</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative hidden lg:block">
                        <div className="absolute inset-0 bg-blue-500 blur-[100px] opacity-20 rounded-full"></div>
                        <div className="relative glass p-6 rounded-2xl border-slate-700/50 transform rotate-2 hover:rotate-0 transition-all duration-500 hover:scale-[1.02] bg-slate-900/40">
                            <div className="absolute -top-6 -right-6 glass p-4 rounded-xl flex items-center gap-3 animate-bounce">
                                <div className="p-2 bg-yellow-500/20 rounded-lg">
                                    <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                                </div>
                                <div>
                                    <p className="font-bold text-white">4.9/5</p>
                                    <p className="text-xs text-slate-400">Student Rating</p>
                                </div>
                            </div>

                            <div className="rounded-xl overflow-hidden shadow-2xl border border-slate-700">
                                <img
                                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2670&auto=format&fit=crop"
                                    alt="Education Platform"
                                    className="w-full h-full object-cover opacity-80"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>

                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="glass p-4 rounded-xl flex items-center gap-4">
                                        <div className="p-3 bg-blue-500 rounded-full">
                                            <PlayCircle className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-white">Continue Watching</p>
                                            <p className="text-sm text-slate-400">Advanced Mathematics - Week 04</p>
                                        </div>
                                        <div className="ml-auto text-emerald-400 font-bold">85%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 bg-slate-950/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Why Students Love Us</h2>
                        <p className="text-slate-400">Everything you need to succeed in your studies</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: ShieldCheck, title: "Secure Learning", desc: "Advanced protection for your study materials and personal data.", color: "text-emerald-400" },
                            { icon: PlayCircle, title: "HD Video Player", desc: "No buffering, adaptive quality streaming for seamless learning.", color: "text-blue-400" },
                            { icon: Users, title: "Expert Support", desc: "Direct access to teacher resources and guidance.", color: "text-purple-400" },
                        ].map((feature, i) => (
                            <div key={i} className="glass-card p-8 rounded-2xl hover:bg-slate-800/40">
                                <div className={`p-4 rounded-xl bg-slate-900/50 w-fit mb-6 ${feature.color}`}>
                                    <feature.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-slate-400 leading-relaxed text-sm">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 border-t border-slate-800/50 text-center text-slate-500 text-sm">
                <p>© {new Date().getFullYear()} LMS Platform. All rights reserved.</p>
            </footer>
        </main>
    );
}
