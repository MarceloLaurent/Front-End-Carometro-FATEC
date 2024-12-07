import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./styles/global";

import { Home } from './pages/home';
import { HomeLogado} from './pages/home-logado';
import { Login } from './pages/login';
import { SignUp } from "./pages/signup";
import { Logado } from "./components/Logado";
import { Update } from "./pages/update";
import { AdmLogin } from "./pages/adm-login";
import { HomeSecretaria } from "./pages/home-secretaria";
import { AddCurso } from "./pages/add-curso";
import { AddCoordenador } from "./pages/add-coordenador";
import { AddTurma } from "./pages/add-turma";


function App() {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/logado/:id" element={<HomeLogado />} />
        <Route path="/logado/:id" element={<Logado />} />
        <Route path="/secretaria/:id/:tipo" element={<HomeSecretaria />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adm-login" element={<AdmLogin />} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/secretaria/:id/:tipo/add/cursos" element={<AddCurso/>} />
        <Route path="/secretaria/:id/:tipo/add/coordenadores" element={<AddCoordenador/>} />
        <Route path="/secretaria/:id/:tipo/add/turmas" element={<AddTurma/>} />
      </Routes>
    </Router>
  );
}

export default App;
