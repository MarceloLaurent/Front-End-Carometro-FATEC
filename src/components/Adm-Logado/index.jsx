import { useParams} from "react-router-dom"; // Importando o componente Link
import { Container, Wrapper, Row, Menu, MenuRight } from "./styles";

const AdmLogado = () => {
  const { id } = useParams(); // Capturamos o id da URL

  return (
    <Wrapper>
      <Container>
        <Row>
          <Menu to="/">Carômetro&reg;</Menu>{" "}
        </Row>
        <Row>
          <MenuRight to={`/secretaria/${id}/alunos`}>Alunos</MenuRight>{" "}
          <MenuRight to={`/secretaria/${id}/turmas`}>Turmas</MenuRight>{" "}
          <MenuRight to={`/secretaria/${id}/cursos`}>Cursos</MenuRight>{" "}
          <MenuRight to={`/secretaria/${id}/coordenadores`}>
            Coordenadores
          </MenuRight>{" "}
          <MenuRight to="/">Sair</MenuRight>{" "}
        </Row>
      </Container>
    </Wrapper>
  );
};

export { AdmLogado };
