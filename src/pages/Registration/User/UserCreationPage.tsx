import React, { useState, useEffect } from 'react';
import type { DemoLeaseRequest, LeaseSubmitRequest, UserCreateRequest, UserCreateResponse } from '../../../types/api.types';
import { registrationService } from '../../../services/registrationService';
import { leaseService } from '../../../services/leaseService';
import { validatePassword } from '../../../utils/passwordValidator';
import { useAppSelector } from '../../../store/hooks';
import { useOverlay } from '../../../context/OverlayContext';
import InputGroup from '../../../components/InputGroup';
import {
    UserPlus,
    CheckCircle,
    AlertCircle,
    ShieldCheck,
    Zap,
    Lock
} from 'lucide-react';
import LEASE_DEFAULTS from '../../../constants/leaseDefaults';
import { useNavigate } from 'react-router-dom';

export const UserCreationPage = () => {
    const navigate = useNavigate();
    const { companyID, userEmail, currencyID } = useAppSelector((state: any) => state.registration);
    const { setIsLoading, setIsSuccess } = useOverlay();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatchError, setPasswordMatchError] = useState<string | null>(null);
    const doneSection = 'company';

    const [formData, setFormData] = useState<UserCreateRequest>({
        userID: 0,
        username: '',
        passwordHash: '',
        phoneNumber: '',
        userAddress: '',
        email: '',
        companyID: '',
        role: 'Admin',
    });

    // Load context from Redux store
    useEffect(() => {
        if (companyID == null || userEmail == null) navigate("/")
        setFormData(prev => ({
            ...prev,
            companyID: companyID || '',
            email: userEmail || '',
        }));
    }, [companyID, userEmail]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Validate password on change
        if (name === 'passwordHash') {
            const validation = validatePassword(value);
            setPasswordErrors(validation.errors);
            // Check if confirm password matches
            if (confirmPassword && value !== confirmPassword) {
                setPasswordMatchError('Passwords do not match');
            } else if (confirmPassword && value === confirmPassword) {
                setPasswordMatchError(null);
            }
        }
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setConfirmPassword(value);

        // Validate that passwords match
        if (value && formData.passwordHash !== value) {
            setPasswordMatchError('Passwords do not match');
        } else if (value && formData.passwordHash === value) {
            setPasswordMatchError(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setIsLoading(true);
        setError(null);

        // Validate password before submission
        const passwordValidation = validatePassword(formData.passwordHash);
        if (!passwordValidation.isStrong) {
            setError('Please fix password requirements before proceeding');
            setPasswordErrors(passwordValidation.errors);
            setLoading(false);
            setIsLoading(false);
            return;
        }

        // Validate password confirmation
        if (formData.passwordHash !== confirmPassword) {
            setError('Passwords do not match. Please confirm your password.');
            setPasswordMatchError('Passwords do not match');
            setLoading(false);
            setIsLoading(false);
            return;
        }

        try {
            // Create user first
            const userResponse: UserCreateResponse = await registrationService.createUser(formData);

            const demoLeasePayload: DemoLeaseRequest = {
                leaseId: LEASE_DEFAULTS.LEASE_ID,
                leaseName: LEASE_DEFAULTS.LEASE_NAME,
                rental: LEASE_DEFAULTS.RENTAL,
                commencementDate: LEASE_DEFAULTS.COMMENCEMENT_DATE,
                endDate: LEASE_DEFAULTS.END_DATE,
                annuity: LEASE_DEFAULTS.ANNUITY,
                ibr: LEASE_DEFAULTS.IBR,
                frequency: LEASE_DEFAULTS.FREQUENCY,
                assetType: LEASE_DEFAULTS.ASSET_TYPE,
                companyId: companyID?.toString() || formData.companyID,
                currencyId: currencyID || LEASE_DEFAULTS.CURRENCY_ID,
                grv: LEASE_DEFAULTS.GRV,
                idc: LEASE_DEFAULTS.IDC,
                increment: LEASE_DEFAULTS.INCREMENT,
                incrementalFrequency: LEASE_DEFAULTS.INCREMENTAL_FREQUENCY,
                isActive: LEASE_DEFAULTS.IS_ACTIVE,
                lastModifiedDate: LEASE_DEFAULTS.LAST_MODIFIED_DATE,
                userId: userResponse.userID || "0",
                userName: userResponse.username || formData.username,
                isLeaseModified: LEASE_DEFAULTS.IS_LEASE_MODIFIED,
                parentLeaseId: LEASE_DEFAULTS.PARENT_LEASE_ID,
            };

            const leaseSubmitRequest: LeaseSubmitRequest = {
                LeaseData: demoLeasePayload,
                LessorData: null
            }

            // Post the demo lease
            const leaseRes = await leaseService.createDemoLease(leaseSubmitRequest);
            if (leaseRes?.leaseId) {
                // Keep the overlay visible for at least 5 seconds
                setTimeout(() => {
                    setIsSuccess(true);
                    setLoading(false);
                    setIsLoading(false);
                }, 7000);
            } else {
                setLoading(false);
                setIsLoading(false);
            }

        } catch (err: any) {
            setError(err.message || 'Failed to complete registration process');
            setLoading(false);
            setIsLoading(false);
        }
    };

    return (
        <React.Fragment>
            <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
                <main className="flex py-12 px-4 sm:px-6 lg:px-8 grow">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 w-full">

                        {/* LEFT SIDEBAR: ONBOARDING PROGRESS */}
                        <aside className="hidden lg:block lg:col-span-4 space-y-6 sticky top-28 h-fit">
                            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                                <h2 className="text-2xl font-black text-slate-900 mb-2">Admin Setup</h2>
                                <p className="text-slate-500 text-sm mb-8">
                                    Finalize your administrator account to begin managing your company ecosystem.
                                </p>

                                <div className="space-y-4">
                                    {[
                                        { id: 'company', label: 'Company Information', icon: CheckCircle },
                                        { id: 'contact', label: 'User Details', icon: UserPlus },
                                    ].map((step) => (
                                        <div
                                            key={step.id}
                                            className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${doneSection === step.id
                                                ? 'bg-green-50 text-[#2e9900] translate-x-2'
                                                : 'text-slate-700'
                                                }`}
                                        >
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${doneSection === step.id ? 'bg-white shadow-md' : 'bg-slate-50'
                                                }`}>
                                                <step.icon size={20} />
                                            </div>
                                            <span className="font-bold text-sm">{step.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6 bg-[#003399] rounded-[2rem] text-white space-y-3">
                                <ShieldCheck className="text-emerald-400" />
                                <h4 className="font-bold">Encryption Standard</h4>
                                <p className="text-blue-100 text-xs leading-relaxed">
                                    Your password is encrypted using industry-standard hashing before being stored.
                                </p>
                            </div>
                        </aside>

                        {/* RIGHT SIDE: FORM */}
                        <div className="lg:col-span-8 space-y-8">

                            {(error) && (
                                <div className={`p-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 ${error ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                    }`}>
                                    {error ? <AlertCircle size={20} /> : <CheckCircle size={20} />}
                                    <p className="text-sm font-bold">{error || "Account created! Redirecting to login..."}</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-10 pb-24">

                                {/* Section 1: Credentials */}
                                <section id="credentials" className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-200 shadow-sm scroll-mt-24">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                                            <Lock size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-slate-900">Security & Login</h3>
                                            <p className="text-slate-400 text-sm">Review your email and set a strong password.</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <InputGroup
                                            label="Email Address"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="opacity-80 grayscale-[0.5]" // Subtle indicator it's locked
                                            placeholder="john@company.com"
                                            disabled
                                        />
                                    </div>
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-5'>
                                        <InputGroup
                                            label="Password"
                                            name="passwordHash"
                                            type="password"
                                            value={formData.passwordHash}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="••••••••"
                                        />
                                        <InputGroup
                                            label="Confirm Password"
                                            name="confirmPassword"
                                            type="password"
                                            value={confirmPassword}
                                            onChange={handleConfirmPasswordChange}
                                            required
                                            placeholder="••••••••"
                                        />

                                    </div>
                                    {passwordMatchError && (
                                        <div className="mt-3 p-3 bg-red-50 border border-red-100 rounded-xl flex items-start gap-2">
                                            <AlertCircle size={16} className="text-red-600 mt-0.5 shrink-0" />
                                            <p className="text-xs font-bold text-red-700">{passwordMatchError}</p>
                                        </div>
                                    )}
                                    {formData.passwordHash && confirmPassword && !passwordMatchError && (
                                        <div className="mt-3 p-3 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-2">
                                            <CheckCircle size={16} className="text-emerald-600" />
                                            <p className="text-xs font-bold text-emerald-700 uppercase">Passwords match</p>
                                        </div>
                                    )}

                                    {/* Password Requirements */}
                                    {formData.passwordHash && passwordErrors.length > 0 && (
                                        <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-2xl">
                                            <p className="text-xs font-bold text-red-700 uppercase tracking-wide mb-3">Password Requirements:</p>
                                            <ul className="space-y-2">
                                                {passwordErrors.map((error, index) => (
                                                    <li key={index} className="flex items-start gap-2 text-xs text-red-700">
                                                        <span className="mt-1">•</span>
                                                        <span>{error}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Password Strength Indicator */}
                                    {formData.passwordHash && passwordErrors.length === 0 && (
                                        <div className="mt-4 p-3 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3">
                                            <CheckCircle className="text-emerald-600" size={16} />
                                            <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide">Password is strong</p>
                                        </div>
                                    )}
                                </section>

                                {/* Section 2: Contact Info */}
                                <section id="contact" className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-200 shadow-sm scroll-mt-24">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                                            <UserPlus size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-slate-900">Identity Details</h3>
                                            <p className="text-slate-400 text-sm">Professional contact information for the account owner.</p>
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <InputGroup
                                            label="Full Name / Username"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="e.g. John Doe"
                                        />
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <InputGroup
                                                label="Phone Number (Optional)"
                                                name="phoneNumber"
                                                type="tel"
                                                value={formData.phoneNumber}
                                                onChange={handleInputChange}
                                                placeholder="+1 (555) 000-0000"
                                            />
                                            <InputGroup
                                                label="Physical Address (Optional)"
                                                name="userAddress"
                                                value={formData.userAddress}
                                                onChange={handleInputChange}
                                                placeholder="Street, City, Country"
                                            />
                                        </div>
                                    </div>
                                </section>
                            </form>
                        </div>
                    </div>
                </main>

                {/* STICKY FOOTER ACTION */}
                <footer className="fixed bottom-0 z-40 w-full bg-white/90 backdrop-blur-md border-t border-slate-200 py-5 px-6">
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                            <ShieldCheck size={16} className="text-emerald-500" />
                            Finalizing Registration Phase
                        </div>
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <button
                                onClick={handleSubmit}
                                disabled={loading || !formData.passwordHash || !formData.username || !confirmPassword || !!passwordMatchError}
                                className="cursor-pointer flex-1 md:flex-none bg-[#003399] text-white px-12 py-4 rounded-2xl font-black flex items-center justify-center gap-3 shadow-xl shadow-blue-900/10 hover:shadow-blue-900/30 transition-all active:scale-95 disabled:opacity-50 disabled:grayscale"
                            >
                                Complete Setup
                                <Zap size={18} />
                            </button>
                        </div>
                    </div>
                </footer>
            </div>
        </React.Fragment>
    );
};

export default UserCreationPage;