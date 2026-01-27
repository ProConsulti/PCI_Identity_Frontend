import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowRight, Mail, AlertCircle, Zap, ShieldCheck, ArrowLeft, CheckCircle2
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
    const [success, setSuccess] = useState<string | null>(null);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState<string | null>(null);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [otpTimer, setOtpTimer] = useState(300); // 5 minutes
    const otpTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

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

        const otpValue = otp.join('');
        if (otpValue.length !== 6) {
            setError('Please enter a 6-digit OTP');
            setLoading(false);
            return;
        }

        try {
            const response = await registrationService.verifyOtp(email, otpValue);
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

    const handleOtpChange = (index: number, value: string) => {
        // Only allow digits
        if (value && !/^\d$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            otpInputRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            otpInputRefs.current[index - 1]?.focus();
        }
    };

    const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        const newOtp = [...otp];
        
        for (let i = 0; i < pastedData.length; i++) {
            newOtp[i] = pastedData[i];
        }
        
        setOtp(newOtp);
        
        // Focus the next empty input or the last one
        const nextEmptyIndex = newOtp.findIndex(digit => !digit);
        if (nextEmptyIndex !== -1) {
            otpInputRefs.current[nextEmptyIndex]?.focus();
        } else {
            otpInputRefs.current[5]?.focus();
        }
    };

    const handleResendOtp = async () => {
        try {
            setLoading(true);
            setError(null);
            setSuccess(null);
            await registrationService.sendOtp(email);
            setOtpTimer(300);
            setOtp(['', '', '', '', '', '']);
            setSuccess('OTP resent successfully! Please check your email.');
            otpInputRefs.current[0]?.focus();
            // Clear success message after 5 seconds
            setTimeout(() => setSuccess(null), 5000);
        } catch (err: any) {
            setError(err.message || 'Failed to resend OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleBackToEmail = () => {
        setCurrentStep('email');
        setOtp(['', '', '', '', '', '']);
        setError(null);
        if (otpTimerRef.current) {
            clearTimeout(otpTimerRef.current);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50/50 py-12 px-4">
            <div className="max-w-2xl w-full">
                <form onSubmit={currentStep === 'email' ? handleSendOtp : handleVerifyOtp} className="space-y-6">
                    {/* Step Indicator */}
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <div className="flex items-center gap-4 flex-1 max-w-md">
                            <div className="flex flex-col items-center flex-1">
                                <div className={`w-12 h-12 rounded-full font-black text-base flex items-center justify-center transition-all ${currentStep === 'email' || currentStep === 'verify' ? 'bg-[#003399] text-white' : 'bg-slate-100 text-slate-400'}`}>
                                    1
                                </div>
                                <p className="text-[11px] font-bold text-slate-500 mt-2 uppercase tracking-wider">Email</p>
                            </div>
                            <div className={`flex-1 h-1 rounded-full transition-all ${currentStep === 'verify' ? 'bg-[#003399]' : 'bg-slate-200'}`} />
                            <div className="flex flex-col items-center flex-1">
                                <div className={`w-12 h-12 rounded-full font-black text-base flex items-center justify-center transition-all ${currentStep === 'verify' ? 'bg-[#003399] text-white' : 'bg-slate-100 text-slate-400'}`}>
                                    2
                                </div>
                                <p className="text-[11px] font-bold text-slate-500 mt-2 uppercase tracking-wider">Verify</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-10 md:p-12">

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-700 rounded-2xl text-sm font-bold flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                                <Zap size={18} className="fill-red-700" />
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-2xl text-sm font-bold flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                                <CheckCircle2 size={18} className="text-emerald-700" />
                                {success}
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
                                {/* Header */}
                                <div className="text-center mb-8">
                                    <h1 className="text-3xl font-bold text-slate-900 mb-3">Verify OTP</h1>
                                    <p className="text-sm text-slate-600">
                                        We've sent a verification OTP to
                                    </p>
                                    <p className="text-sm font-medium text-slate-900 mt-1">{email}</p>
                                </div>

                                {/* OTP Input Boxes */}
                                <div>
                                    <label className="text-base font-medium text-slate-700 block text-center mb-6">
                                        Enter 6-digit code
                                    </label>
                                    <div className="flex gap-2 justify-center mb-8">
                                        {otp.map((digit, index) => (
                                            <input
                                                key={index}
                                                ref={(el) => { otpInputRefs.current[index] = el; }}
                                                type="text"
                                                inputMode="numeric"
                                                maxLength={1}
                                                value={digit}
                                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                                onPaste={handleOtpPaste}
                                                className="w-12 h-14 text-center text-xl font-normal border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-[#4285F4] bg-white text-slate-900 transition-all"
                                            />
                                        ))}
                                    </div>

                                    {/* Verify OTP Button */}
                                    <button
                                        type="submit"
                                        disabled={loading || otp.join('').length !== 6}
                                        className="w-full bg-[#003399] hover:bg-[#002266] disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-base shadow-md transition-all mb-4"
                                    >
                                        {loading ? "Verifying..." : "Verify OTP"}
                                    </button>

                                    {/* Resend OTP and Back to Email */}
                                    <div className="flex items-center justify-between">
                                        <button
                                            type="button"
                                            disabled={loading || otpTimer === 0}
                                            onClick={handleResendOtp}
                                            className="text-[#4285F4] font-bold text-sm hover:text-[#357AE8] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            Resend OTP
                                        </button>

                                        <button
                                            type="button"
                                            onClick={handleBackToEmail}
                                            className="inline-flex items-center gap-1 text-slate-600 font-medium text-sm hover:text-slate-900 transition-colors"
                                        >
                                            <ArrowLeft size={16} />
                                            Back to Email
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Email Step Submit Button */}
                    {currentStep === 'email' && (
                        <button
                            type="submit"
                            disabled={loading || !email || !!emailError}
                            className="cursor-pointer w-full bg-[#003399] hover:bg-[#002266] disabled:opacity-50 disabled:grayscale text-white py-5 rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 shadow-2xl shadow-blue-900/20 transition-all active:scale-[0.98] group"
                        >
                            {loading ? "Sending OTP..." : "Send OTP"}
                            <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    )}

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
