import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../services/api";
import { Button } from "../../components/Button/Button";
import {PawPrint} from 'lucide-react';
import './AnimaisTutor.css';
import { AnimalCard } from "../../components/AnimalCard/AnimalCard";

interface Animal {
    id: string;
    especie: string;
    nome: string;
    raca: string;
    idade: string;
    tutorId: string;
    imagem: string;
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
            <header className="tutoranimais-header">
                <h1>Animais de {tutor?.nome || "..."} <PawPrint size={40} /></h1>
                <div>
                    <Button variant="back" onClick={() => navigate('/home')}>Voltar</Button>
                    <Button variant="create" onClick={() => navigate(`/tutor/${id}/animal/novo`)}>+ Novo Animal</Button>
                </div>
            </header>

            <div className="list-animais">
                {animais.length === 0 && <p>Este tutor ainda não possui animais cadastrados.</p>}
                {animais.map((animal) => (
                        <AnimalCard
                            key={animal.id}
                            nome={animal.nome}
                            especie={animal.especie}
                            raca={animal.raca}
                            idade={animal.idade}
                            imagem={animal.imagem}
                            onClickEdit={() => navigate(`/animal/${animal.id}/editar`)}
                            onClickDelete={() => handleDeletarAnimal(animal.id)}
                        />
                ))}
            </div>
        </div>
    );
}