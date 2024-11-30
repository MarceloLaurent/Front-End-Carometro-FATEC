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

const AdmLogin = () => {
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
      const { data } = await api.get(`/funcionarios`);

      for (let i = 0; i < data.length; i++) {
        if (data[i].nome === formData.nome && data[i].codigo === formData.codigo) {
          console.log("Funcionário encontrado:", data[i]);
          navigate(`/secretaria/${data[i].idFunc}/alunos`);
          return "Funcionário autenticado";  // Retorna status de sucesso
        }
      }

      alert("nome ou código inválido");
      return "Funcionário não encontrado";  // Retorna status de falha de autenticação
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
              type="text"
              placeholder="Nome"
              leftIcon={<MdPermIdentity />}
              name="nome"
              control={control}
            />
            {errors.nome && <span>Nome é obrigatório</span>}
            <Input
              type="password"
              placeholder="Senha"
              leftIcon={<MdLock />}
              name="codigo"
              control={control}
            />
            {errors.codigo && <span>Senha é obrigatória</span>}
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

export { AdmLogin };
