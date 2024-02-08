import {useState} from "react";
import {useNavigate} from "react-router-dom"
import SyntaxHighlighter from "react-syntax-highlighter"

import "./CreatePaste.css";

const languages = ["auto", ...SyntaxHighlighter.supportedLanguages];

function PasteInput({pasteData}) {
  const navigate = useNavigate();

  const publishPaste = function () {
    // TODO: send to server

    console.log(pasteData.name);
    console.log(pasteData.content);
    console.log(pasteData.language);
    console.log(pasteData.access);
    console.log(pasteData.password);

    console.log("publish");

    navigate("/my");
  };

  return (
    <div className="panel" style={{width: "60%"}}>
      <div className="paste-input">
        <div className="title">
          Новая паста
        </div>
        <textarea className="input-element"
                  id="paste-input"
                  placeholder="Вставьте текст&hellip;"
                  spellCheck="false"
                  onChange={(e) => pasteData.content = e.target.value} />
        <button className="input-element" onClick={publishPaste}>Опубликовать</button>
      </div>
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

function Settings({pasteData}) {
  const [accessMode, setAccessMode] = useState(pasteData.access);

  return (
    <div className="panel" style={{width: "20%"}}>
      <div className="settings">
        <div className="title">Настройки</div>

        <div className="subtitle">Название</div>
        <input className="input-element" id="name-input"
          onChange={(e) => pasteData.name = e.target.value} />

        <div className="subtitle">Язык для подсветки</div>
        <Dropdown id="language-selector"
                  defaultVal={pasteData.language}
                  values={languages}
                  names={languages}
                  onChange={(e) => pasteData.language = e.target.value} />

        <div className="subtitle">Доступ</div>
        <Dropdown id="access-selector"
                  defaultVal={pasteData.access}
                  values={["public", "private", "password"]}
                  names={["Публичный", "Только для вас", "С паролем"]}
                  onChange={(e) => {
                    setAccessMode(e.target.value);
                    pasteData.access = e.target.value;
                  }} />

        {accessMode === "password" ?
          <div className="subtitle">Пароль</div> : null}
        {accessMode === "password" ?
          <input className="input-element" id="password-input"
            onChange={(e) => pasteData.password = e.target.value} /> : null}
      </div>
    </div>
  );
}

export function CreatePaste() {
  const pasteData = {
    "access": "public",
    "language": "auto"
  };

  return (
    <div className="content">
      <PasteInput pasteData={pasteData} />
      <Settings pasteData={pasteData} />
    </div>
  );
}
