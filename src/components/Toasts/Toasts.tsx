import { ToastProps } from "../../types/types";
import './Toasts.css';

export const Toasts = ({toasts} : ToastProps) => {
    return (
        <div className="toast-container">
            {toasts.map((toast) => (
                <div 
                    key={toast.id}
                    className={`toast toast-${toast.type}`}
                >
                    <span className="toast-message">{toast.message}</span>
                </div>
            ))}
        </div>
    );
};