import React, { useContext, useState } from 'react'
import { gridImg, listImg } from '../../assets/image';
import './notes.css'
import NotesItem from './NotesItem';
import { NotesContext } from '../../context/NotesProvider';

const Notes = () => {
  const [grid, setGrid] = useState(true);
  const {notes, search, words, lang, setLang } = useContext(NotesContext);
  let list = notes.filter((elem)=>{
    let result = elem.title.concat(elem.desc).toLowerCase().includes(search.toLowerCase())
    return result
  })
  return (
    <div className='container notes'>
        <div className="notes__header">
            <h2 className="notes__title">
              { list.length > 0 ? words.infobar[lang] : words.noinfobar[lang]}
            </h2>
            <button className='notes__btn' onClick={ ()=> {setGrid(!grid)} }>
                <img src={ grid ? listImg : gridImg} alt="" />
                <span>{ grid ? words.list[lang] : words.grid[lang]}</span>
            </button>
        </div>
        <div className={ grid ? "notes__content" : "notes__content active"}>
          {
            list.map((elem)=>{
              // console.log(elem);
              return <NotesItem grid={grid} key={elem.id} note={elem}/>
            })
            
          }
        </div>
    </div>
  )
}

export default Notes