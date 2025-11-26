import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import './Home.css';

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

    return (
        <div className="home-container">
            <header>
                <h1>Gestão de Tutores 🐶</h1>
                <button className="btn-add" onClick={() => navigate('/tutor/novo')}>+ Novo Tutor</button>
            </header>

            <div className="list-container">
                {tutores.length === 0 && <p>Nenhum Tutor Cadastrado.</p>}

                {tutores.map((tutor) => (
                    <div key={tutor.id} className="tutor-card">
                        <div className="info">
                            <h3>{tutor.nome}</h3>
                            <p>📧 {tutor.email}</p>
                            <p>📞 {tutor.telefone}</p>
                            <p>📍 {tutor.cidade}</p>
                        </div>
                        <div className="actions">
                            <button className="btn-outline" onClick={() => navigate(`/tutor/${tutor.id}/animais`)}>Ver Animais</button>
                            <button className="btn-outline" onClick={() => navigate(`/tutor/editar/${tutor.id}`)}>Editar</button>
                            <button className="btn-dangers" onClick={() => handleDeletarTutor(tutor.id)}>Excluir</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}