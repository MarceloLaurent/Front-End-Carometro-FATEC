import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Container } from "./styles";
import { api } from "../../services/api";
import { Logado } from "../../components/Logado";

const HomeLogado = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(`/alunos/${id}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Erro ao buscar os dados do aluno:", error);
        alert("Não foi possível carregar os dados do aluno.");
      }
    };

    fetchUserData();
    
  }, [id]);

  return (
    <>
      <Logado />
      <Container>
        <div>
          <h2>Dados Cadastrais</h2>
          {userData ? (
            <div>
              <p>
                <strong>Nome:</strong> {userData.nome}
              </p>
              <p>
                <strong>Data de Nascimento:</strong>{" "}
                {new Date(userData.dataNascimento).toLocaleDateString()}
              </p>
              <p>
                <strong>LinkedIn:</strong>{" "}
                <a
                  href={userData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {userData.linkedin}
                </a>
              </p>
              <p>
                <strong>GitHub:</strong>{" "}
                <a
                  href={userData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {userData.github}
                </a>
              </p>
              <p>
                <strong>E-mail:</strong> {userData.email}
              </p>
            </div>
          ) : (
            <p>Carregando dados...</p>
          )}
        </div>
      </Container>
    </>
  );
};

export { HomeLogado };
