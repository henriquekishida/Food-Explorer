import logoHeaderFoodExplorer from '../../assets/logoHeaderFoodExplorer.svg';

import { useNavigate } from 'react-router-dom';
import { api } from "../../services/api";
import { useState } from "react";

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

import { Container, Form } from './styles';

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function handleTurnBack() {
    navigate(-1);
  };

  async function handleSignUp() {
    if (!name || !email || !password) {
      return alert("Preencha todos os campos!");
    }

    if (password.length < 6) {
      return alert("A senha deve conter no mínimo 6 caracteres!");
    }

    setLoading(true);

    await api.post("/users", { name, email, password })
      .then(() => {
        alert("Usuário cadastrado com sucesso!");
        handleTurnBack();
      })
      .catch(error => {
        if (error.response) {
          alert(error.response.data.message);
        } else {
          alert("Não foi possível cadastrar.");
        }
      });
  };

  return (
    <Container>

      <div className='logo'>
        <img id='logo' src={logoHeaderFoodExplorer} alt="Food Explorer logo" />
      </div>

      <Form>

        <h1>Crie sua conta</h1>
        <label>
          <p>Seu nome</p>
          <Input
            placeholder="Exemplo: Maria da Silva"
            type="text"
            onChange={e => setName(e.target.value)}
          />
        </label>

        <label>
          <p>Email</p>
          <Input
            placeholder="Exemplo: exemplo@exemplo.com"
            type="text"
            onChange={e => setEmail(e.target.value)}
          />
        </label>

        <label>
          <p>Senha</p>
          <Input
            placeholder="No mínimo 6 caracteres"
            type="password"
            maxLength="10"
            onChange={e => setPassword(e.target.value)}
          />
        </label>

        <Button
          onClick={handleSignUp}
          title={loading ? 'Loading...' : 'Criar conta'}
        />
        <div>
          <a onClick={handleTurnBack}>
            Já tenho uma conta
          </a>
        </div>

      </Form>
    </Container>
  )
}