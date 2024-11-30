import styled from "styled-components";

export const TableContainer = styled.div`
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;

  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #156082;
    font-weight: bold;
  }

  tr:hover {
    background-color: #f1f1f1;
  }
`;

export const TableAction = styled.td`
  display: flex;
  gap: 10px;
  justify-content: flex-start;
`;

export const TableButton = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &.editar {
    background-color: #4caf50;
    color: white;

    &:hover {
      background-color: #45a049;
    }
  }

  &.excluir {
    background-color: #f44336;
    color: white;

    &:hover {
      background-color: #d32f2f;
    }
  }
`;

export const TableHeader = styled.thead`
  background-color: #2c3e50;
  color: white;

  th {
    padding: 15px;
    text-align: center;
  }
`;

export const TableBody = styled.tbody`
  tr:nth-child(even) {
    background-color: #f8f8f8;
  }

  tr:nth-child(odd) {
    background-color: #ffffff;
  }
`;

