import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../services/api';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { ToastContext } from '../../context/ToastProvider';

export function CriarAnimal() {
    const [nome, setNome] = useState('');
    const [especie, setEspecie] = useState('');
    const [raca, setRaca] = useState('');
    const [idade, setIdade] = useState('');
    const [imagem, setImagem] = useState('');

    const context = useContext(ToastContext);
    const { showToast } = context;

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
            showToast({ message: 'Animal cadastrado com sucesso!', type: 'success' });
            navigate(`/tutor/${id}/animais`);
        } catch (error) {
            console.log(error);
            showToast({ message: 'Erro ao cadastrar animal.', type: 'error' });
        }
    }

    return (
        <div className='login-container'>
            <div className='card'>
                <h2>Novo Animal</h2>

                <form onSubmit={handleCriarAnimal}>
                    <Input
                        label="Nome do Animal"
                        value={nome}
                        placeholder="Jupiter"
                        onChange={e => setNome(e.target.value)}
                        required
                    />

                    <Input
                        label="Especie do Animal"
                        value={especie}
                        placeholder="Ex: Gato, Cachorro..."
                        onChange={e => setEspecie(e.target.value)}
                        required
                    />
                    
                    <Input
                        label="Raça"
                        value={raca}
                        placeholder="Ex: Vira-lata, Siamês..."
                        onChange={e => setRaca(e.target.value)}
                        required
                    />

                    <Input
                        label="URL da Foto (Link)"
                        value={imagem}
                        placeholder="https://exemplo.com/foto-do-pet.jpg"
                        onChange={e => setImagem(e.target.value)}
                    />
                    
                    <Input
                        label="Idade"
                        value={idade}
                        placeholder="Ex: 3 anos"
                        onChange={e => setIdade(e.target.value)}
                        required
                    />

                    <div className="actions">
                        <Button type="button" variant="cancelar" onClick={() => navigate(`/tutor/${id}/animais`)}>
                            Cancelar
                        </Button>
                        <Button type="submit" variant="enter">Salvar Animal</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}