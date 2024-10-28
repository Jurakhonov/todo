import React, { createContext, useState } from 'react'
// import Navbar from './components/navbar/Navbar'
import Navbar from './components/navbar'
import Notes from './components/notes'
import NotesProvider from './context/NotesProvider'
import Modal from './components/modal'
import Add from './components/add'

const App = () => {
  return (
    <NotesProvider>
      <Navbar/>
      <Notes/>
      <Modal/>
      <Add/>
    </NotesProvider>
  )
}

export default App