import {useNavigate} from "react-router-dom"
import SyntaxHighlighter from "react-syntax-highlighter"
import { ApiService } from "../../services/ApiService";

import "./CreatePaste.css";

const languages = ["auto", ...SyntaxHighlighter.supportedLanguages];

function PasteInput({pasteData}) {
  const navigate = useNavigate();

  const publishPaste = async function () {
    if (pasteData.content.length === 0 || pasteData.name.length === 0) {
      return;
    }

    await ApiService("create_paste/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pasteData),
    });

    navigate("/my");
  };

  return (
    <div className="panel" style={{width: "60%"}}>
      <div className="paste-input">
        <div className="title">
          Новая паста
        </div>
        <textarea className="input-element"
                  placeholder="Вставьте текст…"
                  spellCheck="false"
                  onChange={(e) => pasteData.content = e.target.value} />
        <button className="input-element" onClick={publishPaste}>Опубликовать</button>
      </div>
    </div>
  );
}

function Dropdown({defaultVal, values, names, onChange}) {
  return (
    <select className="input-element" defaultValue={defaultVal} onChange={onChange}>
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
  return (
    <div className="panel" style={{width: "20%"}}>
      <div className="settings">
        <div className="title">Настройки</div>

        <div className="subtitle">Название</div>
        <input className="input-element"
          onChange={(e) => pasteData.name = e.target.value} />

        <div className="subtitle">Язык для подсветки</div>
        <Dropdown defaultVal={pasteData.language}
                  values={languages}
                  names={languages}
                  onChange={(e) => pasteData.language = e.target.value} />
      </div>
    </div>
  );
}

export function CreatePaste() {
  const pasteData = {
    language: "auto"
  };

  const isAuth = Boolean(window.localStorage.getItem("access"));

  if (!isAuth) {
    return (
      <div className="no-auth">
        Войдите, чтобы создать пасту.
      </div>
    )
  }

  return (
    <div className="content">
      <PasteInput pasteData={pasteData} />
      <Settings pasteData={pasteData} />
    </div>
  );
}
