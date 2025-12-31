import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowRight, Mail, AlertCircle, Zap, ShieldCheck, ArrowLeft
} from 'lucide-react';
import { registrationService } from '../../../services/registrationService';
import { useAppDispatch } from '../../../store/hooks';
import { setUserEmail } from '../../../store/registrationSlice';
import InputGroup from '../../../components/InputGroup';
import { validateEmail } from '../../../utils/emailValidator';

const OtpVerificationPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [currentStep, setCurrentStep] = useState<'email' | 'verify'>('email');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState<string | null>(null);
    const [otp, setOtp] = useState('');
    const [otpTimer, setOtpTimer] = useState(300); // 5 minutes
    const otpTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Countdown timer for OTP
    useEffect(() => {
        if (currentStep === 'verify' && otpTimer > 0) {
            otpTimerRef.current = setTimeout(() => {
                setOtpTimer(otpTimer - 1);
            }, 1000);
        } else if (otpTimer === 0 && currentStep === 'verify') {
            setError('OTP expired. Please request a new one.');
        }

        return () => {
            if (otpTimerRef.current) {
                clearTimeout(otpTimerRef.current);
            }
        };
    }, [otpTimer, currentStep]);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setEmail(value);

        // Validate email on change
        const validation = validateEmail(value);
        setEmailError(validation.error);
    };

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Validate email before submission
        const emailValidation = validateEmail(email);
        if (!emailValidation.isValid) {
            setError(emailValidation.error);
            setLoading(false);
            return;
        }

        try {
            await registrationService.sendOtp(email);
            setCurrentStep('verify');
            setOtpTimer(300); // Reset timer
        } catch (err: any) {
            setError(err.message || 'Failed to send OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (otp.length !== 6) {
            setError('Please enter a 6-digit OTP');
            setLoading(false);
            return;
        }

        try {
            const response = await registrationService.verifyOtp(email, otp);
            if (response.success) {
                // Store verified email in Redux
                dispatch(setUserEmail(email));
                // Navigate to company creation
                navigate('/create-company');
            } else {
                setError('Invalid OTP. Please try again.');
            }
        } catch (err: any) {
            setError(err.message || 'Failed to verify OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleBackToEmail = () => {
        setCurrentStep('email');
        setOtp('');
        setError(null);
        if (otpTimerRef.current) {
            clearTimeout(otpTimerRef.current);
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex items-center justify-center bg-slate-50/50 py-12 px-4">
            <div className="max-w-xl w-full">
                <form onSubmit={currentStep === 'email' ? handleSendOtp : handleVerifyOtp} className="space-y-6">
                    {/* Step Indicator */}
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <div className="flex items-center gap-4 flex-1 max-w-md">
                            <div className="flex flex-col items-center flex-1">
                                <div className={`w-10 h-10 rounded-full font-black text-sm flex items-center justify-center transition-all ${currentStep === 'email' || currentStep === 'verify' ? 'bg-[#003399] text-white' : 'bg-slate-100 text-slate-400'}`}>
                                    1
                                </div>
                                <p className="text-[10px] font-bold text-slate-500 mt-2 uppercase">Email</p>
                            </div>
                            <div className={`flex-1 h-1 rounded-full transition-all ${currentStep === 'verify' ? 'bg-[#003399]' : 'bg-slate-200'}`} />
                            <div className="flex flex-col items-center flex-1">
                                <div className={`w-10 h-10 rounded-full font-black text-sm flex items-center justify-center transition-all ${currentStep === 'verify' ? 'bg-[#003399] text-white' : 'bg-slate-100 text-slate-400'}`}>
                                    2
                                </div>
                                <p className="text-[10px] font-bold text-slate-500 mt-2 uppercase">Verify</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-blue-900/5 p-8 md:p-10">

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-700 rounded-2xl text-sm font-bold flex items-center gap-3">
                                <Zap size={18} className="fill-red-700" />
                                {error}
                            </div>
                        )}

                        {currentStep === 'email' ? (
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 mb-8">
                                    <Mail size={28} className="text-[#003399]" />
                                    <div>
                                        <h1 className="text-2xl font-black text-slate-900">Email Verification</h1>
                                        <p className="text-sm text-slate-500">Enter your email to get started</p>
                                    </div>
                                </div>

                                <div>
                                    <InputGroup
                                        label="Email Address"
                                        name="email"
                                        type="email"
                                        value={email}
                                        onChange={handleEmailChange}
                                        required
                                        placeholder="admin@company.com"
                                    />
                                    {emailError && (
                                        <div className="mt-3 p-3 bg-red-50 border border-red-100 rounded-xl flex items-start gap-2">
                                            <AlertCircle size={16} className="text-red-600 mt-0.5 shrink-0" />
                                            <p className="text-xs font-bold text-red-700">{emailError}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-8 flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <Mail size={18} className="text-[#003399] mt-0.5 shrink-0" />
                                    <p className="text-[12px] text-slate-500 leading-relaxed">
                                        We'll send a one-time password (OTP) to verify your email address.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 mb-8">
                                    <AlertCircle size={28} className="text-[#003399]" />
                                    <div>
                                        <h1 className="text-2xl font-black text-slate-900">Verify OTP</h1>
                                        <p className="text-sm text-slate-500">Check your email for the code</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider ml-1">
                                        6-Digit Code
                                    </label>
                                    <input
                                        type="text"
                                        value={otp}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                                            setOtp(value);
                                        }}
                                        maxLength={6}
                                        placeholder="000000"
                                        className="w-full px-4 py-3 text-center text-2xl font-bold tracking-widest border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-700"
                                    />
                                </div>

                                <div className="mt-4 flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <p className="text-xs font-bold text-slate-600">Code expires in:</p>
                                    <p className={`text-lg font-black ${otpTimer < 60 ? 'text-red-600' : 'text-[#003399]'}`}>
                                        {formatTime(otpTimer)}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleBackToEmail}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-bold text-[#003399] hover:text-[#002266] transition-colors"
                                >
                                    <ArrowLeft size={16} />
                                    Back to Email
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading || (currentStep === 'email' ? (!email || !!emailError) : (otp.length !== 6))}
                        className="cursor-pointer w-full bg-[#003399] hover:bg-[#002266] disabled:opacity-50 disabled:grayscale text-white py-5 rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 shadow-2xl shadow-blue-900/20 transition-all active:scale-[0.98] group"
                    >
                        {loading ? (currentStep === 'email' ? "Sending OTP..." : "Verifying...") : (currentStep === 'email' ? "Send Code" : "Verify & Continue")}
                        <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="flex items-center justify-center gap-2 text-slate-400">
                        <ShieldCheck size={16} />
                        <span className="text-[11px] font-bold uppercase tracking-widest">Enterprise-Grade Security</span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OtpVerificationPage;
