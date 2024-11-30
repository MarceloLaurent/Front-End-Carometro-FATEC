import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import {
  MdEmail,
  MdCalendarMonth,
  MdLock,
  MdPermIdentity,
  MdPerson,
} from "react-icons/md";
import { FaGithub, FaLinkedin } from "react-icons/fa";

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
  Text,
  UploadButton,
} from "./styles";

const Update = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [aluno, setAluno] = useState(null);
  const [image, setImage] = useState(null);

  const schema = yup.object().shape({
    nome: yup.string().required("Campo obrigatório"),
    cpf: yup.string().required("Campo obrigatório"),
    dataNascimento: yup.date().required("Campo obrigatório"),
    email: yup.string().required("Campo obrigatório"),
    senha: yup.string(),
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
    mode: "onChange",
  });

  useEffect(() => {
    const fetchAluno = async () => {
      try {
        const { data } = await api.get(`/alunos/${id}`);
        if (data) {
          setAluno(data);
  
          // Conversão de data para o formato "yyyy-MM-dd"
          const formattedDate = new Date(data.dataNascimento)
            .toISOString()
            .split("T")[0];
  
          setValue("nome", data.nome);
          setValue("cpf", data.cpf);
          setValue("dataNascimento", formattedDate); // Use a data formatada aqui
          setValue("email", data.email);
          setValue("github", data.github);
          setValue("linkedin", data.linkedin);
        }
      } catch (error) {
        console.error("Erro ao buscar aluno:", error);
      }
    };
  
    fetchAluno();
  }, [id, setValue]);
  

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const updateAluno = async (formData) => {
    try {
      const dataForm = new FormData();
      dataForm.append("nome", formData.nome);
      dataForm.append("cpf", formData.cpf);
      dataForm.append("dataNascimento", formData.dataNascimento);
      dataForm.append("github", formData.github);
      dataForm.append("linkedin", formData.linkedin);
      dataForm.append("email", formData.email);

      if (formData.senha) {
        dataForm.append("senha", formData.senha);
      }

      if (image) {
        dataForm.append("foto", image);
      }

      await api.put(`/alunos/${id}`, dataForm, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Cadastro atualizado com sucesso!");
      navigate(`/logado/${id}`);
    } catch (error) {
      console.error("Erro ao atualizar cadastro:", error);
      alert("Houve um erro ao atualizar o cadastro. Tente novamente.");
    }
  };

  if (!aluno) return <p>Carregando...</p>;

  return (
    <>
      <Header />
      <Title>Atualize seu cadastro</Title>
      <Container>
        <Wrapper>
          <form onSubmit={handleSubmit(updateAluno)}>
            <Row>
              <Input
                type="text"
                placeholder="Nome completo*"
                leftIcon={<MdPerson />}
                name="nome"
                control={control}
              />
              <span>{errors.nome?.message}</span>
              <Input
                type="number"
                placeholder="CPF: apenas números*"
                leftIcon={<MdPermIdentity />}
                name="cpf"
                control={control}
              />
              <span>{errors.cpf?.message}</span>
            </Row>
            <Row>
              <Text>Data de Nascimento*:</Text>
              <Input
                type="date"
                leftIcon={<MdCalendarMonth />}
                name="dataNascimento"
                control={control}
              />
              <span>{errors.dataNascimento?.message}</span>
            </Row>
            <Row>
              <Input
                type="text"
                placeholder="GitHub"
                leftIcon={<FaGithub />}
                name="github"
                control={control}
              />
              <Input
                type="text"
                placeholder="LinkedIn"
                leftIcon={<FaLinkedin />}
                name="linkedin"
                control={control}
              />
            </Row>
            <Row>
              <Input
                type="text"
                placeholder="E-mail*"
                leftIcon={<MdEmail />}
                name="email"
                control={control}
              />
              <span>{errors.email?.message}</span>
              <Input
                type="password"
                placeholder="Nova Senha (opcional)"
                leftIcon={<MdLock />}
                name="senha"
                control={control}
              />
            </Row>
            <Row>
              <UploadButton>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                {image ? "Foto selecionada" : "Atualizar foto"}
              </UploadButton>
            </Row>
            <ButtonContainer>
              <Button title="Atualizar" variant="primary" type="submit" />
              <Button title="Cancelar" variant="secondary" onClick={() => navigate(`/logado/${id}`)} />
            </ButtonContainer>
          </form>
        </Wrapper>
      </Container>
    </>
  );
};

export { Update };
