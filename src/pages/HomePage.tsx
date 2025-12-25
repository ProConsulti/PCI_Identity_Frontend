import { Link } from 'react-router-dom';
import {
    Building2, Users, FileText, UploadCloud,
    Calculator, Edit3, PieChart, ShieldCheck, RefreshCw, ArrowRight, CheckCircle2,
    ChevronRight,
    Zap
} from 'lucide-react';

export const HomePage = () => {
    const features = [
        {
            title: 'Bulk Lease Import',
            description: 'Import multiple leases simultaneously from Excel or CSV files, saving hours of manual data entry.',
            icon: UploadCloud,
            color: 'bg-blue-50 text-blue-600',
        },
        {
            title: 'Automated Calculations',
            description: 'Accurate computation of lease liabilities, ROU assets, interest, and amortization schedules.',
            icon: Calculator,
            color: 'bg-emerald-50 text-emerald-600',
        },
        {
            title: 'Lease Modifications',
            description: 'Easily handle renewals and terminations with automatic recalculation.',
            icon: Edit3,
            color: 'bg-purple-50 text-purple-600',
        },
        {
            title: 'Comprehensive Reporting',
            description: 'Generate standard and custom reports for financial statements and management review.',
            icon: PieChart,
            color: 'bg-orange-50 text-orange-600',
        },
        {
            title: 'Audit Trail',
            description: 'Complete transaction history with user stamps for full transparency and compliance.',
            icon: ShieldCheck,
            color: 'bg-indigo-50 text-indigo-600',
        },
        {
            title: 'Periodic Processing',
            description: 'Automated month-end and year-end processing with reversal capabilities.',
            icon: RefreshCw,
            color: 'bg-pink-50 text-pink-600',
        },
    ];

    const steps = [
        {
            number: '01',
            title: 'Register Company',
            description: 'Establish your legal entity and financial reporting parameters.',
            path: '/create-company',
            icon: Building2,
            color: 'border-blue-200 bg-blue-50 text-blue-600',
            cta: 'Setup Company'
        },
        {
            number: '02',
            title: 'Onboard Users',
            description: 'Assign roles to your accounting team and auditors.',
            path: '/create-company',
            icon: Users,
            color: 'border-emerald-200 bg-emerald-50 text-emerald-600',
            cta: 'Add Team'
        }
        // {
        //     number: '03',
        //     title: 'Initialize Leases',
        //     description: 'Enter your first lease or use bulk import to go live.',
        //     path: '/create-company',
        //     icon: FileText,
        //     color: 'border-purple-200 bg-purple-50 text-purple-600',
        //     cta: 'Create Lease'
        // }
    ];

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans">

            {/* --- HERO SECTION (Mobile Responsive) --- */}
            <section className="w-full border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white pt-16 pb-12 md:pt-24 md:pb-20 px-4 md:px-6">
                <div className="max-w-[1440px] mx-auto flex flex-col items-center text-center">
                    {/* Badge: Adjusted padding and text for mobile */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs md:text-sm font-semibold mb-6 md:mb-8">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                        IFRS 16 Compliance Made Simple
                    </div>

                    {/* Title: Scaled from 3xl on mobile to 7xl on desktop */}
                    <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight mb-6 md:mb-8 leading-tight">
                        Precision Lease Management <br className="hidden sm:block" />
                        <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-4 md:underline-offset-8">
                            for Modern Finance.
                        </span>
                    </h1>

                    {/* Description: Balanced line length for mobile */}
                    <p className="text-base md:text-xl text-slate-600 max-w-3xl mb-10 md:mb-12 leading-relaxed">
                        Automate your IFRS 16 workflows, eliminate manual errors, and generate
                        audit-ready reports in seconds with PCI Identity Management.
                    </p>

                    {/* CTA: Full width on smallest screens */}
                    <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-4">
                        <Link
                            to="/create-company"
                            className="w-full sm:w-auto px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold transition-all shadow-xl shadow-indigo-200 text-center"
                        >
                            Start for Free
                        </Link>
                    </div>
                </div>
            </section>

            {/* --- GUIDED WORKFLOW (Mobile Responsive) --- */}
            <section className="w-full py-16 md:py-20 px-4 md:px-6 border-y border-slate-100 bg-white">
                <div className="max-w-[1440px] mx-auto">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-xs md:text-sm font-bold text-indigo-600 uppercase tracking-[0.2em] mb-3">
                            Onboarding Flow
                        </h2>
                        <h3 className="text-3xl md:text-4xl font-bold text-slate-900">
                            Follow the Path to Compliance
                        </h3>
                    </div>

                    {/* Grid: Stacks on mobile, 3 columns on desktop */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 relative">

                        {steps.map((step, idx) => (
                            <div key={idx} className="relative z-10 flex flex-col items-center group">
                                {/* Icon Box: Slightly smaller on mobile */}
                                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl border-2 ${step.color} flex items-center justify-center mb-6 md:mb-8 transition-transform group-hover:-translate-y-2 duration-300 shadow-sm bg-white`}>
                                    <step.icon size={28} className="md:w-9 md:h-9" />
                                </div>

                                <div className="text-center bg-white px-2 md:px-4">
                                    <span className="text-indigo-600 font-mono font-bold text-sm mb-2 block">
                                        {step.number}
                                    </span>
                                    <h4 className="text-xl md:text-2xl font-bold mb-3 text-slate-900">
                                        {step.title}
                                    </h4>
                                    <p className="text-sm md:text-base text-slate-500 mb-6 md:mb-8 max-w-[260px] md:max-w-[280px] mx-auto leading-relaxed">
                                        {step.description}
                                    </p>

                                    {/* CTA Link: Larger touch target */}
                                    <Link
                                        to={step.path}
                                        className="inline-flex items-center gap-2 font-bold text-slate-900 hover:text-indigo-600 transition-colors group py-2"
                                    >
                                        <span>{step.cta}</span>
                                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CORE CAPABILITIES (Mobile Responsive) --- */}
            <section className="w-full py-16 md:py-24 px-4 md:px-6 bg-white">
                <div className="max-w-6xl mx-auto">

                    {/* Header Section: Centered on mobile, spread out on desktop */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-4 md:gap-6">
                        <div className="max-w-2xl">
                            <h2 className="text-indigo-600 font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-3">
                                Capabilities
                            </h2>
                            <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
                                Advanced IFRS 16 Toolset
                            </h3>
                        </div>
                        <p className="text-slate-500 text-base md:text-lg md:text-right max-w-sm leading-relaxed">
                            Purpose-built features designed to handle complex lease portfolios with 100% accuracy.
                        </p>
                    </div>

                    {/* Feature Grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {features.map((f, i) => (
                            <div
                                key={i}
                                className="group p-6 md:p-8 bg-white border border-slate-100 rounded-2xl md:rounded-[2rem] hover:shadow-xl hover:shadow-indigo-50 hover:border-indigo-100 transition-all duration-300"
                            >
                                {/* Icon Container: Slightly smaller on mobile */}
                                <div className={`${f.color} w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center mb-5 md:mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                                    <f.icon size={24} className="md:w-7 md:h-7" />
                                </div>

                                <h4 className="text-lg md:text-xl font-bold text-slate-900 mb-2 md:mb-3 group-hover:text-indigo-600 transition-colors">
                                    {f.title}
                                </h4>

                                <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                                    {f.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>



            {/* --- QUICK ACTIONS SECTION (Mobile Responsive) --- */}
            <section className="w-full py-12 md:py-24 px-4 md:px-6 bg-slate-50">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-white rounded-3xl md:rounded-[3rem] p-6 md:p-16 border border-slate-200 shadow-sm overflow-hidden relative">

                        {/* Container: Stacks on mobile (1 col), side-by-side on lg screens (2 cols) */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start lg:items-center">

                            {/* Left Side: Navigation Links */}
                            <div className="w-full">
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 md:mb-6">
                                    Management Portal
                                </h2>
                                <p className="text-slate-600 text-base md:text-lg mb-8 md:mb-10">
                                    Select an action below to manage your organizational structure or lease inventory.
                                </p>

                                <div className="space-y-3 md:space-y-4">
                                    {[
                                        { title: 'Company Creation', path: '/create-company', icon: Building2, desc: 'Setup legal entities' },
                                        { title: 'User Management', path: '/create-user', icon: Users, desc: 'Assign roles & permissions' },
                                        { title: 'Lease Repository', path: '/create-lease', icon: FileText, desc: 'Access lease agreements' }
                                    ].map((item) => (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            className="flex items-center p-4 md:p-5 rounded-2xl border border-slate-100 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all group"
                                        >
                                            {/* Responsive Icon: Smaller on mobile */}
                                            <div className="bg-slate-900 p-2.5 md:p-3 rounded-xl mr-4 md:mr-5 group-hover:bg-indigo-600 transition-colors shrink-0">
                                                <item.icon size={20} className="text-white md:w-6 md:h-6" />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <h4 className="font-bold text-slate-900 text-sm md:text-base truncate">{item.title}</h4>
                                                <p className="text-xs md:text-sm text-slate-500 truncate">{item.desc}</p>
                                            </div>

                                            <ArrowRight size={18} className="ml-2 text-slate-300 group-hover:text-indigo-600 transition-transform group-hover:translate-x-1 shrink-0" />
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Right Side: Checklist Card (Dark Indigo) */}
                            <div className="bg-indigo-600 rounded-2xl md:rounded-3xl p-6 md:p-10 text-white shadow-xl">
                                <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 flex items-center gap-2">
                                    <Zap size={20} className="text-indigo-300" />
                                    Implementation Steps
                                </h3>

                                <div className="space-y-4 md:space-y-6">
                                    {[
                                        'Onboard your primary company entity',
                                        'Define user access levels and hierarchy',
                                        'Configure reporting periods & currency',
                                        'Upload your lease portfolio via Bulk Import'
                                    ].map((step, idx) => (
                                        <div key={idx} className="flex gap-3 md:gap-4 items-start">
                                            <CheckCircle2 className="text-indigo-300 mt-1 flex-shrink-0 w-5 h-5 md:w-6 md:h-6" />
                                            <p className="text-indigo-50 text-sm md:text-lg leading-snug">{step}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Testimonial Box: Subtle hiding on very small screens or reducing padding */}
                                <div className="mt-8 md:mt-12 p-4 md:p-6 bg-indigo-500/30 rounded-xl md:rounded-2xl border border-indigo-400/30">
                                    <p className="text-xs md:text-sm italic opacity-90 leading-relaxed">
                                        "This tool reduced our month-end closing time by 40% and simplified our audit process significantly."
                                    </p>
                                    <p className="text-xs md:text-sm font-bold mt-3 text-indigo-200">— Lead Controller, PCI Corp</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            {/* --- FOOTER --- */}
            <footer className="w-full py-12 px-6 border-t border-slate-100">
                <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2 font-bold text-slate-900">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg"></div>
                        ProConsult Internation
                    </div>
                    <p className="text-slate-500 text-sm">
                        © 2025 PCI Management. All standards compliant with IFRS 16 / ASC 842.
                    </p>
                    {/* <div className="flex gap-6 text-sm font-medium text-slate-600">
                        <a href="#" className="hover:text-indigo-600 transition">Privacy Policy</a>
                        <a href="#" className="hover:text-indigo-600 transition">Terms of Service</a>
                    </div> */}
                </div>
            </footer>
        </div>
    );
};

export default HomePage;