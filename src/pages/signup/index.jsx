import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  MdEmail,
  MdCalendarMonth,
  MdLock,
  MdPermIdentity,
  MdPerson,
} from "react-icons/md";
import { FaGithub, FaLinkedin } from "react-icons/fa";
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
  Text,
  UploadButton,
} from "./styles";

const SignUp = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  //const phoneReg = /(\(?\d{2}\)?\s)?(\d{4,5}-\d{4})/;
  //const cpfReg = /(\d{3}.\d{3}.\d{3}-\d{2})/;

  const schema = yup.object().shape({
    nome: yup.string().required("Campo obrigatório"),

    cpf: yup.number().required("Campo obrigatório"),

    dataNascimento: yup.date().required("Campo obrigatório"),

    email: yup.string().required("Campo obrigatório"),

    senha: yup.string().required("Campo obrigatório"),
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

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const newLogUser = async (formData) => {
    try {
      const dataForm = new FormData(); 
      dataForm.append("nome", formData.nome);
      dataForm.append("cpf", formData.cpf);
      dataForm.append("dataNascimento", formData.dataNascimento);
      dataForm.append("github", formData.github);
      dataForm.append("linkedin", formData.linkedin);
      dataForm.append("email", formData.email);
      dataForm.append("senha", formData.senha);
      
      console.log("Imagem selecionada:", image);
      if (image) {
        dataForm.append("foto", image);
      }

      const { data } = await api.post(`/alunos`, dataForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      alert("Cadastro realizado! Faça o login para continuar");
      console.log(data);
      navigate("/login");
    } catch (e) {
      console.error("Erro ao cadastrar o usuário:", e);
      alert("Houve um erro ao realizar o cadastro. Tente novamente.");
    }
  };

  return (
    <>
      <Header />
      <Title>Faça seu cadastro</Title>
      <Container>
        <Wrapper>
          <form onSubmit={handleSubmit(newLogUser)}>
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
                placeholder="Senha*"
                leftIcon={<MdLock />}
                name="senha"
                control={control}
              />
              <span>{errors.senha?.message}</span>
            </Row>
            <Row>
            <UploadButton>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }} // Oculta o input padrão
                />
                {image ? "Foto selecionada" : "Adicionar foto"}
              </UploadButton>
            </Row>
            <ButtonContainer>
              <Button title="Confirmar" variant="primary" type="submit" />
              <Button title="Cancelar" variant="secondary" onClick={() => navigate("/")} />
            </ButtonContainer>
          </form>
        </Wrapper>
      </Container>
    </>
  );
};

export { SignUp };
