import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { CreatePaste } from "./components/CreatePaste/CreatePaste";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<CreatePaste />} />
          <Route path="/my" element={<div>Мои пасты</div>} />
          <Route path="/favorites" element={<div>Избранное</div>} />
          <Route path="/view/:id" element={<div>Просмотр пасты</div>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
