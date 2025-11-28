import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../services/api';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import './EditarAnimal.css';
import { ToastContext } from '../../context/ToastProvider';

export function EditarAnimal() {
  const [nome, setNome] = useState('');
  const [especie, setEspecie] = useState('Cachorro');
  const [raca, setRaca] = useState('');
  const [idade, setIdade] = useState('');
  const [imagem, setImagem] = useState('');
  const [tutorId, setTutorId] = useState(''); 

  const { id } = useParams();
  const navigate = useNavigate();

  const context = useContext(ToastContext);
    const { showToast } = context;

  useEffect(() => {
    async function carregarAnimal() {
        try {
            const response = await api.get(`/animais/${id}`);
            
            setNome(response.data.nome);
            setEspecie(response.data.especie);
            setRaca(response.data.raca);
            setIdade(response.data.idade);
            setImagem(response.data.imagem || '');
            setTutorId(response.data.tutorId);

        } catch (error) {
            showToast({ message: 'Erro ao buscar dados do animal', type: 'error' });
            navigate('/home');
        }
    }
    carregarAnimal();
  }, [id]);

  async function handleEditarAnimal(e: React.FormEvent) {
        e.preventDefault();

        const animalAtualizado = {
            nome,
            especie,
            raca,
            idade,
            imagem,
            tutorId
        };

        try {
            await api.put(`/animais/${id}`, animalAtualizado);
            showToast({ message: 'Animal atualizado com sucesso!', type: 'success' });
            navigate(`/tutor/${tutorId}/animais`);
        } catch (error) {
            console.error(error);
            showToast({ message: 'Erro ao atualizar animal.', type: 'error' });
        }
  }

  return (
    <div className="login-container">
        <div className="card">
            <h2>Editar Animal</h2>
            <form onSubmit={handleEditarAnimal}>
                <Input
                    label="Nome do Animal"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    required
                />

                <Input
                    label="Especie do Animal"
                    value={especie}
                    onChange={e => setEspecie(e.target.value)}
                />

                <Input
                    label="Raça"
                    value={raca}
                    onChange={e => setRaca(e.target.value)}
                    required
                />

                <Input
                    label="Idade"
                    value={idade}
                    onChange={e => setIdade(e.target.value)}
                    required
                />

                <Input
                    label="URL da Foto"
                    value={imagem}
                    onChange={e => setImagem(e.target.value)}
                />

                <div className="actions">
                    <Button type="button" variant="cancelar" onClick={() => navigate(`/tutor/${tutorId}/animais`)}>
                        Cancelar
                    </Button>
                    <Button type="submit" variant="enter">Salvar Alterações</Button>
                </div>
            </form>
        </div>
    </div>
  );
}