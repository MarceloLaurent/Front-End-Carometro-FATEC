import styled from "styled-components";

export const Container = styled.main`
  width: 100%;
  max-width: 80%;
  margin: 0 auto;
  margin-top: 36px;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const Wrapper = styled.div`
  max-width: 300px;
`;

export const Row = styled.div`
  display: flex;
  margin: 180px 0 0 60px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h2`
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 44px;
  margin: 80px 0 0 -25%;
  color: #000000;
  text-align: center;
`;

export const EsqueciText = styled.a`
  margin-top: 8px;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 19px;
  text-decoration: none;
  margin-right: 10px;
  color: #ff0000;
`;

export const CriarText = styled.a`
  margin-top: 8px;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 19px;
  text-decoration: none;

  color: #483d8b;
`;
