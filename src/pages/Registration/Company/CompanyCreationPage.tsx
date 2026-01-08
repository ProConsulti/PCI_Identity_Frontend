import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowRight, Info, ShieldCheck, Zap
} from 'lucide-react';
import { registrationService } from '../../../services/registrationService';
import { currencyService, type Currency } from '../../../services/currencyService';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setCompanyData } from '../../../store/registrationSlice';
import InputGroup from '../../../components/InputGroup';
import type { CompanyCreateRequest, CompanyCreateResponse } from '../../../types/api.types';
import { COMPANY_DEFAULTS } from '../../../constants/companyDefaults';

export const CompanyCreationPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const userEmail = useAppSelector((state) => state.registration.userEmail);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currencies, setCurrencies] = useState<Currency[]>([]);
    const [currenciesLoading, setCurrenciesLoading] = useState(true);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        reportingCurrencyId: 0,
        reportingCurrencyCode: "",
    });

    // Set verified email on component mount
    useEffect(() => {
        if (userEmail) {
            setFormData(prev => ({ ...prev, email: userEmail }));
        } else {
            // If no verified email, redirect back to OTP verification
            navigate('/verify-email');
        }
    }, [userEmail, navigate]);

    // Fetch currencies on component mount
    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                setCurrenciesLoading(true);
                const currencyList = await currencyService.getAllCurrencies();
                setCurrencies(currencyList);

                // Set default currency if available
                if (currencyList.length > 0) {
                    const defaultCurrency = currencyList.find(
                        c => c.currencyCode === COMPANY_DEFAULTS.REPORTING_CURRENCY_CODE
                    ) || currencyList[0];

                    setFormData(prev => ({
                        ...prev,
                        reportingCurrencyId: defaultCurrency.currencyID,
                        reportingCurrencyCode: defaultCurrency.currencyCode,
                    }));
                }
            } catch (err: any) {
                console.error('Failed to load currencies:', err.message);
                setError('Failed to load available currencies');
            } finally {
                setCurrenciesLoading(false);
            }
        };

        fetchCurrencies();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = parseInt(e.target.value, 10);
        const selectedCurrency = currencies.find(c => c.currencyID === selectedId);

        if (selectedCurrency) {
            setFormData(prev => ({
                ...prev,
                reportingCurrencyId: selectedCurrency.currencyID,
                reportingCurrencyCode: selectedCurrency.currencyCode,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Email is already verified, no need to validate again
        try {
            // First, check if email already exists
            const userExists = await registrationService.checkUserExists(formData.email);
            if (userExists) {
                setError('This email is already registered. Please use a different email.');
                setLoading(false);
                return;
            }

            // Generate hardcoded and dynamic defaults
            const uniqueSuffix = Math.floor(100 + Math.random() * 900);

            // Calculate license expiry date (1 month from now)
            const expiryDate = new Date();
            expiryDate.setMonth(expiryDate.getMonth() + 1);
            const licenseExpiry = expiryDate.toISOString().split('T')[0];

            const finalPayload: CompanyCreateRequest = {
                companyID: 0,
                name: formData.name,
                registrationNumber: `${formData.name.replace(/\s+/g, '')}${uniqueSuffix}`,
                reportingCurrencyId: formData.reportingCurrencyId,
                reportingCurrencyCode: formData.reportingCurrencyCode,
                financialYearEnd: COMPANY_DEFAULTS.FINANCIAL_YEAR_END,
                leaseTypes: COMPANY_DEFAULTS.LEASE_TYPES,
                assetType: COMPANY_DEFAULTS.ASSET_TYPES,
                licenseExpiry: licenseExpiry,
                allowedUsers: COMPANY_DEFAULTS.ALLOWED_USERS,
                allowedLease: COMPANY_DEFAULTS.ALLOWED_LEASES,
            };

            const companyData: CompanyCreateResponse = await registrationService.createCompany(finalPayload);
            if (companyData.success) {
                dispatch(setCompanyData({
                    companyID: companyData.data.companyId,
                    userEmail: formData.email,
                    currencyID: formData.reportingCurrencyId,
                }));
            } else {
                setError('Server error: Invalid company ID received.');
                setLoading(false);
                return;
            }

            navigate('/create-user');
        } catch (err: any) {
            setError(err.message || 'Failed to initialize company profile');
            // For development purposes, allow navigation if API fails
            // navigate('/create-user'); 
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center bg-slate-50/50 py-12 px-4">
            <div className="max-w-xl w-full">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-blue-900/5 p-8 md:p-10">

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-700 rounded-2xl text-sm font-bold flex items-center gap-3">
                                <Zap size={18} className="fill-red-700" />
                                {error}
                            </div>
                        )}

                        <div className="space-y-6">
                            <InputGroup
                                label="Company Legal Name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                placeholder="e.g. Acme Global Ltd"
                            />

                            <div>
                                <InputGroup
                                    label="Corporate Email Address (Verified)"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    disabled={true}
                                    required
                                    placeholder="admin@company.com"
                                />
                                <p className="text-xs text-slate-500 mt-2 ml-1">Email verified via OTP. Not editable.</p>
                            </div>

                            <div>
                                <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider ml-1">
                                    Reporting Currency
                                </label>
                                <select
                                    value={formData.reportingCurrencyId}
                                    onChange={handleCurrencyChange}
                                    disabled={currenciesLoading || currencies.length === 0}
                                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-700 disabled:bg-slate-100 disabled:text-slate-500"
                                >
                                    {currenciesLoading ? (
                                        <option>Loading currencies...</option>
                                    ) : currencies.length === 0 ? (
                                        <option>No currencies available</option>
                                    ) : (
                                        currencies.map(currency => (
                                            <option key={currency.currencyID} value={currency.currencyID}>
                                                {currency.currencyName} ({currency.currencyCode})
                                            </option>
                                        ))
                                    )}
                                </select>
                            </div>
                        </div>

                        <div className="mt-8 flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <Info size={18} className="text-[#003399] mt-0.5 shrink-0" />
                            <p className="text-[12px] text-slate-500 leading-relaxed">
                                By continuing, we will automatically configure your <b>IFRS 16</b> reporting standards with your selected currency.
                            </p>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading || !formData.name || currenciesLoading}
                        className="cursor-pointer w-full bg-[#003399] hover:bg-[#002266] disabled:opacity-50 disabled:grayscale text-white py-5 rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 shadow-2xl shadow-blue-900/20 transition-all active:scale-[0.98] group"
                    >
                        {loading ? "Initializing..." : "Proceed to User Setup"}
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

export default CompanyCreationPage;