import { useState } from 'react';
import './Login.css';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../services/api';

export function CriarAnimal() {
    const [nome, setNome] = useState('');
    const [especie, setEspecie] = useState('');
    const [raca, setRaca] = useState('');
    const [idade, setIdade] = useState('');
    const [imagem, setImagem] = useState('');

    const { id } = useParams();
    const navigate = useNavigate();

    async function handleCriarAnimal(e: React.FormEvent) {
        e.preventDefault();

        const novoAnimal = {
            nome,
            especie,
            raca,
            idade,
            imagem,
            tutorId: id
        };

        try {
            await api.post('/animais', novoAnimal);
            alert('Animal cadastrado com sucesso.');
            navigate(`/tutor/${id}/animais`);
        } catch (error) {
            console.log(error);
            alert('Erro ao cadastrar animal');
        }
    }

    return (
        <div className='login-container'>
            <div className='card'>
                <h2>Novo Animal</h2>

                <form onSubmit={handleCriarAnimal}>
                    <div className="input-group">
                        <label>Nome do Animal</label>
                        <input 
                            value={nome} 
                            placeholder='Jupiter'
                            onChange={e => setNome(e.target.value)} 
                            required 
                        />
                    </div>

                    <div className="input-group">
                        <label>Especie do Animal</label>
                        <input 
                            value={especie}
                            placeholder='Ex: Gato, Cachorro...'
                            onChange={e => setEspecie(e.target.value)} 
                            required 
                        />
                    </div>
                    
                    <div className="input-group">
                        <label>Raça</label>
                        <input 
                            value={raca} 
                            onChange={e => setRaca(e.target.value)} 
                            placeholder="Ex: Vira-lata, Siamês..."
                            required 
                        />
                    </div>

                    <div className="input-group">
                        <label>URL da Foto (Link)</label>
                        <input 
                            value={imagem} 
                            onChange={e => setImagem(e.target.value)} 
                            placeholder="https://exemplo.com/foto-do-pet.jpg" 
                        />
                    </div>
                    
                    <div className="input-group">
                        <label>Idade</label>
                        <input 
                            value={idade} 
                            onChange={e => setIdade(e.target.value)} 
                            placeholder="Ex: 3 anos"
                            required 
                        />
                    </div>

                    <div className='actions'>
                        <button type='button' className='btn-outline' onClick={() => navigate(`/tutor/${id}/animais`)}>
                            Cancelar
                        </button>
                        <button type='submit'>Salvar Animal</button>
                    </div>
                </form>
            </div>
        </div>
    );
}