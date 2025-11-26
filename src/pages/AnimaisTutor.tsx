import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../services/api";
import './Home.css';

interface Animal {
    id: string;
    especie: string;
    nome: string;
    raca: string;
    idade: string;
    tutorId: string;
    imagem?: string;
}

interface Tutor {
    id: string;
    nome: string;
}

export function AnimaisTutor() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [tutor, setTutor] = useState<Tutor | null>(null);
    const [animais, setAnimais] = useState<Animal[]>([]);

    useEffect(() => {
        async function carregarDados() {
            try {
                const resposeTutor = await api.get(`/tutores/${id}`);
                setTutor(resposeTutor.data);

                const resposeAnimais = await api.get(`/animais?tutorId=${id}`);
                setAnimais(resposeAnimais.data);
            } catch (error) {
                console.log(error);
                alert("Erro carregar dados.");
            }
        }
        carregarDados();
    }, [id]);

    async function handleDeletarAnimal(animalId: string) {
        const confirmou = confirm("Tem certeza que deseja excluir este animal?");

        if (!confirmou) return;

        try {
            await api.delete(`/animais/${animalId}`);
            const listaAtualizada = animais.filter(animal => animal.id !== animalId);
            setAnimais(listaAtualizada);
        } catch (error) {
            alert("Erro ao excluir animal.");
        }
    }

    return (
        <div className="home-container">
            <header>
                <h1>Animais de {tutor?.nome || "..."} 🐱</h1>
                <div style={{display: 'flex', gap: '10px'}}>
                    <button className="btn-outline" onClick={() => navigate('/home')}>Voltar</button>
                    <button className="btn-add" onClick={() => navigate(`/tutor/${id}/animal/novo`)}>+ Novo Animal</button>
                </div>
            </header>

            <div className="list-container">
                {animais.length === 0 && <p>Este tutor ainda não possui animais cadastrados.</p>}
                {animais.map((animal) => (
                        <div key={animal.id} className="tutor-card">
                        {animal.imagem && (
                            <img 
                                src={animal.imagem} 
                                alt={animal.nome} 
                                style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', marginRight: '1rem' }} 
                            />
                        )}

                        <div className="info">
                            <h3>{animal.nome}</h3>
                            <p>🧬 Espécie: {animal.especie}</p>
                            <p>🐕 Raça: {animal.raca}</p>
                            <p>🎂 Idade: {animal.idade}</p>
                        </div>
                        <div className="actions">
                            <button className="btn-outline" onClick={() => navigate(`/animal/editar/${animal.id}`)}>Editar</button>
                            <button className="btn_danger" onClick={() => handleDeletarAnimal(animal.id)}>Excluir</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}