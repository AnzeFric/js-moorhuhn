import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Meni from "./pages/Meni.tsx";
import Lestvica from "./pages/Lestvica.tsx";
import Konec from "./pages/Konec.tsx";
import Game from "./pages/Game.tsx";
import './App.css'
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Meni />}></Route>

        <Route path="/lestvica" element={<Lestvica />}></Route>
        <Route path="/konec" element={<Konec />}></Route>
        <Route path='/game' element={<Game />}></Route>
      </Routes>
    </Router>
  );

}

export default App;