import { useState } from "react"
import { useNavigate } from "react-router-dom";

export function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log('Dados de Login:', {email, senha});

        if (email && senha) {
            alert('Login realizado com sucesso! (Simulado)');
            navigate('/home');
        } else {
            alert('Preencha todos os campos!');
        }
    };

    return (
        <div className="login-container">
            <div className="card">
                <h1>Animal Hotels 🐾</h1>
                <p>Faça o login para gerenciar tutores</p>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">E-Mail</label>
                        <input 
                            type="email" 
                            id="email"
                            placeholder="thalissonmoura@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="senha">Senha</label>
                        <input 
                            type="senha"
                            id="senha"
                            placeholder="**********"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                    </div>

                    <button type="submit">Entrar</button>
                </form>
            </div>
        </div>
    )
}