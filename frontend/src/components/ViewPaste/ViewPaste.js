import {useState} from "react";
import {useParams} from "react-router-dom"
import SyntaxHighlighter from "react-syntax-highlighter"
import { vs } from 'react-syntax-highlighter/dist/esm/styles/hljs'

import "./ViewPaste.css";

function PasteRenderer({id}) {
  const [hlOn, setHlOn] = useState(true);
  const [copyButtonText, setCopyButtonText] = useState("Копировать");



  const pasteText = `from math import sqrt

c = float(input('Screen diagonal: '))
x = int(input('Horizontal resolution: '))
y = int(input('Vertical resolution: '))

r = y / x
a = sqrt((c * c) / (1 + (r * r)))
ppi = x / a
a *= 2.54
b = r * a

print(f'Screen size: {a: .2f} x {b: .2f} cm Ratio: {r if r > 1 else 1 / r: .3f} Density: {ppi: .2f} ppi')
  `
  const hlLang = "python";




  const copyToClipboard = function () {
    navigator.clipboard.writeText(pasteText);
    setCopyButtonText("Скопировано");
  }

  return (
    <div className="panel" style={{width: "55%"}}>
      <div className="paste-input">
        <div className="paste-input-header">
          <div className="title">
            Paste with id {id}
          </div>
          <label className="subtitle">
            <input type="checkbox" id="syntax-highlight" defaultChecked
              onChange={(e) => setHlOn(e.target.checked)} />
            Подсветка синтаксиса
          </label>
        </div>
        <SyntaxHighlighter className="paste-content" language={hlOn ? hlLang : "plaintext"} style={vs}>
          {pasteText}
        </SyntaxHighlighter>
        <button className="input-element" onClick={copyToClipboard}>{copyButtonText}</button>
      </div>
    </div>
  );
}

function PasteInfo() {
  const author = "User_name";
  const date = "15.01.2038";
  const favorited = false;





  const setFavorited = function(e) {/* send to server... */};

  return (
    <div className="paste-info-stack" style={{width: "25%"}}>
      <div className="panel">
        <div className="paste-info-line">
          <div className="title">Автор</div>
          <div className="subtitle">{author}</div>
        </div>
        <div className="paste-info-line">
          <div className="title">Дата</div>
          <div className="subtitle">{date}</div>
        </div>
      </div>
      <div className="panel">
        <div className="paste-info-line">
          <div className="title">Добавить в избранное</div>
          <label htmlFor="favorite-checkbox">
            <input type="checkbox" id="favorite-checkbox" defaultChecked={favorited}
              onChange={setFavorited} />
            <div className="favorite-icon"></div>
          </label>
        </div>
      </div>
      <CommentSection />
    </div>
  );
}

function CommentSection() {
  const publishComment = function () {
    console.log(commentInputText);
  }

  var commentInputText = "";

  return (
    <div className="panel" id="comment-panel">
      <div className="comment-section">
        <div className="title">Комментарии</div>
        <Comment userName={"UserA"} commentText={"very informative hkjfbvlh ekhfvbkefbv kjfhgvhf\nhjsdbvjhsdbvh uidgfvhbdv jhdfgvjhdbfv"} />
        <Comment userName={"UserB"} commentText={"very informative hkjfbvlh ekhfvbkefbv kjfhgvhf\nhjsdbvjhsdbvh uidgfvhbdv jhdfgvjhdbfv"} />
        <Comment userName={"UserB"} commentText={"very informative hkjfbvlh ekhfvbkefbv kjfhgvhf\nhjsdbvjhsdbvh uidgfvhbdv jhdfgvjhdbfv"} />
        <Comment userName={"UserB"} commentText={"very informative hkjfbvlh ekhfvbkefbv kjfhgvhf\nhjsdbvjhsdbvh uidgfvhbdv jhdfgvjhdbfv"} />
      </div>
      <div className="add-comment">
        <div className="title">Ваш комментарий:</div>
        <textarea className="input-element"
                  id="comment-input"
                  placeholder="Введите текст&hellip;"
                  onChange={(e) => commentInputText = e.target.value} />
        <button className="input-element" onClick={publishComment}>Опубликовать</button>
      </div>
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
  return (
    <div className="content">
      <PasteRenderer id={params.id} />
      <PasteInfo />
    </div>
  );
}
