import React from 'react';
import { useLocation } from 'react-router-dom';
import { Check, Building2, UserCircle, FileText, ChevronRight } from 'lucide-react';
import type { RegistrationStep, StepConfig } from '../../types/wrapper.types';

interface Props {
    children: React.ReactNode;
}

export const RegistrationWrapper: React.FC<Props> = ({ children }) => {

    const STEPS: StepConfig[] = [
        { id: 'company', label: 'Company Profile', description: 'Entity Details', path: '/create-company' },
        { id: 'user', label: 'User Account', description: 'Admin Setup', path: '/create-user' },
        { id: 'lease', label: 'Lease Assets', description: 'Initial Portfolio', path: '/create-lease' },
    ];
    const location = useLocation();

    // 1. Check if we are on the Home Page
    const isHomePage = location.pathname === '/';

    // 2. If it is the home page, just return the content as-is
    if (isHomePage) {
        return <>{children}</>;
    }
    // Determine current index based on path
    const currentIndex = STEPS.findIndex(step => location.pathname.includes(step.id)) || 0;
    const progressPercentage = ((currentIndex + 1) / STEPS.length) * 100;

    return (
        <div className="min-h-[90vh] bg-[#F8FAFC]">
            {/* PROGRESS OVERLAY - STICKY BELOW HEADER */}
            <div className="sticky top-[65px] z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">

                    {/* MOBILE PROGRESS (Simple bar) */}
                    <div className="lg:hidden">
                        <div className="flex justify-between items-end mb-2">
                            <div>
                                <p className="text-[10px] font-black text-[#003399] uppercase tracking-widest">Step {currentIndex + 1} of 3</p>
                                <h2 className="text-lg font-bold text-slate-900">{STEPS[currentIndex].label}</h2>
                            </div>
                            <span className="text-sm font-bold text-slate-400">{Math.round(progressPercentage)}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#003399] transition-all duration-500 ease-out"
                                style={{ width: `${progressPercentage}%` }}
                            />
                        </div>
                    </div>

                    {/* DESKTOP PROGRESS (Step Tracker) */}
                    <div className="hidden lg:flex items-center justify-between">
                        {STEPS.map((step, index) => {
                            const isCompleted = currentIndex > index;
                            const isActive = currentIndex === index;

                            return (
                                <React.Fragment key={step.id}>
                                    <div className={`flex items-center gap-4 transition-all duration-300 ${isActive ? 'opacity-100 scale-105' : 'opacity-50'}`}>
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all
                                                ${isCompleted ? 'bg-emerald-500 border-emerald-500 text-white' :
                                                isActive ? 'border-[#003399] text-[#003399] shadow-lg shadow-blue-100' :
                                                    'border-slate-200 text-slate-400'}`}
                                        >
                                            {isCompleted ? <Check size={20} strokeWidth={3} /> : <StepIcon id={step.id} />}
                                        </div>
                                        <div>
                                            <p className={`text-[10px] font-black uppercase tracking-widest leading-none mb-1 
                                                    ${isActive ? 'text-[#003399]' : 'text-slate-400'}`}>
                                                Step 0{index + 1}
                                            </p>
                                            <p className="text-sm font-bold text-slate-900">{step.label}</p>
                                        </div>
                                    </div>
                                    {index < STEPS.length - 1 && (
                                        <ChevronRight className="text-slate-300" size={20} />
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* PAGE CONTENT */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

// Helper to render specific icons
const StepIcon = ({ id }: { id: RegistrationStep }) => {
    switch (id) {
        case 'company': return <Building2 size={22} />;
        case 'user': return <UserCircle size={22} />;
        case 'lease': return <FileText size={22} />;
    }
};