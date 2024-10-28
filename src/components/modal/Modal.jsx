import React, { useContext, useEffect, useState } from "react";
import "./modal.css";
import { NotesContext } from "../../context/NotesProvider";
import Transition from "../ui/Transition";

const Modal = () => {
  const { modal, setModal, currentId, addNote, info, changeNote, cancelModal, words, lang } =
    useContext(NotesContext);
  const [input, setInput] = useState("");
  const [textarea, setTextarea] = useState("");
  const addTask = () => {
    let title = input.trim();
    let desc = textarea.trim();
    if (title.length > 0 && desc.length > 0) {
      let item = {
        id: currentId + 1,
        title,
        date: new Date().toLocaleDateString(),
        desc,
      };
      addNote(item);
      setModal(true);
    }
  };

  const changeTask = () => {
    let title = input.trim();
    let desc = textarea.trim();
    if (title.length > 0 && desc.length > 0) {
      let item = {
        id: info.id,
        title,
        date: new Date().toLocaleDateString(),
        desc,
      };
      setModal(true);
      changeNote(item);
    }
  };

  useEffect(() => {
    if (info) {
      setInput(info.title);
      setTextarea(info.desc);
    } else {
      setInput("");
      setTextarea("");
    }
  }, [modal]);
  return (
    <Transition
      className="modal"
      show={modal}
      onClick={() => {
        setModal(true);
      }}
    >
      <div
        className="modal__form"
        onMouseDown={(event) => {
          event.stopPropagation();
        }}
      >
        <h3 className="modal__title">
          {info ? words.editwindowbtn[lang] : words.addbtn[lang]}
        </h3>
        <div className="modal__content">
          <label>
            <span>Title</span>
            <input
              type="text"
              placeholder="Title"
              onChange={(event) => {
                setInput(event.target.value);
              }}
              value={input}
            />
          </label>
          <label>
            <span>Content</span>
            <textarea
              placeholder="Content"
              rows={1}
              onChange={(event) => {
                setTextarea(event.target.value);
              }}
              value={textarea}
            ></textarea>
          </label>
        </div>
        <div className="modal__controls">
          <button className="btn btn_red" onClick={cancelModal}>
            {words.closebtn[lang]}
          </button>
          {info ? (
            <button className="btn" onClick={changeTask}>
              {words.editwindowbtn[lang]}
            </button>
          ) : (
            <button className="btn" onClick={addTask}>
              {words.addbtn[lang]}
            </button>
          )}
        </div>
      </div>
    </Transition>
  );
};

export default Modal;
