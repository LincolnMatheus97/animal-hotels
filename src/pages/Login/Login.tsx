import { useState } from "react"
import { useNavigate } from "react-router-dom";
import './Login.css'
import { api } from "../../services/api";
import {Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";

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
            console.log('Erro completo:', error);
            
            if (error.response) {
                if (error.response.status === 401) {
                    alert('Email ou senha incorretos!');
                } else {
                    alert(`Erro: ${error.response.data?.erro || 'Erro no servidor'}`);
                }
            } else {
                alert('Erro ao conectar com o servidor. Verifique se ele está rodando!');
            }
        }
    };

    return (
        <div className="login-container">
            <div className="card">
                <div className="titulo-container">
                    <h1>Animal Hotels 🐾</h1>
                    <p>Faça o login para gerenciar tutores e animais!</p>
                </div>
                <form onSubmit={(e) => {console.log(`entro`); handleSubmit(e);}}>
                    <Input
                        label="E-Mail"
                        type="email"
                        id="email"
                        placeholder="Digite o seu email"
                        value={email}
                        onChange={(e: any) => setEmail(e.target.value)}
                    />

                    <Input
                        label="Senha"
                        type="password"
                        id="senha"
                        placeholder="Digite sua senha"
                        value={senha}
                        onChange={(e : any) => setSenha(e.target.value)}
                    />

                    <Button type="submit" fullWidth>
                        Entrar
                    </Button>
                </form>
            </div>
        </div>
    )
}