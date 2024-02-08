import { Link } from "react-router-dom";

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

export function PasteList() {

  return (
    <div className="content" style={{justifyContent: "center"}}>
      <div className="panel" style={{width: "70%"}}>
        <div className="paste-list">
          <div className="paste-list-header">
            <div className="title">Название</div>
            <div className="title">Автор</div>
            <div className="title">Дата</div>
          </div>
          <PasteEntry pasteId="234" name="sjdfbvsfbvlkjdfbsvlkdjfb" author="user_name" date="23.09.2077" />
          <PasteEntry pasteId="234" name="sjdfbvsfbvlkjdfbsvlkdjfb" author="user_name" date="23.09.2077" />
          <PasteEntry pasteId="234" name="sjdfbvsfbvlkjdfbsvlkdjfb" author="user_name" date="23.09.2077" />
          <PasteEntry pasteId="234" name="sjdfbvsfbvlkjdfbsvlkdjfb" author="user_name" date="23.09.2077" />
          <PasteEntry pasteId="234" name="sjdfbvsfbvlkjdfbsvlkdjfb" author="user_name" date="23.09.2077" />
          <PasteEntry pasteId="234" name="sjdfbvsfbvlkjdfbsvlkdjfb" author="user_name" date="23.09.2077" />
          <PasteEntry pasteId="234" name="sjdfbvsfbvlkjdfbsvlkdjfb" author="user_name" date="23.09.2077" />
          <PasteEntry pasteId="234" name="sjdfbvsfbvlkjdfbsvlkdjfb" author="user_name" date="23.09.2077" />
          <PasteEntry pasteId="234" name="sjdfbvsfbvlkjdfbsvlkdjfb" author="user_name" date="23.09.2077" />
          <PasteEntry pasteId="234" name="sjdfbvsfbvlkjdfbsvlkdjfb" author="user_name" date="23.09.2077" />
          <PasteEntry pasteId="234" name="sjdfbvsfbvlkjdfbsvlkdjfb" author="user_name" date="23.09.2077" />
          <PasteEntry pasteId="234" name="sjdfbvsfbvlkjdfbsvlkdjfb" author="user_name" date="23.09.2077" />
          <PasteEntry pasteId="234" name="sjdfbvsfbvlkjdfbsvlkdjfb" author="user_name" date="23.09.2077" />
          <PasteEntry pasteId="234" name="sjdfbvsfbvlkjdfbsvlkdjfb" author="user_name" date="23.09.2077" />
          <PasteEntry pasteId="234" name="sjdfbvsfbvlkjdfbsvlkdjfb" author="user_name" date="23.09.2077" />
          <PasteEntry pasteId="234" name="sjdfbvsfbvlkjdfbsvlkdjfb" author="user_name" date="23.09.2077" />
        </div>
      </div>
    </div>
  );
}
