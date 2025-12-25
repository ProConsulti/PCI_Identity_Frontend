
export const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-sm px-4 md:px-8 py-3">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-8">
                    {/* Logo Section */}
                    <div className="flex items-center gap-2 cursor-pointer">
                        <img
                            src="/src/assets/proLogo.png"
                            alt="ProConsult International"
                            className="h-12 object-contain"
                        />

                        {/* Navigation */}
                        {/* <nav className="hidden lg:flex items-center gap-6 text-[13px] font-bold text-slate-600">
                        <span className="flex items-center gap-1 hover:text-[#003399] transition-colors cursor-pointer">
                            Capabilities <ChevronDown size={14} />
                        </span>
                        <span className="hover:text-[#003399] transition-colors cursor-pointer">
                            Digital Solutions
                        </span>
                        <span className="flex items-center gap-1 hover:text-[#003399] transition-colors cursor-pointer">
                            Insights <ChevronDown size={14} />
                        </span>
                        <span className="flex items-center gap-1 hover:text-[#003399] transition-colors cursor-pointer">
                            About Us <ChevronDown size={14} />
                        </span>
                    </nav> */}
                    </div>

                    {/* <div className="flex items-center gap-4">
                    <button className="hidden sm:flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors">
                        <HelpCircle size={18} />
                        <span className="text-sm font-medium">Support</span>
                    </button>
                    <div className="h-6 w-[1px] bg-slate-200 hidden sm:block"></div>
                    <Menu className="lg:hidden text-slate-600 cursor-pointer" />
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 cursor-pointer hover:border-indigo-500 transition-all">
                        <span className="text-xs font-black text-slate-600 uppercase">JD</span>
                    </div>
                </div> */}
                </div>
            </div>

        </header>
    );
};