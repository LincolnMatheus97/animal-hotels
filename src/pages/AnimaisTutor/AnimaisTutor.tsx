import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../services/api";
import { Button } from "../../components/Button/Button";
import { PawPrint } from 'lucide-react';
import './AnimaisTutor.css';
import { AnimalCard } from "../../components/AnimalCard/AnimalCard";
import { Animal, Tutor } from "../../types/types";
import { ToastContext } from "../../context/ToastProvider";
import { ConfirmModal } from "../../components/ConfirmModal/ConfirmModal";

export function AnimaisTutor() {
    const { id } = useParams();
    const navigate = useNavigate();

    const context = useContext(ToastContext);
    const { showToast } = context;

    const [tutor, setTutor] = useState<Tutor | null>(null);
    const [animais, setAnimais] = useState<Animal[]>([]);

    const [modalAberto, setModalAberto] = useState(false);
    const [animalParaDeletar, setAnimalParaDeletar] = useState<string | null>(null);
    const [nomeAnimal, setNomeAnimal] = useState('');


    useEffect(() => {
        async function carregarDados() {
            try {
                const resposeTutor = await api.get(`/tutores/${id}`);
                setTutor(resposeTutor.data);

                const resposeAnimais = await api.get(`/animais?tutorId=${id}`);
                setAnimais(resposeAnimais.data);
            } catch (error) {
                console.log(error);
                showToast({ message: "Erro carregar dados.", type: "error" });
            }
        }
        carregarDados();
    }, [id]);

    function abrirModalDeletar(animalId: string, nome: string) {
        setAnimalParaDeletar(animalId);
        setNomeAnimal(nome);
        setModalAberto(true);
    }

    function fecharModal() {
        setModalAberto(false);
        setAnimalParaDeletar(null);
    }

    async function handleDeletarAnimal(animalId: string) {
        if (!animalParaDeletar) return;

        try {
            await api.delete(`/animais/${animalId}`);
            const listaAtualizada = animais.filter(animal => animal.id !== animalId);
            setAnimais(listaAtualizada);
            showToast({ message: "Animal excluido com sucesso!", type: "success" });
        } catch (error) {
            showToast({ message: "Erro ao excluir animal.", type: "error" });
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
                        onClickDelete={() => abrirModalDeletar(animal.id, animal.nome)}
                    />
                ))}
            </div>
            {modalAberto && animalParaDeletar && (
                <ConfirmModal
                    nomeEntidade={nomeAnimal}
                    onCancel={() => fecharModal()}
                    onConfirm={() => {
                        handleDeletarAnimal(animalParaDeletar);
                        setModalAberto(false);
                    }}
                />
            )}
        </div>
    );
}