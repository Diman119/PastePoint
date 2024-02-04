import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { CreatePaste } from "./components/CreatePaste/CreatePaste";
import { ViewPaste } from "./components/ViewPaste/ViewPaste";
import { PasteList } from "./components/PasteList/PasteList";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" Component={CreatePaste} />
          <Route path="/my" Component={PasteList} />
          <Route path="/favorites" Component={PasteList} />
          <Route path="/view/:id" Component={ViewPaste} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
