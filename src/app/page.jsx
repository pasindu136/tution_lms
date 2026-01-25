import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Youtube, Instagram, ArrowRight, BookOpen, GraduationCap, PlayCircle, Star, CheckCircle } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

export default function Home() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 font-sans transition-colors duration-300">

            {/* 1. Header / Menu Bar */}
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-100 dark:border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                            <GraduationCap size={24} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-slate-900 dark:text-white leading-none">APEX <span className="text-blue-600">Institute</span></h1>
                            <p className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">Education Center</p>
                        </div>
                    </div>

                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="#" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
                        <Link href="#" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Classes</Link>
                        <Link href="#" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Results</Link>
                        <Link href="#" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <Link href="/login" className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold hover:opacity-90 transition-all">
                            LMS Login <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </header>

            {/* 2. Hero Section */}
            <section className="relative pt-12 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                        <div className="space-y-8 animate-fade-in-up">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold">
                                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                                2026 Advanced Level Enrollments Open
                            </div>

                            <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-[1.1]">
                                Master Your <br />
                                <span className="text-blue-600">Future Today.</span>
                            </h1>

                            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed">
                                Join the most trusted tuition class in Sri Lanka. Simplified theory, targeted revision, and guaranteed results for focused students.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/register" className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 hover:-translate-y-1 transition-transform text-center">
                                    Join Now
                                </Link>
                                <Link href="/login" className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-center flex items-center justify-center gap-2">
                                    <PlayCircle size={20} /> Watch Free Lessons
                                </Link>
                            </div>

                            <div className="flex items-center gap-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                                <div className="flex -space-x-4">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-800" />
                                    ))}
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900 dark:text-white">1000+ Students</p>
                                    <div className="flex text-yellow-500 gap-0.5" size={12}>
                                        <Star size={14} fill="currentColor" />
                                        <Star size={14} fill="currentColor" />
                                        <Star size={14} fill="currentColor" />
                                        <Star size={14} fill="currentColor" />
                                        <Star size={14} fill="currentColor" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Hero Image */}
                        <div className="relative mx-auto lg:ml-auto w-full max-w-md lg:max-w-full">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 rotate-2 hover:rotate-0 transition-transform duration-500">
                                <img
                                    src="/tution_master.png"
                                    alt="Tuition Master"
                                    className="w-full h-auto object-cover"
                                />

                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-24 text-white">
                                    <p className="text-xl font-bold">Mr. Kasun Perera</p>
                                    <p className="text-sm opacity-80">B.Sc. (Hons) University of Colombo</p>
                                </div>
                            </div>
                            {/* Decorative Blob */}
                            <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
                            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Features Area */}
            <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Why Choose Us?</h2>
                        <p className="text-slate-600 dark:text-slate-400">We provide the best learning environment with advanced facilities to ensure your success.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                                <BookOpen size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Complete Syllabus</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Comprehensive coverage of the entire curriculum with detailed tutes and practical examples.
                            </p>
                        </div>
                        {/* Card 2 */}
                        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                                <CheckCircle size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Targeted Revision</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Special revision sessions focusing on past papers and model questions to boost exam confidence.
                            </p>
                        </div>
                        {/* Card 3 */}
                        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                                <PlayCircle size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">LMS Recordings</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Missed a class? Watch high-quality recordings anytime through our secure LMS portal.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Footer */}
            <footer className="bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900 pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-12 mb-12">
                        <div className="col-span-2">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white">
                                    <GraduationCap size={18} />
                                </div>
                                <span className="text-xl font-bold text-slate-900 dark:text-white">APEX Institute</span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-6">
                                Empowering the next generation of Sri Lankan leaders through quality education and discipline.
                            </p>
                            <div className="flex gap-4">
                                <a href="#" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-blue-600 hover:text-white transition-colors"><Facebook size={20} /></a>
                                <a href="#" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-red-600 hover:text-white transition-colors"><Youtube size={20} /></a>
                                <a href="#" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-pink-600 hover:text-white transition-colors"><Instagram size={20} /></a>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white mb-4">Quick Links</h4>
                            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                                <li><Link href="#" className="hover:text-blue-600">Classes</Link></li>
                                <li><Link href="#" className="hover:text-blue-600">Timetable</Link></li>
                                <li><Link href="#" className="hover:text-blue-600">Downloads</Link></li>
                                <li><Link href="/login" className="hover:text-blue-600">LMS Login</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white mb-4">Contact Us</h4>
                            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                                <li className="flex items-center gap-3"><Phone size={16} /> 077 123 4567</li>
                                <li className="flex items-center gap-3"><Mail size={16} /> info@apextution.lk</li>
                                <li className="flex items-center gap-3"><MapPin size={16} /> No. 123, Main Street, Gampaha</li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-slate-100 dark:border-slate-900 text-center">
                        <p className="text-sm text-slate-500">© {new Date().getFullYear()} APEX Institute. All rights reserved.</p>
                    </div>
                </div>
            </footer>

        </div>
    );
}
