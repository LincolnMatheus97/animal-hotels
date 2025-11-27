import { useState } from "react"
import { useNavigate } from "react-router-dom";
import './Login.css'
import { api } from "../services/api";

export function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log('Dados de Login:', {email, senha});

        try {
            const response = await api.post('/login', {
                email: email,
                senha: senha
            });

            const { token, usuario } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('usuarioNome', usuario.nome);

            alert(`Bem vindo, ${usuario.nome}!`);

            navigate('/home');
        } catch (error: any) {
            console.log(error);
            if (error.response.status === 401) {
                alert('Email ou senha incorretos!');
            } else {
                alert('Erro ao fazer login. Verifique se o servidor está rodando');
            }   
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