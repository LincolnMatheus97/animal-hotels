import './Card.css';

interface CardProps {
    children: React.ReactNode;
    variant?: 'tutor' | 'animal';
}

export function Card({ children, variant = 'tutor' }: CardProps) {
    return (
        <div className={`card-container card-${variant}`}>
            {children}
        </div>
    );
}
