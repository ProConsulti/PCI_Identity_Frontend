import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import InputGroup from '../../../components/InputGroup';
import { validatePassword } from '../../../utils/passwordValidator';
import { useAppSelector } from '../../../store/hooks';
import { forgotPasswordService } from '../../../services/forgotPasswordService';

const NewPasswordPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Form State
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    
    // Status State
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    
    // Validation State
    const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
    const [passwordMatchError, setPasswordMatchError] = useState<string | null>(null);

    const reduxEmail = useAppSelector((state) => state.registration.userEmail);
    const emailFromState = (location.state as any)?.email as string | undefined;
    const email = emailFromState || reduxEmail;

    // Real-time Validation Logic
    useEffect(() => {
        if (password) {
            const validation = validatePassword(password);
            setPasswordErrors(validation.errors || []);
        } else {
            setPasswordErrors([]);
        }

        if (confirm && password !== confirm) {
            setPasswordMatchError('Passwords do not match');
        } else {
            setPasswordMatchError(null);
        }
    }, [password, confirm]);

    const isPasswordValid = password && passwordErrors.length === 0;
    const isConfirmValid = confirm && !passwordMatchError;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isPasswordValid || !isConfirmValid) return;

        setError(null);
        if (!email) {
            setError('Missing email. Please restart the forgot-password flow.');
            return;
        }

        try {
            setLoading(true);
            await forgotPasswordService.updatePassword({ email, password });
            setSuccess(true);
        } catch (err: any) {
            setError(err?.message || 'Failed to update password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="flex items-center justify-center bg-slate-50/50 py-12 px-4 min-h-[60vh]">
                <div className="max-w-xl w-full">
                    <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-blue-900/5 p-8 md:p-10 text-center">
                        <div className="flex items-center justify-center mb-6">
                            <CheckCircle size={48} className="text-emerald-500" />
                        </div>
                        <h1 className="text-2xl font-black text-slate-900 mb-2">Password Updated</h1>
                        <p className="text-sm text-slate-500 mb-8">Your password has been updated successfully. You can now sign in with your new credentials.</p>
                        <button
                            className="w-full bg-[#003399] hover:bg-[#002266] text-white py-4 rounded-2xl font-black transition-all"
                            onClick={() => navigate('https://ifrs16.ifrs.ca/')}
                        >
                            Go to Sign in
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center bg-slate-50/50 py-12 px-4">
            <div className="max-w-xl w-full">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-blue-900/5 p-8 md:p-10">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-[#003399]">
                                <ShieldCheck size={28} />
                            </div>
                            <div>
                                <h1 className="text-2xl font-black text-slate-900">Set New Password</h1>
                                <p className="text-sm text-slate-400">Choose a strong password for your account</p>
                            </div>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-700 rounded-2xl text-sm font-bold flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                                <AlertCircle size={20} />
                                {error}
                            </div>
                        )}

                        <div className="space-y-5">
                            <InputGroup
                                label="New password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Enter new password"
                            />

                            {/* Password Requirements List */}
                            {password && passwordErrors.length > 0 && (
                                <div className="p-4 bg-red-50 border border-red-100 rounded-2xl animate-in fade-in zoom-in-95">
                                    <p className="text-xs font-black text-red-700 uppercase tracking-wider mb-2">Requirements:</p>
                                    <ul className="space-y-1">
                                        {passwordErrors.map((err, idx) => (
                                            <li key={idx} className="text-xs text-red-600 flex items-start gap-2">
                                                <span className="mt-0.5">•</span> {err}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {isPasswordValid && (
                                <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-2 animate-in fade-in zoom-in-95">
                                    <CheckCircle size={16} className="text-emerald-600" />
                                    <p className="text-xs font-bold text-emerald-700 uppercase">Strong Password</p>
                                </div>
                            )}

                            <InputGroup
                                label="Confirm password"
                                name="confirm"
                                type="password"
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                                required
                                placeholder="Confirm new password"
                            />

                            {/* Match Validation Message */}
                            {confirm && (
                                <div className={`p-3 border rounded-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-1 ${
                                    passwordMatchError ? 'bg-red-50 border-red-100' : 'bg-emerald-50 border-emerald-100'
                                }`}>
                                    {passwordMatchError ? (
                                        <>
                                            <AlertCircle size={16} className="text-red-600" />
                                            <p className="text-xs font-bold text-red-700">{passwordMatchError}</p>
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle size={16} className="text-emerald-600" />
                                            <p className="text-xs font-bold text-emerald-700 uppercase">Passwords match</p>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !isPasswordValid || !isConfirmValid}
                        className="w-full bg-[#003399] hover:bg-[#002266] disabled:opacity-50 disabled:grayscale text-white py-5 rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 shadow-2xl transition-all active:scale-[0.98]"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : 'Set New Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewPasswordPage;