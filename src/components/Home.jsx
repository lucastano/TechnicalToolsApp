import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Login } from './Login'
import { NavBar } from './NavBar'
import { ListadoReparaciones } from './ListadoReparaciones'
import { HomeEmpty } from './HomeEmpty'
import { UserProfile } from './UserProfile'
import { Empresa } from './Empresa'
import { Encabezados } from './Encabezados'

import { AccionesReparacion } from './AccionesReparacion'
export const Home = () => {

    const [autenticacion, setAutenticacion] = useState(false)
 

    

   
    
  return (
  <>
   {autenticacion ? (<NavBar setAutenticacion = {setAutenticacion} />) : (<Login setAutenticacionL = {setAutenticacion} />)}
   {autenticacion ? ( <Encabezados/>) : null}
    <Routes>
        <Route path='/' element={<HomeEmpty/>}/>
        <Route path='/Reparaciones' element = {<ListadoReparaciones/>}/>
        <Route path= '/PerfilUsuario' element = {<UserProfile/>}/>
        <Route path='/Empresa' element ={<Empresa/>}/>
   </Routes>

   {/* pruebas */}
   {/* <VerDetalles/> */}
   {/* <AccionesReparacion/> */}
  </>
  )
}
