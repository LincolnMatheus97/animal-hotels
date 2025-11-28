import './Card.css';
import { CardProps } from '../../types/types';

export function Card({ children, variant = 'tutor' }: CardProps) {
    return (
        <div className={`card-container card-${variant}`}>
            {children}
        </div>
    );
}
