import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Login } from './Login'
import { NavBar } from './NavBar'
import { ListadoReparaciones } from './ListadoReparaciones'
import { HomeEmpty } from './HomeEmpty'
import { UserProfile } from './UserProfile'

export const Home = () => {
    const [autenticacion, setAutenticacion] = useState(false)
    const [show, setshow] = useState(false)
   
   
    
  return (
  <>
   {autenticacion ? (<NavBar setAutenticacion = {setAutenticacion} />) : (<Login setAutenticacionL = {setAutenticacion} />)}
   {/* <NavBar  ShowSidebar={setshow}  setAutenticacion = {setAutenticacion} /> */}
    <Routes>
        <Route path='/' element={<HomeEmpty/>}/>
        <Route path='/Reparaciones' element = {<ListadoReparaciones/>}/>
        <Route path= '/PerfilUsuario' element = {<UserProfile/>}/>
   </Routes>
  </>
  )
}
