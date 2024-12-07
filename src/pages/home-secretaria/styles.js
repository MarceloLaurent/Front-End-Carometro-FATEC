import styled from 'styled-components';

export const Container = styled.main`
    width: 100%;
    max-width: 80%;
    margin: 0 auto;
    margin-top: 120px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    .button-container {
    display: flex;
    justify-content: center; /* Centraliza o botão */
    margin-top: 5px; /* Adiciona espaçamento entre a tabela e o botão */
  }

  button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }
  }
`
