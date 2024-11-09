import { Container } from "./styles";
import { Logado } from "../../components/Logado";

const HomeLogado = () => {
  return (
    <>
      <Logado />
      <Container>
        <div>
          <h1>Wellcome to Backoffice!</h1>
        </div>
      </Container>
    </>
  );
};

export { HomeLogado };
