import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Building2, Users, FileText, UploadCloud,
    Calculator, Edit3, PieChart, ShieldCheck, RefreshCw, ArrowRight, CheckCircle2,
    Zap, Mail, Phone, MapPin, Linkedin, Twitter,
    Youtube,
    PhoneCall
} from 'lucide-react';
import HeroSection from '../components/HeroSection';
import ceo from '../assets/umer.jpg';
import partner from '../assets/basit.jpg';
import abhiLogo from '../assets/AbhiMicrofinanceBankLogo.png';
import roshanLogo from '../assets/RoshanLogo.png';

export const HomePage = () => {
    const [activeSlide, setActiveSlide] = useState(0);

    const testimonials = [
        {
            quote: "We built Lease Master because we saw CFOs struggling with manual IFRS 16 errors that cost millions in audit adjustments. Our mission is to automate the complexity.",
            author: "Umar Daraz FCA",
            role: "Founder, Senior Partner & CEO",
            avatar: ceo
        },
        {
            quote: "Compliance doesn’t have to be a month-end nightmare. Our platform transforms a time-intensive process into a one-minute, error-free automated task.",
            author: "Abdul Basit FCA",
            role: "Partner & COO",
            avatar: partner
        }
    ];

    const features = [
        { title: 'Bulk Lease Import', description: 'Import multiple leases simultaneously from Excel or CSV files.', icon: UploadCloud, color: 'bg-blue-50 text-blue-600' },
        { title: 'Automated Calculations', description: 'Accurate computation of liabilities, ROU assets, and amortization.', icon: Calculator, color: 'bg-emerald-50 text-emerald-600' },
        { title: 'Lease Modifications', description: 'Easily handle renewals and terminations with automatic recalculation.', icon: Edit3, color: 'bg-purple-50 text-purple-600' },
        { title: 'Comprehensive Reporting', description: 'Generate standard and custom reports for financial statements.', icon: PieChart, color: 'bg-orange-50 text-orange-600' },
        { title: 'Audit Trail', description: 'Complete transaction history with user stamps for full transparency.', icon: ShieldCheck, color: 'bg-indigo-50 text-indigo-600' },
        { title: 'Real-Time Processing', description: 'Automated month-end and year-end processing.', icon: RefreshCw, color: 'bg-pink-50 text-pink-600' },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100">
            {/* --- 1. HERO SECTION --- */}
            <HeroSection />
            {/* --- 2. TRUSTED CLIENTS --- */}
            <section className="py-12 border-y border-slate-100 bg-white">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8">Trusted by Global Entities</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-100 transition-all">
                        <div className="flex flex-col items-center gap-3">
                            <img src={abhiLogo} alt="ABHI Microfinance Bank" className="h-16 w-auto object-contain" />
                            <p className="text-sm font-bold text-slate-600">ABHI MICROFINANCE BANK</p>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                            <img src={roshanLogo} alt="Roshan Telecom" className="h-16 w-auto object-contain" />
                            <p className="text-sm font-bold text-slate-600">ROSHAN TELECOM</p>
                        </div>
                        {/* <div className="text-xl font-black">MMBL</div>
                        <div className="text-xl font-black">UBANK</div>
                        <div className="text-xl font-black">HALAN MICROFINANCE BANK</div>
                        <div className="text-xl font-black">AZIZI BANK</div>
                        <div className="text-xl font-black">MISFA</div> */}
                    </div>
                </div>
            </section>

            {/* --- 3. CORE CAPABILITIES (Features Grid) --- */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div className="max-w-2xl text-left">
                            <h2 className="text-indigo-600 font-bold tracking-widest uppercase text-xs mb-3">Capabilities</h2>
                            <h3 className="text-4xl font-extrabold text-slate-900">Advanced IFRS 16 Toolset</h3>
                        </div>
                        <p className="text-slate-500 text-lg md:text-right max-w-sm">Purpose-built features designed for complex portfolios.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((f, i) => (
                            <div key={i} className="group p-8 bg-white border border-slate-100 rounded-[2rem] hover:shadow-xl transition-all duration-300 hover:border-indigo-100">
                                <div className={`${f.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <f.icon size={28} />
                                </div>
                                <h4 className="text-xl font-bold mb-3">{f.title}</h4>
                                <p className="text-slate-600 text-sm leading-relaxed">{f.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- 4. CREATIVE OWNER COMMENT SLIDER --- */}
            <section className="py-24 bg-slate-50 px-6">
                <div className="max-w-5xl mx-auto relative bg-[#003399] rounded-[3rem] p-12 md:p-24 text-white shadow-2xl overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
                    <div className="relative z-10 min-h-[220px]">
                        {testimonials.map((t, i) => (
                            <div key={i} className={`transition-all duration-700 absolute inset-0 flex flex-col items-center text-center ${i === activeSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
                                <p className="text-xl md:text-2xl font-medium italic mb-10 leading-relaxed">"{t.quote}"</p>
                                <div className="flex items-center gap-4">
                                    <img src={t.avatar} className="w-14 h-14 rounded-full border-2 border-white/20" alt={t.author} />
                                    <div className="text-left">
                                        <h4 className="font-bold">{t.author}</h4>
                                        <p className="text-blue-300 text-xs font-black uppercase">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                        {testimonials.map((_, i) => (
                            <button key={i} onClick={() => setActiveSlide(i)} className={`h-1 rounded-full transition-all ${i === activeSlide ? 'w-8 bg-white' : 'w-2 bg-white/30'}`} />
                        ))}
                    </div>
                </div>
            </section>

            {/* --- 5. QUICK ACTIONS --- */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-6xl mx-auto bg-white rounded-[3rem] p-12 border border-slate-200 shadow-sm grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl font-bold mb-6">Management Portal</h2>
                        <div className="space-y-4">
                            {[
                                { title: 'Company Creation', path: '/verify-email', icon: Building2 },
                                { title: 'User Management', path: '/verify-email', icon: Users },
                                { title: 'Lease Repository', path: '/verify-email', icon: FileText }
                            ].map((item, idx) => (
                                <Link key={idx} to={item.path} className="flex items-center p-5 rounded-2xl border border-slate-100 hover:border-indigo-300 hover:bg-indigo-50 transition-all group">
                                    <div className="bg-slate-900 p-3 rounded-xl mr-5 group-hover:bg-[#003399] transition-colors"><item.icon size={22} className="text-white" /></div>
                                    <h4 className="font-bold flex-1">{item.title}</h4>
                                    <ArrowRight size={18} className="text-slate-300 group-hover:text-[#003399] group-hover:translate-x-1 transition-all" />
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="bg-[#003399] rounded-[2.5rem] p-10 text-white">
                        <h3 className="text-2xl font-bold mb-8 flex items-center gap-2"><Zap className="text-yellow-400" /> Implementation</h3>
                        <div className="space-y-6">
                            {['Verify your email', 'Onboard primary entity', 'Define user hierarchy', 'Bulk import portfolio'].map((step, i) => (
                                <div key={i} className="flex gap-4"><CheckCircle2 className="text-blue-300 shrink-0" /><p className="font-medium">{step}</p></div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 6. FOOTER WITH CONTACT INFO --- */}
            <footer className="bg-slate-900 text-white pt-20 pb-10">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 font-bold text-2xl tracking-tighter">
                            <div className="w-8 h-8 bg-[#003399] rounded-lg" /> ProConsult
                        </div>
                        <p className="text-slate-400 text-sm">Empowering finance teams with precision lease accounting and automated compliance since 2018.</p>
                        <div className="flex gap-4">
                            <a href='https://www.linkedin.com/company/proconsultinternational/?viewAsMember=true' target='_blank'><Linkedin size={20} className="text-slate-400 hover:text-white cursor-pointer" /></a>
                            <a href='https://x.com/ProConsultInt' target='_blank'><Twitter size={20} className="text-slate-400 hover:text-white cursor-pointer" /></a>
                            <a href='https://www.youtube.com/@proconsultinternational' target='_blank'><Youtube size={20} className="text-slate-400 hover:text-white cursor-pointer" /></a>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-black text-xs uppercase tracking-widest text-indigo-400 mb-6">Platform</h4>
                        <ul className="space-y-4 text-slate-400 text-sm font-bold">
                            <li><Link to="/verify-email" className="hover:text-white">Lease Ledger</Link></li>
                            <li><Link to="/verify-email" className="hover:text-white">User Access</Link></li>
                            <li><Link to="#" className="hover:text-white">Reporting</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-black text-xs uppercase tracking-widest text-indigo-400 mb-6">Contact Us</h4>
                        <ul className="space-y-4 text-slate-400 text-sm">
                            <li className="flex items-center gap-3"><Mail size={16} className="text-[#003399]" /> info@proconsulti.com</li>
                            <li className="flex items-center gap-3"><Phone size={16} className="text-[#003399]" /><a href='https://wa.me/923454601887' target='_blank'>Whatsapp +92 345 4601887</a></li>
                            <li className="flex items-center gap-3"><PhoneCall size={16} className="text-[#003399]" />Landline +92 51 8442121</li>

                            <li className="flex items-start gap-3"><MapPin size={16} className="text-[#003399]" />Pakistan | UAE | UK | Saudi Arabia | Afghanistan</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-black text-xs uppercase tracking-widest text-indigo-400 mb-6">Action</h4>
                        <Link to="/verify-email" className="bg-white text-slate-900 px-6 py-4 rounded-xl font-black block text-center hover:bg-indigo-50 transition-all">Get Started Now</Link>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 text-slate-500 text-[10px] font-black uppercase tracking-widest flex justify-between">
                    <p>© 2019-2025 ProConsult International. All rights reserved.</p>
                    <div className="flex gap-6"><a href='https://www.proconsulti.com/privacy-and-policy' target='_blank'>Privacy & Terms</a></div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;