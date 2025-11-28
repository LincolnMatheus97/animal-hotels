import './Input.css';
import { InputProps } from '../../types/types';

export function Input({
    label,
    type = 'text',
    id,
    placeholder,
    value,
    onChange,
    error,
    required = false,
    disabled = false,
}: InputProps) {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
    
    return (
        <div className="input-group">
            <label htmlFor={inputId}>
                {label}
                {required && <span className="required">*</span>}
            </label>
            <input
                type={type}
                id={inputId}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}
                className={error ? 'input-error' : ''}
                
            />
            {error && <span className="error-message">{error}</span>}
            
        </div>
    );
}