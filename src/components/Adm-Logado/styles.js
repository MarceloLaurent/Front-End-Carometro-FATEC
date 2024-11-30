import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  width: 100%;
  max-width: 80%;
  height: 75px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Wrapper = styled.div`
  background-color: #156082;
  width: 100%;
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Menu = styled.a`
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 25px;
  color: #ffffff;
  margin-right: 12px;
  text-decoration: none;
`;

export const MenuRight = styled(Link)` // Substituí styled.a por styled(Link)
  font-family: "Open Sans";
  font-style: normal;
  font-size: 16px;
  line-height: 25px;
  color: #ffffff;
  margin-right: 12px;
  text-decoration: none;

  &:hover {
    text-decoration: underline; // Adiciona um efeito hover para links
  }
`;

export const UserPicture = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 22px;
  border: 1px solid #ffffff;
`;
