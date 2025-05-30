import React, { useEffect, useState } from 'react';
import { X, CircleCheckBig, CircleAlert, CircleX, Info } from 'lucide-react';

interface NotificationProps {
    message: string;
    type?: 'success' | 'error' | 'warning' | 'info';
    onClose: () => void;
}

const typeIcon = {
    success: <CircleCheckBig size={24} />,
    error: <CircleX size={24} />,
    warning: <CircleAlert size={24} />,
    info: <Info size={24} />,
};

const Notification: React.FC<NotificationProps> = ({ message, type = 'info', onClose }) => {
    const [closing, setClosing] = useState(false);

    const handleClose = () => {
        setClosing(true);
    };

    useEffect(() => {
        if (closing) {
            const timer = setTimeout(() => {
                onClose(); // Ejecuta onClose después de la animación
            }, 300); // Debe coincidir con el tiempo de fadeOut

            return () => clearTimeout(timer);
        }
    }, [closing, onClose]);

    return (
        <div
            className={`flex items-center gap-3 p-4 rounded-4xl shadow-md border w-full max-w-md bg-indigo-300 border-white ${closing ? 'animate-fade-out' : 'animate-fade-in'
                }`}
        >

            <div className="shrink-0">{typeIcon[type]}</div>
            <div className="flex-1 text-sm leading-snug">{message}</div>
            <button onClick={handleClose} className="text-lg hover:opacity-70 transition shrink-0">
                <X size={18} />
            </button>
        </div>
    );
};

export default Notification;
