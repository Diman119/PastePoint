import { useState } from "react";
import { ApiService } from "../../services/ApiService";

import "./LoginScreen.css";

export function LoginScreen() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isAuthForm, setIsAuthForm] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const onAuth = async (event) => {
    event.preventDefault();

    window.localStorage.removeItem("access");
    window.localStorage.removeItem("refresh");

    const { access, refresh } = await ApiService("token/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: login, password }),
    });

    window.localStorage.setItem("access", access);
    window.localStorage.setItem("refresh", refresh);
    window.location.href = "/";
  };

  const onRegister = async (event) => {
    const formData = new FormData();
    formData.append("username", login);
    formData.append("password", password);
    formData.append("email", email);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);

    await ApiService("create_user/", {
      method: "post",
      body: formData,
    });

    await onAuth(event);
  };

  return (
    <div className="content" style={{justifyContent: "center"}}>
      <div className="panel" style={{width: "30%"}}>
        <div className="login-screen">
          {isAuthForm ?
            <div className="title">Вход</div> :
            <div className="title">Регистрация</div>}

          <form onSubmit={(event) => event.preventDefault()}>
            {!isAuthForm && <label className="subtitle">Имя</label>}
            {!isAuthForm && <input className="input-element"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />}

            {!isAuthForm && <label className="subtitle">Фамилия</label>}
            {!isAuthForm && <input className="input-element"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />}

            {!isAuthForm && <label className="subtitle">Email</label>}
            {!isAuthForm && <input className="input-element"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />}

            <label className="subtitle">Логин</label>
            <input className="input-element"
              value={login}
              onChange={(event) => setLogin(event.target.value)}
            />

            <label className="subtitle">Пароль</label>
            <input className="input-element"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            <button className="input-element" onClick={isAuthForm ? onAuth : () => setIsAuthForm(true)}>
              Войти
            </button>
            <button className="input-element" onClick={isAuthForm ? () => setIsAuthForm(false) : onRegister}>
              Зарегистрироваться
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
