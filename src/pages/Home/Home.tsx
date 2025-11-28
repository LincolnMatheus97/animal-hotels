import { useContext, useEffect, useState } from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";
import './Home.css';
import { Header } from "../../components/Header/Header";
import { Button } from "../../components/Button/Button";
import { TutorCard } from "../../components/TutorCard/TutorCard";
import { Tutor } from "../../types/types";
import { ToastContext } from "../../context/ToastProvider";
import { ConfirmModal } from "../../components/ConfirmModal/ConfirmModal";

export function Home() {
    const [tutores, setTutores] = useState<Tutor[]>([]);

    const [modalAberto, setModalAberto] = useState(false);
    const [tutorParaDeletar, setTutorParaDeletar] = useState<string | null>(null);
    const [nomeUsuario, setNomeUsuario] = useState('');

    const navigate = useNavigate();

    const context = useContext(ToastContext);
    const { showToast } = context;

    const usuarioLogado = localStorage.getItem('usuarioNome') || 'Usuário';

    useEffect(() => {
        async function carregarTutores() {
            try {
                const response = await api.get('/tutores');
                setTutores(response.data);
            } catch (error) {
                showToast({ message: 'Erro ao carregar tutores. Tente novamente mais tarde.', type: 'error' });
                console.error(error);
            }
        }
        carregarTutores();
    }, []);

    function abrirModalDeletar(id: string, nome: string) {
        setTutorParaDeletar(id);
        setNomeUsuario(nome);
        setModalAberto(true);
    }

    function fecharModal() {
        setModalAberto(false);
        setTutorParaDeletar(null);
    }

    async function confirmarDelecao() {
        if (!tutorParaDeletar) return;

        try {
            await api.delete(`/tutores/${tutorParaDeletar}`);
            const listaAtualizada = tutores.filter(tutor => tutor.id !== tutorParaDeletar);
            setTutores(listaAtualizada);
            showToast({ message: "Tutor excluido com sucesso!", type: "success" });
            fecharModal();
        } catch (error) {
            showToast({ message: "Erro ao excluir tutor", type: "error" });
            console.error(error);
        }
    }

    function handleDeslogar() {
        localStorage.removeItem('token');
        localStorage.removeItem('usuarioNome');
        showToast({ message: "Deslogado com sucesso!", type: "success" });
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
                            onClickDelete={() => abrirModalDeletar(tutor.id, tutor.nome)}
                        />
                    ))}
                </div>
            </div>
            {modalAberto && (
                <ConfirmModal nomeEntidade={nomeUsuario} onCancel={fecharModal} onConfirm={confirmarDelecao} />
            )}
        </div>
    )
}