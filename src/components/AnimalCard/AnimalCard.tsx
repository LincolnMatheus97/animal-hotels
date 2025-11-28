import { Button } from "../Button/Button";
import { Card } from "../Card/Card";

interface AnimalCardProps {
    key: string;
    nome: string;
    especie: string;
    raca: string;
    idade: string;
    imagem?: string;
    onClickEdit: () => void;
    onClickDelete: () => void;
}

export function AnimalCard({ key, nome, especie, raca, idade, imagem, onClickEdit, onClickDelete }: AnimalCardProps) {
    const imagemFinal = imagem || "https://marketplace.canva.com/8-1Kc/MAGoQJ8-1Kc/1/tl/canva-ginger-cat-with-paws-raised-in-air-MAGoQJ8-1Kc.jpg";
    
    return (
        <Card key={key} variant="animal">
            <div className="info-foto">
                <img
                    src={imagemFinal}
                    alt={nome}
                    style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <h3>{nome}</h3>
            </div>
            <div className="info">
                <p>🧬 Espécie: {especie}</p>
                <p>🐕 Raça: {raca}</p>
                <p>🎂 Idade: {idade}</p>
            </div>
            <div className="actions">
                <Button type="button" variant="edit" onClick={onClickEdit}></Button>
                <Button type="button" variant="delete" onClick={onClickDelete}></Button>
            </div>
        </Card>
    )
}