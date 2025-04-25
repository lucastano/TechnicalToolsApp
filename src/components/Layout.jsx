import React from 'react'
import { NavBar } from './NavBar'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
    const token = localStorage.getItem("Token")
    console.log('token', token)
  return (
    <>

    {token && <NavBar/>} {/* Si hay token, renderiza el Navbar */}
    <Outlet /> {/* Aquí se renderizan las rutas hijas */}

    </>
  )
}
