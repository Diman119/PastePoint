import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { CreatePaste } from "./components/CreatePaste/CreatePaste";
import { ViewPaste } from "./components/ViewPaste/ViewPaste";
import { PasteList } from "./components/PasteList/PasteList";
import { LoginScreen } from "./components/LoginScreen/LoginScreen";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" Component={CreatePaste} />
          <Route path="/my" element={<PasteList endpoint="my_pastes" />} />
          <Route path="/favorites" element={<PasteList endpoint="favorites" />} />
          <Route path="/view/:id" Component={ViewPaste} />
          <Route path="/login" Component={LoginScreen} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
