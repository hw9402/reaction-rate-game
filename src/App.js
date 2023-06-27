import GlobalStyle from "./styles/global.style";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Game from "./pages/game/Game";
import Rank from "./pages/rank/Rank";
import EnterRank from "./pages/game/EnterRank";

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" exact={true} element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/rank" element={<Rank />} />
          <Route path="/form" element={<EnterRank />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
