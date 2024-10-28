import React, { useContext } from 'react'
import './add.css';
import { editImg } from '../../assets/image';
import { NotesContext } from '../../context/NotesProvider';

const Add = () => {
  const {setModal} = useContext(NotesContext)
  return (
    <button className='add-btn' onClick={()=>{ setModal(false)}}>
        <img src={editImg} alt="" />
    </button>
  )
}

export default Add