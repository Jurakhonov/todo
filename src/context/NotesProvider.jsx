import { createContext, useEffect, useState } from "react";
export const NotesContext = createContext(null);
import words from '../assets/lang'

const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [modal, setModal] = useState(true);
  const [currentId, setCurrentId] = useState(0);
  const [info, setInfo] = useState(null);
  const [search, setSearch] = useState('');
  const [lang, setLang] = useState('ru');

  useEffect(() => {
    let localNotes = localStorage.getItem("notes");
    let LocalLang = localStorage.getItem('lang')
    if (LocalLang) {
      setLang(LocalLang)
    }
    try {
      localNotes = JSON.parse(localNotes);
      if (Array.isArray(localNotes)) {
        setNotes(localNotes);
      } else {
        setNotes([]);
      }
    } catch (error) {
      console.error("Ошибка при чтении из localStorage:", error);
      setNotes([]);
    }
  }, []);

  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem("notes", JSON.stringify(notes));
      const last = notes.length - 1;
      const id = notes[last].id || 0;
      setCurrentId(id);
    } else {
      localStorage.setItem("notes", JSON.stringify([]));
      setCurrentId(0);
    }
  }, [notes]);

  useEffect(()=>{
    localStorage.setItem('lang',lang)
  }, [lang])
  const addNote = (item) => {
    setNotes([...notes, item]);
    setCurrentId(item.id);
  };

  const delNote = (id) => {
    var newNotes = notes.filter((elem) => elem.id != id);
    setNotes(newNotes);
  };

  const editNote = (id) => {
    let note = notes.find((elem) => elem.id == id);
    setInfo(note);
    setModal(false);
  };

  const changeNote = (item) => {
    var newNotes = notes.map((elem) => {
      if (elem.id == item.id) {
        elem.date = item.date;
        elem.desc = item.desc;
        elem.title = item.title;
      }
      return elem;
    });
    setNotes(newNotes);
    setInfo(null);
  };

  const cancelModal = () => {
    setInfo(null);
    setModal(true);
  };
  return (
    <NotesContext.Provider
      value={{
        notes,
        modal,
        setModal,
        currentId,
        addNote,
        delNote,
        editNote,
        info,
        changeNote,
        cancelModal,
        setSearch,
        search,
        words,
        lang,
        setLang
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export default NotesProvider;
