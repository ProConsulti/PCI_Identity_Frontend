import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    CheckCircle2,
    PartyPopper,
    Building2,
    UserCheck,
    ExternalLink
} from 'lucide-react';
import getApiBaseUrl from '../config/domain.config';

interface SuccessOverlayProps {
    isOpen: boolean;
    onClose?: () => void;
}

const SuccessOverlay: React.FC<SuccessOverlayProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const baseUrl = getApiBaseUrl()
    // LOCK SCROLL: Ensures the user cannot scroll the page behind the popup
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            // Scroll to top to ensure overlay is centered in viewport
            window.scrollTo(0, 0);
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleRedirect = () => {
        // Close the overlay
        onClose?.();
        // Open the IFRS link in a new tab
        window.open(`${baseUrl.ifrsService}/`, '_blank');
        // Navigate current window to home
        navigate('/');
    };

    return (
        /* Increased z-index to 9999 to ensure it covers the Header/Navbar */
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6 overflow-hidden">

            {/* BACKDROP: High-quality blur and dark tint */}
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-700" />

            {/* MODAL CONTAINER: Matching the rounded aesthetic from your image */}
            <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-[0_32px_64px_-15px_rgba(0,0,0,0.5)] animate-in zoom-in-95 slide-in-from-bottom-12 duration-500">

                {/* Subtle Decorative Gradient */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-emerald-50/50 to-transparent pointer-events-none" />

                <div className="relative p-8 md:p-14 text-center">

                    {/* SUCCESS ICON: Styled to match image_24d8e6.png */}
                    <div className="relative w-28 h-28 mx-auto mb-8">
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-emerald-400/20 rounded-full animate-pulse blur-xl" />
                        <div className="relative bg-white border-[10px] border-emerald-50 w-28 h-28 rounded-full flex items-center justify-center text-emerald-500 shadow-inner">
                            <CheckCircle2 size={64} strokeWidth={2.5} />
                        </div>
                    </div>

                    {/* CONTENT SECTION */}
                    <div className="space-y-4 mb-10">
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                            Setup Complete
                        </h2>
                        <p className="text-slate-500 font-medium text-sm md:text-base leading-relaxed max-w-sm mx-auto">
                            Your account and company credentials have been successfully provisioned. You are ready to access your dashboard.
                        </p>
                    </div>

                    {/* STATUS CARDS: Grid layout for Company & Admin */}
                    <div className="grid grid-cols-2 gap-4 mb-10">
                        <div className="bg-[#F8FAFC] p-6 rounded-3xl border border-slate-100 flex flex-col items-center gap-3">
                            <div className="w-12 h-12 bg-blue-50 text-[#003399] rounded-2xl flex items-center justify-center shadow-sm">
                                <Building2 size={24} />
                            </div>
                            <div className="text-center">
                                <span className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Company</span>
                                <span className="text-xs font-bold text-slate-800">ACTIVE</span>
                            </div>
                        </div>
                        <div className="bg-[#F8FAFC] p-6 rounded-3xl border border-slate-100 flex flex-col items-center gap-3">
                            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-sm">
                                <UserCheck size={24} />
                            </div>
                            <div className="text-center">
                                <span className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Admin</span>
                                <span className="text-xs font-bold text-slate-800">VERIFIED</span>
                            </div>
                        </div>
                    </div>

                    {/* ACTION SECTION */}
                    <div className="space-y-6">
                        <button
                            onClick={handleRedirect}
                            className="cursor-pointer w-full bg-[#003399] hover:bg-[#002b80] text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-blue-900/30 group"
                        >
                            Continue to Login
                            <ExternalLink size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>

                        <div className="flex items-center justify-center gap-4 text-slate-300">
                            <div className="h-[1px] w-12 bg-slate-200" />
                            <p className="text-[11px] font-black uppercase tracking-[0.3em] flex items-center gap-2 text-slate-400">
                                <PartyPopper size={14} className="text-amber-500" />
                                Welcome Aboard
                            </p>
                            <div className="h-[1px] w-12 bg-slate-200" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuccessOverlay;