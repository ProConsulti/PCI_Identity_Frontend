import React, { useState, useEffect } from 'react';
import { ShieldCheck, Zap } from 'lucide-react';

interface SetupOverlayProps {
    isLoading: boolean;
}

const SetupOverlay: React.FC<SetupOverlayProps> = ({ isLoading }) => {
    const [progress, setProgress] = useState(0);
    const [statusIndex, setStatusIndex] = useState(0);

    const statuses = [
        "Encrypting credentials...",
        "Securing database entry...",
        "Initializing workspace...",
        "Finalizing account..."
    ];

    useEffect(() => {
        if (!isLoading) {
            setProgress(0);
            setStatusIndex(0);
            return;
        }

        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 98) return prev;
                // Slower progress as it nears 100% to wait for API
                const increment = prev > 80 ? 0.5 : 2;
                return prev + increment;
            });
        }, 100);

        const statusInterval = setInterval(() => {
            setStatusIndex(prev => (prev < statuses.length - 1 ? prev + 1 : prev));
        }, 1500);

        return () => {
            clearInterval(progressInterval);
            clearInterval(statusInterval);
        };
    }, [isLoading]);

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 overflow-hidden">
            {/* Backdrop with frosted glass effect */}
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-500" />

            {/* Modal Card */}
            <div className="relative bg-white w-full max-w-md rounded-[2.5rem] p-8 md:p-12 shadow-2xl text-center space-y-8 animate-in zoom-in-95 duration-300">

                {/* Animated Shield Icon */}
                <div className="relative w-24 h-24 mx-auto">
                    <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-25" />
                    <div className="relative bg-[#003399] w-24 h-24 rounded-full flex items-center justify-center text-white shadow-xl">
                        <ShieldCheck size={48} className="animate-pulse" />
                    </div>
                </div>

                <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Setting up account</h3>
                    <p className="text-slate-500 text-sm font-medium">Please wait while we prepare your environment.</p>
                </div>

                {/* Progress Bar Container */}
                <div className="space-y-4">
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-100 shadow-inner">
                        <div
                            className="h-full bg-gradient-to-r from-[#003399] to-blue-500 transition-all duration-300 ease-out relative"
                            style={{ width: `${progress}%` }}
                        >
                            {/* Shimmer Effect */}
                            <div className="absolute inset-0 w-full h-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                style={{ backgroundSize: '200% 100%' }} />
                        </div>
                    </div>

                    {/* Status Label */}
                    <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-[0.15em]">
                        <span className="text-slate-400 animate-pulse">{statuses[statusIndex]}</span>
                        <span className="text-[#003399] font-black">{Math.round(progress)}%</span>
                    </div>
                </div>

                {/* Footer Note */}
                <div className="pt-2 flex items-center justify-center gap-2 text-slate-300 text-[10px] font-black uppercase">
                    <Zap size={12} className="text-amber-400" />
                    Enterprise Security Active
                </div>
            </div>
        </div>
    );
};

export default SetupOverlay;