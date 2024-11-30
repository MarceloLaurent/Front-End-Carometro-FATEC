import React from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableButton,
  TableAction,
} from "./styles"; // Importa os estilos

const GenericTable = ({ dados, tipo, onExcluir }) => {
  const navigate = useNavigate();

  const excluirItem = async (id) => {
    try {
      await api.delete(`/${tipo}/${id}`);
      onExcluir(id);
    } catch (error) {
      console.error("Erro ao excluir item:", error);
    }
  };

  const editarItem = (id) => {
    navigate(`/${tipo}/${id}/editar`);
  };

  if (!dados || dados.length === 0) return <p>Sem dados para exibir.</p>;

  let colunas = [];
  if (tipo === "alunos") {
    colunas = ["nome", "dataNascimento"];
  } else if (tipo === "turmas") {
    colunas = ["nomeTurma", "periodo"];
  } else if (tipo === "cursos") {
    colunas = ["nomeCurso", "codigoCurso"];
  } else if (tipo === "coordenadores") {
    colunas = ["nome", "funcional"];
  }

  // Função para formatar a data no formato dd/mm/aaaa
  const formatarData = (data) => {
    const dataObj = new Date(data);
    const dia = String(dataObj.getDate()).padStart(2, "0");
    const mes = String(dataObj.getMonth() + 1).padStart(2, "0");
    const ano = dataObj.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <TableContainer>
      <Table>
        <TableHeader>
          <tr>
            {colunas.map((coluna) => (
              <th key={coluna}>{coluna.charAt(0).toUpperCase() + coluna.slice(1)}</th>
            ))}
            <th>Ações</th>
          </tr>
        </TableHeader>
        <TableBody>
          {dados.map((item) => (
            <tr key={item.id}>
              {colunas.map((coluna) => (
                <td key={coluna}>
                  {coluna === "dataNascimento"
                    ? formatarData(item[coluna]) // Formata a data de nascimento
                    : item[coluna]} {/* Exibe os outros dados normalmente */}
                </td>
              ))}
              <TableAction>
                <TableButton className="editar" onClick={() => editarItem(item.id)}>
                  Editar
                </TableButton>
                <TableButton className="excluir" onClick={() => excluirItem(item.id)}>
                  Excluir
                </TableButton>
              </TableAction>
            </tr>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export { GenericTable };
