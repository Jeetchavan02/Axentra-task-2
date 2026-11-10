// context/ToastContext.tsx
import React, { createContext, useContext, useState, type ReactNode } from 'react';

type ToastStatus = 'success' | 'error' | 'info';

type Toast = {
    id: number;
    title: string;
    message: string;
    status: ToastStatus;
};

type ToastContextType = {
    showToast: (title: string, message: string, status?: ToastStatus) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = (title: string, message: string, status: ToastStatus = 'success') => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, title, message, status }]);

        setTimeout(() => {
            dismissToast(id);
        }, 5000);
    };

    const dismissToast = (id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed bottom-5 right-5 space-y-3 z-[9999] max-w-md w-full">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`animate-fade-in transform transition-all duration-300 ease-in-out bg-white rounded-lg shadow-lg p-4 relative border hover:shadow-xl`}
                    >
                        <div
                            className={`absolute inset-0 rounded-lg border ${toast.status === 'success'
                                ? 'border-green-400'
                                : toast.status === 'error'
                                    ? 'border-red-400'
                                    : 'border-purple-400'
                                } pointer-events-none`}
                        ></div>

                        <button
                            className="absolute top-2 right-4 text-gray-500 hover:text-gray-700 text-xl"
                            onClick={() => dismissToast(toast.id)}
                            aria-label="Close"
                        >
                            &times;
                        </button>

                        <h4 className="text-base sm:text-lg text-gray-800 tracking-tight">
                            {toast.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1 leading-relaxed">{toast.message}</p>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error('useToast must be used within ToastProvider');
    return context;
};