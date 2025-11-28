import { Button } from "../Button/Button";
import { LogOut } from 'lucide-react'
import './Header.css';

interface HeaderProps {
    nomeUsuario: string;
    onLogout?: () => void;
}

export function Header({ nomeUsuario, onLogout }: HeaderProps) {
    return (
        <header className="header">
            <div className="header-info">
                <h3>Animal Hotels 🐾</h3>
            </div>
            <div className="header-user">
                <span>Olá, {nomeUsuario}!</span>
                <Button type="button" variant="logout" onClick={onLogout}>
                    <LogOut size={16} style={{ marginRight: '8px' }} />
                    Sair
                </Button>
            </div>
        </header>
    )
}