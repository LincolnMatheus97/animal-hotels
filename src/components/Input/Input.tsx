import './Input.css';

interface InputProps {
    label: string;
    type?: 'text' | 'email' | 'password' | 'tel' | 'number';
    id?: string;
    placeholder?: string;
    value: string;
    error?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    disabled?: boolean;
}

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