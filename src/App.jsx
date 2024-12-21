
import './App.css'

import { Login } from './components/Login'
import { Route, Routes } from 'react-router-dom';
import { ListadoReparaciones } from './components/ListadoReparaciones';
import { useEffect } from 'react';
import { useState } from 'react';
import { Home } from './components/Home';
function App() {
// const [autenticacion, setAutenticacion] = useState(false)
// console.log(autenticacion)
  return (
    <>
    {/* {autenticacion && <NavBar/>}
    <Routes>
        <Route path='/' element = {<Login setAutenticacionL = {setAutenticacion} />}/>
        <Route path='/Servicios' element={<ListadoReparaciones/>}/>
   </Routes> */}
   <Home/>
    </>
  )
}

export default App
