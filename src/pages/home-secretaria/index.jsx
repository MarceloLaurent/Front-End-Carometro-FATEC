import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../services/api"; // Certifique-se de que api está configurado corretamente
import { Container } from "./styles";
import { GenericTable } from "../../components/GenericTable"; // Componente da tabela genérica
import { AdmLogado } from "../../components/Adm-Logado";

const HomeSecretaria = () => {
  const { tipo } = useParams(); // Captura o id e tipo da URL
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento

  useEffect(() => {
    // Se não houver tipo, não faz requisição, apenas exibe a mensagem padrão
    if (!tipo) {
      setLoading(false); // Não faz a requisição e exibe a mensagem padrão
      return;
    }

    const fetchData = async () => {
      try {
        let response;

        // Verifica o tipo e faz a requisição apropriada
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
            setLoading(false); // Caso o tipo seja desconhecido, também termina o carregamento
            return;
        }

        setDados(response.data); // Armazenando os dados recebidos da API
        setLoading(false); // Define o estado de carregamento como falso
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        alert("Não foi possível carregar os dados.");
        setLoading(false); // Mesmo em caso de erro, o carregamento é desfeito
      }
    };

    fetchData(); // Chama a função para buscar os dados apenas se o tipo for válido

  }, [tipo]); // A dependência é o "tipo", garantindo que a requisição seja feita toda vez que "tipo" mudar

  // Função para formatar a data no formato dd/mm/aaaa
  const formatarData = (data) => {
    const dataObj = new Date(data);
    const dia = String(dataObj.getDate()).padStart(2, "0");
    const mes = String(dataObj.getMonth() + 1).padStart(2, "0");
    const ano = dataObj.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  // Função para definir as colunas com base no tipo
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
      <AdmLogado /> {/* AdmLogado sempre exibido */}
      <Container>
        <h2>
          {/* Título dinâmico ou mensagem padrão */}
          {tipo
            ? `Gerenciar ${tipo.charAt(0).toUpperCase() + tipo.slice(1)}`
            : "Selecione os dados que deseja gerenciar"}
        </h2>

        {/* Exibição da tabela ou mensagem */}
        {loading ? (
          <p>Carregando dados...</p>
        ) : tipo ? (
          dados.length > 0 ? (
            <GenericTable
              dados={dados.map((item) => ({
                ...item,
                // Formata a data de nascimento antes de exibir, se aplicável
                dataNascimento: item.dataNascimento
                  ? formatarData(item.dataNascimento)
                  : "",
              }))}
              colunas={definirColunas(tipo)} // Passa as colunas para o GenericTable com base no tipo
              tipo={tipo} // Passa o tipo para o GenericTable
              onExcluir={(id) =>
                setDados(dados.filter((item) => item.id !== id)) // Remove o item excluído da lista
              }
            />
          ) : (
            <p>Não há dados para exibir.</p> // Mensagem caso não haja dados
          )
        ) : (
          <p>Selecione os dados que deseja gerenciar.</p> // Exibe a mensagem padrão caso tipo seja indefinido
        )}
      </Container>
    </>
  );
};

export { HomeSecretaria };
