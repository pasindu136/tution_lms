import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Youtube, Instagram, ArrowRight, BookOpen, GraduationCap, PlayCircle, Star, CheckCircle, Sparkles } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

export default function Home() {
    return (
        <div className="min-h-screen bg-[#fafcff] dark:bg-[#030712] font-sans selection:bg-blue-500/30 overflow-x-hidden">
            
            {/* Ambient Background Elements */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 dark:bg-blue-600/10 blur-[120px]" />
                <div className="absolute top-[20%] right-[-5%] w-[30%] h-[40%] rounded-full bg-purple-600/20 dark:bg-purple-600/10 blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[20%] w-[35%] h-[40%] rounded-full bg-cyan-500/20 dark:bg-cyan-500/10 blur-[120px]" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
            </div>

            {/* 1. Header / Menu Bar */}
            <header className="fixed top-0 w-full z-50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3 relative group cursor-pointer">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20 group-hover:scale-105 transition-transform duration-300">
                            <GraduationCap size={28} strokeWidth={1.5} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-none group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                APEX <span className="text-blue-600 dark:text-blue-500 font-light">Institute</span>
                            </h1>
                            <p className="text-[10px] uppercase font-bold text-slate-500 tracking-[0.2em] mt-0.5">Education Center</p>
                        </div>
                    </div>

                    <nav className="hidden md:flex items-center gap-10">
                        {['Home', 'Classes', 'Results', 'Contact'].map((item) => (
                            <Link key={item} href="#" className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full">
                                {item}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-5">
                        <ThemeToggle />
                        <Link href="/login" className="hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold shadow-lg shadow-slate-900/10 dark:shadow-white/10 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                            LMS Login <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </header>

            {/* 2. Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
                        <div className="space-y-10">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-slate-900/60 border border-blue-100 dark:border-blue-900/50 backdrop-blur-md text-blue-700 dark:text-blue-300 rounded-full text-sm font-bold shadow-sm">
                                <Sparkles className="w-4 h-4 text-amber-500" />
                                2026 Advanced Level Enrollments Open
                            </div>

                            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 dark:text-white leading-[1.05] tracking-tight">
                                Master Your <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600">
                                    Future Today.
                                </span>
                            </h1>

                            <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed font-medium">
                                Join the most trusted tuition class in Sri Lanka. Experience simplified theory, targeted revision, and guaranteed results tailored for focused students.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-5">
                                <Link href="/register" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-600/30 hover:shadow-blue-600/40 hover:-translate-y-1 transition-all text-center flex items-center justify-center gap-2 text-lg">
                                    Join Now <ArrowRight size={20} />
                                </Link>
                                <Link href="/login" className="px-8 py-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm text-slate-900 dark:text-white border border-slate-200/50 dark:border-slate-700/50 rounded-2xl font-bold hover:bg-white dark:hover:bg-slate-800 transition-all text-center flex items-center justify-center gap-3 text-lg group">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <PlayCircle size={18} className="text-slate-900 dark:text-white" />
                                    </div>
                                    Watch Free Lessons
                                </Link>
                            </div>

                            <div className="flex items-center gap-6 pt-8 border-t border-slate-200/50 dark:border-slate-800/50">
                                <div className="flex -space-x-4">
                                    {[
                                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop',
                                        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop',
                                        'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=100&auto=format&fit=crop',
                                        'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=100&auto=format&fit=crop'
                                    ].map((url, i) => (
                                        <img key={i} src={url} alt="Student" className="w-12 h-12 rounded-full border-2 border-white dark:border-slate-950 object-cover" />
                                    ))}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-extrabold text-slate-900 dark:text-white text-lg">1000+ Students</p>
                                        <div className="flex text-amber-500 gap-0.5">
                                            <Star size={16} fill="currentColor" />
                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Trusted by top achievers</p>
                                </div>
                            </div>
                        </div>

                        {/* Hero Image Group */}
                        <div className="relative mx-auto lg:ml-auto w-full max-w-lg lg:max-w-full">
                            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-900/20 border-8 border-white dark:border-slate-900/80 bg-slate-100 dark:bg-slate-800 transition-transform duration-700 hover:scale-[1.02]">
                                <img
                                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop"
                                    alt="Tuition Master"
                                    className="w-full h-auto object-cover aspect-[4/5] lg:aspect-[3/4]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                                
                                {/* Floating Card - Name Tag */}
                                <div className="absolute bottom-6 left-6 right-6 bg-white/10 dark:bg-slate-900/30 backdrop-blur-xl border border-white/20 p-6 rounded-2xl text-white">
                                    <h3 className="text-2xl font-bold mb-1">Mr. Kasun Perera</h3>
                                    <p className="text-sm font-medium text-white/80 mb-4">B.Sc. (Hons) University of Colombo</p>
                                    <div className="flex items-center gap-3">
                                        <span className="px-3 py-1 bg-white/20 rounded-lg text-xs font-bold text-white">Physics</span>
                                        <span className="px-3 py-1 bg-white/20 rounded-lg text-xs font-bold text-white">10+ Years Exp.</span>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Element - Live Banner */}
                            <div className="absolute top-10 -left-8 lg:-left-12 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-100 dark:border-slate-700 flex items-center gap-4 animate-bounce" style={{animationDuration: '3s'}}>
                                <div className="relative flex h-4 w-4">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Live Now</p>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">2026 A/L Physics</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Features Area */}
            <section className="py-24 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-6">Why Choose <span className="text-blue-600">APEX?</span></h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">We provide a state-of-the-art learning environment with advanced digital facilities to ensure your ultimate success.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-lg border border-slate-200/50 dark:border-slate-800/50 p-10 rounded-[2rem] shadow-xl shadow-slate-200/20 dark:shadow-none hover:-translate-y-2 transition-transform duration-300 group">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                                <BookOpen size={32} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Complete Syllabus</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                Comprehensive coverage of the entire curriculum with detailed tutes, smart notes, and practical examples tailored for exams.
                            </p>
                        </div>
                        {/* Card 2 */}
                        <div className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-lg border border-slate-200/50 dark:border-slate-800/50 p-10 rounded-[2rem] shadow-xl shadow-slate-200/20 dark:shadow-none hover:-translate-y-2 transition-transform duration-300 group">
                            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                                <CheckCircle size={32} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Targeted Revision</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                Special revision sessions focusing on past papers, model questions, and time management to boost exam confidence.
                            </p>
                        </div>
                        {/* Card 3 */}
                        <div className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-lg border border-slate-200/50 dark:border-slate-800/50 p-10 rounded-[2rem] shadow-xl shadow-slate-200/20 dark:shadow-none hover:-translate-y-2 transition-transform duration-300 group">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform">
                                <PlayCircle size={32} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Premium LMS</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                Missed a class? Watch high-quality 4K recordings anytime, anywhere through our secure and exclusive student portal.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Footer */}
            <footer className="bg-white dark:bg-slate-950 border-t border-slate-200/50 dark:border-slate-800/50 pt-20 pb-10 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-x-12 gap-y-16 mb-16">
                        <div className="col-span-2">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center text-white">
                                    <GraduationCap size={22} strokeWidth={2} />
                                </div>
                                <span className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">APEX Institute</span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 max-w-md mb-8 leading-relaxed font-medium">
                                Empowering the next generation of Sri Lankan leaders through high-quality education, advanced technology, and discipline.
                            </p>
                            <div className="flex gap-4">
                                <a href="#" className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/5 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm"><Facebook size={20} /></a>
                                <a href="#" className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/5 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all shadow-sm"><Youtube size={20} /></a>
                                <a href="#" className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/5 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-pink-600 hover:text-white hover:border-pink-600 transition-all shadow-sm"><Instagram size={20} /></a>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white mb-6 text-lg">Quick Links</h4>
                            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400 font-medium">
                                <li><Link href="#" className="hover:text-blue-600 transition-colors">Our Classes</Link></li>
                                <li><Link href="#" className="hover:text-blue-600 transition-colors">Class Timetable</Link></li>
                                <li><Link href="#" className="hover:text-blue-600 transition-colors">Student Results</Link></li>
                                <li><Link href="/login" className="hover:text-blue-600 transition-colors">LMS Login Portal</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white mb-6 text-lg">Contact Us</h4>
                            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400 font-medium">
                                <li className="flex items-center gap-4"><div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-blue-600 shrink-0"><Phone size={18} /></div> 077 123 4567</li>
                                <li className="flex items-center gap-4"><div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-blue-600 shrink-0"><Mail size={18} /></div> info@apextution.lk</li>
                                <li className="flex items-start gap-4"><div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-blue-600 shrink-0"><MapPin size={18} /></div> <span className="pt-2">No. 123, Main Street, Gampaha</span></li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-slate-200/50 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm font-medium text-slate-500">© {new Date().getFullYear()} APEX Institute. All rights reserved.</p>
                        <p className="text-sm font-medium text-slate-500 flex items-center gap-1">Designed by <span className="text-blue-600 font-bold">BITSYNC</span></p>
                    </div>
                </div>
            </footer>

        </div>
    );
}

