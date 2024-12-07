import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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

const AddTurma = () => {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    nomeTurma: yup.string().required("Campo obrigatório"),
    periodo: yup.string().required("Campo obrigatório"),
    cursoId: yup.number().required("Selecione um curso válido"),
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

  const addNewTurma = async (formData) => {
    try {
      const { data } = await api.post(`/turmas`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("Turma cadastrada com sucesso!");
      console.log(data);
    } catch (e) {
      console.error("Erro ao cadastrar a turma:", e);
      alert("Houve um erro ao realizar o cadastro. Tente novamente.");
    }
  };

  return (
    <>
      <Header />
      <Title>Cadastrar Nova Turma</Title>
      <Container>
        <Wrapper>
          <form onSubmit={handleSubmit(addNewTurma)}>
            <Row>
              <Input
                type="text"
                placeholder="Nome da Turma*"
                name="nomeTurma"
                control={control}
              />
              <span>{errors.nomeTurma?.message}</span>
            </Row>
            <Row>
              <Input
                type="text"
                placeholder="Período*"
                name="periodo"
                control={control}
              />
              <span>{errors.periodo?.message}</span>
            </Row>
            <Row>
              <Input
                type="number"
                placeholder="ID do Curso*"
                name="cursoId"
                control={control}
              />
              <span>{errors.cursoId?.message}</span>
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

export { AddTurma };
