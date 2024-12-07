import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MdCalendarMonth } from "react-icons/md";

import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { api } from "../../services/api";

import {
  Container,
  Wrapper,
  Title,
  ButtonContainer,
  Row,
} from "./styles";

const AddCoordenador = () => {
  const navigate = useNavigate();

  // Validação com YUP
  const schema = yup.object().shape({
    nome: yup.string().required("Campo obrigatório"),
    funcional: yup.string().required("Campo obrigatório"),
    dataInicio: yup
      .date()
      .typeError("Data inválida")
      .required("Campo obrigatório"),
    dataFim: yup
      .date()
      .typeError("Data inválida")
      .nullable(true), // Campo opcional
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
    mode: "onChange",
  });

  // Função para adicionar um novo Coordenador
  const addNewCoordenador = async (data) => {
    try {
      const formData = {
        nome: data.nome,
        funcional: data.funcional,
        dataInicio: data.dataInicio,
        dataFim: data.dataFim || null, // Pode ser nulo
      };

      const response = await api.post(`/coordenadores`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("Coordenador cadastrado com sucesso!");
      console.log(response.data);
      navigate("/coordenadores"); // Redireciona para a lista de coordenadores
    } catch (e) {
      console.error("Erro ao cadastrar o coordenador:", e);
      alert("Houve um erro ao realizar o cadastro. Tente novamente.");
    }
  };

  return (
    <>
      <Header />
      <Title>Cadastrar Novo Coordenador</Title>
      <Container>
        <Wrapper>
          <form onSubmit={handleSubmit(addNewCoordenador)}>
            <Row>
              <Input
                type="text"
                placeholder="Nome do Coordenador*"
                name="nome"
                control={control}
              />
              <span>{errors.nome?.message}</span>
            </Row>
            <Row>
              <Input
                type="text"
                placeholder="Funcional*"
                name="funcional"
                control={control}
              />
              <span>{errors.funcional?.message}</span>
            </Row>
            <Row>
              <Input
                type="date"
                leftIcon={<MdCalendarMonth />}
                name="dataInicio"
                control={control}
              />
              <span>{errors.dataInicio?.message}</span>
            </Row>
            <Row>
              <Input
                type="date"
                leftIcon={<MdCalendarMonth />}
                name="dataFim"
                control={control}
              />
              <span>{errors.dataFim?.message}</span>
            </Row>
            <ButtonContainer>
              <Button title="Confirmar" variant="primary" type="submit" />
              <Button
                title="Cancelar"
                variant="secondary"
                onClick={() => navigate("/")}
              />
            </ButtonContainer>
          </form>
        </Wrapper>
      </Container>
    </>
  );
};

export { AddCoordenador };
