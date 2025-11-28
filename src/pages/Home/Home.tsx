import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";
import './Home.css';
import { Header } from "../../components/Header/Header";
import { Button } from "../../components/Button/Button";
import { TutorCard } from "../../components/TutorCard/TutorCard";

interface Tutor {
    id: string;
    nome: string;
    email: string;
    telefone: string;
    cidade: string;
}

export function Home() {
    const [tutores, setTutores] = useState<Tutor[]>([]);
    const navigate = useNavigate();

    const usuarioLogado = localStorage.getItem('usuarioNome') || 'Usuário';

    useEffect(() => {
        async function carregarTutores() {
            try {
                const response = await api.get('/tutores');
                setTutores(response.data);
            } catch (error) {
                alert('Erro ao buscar tutores');
                console.error(error);
            }
        }
        carregarTutores();
    }, []);

    async function handleDeletarTutor(id: string) {
        const confirmou = confirm("Tem certeza que deseja excluir este tutor?");

        if (!confirmou) return;

        try {
            await api.delete(`/tutores/${id}`);
            const listaAtualizada = tutores.filter(tutor => tutor.id !== id);
            setTutores(listaAtualizada);

            alert("Tutor excluido com sucesso!");
        } catch (error) {
            alert("Erro ao excluir tutor");
            console.error(error);
        }
    }

    function handleDeslogar() {
        localStorage.removeItem('token');
        localStorage.removeItem('usuarioNome');

        navigate('/');
    }

    return (
        <div className="home-container">
            <Header nomeUsuario={usuarioLogado} onLogout={handleDeslogar} />


            <div className="list-container">
                <div className="list-header">
                    <div className="list-titulo">
                        <h2>Gerencie Tutores e Animais!</h2>
                        <p>Cadastre novos tutores ou selecione um tutor para administrar os animais vinculados!</p>
                    </div>
                    <Button type="button" variant="create" onClick={() => navigate('/tutor/novo')}>Criar Novo Tutor</Button>
                </div>

                <div className="list-tutores">
                    {tutores.length === 0 && <p>Nenhum Tutor Cadastrado.</p>}

                    {tutores.map((tutor) => (
                        <TutorCard
                            key={tutor.id}
                            nome={tutor.nome}
                            email={tutor.email}
                            telefone={tutor.telefone}
                            cidade={tutor.cidade}
                            onClickVer={() => navigate(`/tutor/${tutor.id}/animais`)}
                            onClickEdit={() => navigate(`/tutor/editar/${tutor.id}`)}
                            onClickDelete={() => handleDeletarTutor(tutor.id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}