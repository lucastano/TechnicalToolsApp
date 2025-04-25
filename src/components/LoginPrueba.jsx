import React, { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import {loginFetch,loginprueba,getClientes,getTecnicos,getReparaciones,getEmpresa,getSucursal,getProductos} from '../Fetchs'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const LoginPrueba = ({setAutenticacion}) => {
    const navigate = useNavigate();
    const [user, setuser] = useState("")
    const [pass, setpass] = useState("")
    const [rol, setrol] = useState("")
    const [loading, setloading] = useState(false)
    const [userLoged, setuserLoged] = useState({})
    const [errorLoginDsc, seterrorLoginDsc] = useState("")
     const {isAuthenticated,login} = useAuth()
    useEffect(() => {
        if (isAuthenticated) {
            console.log('entra a isAuthenticated')
            navigate("/Reparaciones",{replace:true})
        }
     
    }, [isAuthenticated])
    const onHandleLogin = async (event)=>{
        event.preventDefault()
        let response = null
        if(user != "" && pass != "" && rol!=""){
            setloading(true)
            try
            {
                response = await loginFetch(user,pass,rol)
                console.log('response', response)
                console.log('response.statuscode', response.statusCode)
                if (response.statusCode == 200)
                { 
                    console.log('Token', response.token)
                    localStorage.setItem("UsuarioLog",JSON.stringify(response.usuario))
                    login(response.token)
                    navigate("/Reparaciones")
                }else{
                    seterrorLoginDsc("Error en el login")
                }
            }
            catch(error){
                seterrorLoginDsc(error)
            }
            
        }
    }

    const onChangeUser = (event)=>{
        setuser(event.target.value)
    }

    const onChangePass =(event)=>{
        setpass(event.target.value)
    }
    const onChangeRol =(event)=>{
        setrol(event.target.value)
    }
  return (
    <div className='grid grid-cols-1  md:grid-cols-3 md:m-20'>
        <div className=' hidden md:block col-span-2 bg-linear-to-r from-cyan-500 to-blue-500 '>

            {/* este es el div de la imgen */}
        </div>

        <div  className=' w-full col-span-1 bg-gray-100 rounded-r-3xl md:w-[400px] '> 
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    alt="Your Company"
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                    className="mx-auto h-10 w-auto"
                />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Inicio de sesión
                </h2>
                </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="#" method="POST" className="space-y-6">
                <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                    Direccion de Email
                </label>
                <div className="mt-2">
                    <input
                    onChange={onChangeUser}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-1  focus:outline-blue-500 invalid:focus:outline-red-400 sm:text-sm/6 peer"
                    />
                    <p className='text-red-400 text-xs hidden peer-invalid:block mt-1.5 w-full'>Formato de correo no valido.</p>
                </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                        Contraseña
                        </label>
                        <div className="text-sm">
                        <a href="#" className="font-semibold text-blue-600 hover:text-blue-500">
                                Olvidaste tu contraseña?
                        </a>
                        </div>
                    </div>
                    <div className="mt-2">
                        <input
                        onChange={onChangePass}
                        id="password"
                        name="password"
                        type="password"
                        required
                        autoComplete="current-password"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="select"  className="block text-sm/6 font-medium text-gray-900 focus:outline-blue-500 " >Rol</label>
                    <div className="mt-2">

                        <select value={rol} onChange={onChangeRol} id="select" name="select" className="mb-10 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6">
                            <option value="" disabled>Selecciona una opción</option>
                            <option value="Tecnico">Tecnico</option>
                            <option value="Administrador" >Administrador</option>
                            <option value="Cliente">Cliente</option>
                        </select>
                    </div>
                    <button
                        onClick={onHandleLogin}
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-linear-to-r from-cyan-500 to-blue-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-linear-to-r hover:from-cyan-600 hover:to-blue-600 focus-visible:outline-2 focus-visible:outline-offset-1  ..."
                    >
                        Iniciar
                    </button>

                    <div className={`flex w-full justify-center my-12 ${loading ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                            <CircularProgress />
                    </div>
                </div>
            </form>
            </div>
             </div>
        </div>
    </div>
  )
}
