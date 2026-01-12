import { useNavigate } from "react-router-dom";
import { LogIn, UserPlus } from "lucide-react";
import logo from '../assets/proLogo.png';

export const Header = () => {
    const navigate = useNavigate();

    return (
        <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-blue-50 px-4 md:px-8 py-3 shadow-sm">
            <div className="max-w-7xl mx-auto flex items-center justify-between">

                {/* Logo Section */}
                <div
                    className="group flex items-center gap-2 cursor-pointer"
                    onClick={() => navigate('/')}
                >
                    <img
                        src={logo}
                        alt="ProConsult International"
                        className="h-10 md:h-11 object-contain transition-transform group-hover:scale-[1.02]"
                    />
                </div>

                {/* Auth Actions */}
                <div className="flex items-center gap-2 md:gap-4">
                    {/* Login Button - Opens in New Tab */}
                    <a
                        href="https://ifrs16.ifrs.ca/" // Replace with your actual login URL
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-blue-700 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-all duration-200"
                    >
                        <LogIn size={18} strokeWidth={2.5} />
                        <span className="hidden sm:inline">Log in</span>
                    </a>

                    {/* Sign Up Button */}
                    <button
                        onClick={() => navigate('/verify-email')}
                        className="cursor-pointer flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-md shadow-blue-200 transition-all active:scale-95 hover:shadow-lg"
                    >
                        <UserPlus size={18} strokeWidth={2.5} />
                        <span>Sign up</span>
                    </button>
                </div>

            </div>
        </header>
    );
};