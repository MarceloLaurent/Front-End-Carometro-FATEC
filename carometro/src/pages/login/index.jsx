import { useNavigate } from "react-router-dom";
import { MdPermIdentity, MdLock } from "react-icons/md";
import { useForm } from "react-hook-form";

import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { api } from "../../services/api";

import {
  Container,
  Wrapper,
  Title,
  Row,
  EsqueciText,
  CriarText,
} from "./styles";

const Login = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const onSubmit = async (formData) => { 
    try {
      const { data } = await api.get(`/alunos`);

      for (let i = 0; i < data.length; i++) {
        if (data[i].cpf.toString() === formData.cpf && data[i].senha.toString() === formData.senha) {
          console.log("Usuário encontrado:", data[i]);
          navigate(`/logado/${data[i].idAluno}`);
          return "Usuário autenticado";  // Retorna status de sucesso
        }
      }

      alert("Usuário ou senha inválido");
      return "Usuário não encontrado";  // Retorna status de falha de autenticação
    } catch (e) {
      console.error("Erro ao tentar fazer login:", e);

      if (e.response && e.response.status === 404) {
        alert("Servidor não encontrado. Tente novamente mais tarde.");
      } else if (e.response && e.response.status === 500) {
        alert("Erro no servidor. Tente novamente mais tarde.");
      } else {
        alert(
          "Ocorreu um erro inesperado. Verifique sua conexão e tente novamente."
        );
      }
      return "Erro no login";  // Retorna status de erro
    }
};

  const handleSendPassword = () => {
    alert("Um e-mail de redefinição de senha foi enviado.");
  };

  return (
    <>
      <Header />
      <Title>Inicie sua sessão</Title>
      <Container>
        <Wrapper>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="number"
              placeholder="CPF: apenas números"
              leftIcon={<MdPermIdentity />}
              name="cpf"
              control={control}
            />
            {errors.cpf && <span>CPF é obrigatório</span>}
            <Input
              type="password"
              placeholder="Senha"
              leftIcon={<MdLock />}
              name="senha"
              control={control}
            />
            {errors.senha && <span>Senha é obrigatória</span>}
            <Button title="Entrar" variant="secondary" type="submit" />
          </form>
        </Wrapper>
        <Row>
          <EsqueciText href="" onClick={handleSendPassword}>
            Esqueci minha senha
          </EsqueciText>
          <CriarText href="/signup">Criar Conta</CriarText>
        </Row>
      </Container>
    </>
  );
};

export { Login };
