import { Container, Wrapper, Row, Menu, Logo, RightMenu } from "./styles";

const Header = () => {
  return (
    <Wrapper>
      <Container>
        <Row>
          <Menu href="/">Carômetro&reg;</Menu>
        </Row>
        <Row>
          <>
            <RightMenu href="/login">Entrar</RightMenu>
            <RightMenu href="/signup">Cadastrar</RightMenu>
            <RightMenu href="/adm-login">Entrar como Administrador</RightMenu>
          </>
        </Row>
        <Row>
          <Logo>Fatec</Logo>
        </Row>
      </Container>
    </Wrapper>
  );
};

export { Header };
