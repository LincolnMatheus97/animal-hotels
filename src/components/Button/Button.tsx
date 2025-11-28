import './Button.css';
import { Pencil, Dog, Trash2, ArrowLeft } from 'lucide-react';
import { ButtonProps } from '../../types/types';

export function Button({ 
    children, 
    onClick, 
    type = 'button',
    variant = 'enter',
    fullWidth = false
}: ButtonProps) {
    const getIcon = () => {
        switch (variant) {
            case 'view':
                return <Dog size={18} />;
            case 'edit':
                return <Pencil size={18} />;
            case 'delete':
                return <Trash2 size={18} />;
            case 'back':
                return <ArrowLeft size={18} />;
            default:
                return null;
        }
    };

    const buttonIcon = getIcon();

    return (
        <button
            type={type}
            onClick={onClick}
            className={`btn btn-${variant} ${fullWidth ? 'btn-full-width' : ''}`}
        >   
            {buttonIcon && (
                <span className={children ? "btn-icon-with-text" : "btn-icon"}>
                    {buttonIcon}
                </span>
            )}
            {children}
        </button>
    );
}
