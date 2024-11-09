import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./styles/global";

import { Home } from './pages/home';
import { HomeLogado} from './pages/home-logado';
import { Login } from './pages/login';
import { SignUp } from "./pages/signup";
import { Logado } from "./components/Logado";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/logado" element={<HomeLogado />} />
        <Route path="/logado/:id" element={<Logado />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
    </Router>
  );
}

export default App;
