import { Navigate } from "react-router-dom";

interface RotasPrivadasProps {
    children: React.ReactNode;
}

export function RotasPrivadas({children}: RotasPrivadasProps) {
    const token = localStorage.getItem('token');

    if (token) {
        return children;
    }

    return <Navigate to="/" />
}