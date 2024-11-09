
import { Container } from "./styles";
import { Header } from "../../components/Header";

const Home = () => {

  return (
    <>
      <Header />
      <Container>
        <div>
          <h1>Bem vindo ao Carômetro!</h1>
        </div>
      </Container>
    </>
  );
};

export { Home };
