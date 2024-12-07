import styled from "styled-components";

export const Container = styled.main`
  width: 100%;
  max-width: 80%;
  margin: 0 auto;
  margin-top: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

export const Wrapper = styled.div`
  max-width: 300px;
  max-height: 100%;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

export const Title = styled.h2`
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  max-width: 100%;
  margin-top: 16px;
  line-height: 44px;
  text-align: center;
  color: #000000;
`;

export const Text = styled.p`
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  max-width: 100%;
  line-height: 12px;
  margin-top: 10px;
  margin-right: 100px;
  margin-left: 10px;
  color: #808080;
  white-space: nowrap;
`;


export const ButtonContainer = styled.main`
  width: 100%;
  max-width: 80%;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const UploadButton = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  padding: 5px;
  margin-left: 10px;
  font-family: "Open Sans", sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  background-color: #156082;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;