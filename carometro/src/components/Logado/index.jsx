import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";
import { Container, Wrapper, Row, Menu, MenuRight, UserPicture } from "./styles";

const Logado = () => {
  const { id } = useParams();  // Obtém o ID do aluno a partir da URL
  const [aluno, setAluno] = useState(null);
  const [fotoBase64, setFotoBase64] = useState(null);

  // Função para buscar os dados do aluno e exibir a foto
  useEffect(() => {
    const fetchAluno = async () => {
      try {
        const { data } = await api.get(`/alunos/${id}`);
        
        if (data) {
          setAluno(data);

          if (data.foto) {
            // Adicionando o prefixo Base64 à string da foto
            const fotoComPrefixo = `data:image/jpeg;base64,${data.foto}`;

            // Definindo a foto em Base64 para ser usada no src
            setFotoBase64(fotoComPrefixo);
            console.log("Imagem Base64 recebida:", fotoComPrefixo);
          }
        } else {
          console.error("Aluno não encontrado!");
        }
      } catch (error) {
        console.error("Erro ao buscar aluno:", error);
      }
    };

    fetchAluno();
  }, [id]);

  if (!aluno) return <p>Carregando...</p>;

  return (
    <Wrapper>
      <Container>
        <Row>
          <>
            {/* Usando a string Base64 com o prefixo correto */}
            <UserPicture src={fotoBase64 || 'caminho/para/imagem/default.jpg'} alt={`Foto de ${aluno.nome}`} />
            <Menu>Carômetro&reg;</Menu>
          </>
        </Row>
        <Row>
          <>
            <MenuRight href="/">Alterar Cadastro</MenuRight>
            <MenuRight href="/">Sair</MenuRight>
          </>
        </Row>
      </Container>
    </Wrapper>
  );
};

export { Logado };
