import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ApiService } from "../../services/ApiService";

import "./Header.css";

export function Header() {
  const [user, setUser] = useState({
    id: -1,
    email: "",
    first_name: "",
    last_name: "",
    username: "",
});

  const isAuth = Boolean(window.localStorage.getItem("access"));

  const logout = () => {
    window.localStorage.removeItem("access");
    window.localStorage.removeItem("refresh");
    window.location.reload();
  };

  useEffect(() => {
    (async () => {
      if (isAuth) {
        const data = await ApiService("current_user");
        setUser(data);
      }
    })();
  }, []);

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
      {isAuth ?
        <button className="account" onClick={logout}>{user.username} (Выйти)</button> :
        <Link className="account" to="/login">Войти</Link>}
    </header>
  );
}
