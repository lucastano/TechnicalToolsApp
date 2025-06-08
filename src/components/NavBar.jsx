import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getEmpresa } from '../Fetchs';
import { current } from '@reduxjs/toolkit';
const navigation = [
  { name: 'Reparaciones',Direccion:'Reparaciones', current: true },
  {name:'Clientes',Direccion:'Clientes',current:true}
]

export const NavBar = ({setAutenticacion}) => {
  const [menuUser, setmenuUser] = useState(false)
  const [empresa, setempresa] = useState({})
  const navigate = useNavigate();
  const {logout} = useAuth()
  useEffect(() => {
    setearEmpresa()
  }, [])
  
const setearEmpresa = async () => {
  const usuarioLog = JSON.parse(localStorage.getItem('UsuarioLog'))
  const empresaResponse = await getEmpresa(usuarioLog.idEmpresa)
  setempresa(empresaResponse)
  console.log('empresaResponse', empresaResponse)
}
  const onChangeMenuUser = ()=>{
    if (menuUser){
      setmenuUser(false)
    }
    else{
      setmenuUser(true)
    }
  }
  const onClicklogOut =()=>{
    logout()
    localStorage.removeItem('Token');
     navigate("/Login")
  }
  return (
    <nav className="bg-blue-950">
  <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
    <div className="relative flex h-16 items-center justify-between">
      <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
        <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset" aria-controls="mobile-menu" aria-expanded="false">
          <span className="absolute -inset-0.5"></span>
          <span className="sr-only">Open main menu</span>
          <svg className="block size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <svg className="hidden size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
        <div className="flex shrink-0 items-center">
          <img className="h-8 w-auto" src="../src/iconoRep.png" alt="Your Company"/>
        </div>
        <div className="hidden sm:ml-6 sm:block">
          <div className="flex space-x-4">
          {
            navigation.map(x =>
              <a onClick={()=>navigate("/"+x.Direccion+"")}  key={x.name} className=" px-3 py-2 text-sm font-medium text-gray-300  hover:bg-gray-700  hover:text-white" aria-current="page">{x.name}</a>
            )
          }
          </div>
        </div>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
          <span className="absolute -inset-1.5"></span>
          <span className="sr-only">View notifications</span>
          <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
          </svg>
        </button>
        <div className="relative ml-3">
          <div>
            <button onClick={onChangeMenuUser} type="button" className="relative flex rounded-full bg-gray-800 text-sm hover:ring-2 hover:ring-white hover:ring-offset-2 hover:ring-offset-gray-800 hover:outline-hidden" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
              <span className="absolute -inset-1.5"></span>
              <span className="sr-only">Open user menu</span>
              <img className="size-8 rounded-full" src={empresa.foto} alt=""/>
            </button>
          </div>

          {/* este es el menu al apretar en la imagen de user  */}
          { menuUser &&
            <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
              <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</a>
              <a href="" onClick={onClicklogOut} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Cerrar sesion</a>
            </div>
          } 

        </div>
      </div>
    </div>
  </div>
  <div className="sm:hidden" id="mobile-menu">
    <div className="space-y-1 px-2 pt-2 pb-3">
      <a href="#" className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white" aria-current="page">Dashboard</a>
      <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Team</a>
      <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Projects</a>
      <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Calendar</a>
    </div>
  </div>
</nav>
  )
}
