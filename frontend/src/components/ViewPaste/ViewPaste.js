import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import SyntaxHighlighter from "react-syntax-highlighter"
import { vs } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { ApiService } from "../../services/ApiService";

import "./ViewPaste.css";

function PasteRenderer({content}) {
  const [hlOn, setHlOn] = useState(true);
  const [copyButtonText, setCopyButtonText] = useState("Копировать");

  const copyToClipboard = function () {
    navigator.clipboard.writeText(content.content);
    setCopyButtonText("Скопировано");
  }

  return (
    <div className="panel" style={{width: "55%"}}>
      <div className="paste-input">
        <div className="paste-input-header">
          <div className="title">
            {content.name}
          </div>
          <label className="subtitle">
            <input type="checkbox" id="syntax-highlight" defaultChecked
              onChange={(e) => setHlOn(e.target.checked)} />
            Подсветка синтаксиса
          </label>
        </div>
        <SyntaxHighlighter className="paste-content" language={hlOn ? content.language : "plaintext"} style={vs}>
          {content.content}
        </SyntaxHighlighter>
        <button className="input-element" onClick={copyToClipboard}>{copyButtonText}</button>
      </div>
    </div>
  );
}

function PasteInfo({info}) {
  const [favoriteIds, setFavoriteIds] = useState(null);
  const isAuth = Boolean(window.localStorage.getItem("access"));
  const favorited = () => favoriteIds !== null && favoriteIds.includes(+info.id);

  useEffect(() => {
    (async () => {
      const data = await ApiService('current_user');
      setFavoriteIds(data.favorites);
    })();
  }, []);

  const sendFavorite = async function(e) {
    if (favoriteIds === null) {
      return;
    }

    var newFavoriteIds = [...favoriteIds];
    if (e.target.checked != favorited()) {
      if (e.target.checked) {
        newFavoriteIds.push(+info.id);
      } else {
        newFavoriteIds.splice(newFavoriteIds.indexOf(+info.id), 1);
        console.log(newFavoriteIds);
        console.log(favoriteIds);
      }
    }

    await ApiService('current_user', {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ favorites: newFavoriteIds }),
    });

    setFavoriteIds(newFavoriteIds);
  }

  return (
    <div className="paste-info-stack" style={{width: "25%"}}>
      <div className="panel">
        <div className="paste-info-line">
          <div className="title">Автор</div>
          <div className="subtitle">{info.author}</div>
        </div>
        <div className="paste-info-line">
          <div className="title">Дата</div>
          <div className="subtitle">{info.creation_dt}</div>
        </div>
      </div>
      {isAuth && <div className="panel">
        <div className="paste-info-line">
          <div className="title">Добавить в избранное</div>
          <label htmlFor="favorite-checkbox">
            <input type="checkbox" id="favorite-checkbox" checked={favorited()}
              onChange={sendFavorite} />
            <div className="favorite-icon"></div>
          </label>
        </div>
      </div>}
      <CommentSection info={info} />
    </div>
  );
}

function CommentSection({info}) {
  const isAuth = Boolean(window.localStorage.getItem("access"));

  const publishComment = async function () {
    if (commentInputText.length === 0) {
      return;
    }

    await ApiService("create_comment/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ paste: info.id, text: commentInputText }),
    });

    window.location.reload();
  }

  var commentInputText = "";

  return (
    <div className="panel" id="comment-panel">
      {info.comment_set.length > 0 ? (
        <div className="comment-section">
          <div className="title">Комментарии</div>
          {info.comment_set.map((c) => (
            <Comment key={c.id} userName={c.author.username} commentText={c.text} />
          ))}
        </div>
      ) : (
        <div className="title">Пока нет комментариев…</div>
      )}
      {isAuth && <div className="add-comment">
        <div className="title">Ваш комментарий:</div>
        <textarea className="input-element"
                  id="comment-input"
                  placeholder="Введите текст…"
                  onChange={(e) => commentInputText = e.target.value} />
        <button className="input-element" onClick={publishComment}>Опубликовать</button>
      </div>}
    </div>
  );
}

function Comment({userName, commentText}) {
  return (
    <div>
      <div className="subtitle">{userName}</div>
      <div className="input-element">{commentText}</div>
    </div>
  );
}

export function ViewPaste() {
  const params = useParams();

  const [pasteContent, setPasteContent] = useState({
    name: "Загрузка…",
    content: "",
    language: "plaintext"
  })

  const [pasteInfo, setPasteInfo] = useState({
    id: params.id,
    author: "Загрузка…",
    creation_dt: "Загрузка…",
    comment_set: []
  })

  useEffect(() => {
    (async () => {
      const data = await ApiService(`paste/${params.id}`);

      setPasteContent({
        name: data.name,
        content: data.content,
        language: data.language
      });

      setPasteInfo({
        id: params.id,
        author: data.author.username,
        creation_dt: data.creation_dt,
        comment_set: data.comment_set
      })
    })();
  }, []);

  return (
    <div className="content">
      <PasteRenderer content={pasteContent} />
      <PasteInfo info={pasteInfo} />
    </div>
  );
}
