import React, { useState, useEffect } from 'react';
import {
    FilePlus2, Calculator, Settings2,
    ArrowRight, ShieldCheck, Info
} from 'lucide-react';
import type { LeaseCreateRequest } from '../../../types/leases.types';
import InputGroup from '../../../components/InputGroup';

const LeaseCreationPage: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [activeSection, setActiveSection] = useState<string>('basic');

    const [formData, setFormData] = useState<LeaseCreateRequest>({
        leaseId: '',
        leaseName: '',
        rental: 0,
        commencementDate: '',
        endDate: '',
        annuity: '',
        ibr: 0,
        frequency: 'Monthly',
        assetType: '',
        companyID: '',
        currencyID: '',
        grv: 0,
        idc: 0,
        increment: 0,
        incrementalFrequency: '',
        isActive: true,
        lastModifiedDate: new Date().toISOString(),
        userID: 'USR-123', // Mocking current user
        userName: 'John Doe',
        isLeaseModified: false,
        parentLeaseId: ''
    });

    // Handle Scroll Spy for Sidebar
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['basic', 'financials', 'metadata'];
            const current = sections.find(id => {
                const el = document.getElementById(id);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    return rect.top >= 0 && rect.top <= 300;
                }
                return false;
            });
            if (current) setActiveSection(current);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        setFormData((prev: any) => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) || 0 : value
        }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: checked }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Add your API call here: await leaseService.create(formData);
        console.log("Submitting Lease Data:", formData);
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 py-10 px-4 md:px-8">

                {/* LEFT SIDEBAR: PROGRESS & INFO */}
                <aside className="hidden lg:block lg:col-span-3 space-y-6 sticky top-28 h-fit">
                    <div className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Wizard Steps</h3>
                        <nav className="space-y-2">
                            {[
                                { id: 'basic', label: 'General Terms', icon: FilePlus2 },
                                { id: 'financials', label: 'Financial Data', icon: Calculator },
                                { id: 'metadata', label: 'Audit & Logic', icon: Settings2 },
                            ].map((item) => (
                                <div key={item.id} className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${activeSection === item.id ? 'bg-indigo-50 text-[#003399]' : 'text-slate-400'}`}>
                                    <item.icon size={20} className={activeSection === item.id ? 'animate-pulse' : ''} />
                                    <span className="font-bold text-sm">{item.label}</span>
                                </div>
                            ))}
                        </nav>
                    </div>

                    <div className="bg-[#003399] rounded-[2rem] p-8 text-white relative overflow-hidden shadow-xl shadow-blue-900/20">
                        <div className="relative z-10">
                            <Info className="mb-4 text-blue-300" />
                            <h4 className="font-bold text-lg mb-2">IFRS 16 Tip</h4>
                            <p className="text-blue-100 text-xs leading-relaxed opacity-80">
                                Ensure the "Commencement Date" matches the date the asset became available for use, not necessarily the contract sign date.
                            </p>
                        </div>
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
                    </div>
                </aside>

                {/* MAIN FORM */}
                <div className="lg:col-span-9 space-y-8 pb-32">
                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* 1. Basic Identity */}
                        <section id="basic" className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-200 shadow-sm transition-all hover:shadow-md">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-14 h-14 bg-blue-50 text-[#003399] rounded-2xl flex items-center justify-center">
                                    <FilePlus2 size={28} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900">General Terms</h2>
                                    <p className="text-slate-400 text-sm">Define the primary identity and timeline of the lease.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <InputGroup label="Lease ID" name="leaseId" value={formData.leaseId} onChange={handleInputChange} placeholder="e.g. LSE-2024-001" required />
                                <InputGroup label="Lease Name" name="leaseName" value={formData.leaseName} onChange={handleInputChange} placeholder="e.g. London Office Hub" required />
                                <InputGroup label="Commencement Date" name="commencementDate" type="date" value={formData.commencementDate} onChange={handleInputChange} required />
                                <InputGroup label="End Date" name="endDate" type="date" value={formData.endDate} onChange={handleInputChange} required />
                                <InputGroup label="Asset Type" name="assetType" value={formData.assetType} onChange={handleInputChange} placeholder="e.g. Real Estate" />
                                <InputGroup label="Company ID" name="companyID" value={formData.companyID} onChange={handleInputChange} placeholder="Associated Company" />
                            </div>
                        </section>

                        {/* 2. Financials */}
                        <section id="financials" className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-200 shadow-sm">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                                    <Calculator size={28} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900">Financial Data</h2>
                                    <p className="text-slate-400 text-sm">Specify payments, rates, and valuation metrics.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <InputGroup label="Rental Amount" name="rental" type="number" value={formData.rental} onChange={handleInputChange} />
                                <InputGroup label="IBR (%)" name="ibr" type="number" value={formData.ibr} onChange={handleInputChange} />
                                <div className="flex flex-col gap-2">
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">Payment Frequency</label>
                                    <select name="frequency" value={formData.frequency} onChange={handleInputChange} className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#003399] font-medium appearance-none">
                                        <option value="Monthly">Monthly</option>
                                        <option value="Quarterly">Quarterly</option>
                                        <option value="Semi-Annually">Semi-Annually</option>
                                        <option value="Annually">Annually</option>
                                    </select>
                                </div>
                                <InputGroup label="GRV" name="grv" type="number" value={formData.grv} onChange={handleInputChange} />
                                <InputGroup label="IDC" name="idc" type="number" value={formData.idc} onChange={handleInputChange} />
                                <div className="flex flex-col gap-2">
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">Annuity</label>
                                    <select name="annuity" value={formData.annuity} onChange={handleInputChange} className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#003399] font-medium appearance-none">
                                        <option value="advance">Advance</option>
                                        <option value="arrears">Arrears</option>
                                    </select>
                                </div>
                            </div>
                        </section>

                        {/* 3. Metadata & Audit */}
                        <section id="metadata" className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-200 shadow-sm">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
                                    <Settings2 size={28} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900">Logic & Audit</h2>
                                    <p className="text-slate-400 text-sm">Control modification status and lease hierarchy.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <InputGroup label="Increment (%)" name="increment" type="number" value={formData.increment} onChange={handleInputChange} />
                                <InputGroup label="Parent Lease ID" name="parentLeaseId" value={formData.parentLeaseId || ""} onChange={handleInputChange} placeholder="For modifications only" />

                                <div className="flex items-center gap-8 md:col-span-2 p-6 bg-slate-50 rounded-3xl">
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleCheckboxChange} className="w-6 h-6 rounded-lg border-slate-300 text-[#003399] focus:ring-[#003399]" />
                                        <span className="text-sm font-bold text-slate-600 group-hover:text-[#003399]">Active Lease</span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <input type="checkbox" name="isLeaseModified" checked={formData.isLeaseModified} onChange={handleCheckboxChange} className="w-6 h-6 rounded-lg border-slate-300 text-[#003399] focus:ring-[#003399]" />
                                        <span className="text-sm font-bold text-slate-600 group-hover:text-[#003399]">Modified State</span>
                                    </label>
                                </div>
                            </div>
                        </section>
                    </form>
                </div>
            </div>

            {/* STICKY ACTION BAR */}
            <footer className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-t border-slate-200 py-5 px-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-full">
                            <ShieldCheck size={20} />
                        </div>
                        <div>
                            <p className="text-xs font-black text-slate-900 leading-none">Standard Compliance</p>
                            <p className="text-[10px] text-slate-400 uppercase tracking-tighter mt-1">IFRS 16 / ASC 842 Ready</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <button className="flex-1 md:flex-none px-8 py-4 text-slate-500 font-bold text-sm">Save as Draft</button>
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="flex-1 md:flex-none bg-[#003399] text-white px-12 py-4 rounded-2xl font-black flex items-center justify-center gap-3 shadow-xl shadow-blue-900/10 hover:shadow-blue-900/30 transition-all active:scale-95"
                        >
                            {loading ? "Calculating..." : "Generate Lease Schedule"}
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LeaseCreationPage;