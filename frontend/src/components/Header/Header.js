import { Link } from "react-router-dom";

import "./Header.css";

export function Header() {
  return (
    <header className="header">
      <div className="name">PastePoint</div>
      <div className="links">
        <Link to="/">
          <button>Создать</button>
        </Link>
        <Link to="/my">
          <button>Мои пасты</button>
        </Link>
        <Link to="/favorites">
          <button>Избранное</button>
        </Link>
      </div>
      <button className="account">Войти...</button>
    </header>
  );
}
