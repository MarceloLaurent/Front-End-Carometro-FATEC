import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";
import {
  Container,
  Wrapper,
  Row,
  Menu,
  MenuRight,
  UserPicture,
} from "./styles";

const Logado = () => {
  const { id } = useParams();
  const [aluno, setAluno] = useState(null);
  const [fotoBase64, setFotoBase64] = useState(null);

  useEffect(() => {
    const fetchPessoa = async () => {
      try {
        const { data } = await api.get(`/alunos/${id}`);

        if (data) {
          setAluno(data);

          if (data.foto) {
            const fotoComPrefixo = `data:image/jpeg;base64,${data.foto}`;

            setFotoBase64(fotoComPrefixo);
          }
        } else {
          console.error("Aluno não encontrado!");
        }
      } catch (error) {
        console.error("Erro ao buscar aluno:", error);
      }
    };

    fetchPessoa();
  }, [id]);

  if (!aluno) return <p>Carregando...</p>;

  return (
    <Wrapper>
      <Container>
        <Row>
          <>
            {/* Usando a string Base64 com o prefixo correto */}
            <UserPicture
              src={fotoBase64 || "caminho/para/imagem/default.jpg"}
              alt={`Foto de ${aluno.nome}`}
            />
            <Menu href="/">Carômetro&reg;</Menu>
          </>
        </Row>
        <Row>
          <>
            <MenuRight href={`/update/${id}`}>Alterar dados</MenuRight>
            <MenuRight href="/">Sair</MenuRight>
          </>
        </Row>
      </Container>
    </Wrapper>
  );
};

export { Logado };
