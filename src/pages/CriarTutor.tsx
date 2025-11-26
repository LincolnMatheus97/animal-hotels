import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import './Login.css';

export function CriarTutor() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cidade, setCidade] = useState('');

    const navigate = useNavigate();

    async function handleCriarTutor(e: React.FormEvent) {
        e.preventDefault();

        const novoTutor = {
            nome,
            email,
            telefone,
            cidade,
        };

        try {
            await api.post('/tutores', novoTutor);
            alert('Tutor cadastrado com sucesso!');
            navigate('/home');
        } catch (error) {
            console.error(error);
            alert('Erro ao cadastrar tutor.');
        }
    }

    return (
        <div className="login-container">
            <div className="card">
                <h2>Novo Tutor</h2>
                <form onSubmit={handleCriarTutor}>
                    <div className="input-group">
                        <label>Nome Completo</label>
                        <input
                            value={nome}
                            placeholder="Lucas Morais"
                            onChange={e => setNome(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            placeholder="marcosgabriel@email.com"
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Telefone</label>
                        <input
                            value={telefone}
                            placeholder="(00) 00000-0000"
                            onChange={e => setTelefone(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Cidade</label>
                        <input
                            value={cidade}
                            placeholder="Altos"
                            onChange={e => setCidade(e.target.value)}
                            required
                        />
                    </div>

                    <div className="actions">
                        <button type="button" className="btn-outline" onClick={() => navigate('/home')}>
                            Cancelar
                        </button>
                        <button type="submit">Salvar Tutor</button>
                    </div>

                </form>
            </div>
        </div>
    );
}