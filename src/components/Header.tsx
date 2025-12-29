import { useNavigate } from "react-router-dom";
import logo from '../assets/proLogo.png';

export const Header = () => {
    const navigate = useNavigate();
    return (
        <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-sm px-4 md:px-8 py-3">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-8">
                    {/* Logo Section */}
                    <div className="flex items-center gap-2 cursor-pointer">
                        <img
                            src={logo}
                            alt="ProConsult International"
                            className="h-12 object-contain"
                            onClick={() => navigate('/')}
                        />
                    </div>
                </div>
            </div>

        </header>
    );
};