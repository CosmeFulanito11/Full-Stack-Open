import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveUser } from '../utils/storage';
import type { User } from '../types/user';
import { ArrowLeft } from 'lucide-react';
import Notification from './ui/Notificacion';
import { Eye, EyeOff } from 'lucide-react';

import {
    isOnlyLetters,
    isOnlyNumbers,
    isValidEmail,
    isValidPhone,
    isStrongPassword,
} from '../utils/validations';

const Register: React.FC = () => {
    const [showNotif, setShowNotif] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errorNotif, setErrorNotif] = useState<string | null>(null);

    const [formData, setFormData] = useState<User>({
        email: '',
        password: '',
        name: '',
        phonenumber: '',
        especialidad: '',
        hospital: '',
        cedula: '',
    });

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleLettersKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!isOnlyLetters(e.key)) {
            e.preventDefault();
        }
    };

    const handleNumbersKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!isOnlyNumbers(e.key)) {
            e.preventDefault();
        }
    };

    const showError = (message: string) => {
        setErrorNotif(message);
        setTimeout(() => setErrorNotif(null), 3000);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const { email, password, phonenumber } = formData;

        if (!isValidEmail(email)) {
            showError('Correo inválido');
            return;
        }

        if (!isValidPhone(phonenumber)) {
            showError('El número de telefono debe tener 10 dígitos');
            return;
        }

        if (!isStrongPassword(password)) {
            showError(
                'La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un símbolo'
            );
            return;
        }

        setShowNotif(true);
        saveUser(formData);

        setTimeout(() => {
            navigate('/');
        }, 2000);
    };

    return (
        <div className="flex justify-center items-center min-h-screen flex-col h-auto py-12 px-4 bg-gradient-to-br from-[#aabafc] via-[#3f4fc0] to-[#13186f]">

            {/* Regresar */}
            <div className="py-2 flex w-full max-w-xl mb-4 text-white underline decoration-1">
                <ArrowLeft className="cursor-pointer" onClick={() => navigate('/')} />
                <span className="ml-2 cursor-pointer" onClick={() => navigate('/')}>Regresar</span>
            </div>

            {/* Formulario */}
            <form
                onSubmit={handleSubmit}
                className="bg-white/10 backdrop-blur-md shadow-lg rounded-3xl py-6 px-6 sm:px-8 w-full max-w-xl border border-white text-white"
            >
                <h2 className="text-2xl sm:text-3xl md:text-4xl text-center mb-6 font-semibold">Registro</h2>

                {/* Campos */}
                {[
                    { id: 'name', label: 'Nombre', type: 'text', keyFilter: 'letters' },
                    { id: 'email', label: 'Correo electrónico', type: 'email' },
                    { id: 'password', label: 'Contraseña', type: 'password' },
                    { id: 'phonenumber', label: 'Teléfono', type: 'tel', keyFilter: 'numbers' },
                    { id: 'especialidad', label: 'Especialidad', type: 'text', keyFilter: 'letters' },
                    { id: 'hospital', label: 'Hospital', type: 'text', keyFilter: 'letters' },
                    { id: 'cedula', label: 'Cédula', type: 'text', keyFilter: 'letters' },
                ].map(({ id, label, type, keyFilter }) => (
                    <div className="mb-4" key={id}>
                        <label htmlFor={id} className="block text-sm font-medium text-white mb-1">{label}</label>

                        {id === 'password' ? (
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id={id}
                                    name={id}
                                    value={formData[id as keyof User] || ''}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                                    required
                                    autoComplete="off"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 cursor-pointer"
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        ) : (
                            <input
                                type={type}
                                id={id}
                                name={id}
                                value={formData[id as keyof User] || ''}
                                onChange={handleChange}
                                onKeyPress={
                                    keyFilter === 'letters' ? handleLettersKeyPress :
                                        keyFilter === 'numbers' ? handleNumbersKeyPress :
                                            undefined
                                }
                                className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                                required
                                autoComplete="off"
                            />
                        )}
                    </div>
                ))}


                {/* Botón */}
                <button
                    type="submit"
                    className="w-full bg-white text-blue-600 py-3 rounded-xl hover:bg-gray-300 transition cursor-pointer mt-4"
                >
                    Registrarse
                </button>
            </form>

            {/* Notificación de éxito */}
            {showNotif && (
                <div className="fixed top-4 right-4 z-50">
                    <Notification
                        type="success"
                        message="Usuario registrado exitosamente"
                        onClose={() => setShowNotif(false)}
                    />
                </div>
            )}

            {/* Notificación de error */}
            {errorNotif && (
                <div className="fixed top-4 right-4 z-50">
                    <Notification
                        type="error"
                        message={errorNotif}
                        onClose={() => setErrorNotif(null)}
                    />
                </div>
            )}
        </div>
    );
};

export default Register;
