import { useEffect, useState } from 'react';
import './Login.css';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../services/api';

export function EditarTutor() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cidade, setCidade] = useState('');

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
                alert('Erro ao buscar dados do tutor');
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
            alert('Tutor atualizado com sucesso!');
            navigate('/home');
        } catch (error) {
            console.log(error);
            alert('Erro ao atualizar tutor.');
        }
    }

    return (
        <div className='login-container'>
            <div className='card'>
                <h2>Editar Tutor</h2>
                <form onSubmit={handleAtualizarTutor}>
                    <div className='input-group'>
                        <label>Nome Completo</label>
                        <input 
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                            required
                        />
                    </div>

                    <div className='input-group'>
                        <label>E-mail</label>
                        <input
                            type='email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className='input-group'>
                        <label>Telefone</label>
                        <input
                            value={telefone}
                            onChange={e => setTelefone(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className='input-group'>
                        <label>Cidade</label>
                        <input
                            value={cidade}
                            onChange={e => setCidade(e.target.value)}
                            required
                        />
                    </div>

                    <div className='actions'>
                        <button type='button' className='btn-outline' onClick={() => navigate('/home')}>
                            Cancelar
                        </button>
                        <button type='submit'>Salvar Alteração</button>
                    </div>
                </form>
            </div>
        </div>
    )
}