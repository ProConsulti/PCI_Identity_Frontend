import { ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import heroImg from '../assets/ifrs16demo.png';

const IFRSHero = () => {
    const navigate = useNavigate()
    return (
        <section className="relative w-full bg-white overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 z-0 hidden lg:block" />

            <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-y-12 lg:gap-x-4">

                    {/* Left Column: Text Content (Occupies 5 columns) */}
                    <div className="lg:col-span-5 pt-12 pb-12 lg:py-32">
                        <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest mb-6">
                            <span className="w-8 h-[2px] bg-blue-600"></span>
                            IFRS 16 & ASC 842 Certified
                        </div>

                        <h1 className="text-5xl xl:text-6xl font-black text-slate-900 leading-[1.05] tracking-tight">
                            Lease Accounting <br />
                            <span className="text-blue-600">Without the Risk.</span>
                        </h1>

                        <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-lg">
                            Automate complex calculations, handle modifications with ease, and generate audit-ready reports in seconds. Built for accuracy-first finance teams.
                        </p>

                        <div className="mt-8 space-y-3">
                            {['Automated Journal Entries', 'Real-time Disclosure Notes'].map((point) => (
                                <div key={point} className="flex items-center gap-2 text-slate-700 font-medium text-sm">
                                    <CheckCircle2 size={16} className="text-emerald-500" />
                                    {point}
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 flex items-center gap-4">
                            <button onClick={() => navigate("/create-company")} className="cursor-pointer bg-blue-600 text-white px-8 py-4 rounded-lg font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-2">
                                Get Started <ArrowRight size={18} />
                            </button>
                            <button className="bg-white text-slate-700 px-6 py-4 rounded-lg font-bold border border-slate-200 hover:border-blue-400 transition-all">
                                View Reports
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Large Dashboard (Occupies 7 columns) */}
                    <div className="lg:col-span-7 relative lg:pl-4">
                        {/* The "Tight-Gap" Container */}
                        <div className="relative z-20 w-full lg:w-[120%] lg:ml-0 transform lg:translate-x-4">
                            <div className="bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-200 overflow-hidden">
                                {/* Minimalist Header for the Image */}
                                <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                                    </div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                        IFRS 16 Pro Dashboard
                                    </div>
                                </div>

                                {/* THE IMAGE */}
                                <img src={heroImg} alt="IFRS 16 Tool Preview" className="w-full h-auto block object-cover" />
                            </div>

                            {/* Decorative "Float" Element - Visualizing Compliance */}
                            <div className="absolute -bottom-6 -left-12 bg-white p-4 rounded-lg shadow-xl border border-blue-50 hidden xl:flex items-center gap-3">
                                <div className="bg-blue-600 p-2 rounded-md">
                                    <ShieldCheck className="text-white" size={20} />
                                </div>
                                <div>
                                    <div className="text-[10px] text-slate-400 font-bold uppercase">Audit Status</div>
                                    <div className="text-sm font-black text-slate-900 tracking-tight">100% Verified</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default IFRSHero;