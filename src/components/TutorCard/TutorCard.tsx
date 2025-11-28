import { Button } from "../Button/Button";
import { Card } from "../Card/Card";
import './TutorCard.css';

interface TutorCardProps {
    key: string;
    nome: string;
    email: string;
    telefone: string;
    cidade: string;
    onClickVer: () => void;
    onClickEdit: () => void;
    onClickDelete: () => void;
}

export function TutorCard({key, nome, email, telefone, cidade, onClickVer, onClickEdit, onClickDelete }: TutorCardProps) {
    return (
        <Card variant="tutor">
            <div className="info">
                <h3>{nome}</h3>
                <p>📧 {email}</p>
                <p>📞 {telefone}</p>
                <p>📍 {cidade}</p>
            </div>
            <div className="actions">
                <Button type="button" variant="view" onClick={onClickVer}>Gerenciar Pets</Button>
                <Button type="button" variant="edit" onClick={onClickEdit}></Button>
                <Button type="button" variant="delete" onClick={onClickDelete}></Button>
            </div>
        </Card>
    )
}