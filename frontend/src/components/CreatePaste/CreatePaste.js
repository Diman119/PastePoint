import {useState} from "react";
import {useNavigate} from "react-router-dom"
import hljs from 'highlight.js';

import "./CreatePaste.css";

const languages = ["none", "auto", ...hljs.listLanguages()];
const languageNames = languages.map((lang) => {
  if (lang === "none") {
    return "Нет";
  } else if (lang === "auto") {
    return "Автоматически";
  } else {
    return hljs.getLanguage(lang).name;
  }
});

function PasteInput({paste_data}) {
  const navigate = useNavigate();

  const publishPaste = function () {
    // TODO: send to server

    console.log(paste_data.name);
    console.log(paste_data.content);
    console.log(paste_data.language);
    console.log(paste_data.access);
    console.log(paste_data.password);

    console.log("publish");

    navigate("/my");
  };

  return (
    <div className="paste-input">
      <div className="title">
        Новая паста
      </div>
      <textarea className="input-element"
                id="paste-input"
                placeholder="Вставьте текст&hellip;"
                spellCheck="false"
                onChange={(e) => paste_data.content = e.target.value} />
      <button className="input-element" onClick={publishPaste}>Опубликовать</button>
    </div>
  );
}

function Dropdown({id, defaultVal, values, names, onChange}) {
  return (
    <select className="input-element" id={id} defaultValue={defaultVal} onChange={onChange}>
      {values.map((val, index) => {
        return (
          <option key={index} value={val}>
            {names[index]}
          </option>
        );
      })}
    </select>
  );
};

function Settings({paste_data}) {
  const [accessMode, setAccessMode] = useState("")

  return (
    <div className="settings">
      <div className="title">Настройки</div>

      <div className="subtitle">Название</div>
      <input className="input-element" id="name-input"
        onChange={(e) => paste_data.name = e.target.value} />

      <div className="subtitle">Язык для подсветки</div>
      <Dropdown id="language-selector"
                defaultVal={paste_data.language}
                values={languages}
                names={languageNames}
                onChange={(e) => paste_data.language = e.target.value} />

      <div className="subtitle">Доступ</div>
      <Dropdown id="access-selector"
                defaultVal={paste_data.access}
                values={["public", "private", "password"]}
                names={["Публичный", "Только для вас", "С паролем"]}
                onChange={(e) => {
                  setAccessMode(e.target.value);
                  paste_data.access = e.target.value;
                }} />

      {accessMode === "password" ?
        <div className="subtitle">Пароль</div> : null}
      {accessMode === "password" ?
        <input className="input-element" id="password-input"
          onChange={(e) => paste_data.password = e.target.value} /> : null}
    </div>
  );
}

export function CreatePaste() {
  const paste_data = {
    "access": "public",
    "language": "auto"
  };

  return (
    <div className="content">
      <PasteInput paste_data={paste_data} />
      <Settings paste_data={paste_data} />
    </div>
  );
}
