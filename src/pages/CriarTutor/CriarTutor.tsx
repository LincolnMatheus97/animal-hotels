import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { ToastContext } from "../../context/ToastProvider";

export function CriarTutor() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cidade, setCidade] = useState('');

    const context = useContext(ToastContext);
    const { showToast } = context;

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
            showToast({ message: 'Tutor cadastrado com sucesso!', type: 'success' });
            navigate('/home');
        } catch (error) {
            console.error(error);
            showToast({ message: 'Erro ao cadastrar tutor.', type: 'error' });
        }
    }

    return (
        <div className="login-container">
            <div className="card">
                <h2>Novo Tutor</h2>
                <form onSubmit={handleCriarTutor}>
                    <Input
                        label="Nome Completo"
                        value={nome}
                        placeholder="Lucas Morais"
                        onChange={e => setNome(e.target.value)}
                        required
                    />

                    <Input
                        label="Email"
                        type="email"
                        value={email}
                        placeholder="marcosgabriel@email.com"
                        onChange={e => setEmail(e.target.value)}
                        required
                    />

                    <Input
                        label="Telefone"
                        value={telefone}
                        placeholder="(00) 00000-0000"
                        onChange={e => setTelefone(e.target.value)}
                        required
                    />

                    <Input
                        label="Cidade"
                        value={cidade}
                        placeholder="Altos"
                        onChange={e => setCidade(e.target.value)}
                        required
                    />

                    <div className="actions">
                        <Button type="button" variant="cancelar" onClick={() => navigate('/home')}>
                            Cancelar
                        </Button>
                        <Button type="submit" variant="enter">Salvar Tutor</Button>
                    </div>

                </form>
            </div>
        </div>
    );
}