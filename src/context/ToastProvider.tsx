import React, {createContext, useState, useCallback} from "react";
import { ToastMessage , ToastContextProps} from "../types/types";
import { Toasts } from "../components/Toasts/Toasts";

export const ToastContext = createContext<ToastContextProps>({
    showToast: () => {},
})

export const ToastProvider = ({ children }: ( { children : React.ReactNode } )) => {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);
    

    const showToast = useCallback((msg: Omit<ToastMessage, 'id'>) => {
        const id = Math.random().toString(36).substring(2);
        const newToast: ToastMessage = { id, ...msg };
        setToasts((prevToasts) => [...prevToasts, newToast]);

        setTimeout(() => {
            setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
        }, msg.duration || 3000);

    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <Toasts toasts={toasts} />
        </ToastContext.Provider>
    )
}