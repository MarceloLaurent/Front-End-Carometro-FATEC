import { useEffect, useState } from "react";
import { useParams, useNavigate  } from "react-router-dom";
import { api } from "../../services/api"; // Certifique-se de que api está configurado corretamente
import { Container } from "./styles";
import { GenericTable } from "../../components/GenericTable"; // Componente da tabela genérica
import { AdmLogado } from "../../components/Adm-Logado";

const HomeSecretaria = () => {
  const { tipo } = useParams(); // Captura o tipo da URL
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); // Inicializa o hook de navegação

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;

        switch (tipo) {
          case "alunos":
            response = await api.get("/alunos");
            break;
          case "turmas":
            response = await api.get("/turmas");
            break;
          case "cursos":
            response = await api.get("/cursos");
            break;
          case "coordenadores":
            response = await api.get("/coordenadores");
            break;
          default:
            console.log("Tipo não reconhecido");
            setLoading(false);
            return;
        }

        const dadosFormatados = response.data.map((item) => ({
          ...item,
          id: item.id || item.codigo || item._id,
        }));

        setDados(dadosFormatados);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        alert("Não foi possível carregar os dados.");
        setLoading(false);
      }
    };

    if (tipo) fetchData();
  }, [tipo]);

  const handleExcluir = async (id) => {
    try {
      await api.delete(`/${tipo}/${id}`);
      setDados((prevDados) => prevDados.filter((item) => item.id !== id));
      window.location.reload();
    } catch (error) {
      window.location.reload();
      console.error("Erro ao excluir o item:", error);
    }
  };

  const handleAdicionar = () => {
    // Redireciona para a página de adição com tipo dinâmico
    navigate(`/secretaria/1/${tipo}/add/${tipo}`);
  };

  const formatarData = (data) => {
    if (!data) return "";
    try {
      const dataObj = new Date(data);
      const dia = String(dataObj.getDate()).padStart(2, "0");
      const mes = String(dataObj.getMonth() + 1).padStart(2, "0");
      const ano = dataObj.getFullYear();
      return `${dia}/${mes}/${ano}`;
    } catch (error) {
      console.error("Erro ao formatar data:", data, error);
      return "";
    }
  };

  const definirColunas = (tipo) => {
    switch (tipo) {
      case "alunos":
        return [
          { label: "Aluno", key: "nome" },
          { label: "Data de Nascimento", key: "dataNascimento" },
        ];
      case "turmas":
        return [
          { label: "Nome da Turma", key: "nomeTurma" },
          { label: "Período", key: "periodo" },
        ];
      case "cursos":
        return [
          { label: "Nome do Curso", key: "nomeCurso" },
          { label: "Descrição", key: "descricao" },
        ];
      case "coordenadores":
        return [
          { label: "Nome", key: "nome" },
          { label: "Código", key: "codigo" },
        ];
      default:
        return [];
    }
  };

  return (
    <>
      <AdmLogado />
      <Container>
        <h2>
          {tipo
            ? `Gerenciar ${tipo.charAt(0).toUpperCase() + tipo.slice(1)}`
            : "Selecione os dados que deseja gerenciar"}
        </h2>

        {loading ? (
          <p>Carregando dados...</p>
        ) : tipo ? (
          dados.length > 0 ? (
            <>
              <GenericTable
                dados={dados.map((item) => ({
                  ...item,
                  dataNascimento: item.dataNascimento
                    ? formatarData(item.dataNascimento)
                    : "",
                }))}
                colunas={definirColunas(tipo)}
                tipo={tipo}
                onExcluir={handleExcluir}
              />
              <div className="button-container">
                <button onClick={handleAdicionar}>
                  {tipo
                    ? `Adicionar ${tipo.charAt(0).toUpperCase() + tipo.slice(1)}`
                    : "Selecione os dados que deseja gerenciar"}
                </button>
              </div>
            </>
          ) : (
            <>
              <p>Não há dados para exibir.</p>
              <div className="button-container">
                <button onClick={handleAdicionar}>Adicionar Item</button>
              </div>
            </>
          )
        ) : (
          <p>Selecione os dados que deseja gerenciar.</p>
        )}
      </Container>
    </>
  );
};

export { HomeSecretaria };
