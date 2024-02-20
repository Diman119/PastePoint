import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ApiService } from "../../services/ApiService";

import "./PasteList.css";

function PasteEntry({pasteId, name, author, date}) {
  return (
    <Link className="paste-entry" to={"/view/" + pasteId}>
      <button className="input-element">
        <div className="subtitle">{name}</div>
        <div className="subtitle">{author}</div>
        <div className="subtitle">{date}</div>
      </button>
    </Link>
  );
}

export function PasteList({endpoint}) {
  const [pastes, setPastes] = useState([]);
  const isAuth = Boolean(window.localStorage.getItem("access"));

  useEffect(() => {
    if (!isAuth) {
      return;
    }

    (async () => {
      const data = await ApiService(endpoint);
      console.log(data);
      setPastes(data);
    })();
  }, [endpoint]);

  if (!isAuth) {
    return (
      <div className="no-auth">
        Войдите, чтобы просматривать свои подборки паст.
      </div>
    )
  }

  return (
    <div className="content" style={{justifyContent: "center"}}>
      <div className="panel" style={{width: "70%"}}>
        <div className="paste-list">
          <div className="paste-list-header">
            <div className="title">Название</div>
            <div className="title">Автор</div>
            <div className="title">Дата</div>
          </div>
          {pastes.map((p) => (
            <PasteEntry key={p.id} pasteId={p.id} name={p.name} author={p.author.username} date={p.creation_dt} />
          ))}
        </div>
      </div>
    </div>
  );
}
