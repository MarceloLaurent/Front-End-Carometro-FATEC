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

const AddCurso = () => {
  const navigate = useNavigate();

  // Validação com YUP
  const schema = yup.object().shape({
    nomeCurso: yup.string().required("Campo obrigatório"),
    codigoCurso: yup.string().required("Campo obrigatório"),
    duracaoEmSemestres: yup
      .number()
      .typeError("Deve ser um número")
      .required("Campo obrigatório"),
    departamento: yup.string().required("Campo obrigatório"),
    numeroDeVagas: yup
      .number()
      .typeError("Deve ser um número")
      .required("Campo obrigatório"),
    turno: yup.string().required("Campo obrigatório"),
    modalidade: yup.string().required("Campo obrigatório"),
    arquivo: yup.mixed().optional() // Caso tenha arquivo, ele será opcional
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

  const addNewCurso = async (data) => {
    try {
      // Criando o FormData
      const formData = new FormData();
      formData.append("nomeCurso", data.nomeCurso);
      formData.append("codigoCurso", data.codigoCurso);
      formData.append("duracaoEmSemestres", parseInt(data.duracaoEmSemestres, 10));
      formData.append("departamento", data.departamento);
      formData.append("numeroDeVagas", parseInt(data.numeroDeVagas, 10));
      formData.append("turno", data.turno);
      formData.append("modalidade", data.modalidade);

      // Requisição POST com FormData
      const response = await api.post(`/cursos`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // O FormData cuida do tipo de conteúdo
        },
      });

      alert("Curso cadastrado com sucesso!");
      console.log(response.data);
      navigate("/"); // Navegar de volta após o sucesso
    } catch (e) {
      console.error("Erro ao cadastrar o curso:", e);
      alert("Houve um erro ao realizar o cadastro. Tente novamente.");
    }
  };

  return (
    <>
      <Header />
      <Title>Cadastrar Novo Curso</Title>
      <Container>
        <Wrapper>
          <form onSubmit={handleSubmit(addNewCurso)}>
            <Row>
              <Input
                type="text"
                placeholder="Nome do Curso*"
                name="nomeCurso"
                control={control}
              />
              <span>{errors.nomeCurso?.message}</span>
            </Row>
            <Row>
              <Input
                type="text"
                placeholder="Código do Curso*"
                name="codigoCurso"
                control={control}
              />
              <span>{errors.codigoCurso?.message}</span>
            </Row>
            <Row>
              <Input
                type="number"
                placeholder="Duração em Semestres*"
                name="duracaoEmSemestres"
                control={control}
              />
              <span>{errors.duracaoEmSemestres?.message}</span>
            </Row>
            <Row>
              <Input
                type="text"
                placeholder="Departamento*"
                name="departamento"
                control={control}
              />
              <span>{errors.departamento?.message}</span>
            </Row>
            <Row>
              <Input
                type="number"
                placeholder="Número de Vagas*"
                name="numeroDeVagas"
                control={control}
              />
              <span>{errors.numeroDeVagas?.message}</span>
            </Row>
            <Row>
              <Input
                type="text"
                placeholder="Turno*"
                name="turno"
                control={control}
              />
              <span>{errors.turno?.message}</span>
            </Row>
            <Row>
              <Input
                type="text"
                placeholder="Modalidade*"
                name="modalidade"
                control={control}
              />
              <span>{errors.modalidade?.message}</span>
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

export { AddCurso };
