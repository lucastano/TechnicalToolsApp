import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import {useSelector} from 'react-redux';
import { NavBar } from './NavBar'
import { ListadoReparaciones } from './ListadoReparaciones'
import { UserProfile } from './UserProfile'
import { Empresa } from './Empresa'
import { selectStatus } from '../store/auth'
import { LoginPrueba } from './LoginPrueba'
import { NuevaReparacion } from './NuevaReparacion';
export const Home = () => {
  const [autenticacion, setAutenticacion] = useState(false)
  // const statusSesion = useSelector(selectStatus)
  const usuarioLogeado = useSelector((state)=>state.auth.status)
  const [status, setstatus] = useState("")
  useEffect(() => {
    const Token = localStorage.getItem("Token")
    if(Token ==""){
      console.log('token es vacio')
      setAutenticacion(false)
    }
    else{
      setAutenticacion(true)
      console.log('token no es vacio')
    }
  }, [])
  
  return (
  <>
   { autenticacion && <NavBar setAutenticacion = {setAutenticacion} />}
   {autenticacion == false && <LoginPrueba setAutenticacion ={setAutenticacion}/>}
    <Routes>
        <Route path='/Reparaciones' element = {<ListadoReparaciones/>}/>
        <Route path= '/PerfilUsuario' element = {<UserProfile/>}/>
        <Route path='/Empresa' element ={<Empresa/>}/>
        <Route path='/NuevaReparacion' element={<NuevaReparacion/>}/>
   </Routes>

   {/* <NewListadoReparaciones/> */}

   {/* <DashBoardGrid/> */}
      
  </>
  )
}
