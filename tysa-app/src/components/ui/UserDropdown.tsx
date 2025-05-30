// src/components/ui/UserDropdown.tsx
import { useState, useRef, useEffect } from 'react';
import { LogOut, Settings, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../utils/storage';

interface UserDropdownProps {
    onLogout: () => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ onLogout }) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        onLogout();
        navigate('/');
    };

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md text-sm cursor-pointer"
            >
                <User size={18} />
                <span>Mi perfil</span>
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-md z-50">
                    <button className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 text-sm cursor-pointer">
                        <Settings size={16} className="mr-2" /> Configuración
                    </button>
                    <button
                        className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 text-sm cursor-pointer"
                        onClick={handleLogout}
                    >
                        <LogOut size={16} className="mr-2" /> Cerrar sesión
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserDropdown;