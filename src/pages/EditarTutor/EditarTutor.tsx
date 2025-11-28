import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../services/api';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { ToastContext } from '../../context/ToastProvider';

export function EditarTutor() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cidade, setCidade] = useState('');

    const context = useContext(ToastContext)
    const { showToast } = context;

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function carregarTutor() {
            try {
                const response = await api.get(`/tutores/${id}`);
                setNome(response.data.nome);
                setEmail(response.data.email);
                setTelefone(response.data.telefone);
                setCidade(response.data.cidade);
            } catch (error) {
                showToast({ message: 'Erro ao buscar dados do tutor', type: 'error' });
                navigate('/home');
            }
        }
        carregarTutor();
    }, [id]);

    async function handleAtualizarTutor(e: React.FormEvent) {
        e.preventDefault();

        const dadosAtualizados = {
            nome,
            email,
            telefone,
            cidade,
        };

        try {
            await api.put(`/tutores/${id}`, dadosAtualizados);
            showToast({ message: 'Tutor atualizado com sucesso!', type: 'success' });
            navigate('/home');
        } catch (error) {
            console.log(error);
            showToast({ message: 'Erro ao atualizar tutor.', type: 'error' });
        }
    }

    return (
        <div className='login-container'>
            <div className='card'>
                <h2>Editar Tutor</h2>
                <form onSubmit={handleAtualizarTutor}>
                    <Input
                        label="Nome Completo"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                        required
                    />

                    <Input
                        label="E-mail"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />

                    <Input
                        label="Telefone"
                        value={telefone}
                        onChange={e => setTelefone(e.target.value)}
                        required
                    />
                    
                    <Input
                        label="Cidade"
                        value={cidade}
                        onChange={e => setCidade(e.target.value)}
                        required
                    />

                    <div className='actions'>
                        <Button type="button" variant="cancelar" onClick={() => navigate('/home')}>
                            Cancelar
                        </Button>
                        <Button type="submit" variant="enter">Salvar Alteração</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}