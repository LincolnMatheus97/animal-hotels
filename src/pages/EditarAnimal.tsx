import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../services/api';
import './Login.css';

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
                <div className="input-group">
                    <label>Nome do Animal</label>
                    <input 
                        value={nome} 
                        onChange={e => 
                        setNome(e.target.value)} 
                        required 
                    />
                </div>

                <div className="input-group">
                    <label>Especie do Animal</label>
                    <input 
                        value={especie} 
                        onChange={e => 
                        setImagem(e.target.value)} 
                    />
                </div>

                <div className="input-group">
                    <label>Raça</label>
                    <input 
                        value={raca} 
                        onChange={e => 
                        setRaca(e.target.value)} 
                        required 
                    />
                </div>

                <div className="input-group">
                    <label>Idade</label>
                    <input 
                        value={idade} 
                        onChange={e => setIdade(e.target.value)} 
                        required 
                    />
                </div>

                <div className="input-group">
                    <label>URL da Foto</label>
                    <input 
                        value={imagem} 
                        onChange={e => 
                        setImagem(e.target.value)} 
                    />
                </div>

                <div className="actions">
                    <button type="button" className="btn-outline" onClick={() => navigate(`/tutor/${tutorId}/animais`)}>
                    Cancelar
                    </button>
                    <button type="submit">Salvar Alterações</button>
                </div>
            </form>
        </div>
    </div>
  );
}