import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../services/api';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import './EditarAnimal.css';

export function EditarAnimal() {
  const [nome, setNome] = useState('');
  const [especie, setEspecie] = useState('Cachorro');
  const [raca, setRaca] = useState('');
  const [idade, setIdade] = useState('');
  const [imagem, setImagem] = useState('');
  const [tutorId, setTutorId] = useState(''); 

  const { id } = useParams();
  const navigate = useNavigate();

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
            alert("Erro ao buscar dados do animal");
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
            alert('Animal atualizado com sucesso!');
            navigate(`/tutor/${tutorId}/animais`);
        } catch (error) {
            console.error(error);
            alert('Erro ao atualizar animal.');
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
                    <Button type="submit" variant="enter">Salvar Alterações</Button>
                    <Button type="button" variant="cancelar" onClick={() => navigate(`/tutor/${tutorId}/animais`)}>
                        Cancelar
                    </Button>
                </div>
            </form>
        </div>
    </div>
  );
}