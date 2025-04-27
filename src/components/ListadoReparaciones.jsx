import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { generarOrdSrv, getReparaciones } from '../Fetchs';
import { NuevaReparacion } from './NuevaReparacion';
import { AccionesReparacion } from './AccionesReparacion';


export const ListadoReparaciones = () => {
const [reparaciones, setreparaciones] = useState([])
const [user, setuser] = useState({})
  const navigate = useNavigate();
  
  useEffect(() => {
    cargarReparaciones()
  }, [])


  const cargarReparaciones = async () => 
  {
    const usuarioLog = JSON.parse(localStorage.getItem('UsuarioLog'))
    const reparacionesResponse = await getReparaciones(usuarioLog)
    console.log('reparacionesResponse', reparacionesResponse)
    console.log('reparaciones usestate', reparaciones)
    setreparaciones(reparacionesResponse)
  }


  return (
    <>
      <div className='Grid grid-cols-1 bg-gray-50 h-auto my-[20px] mx-[20px] gap-8 py-3 px-2'>
        {/* tabla de filtros */}
        <div className='col-span-1  my-[20px] m-[20px] flex justify-end'>
         <button onClick={()=>navigate('/NuevaReparacion')} className='btnAgregar cursor-pointer'>Nueva</button>
        </div>
        <div className='col-span-1 bg-blue-900  my-[20px] m-[20px]'>
          FILTROS
        </div>
        <div className='col-span-1  my-[20px] m-[20px]'>
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className='bg-blue-950 text-white h-7'>
                  <th>Nro. Orden</th>
                  <th>Fecha de ingreso</th>
                  <th>Cliente</th>
                  <th>Aparato</th>
                  <th>Serie</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {
                  reparaciones.map((r,i) =>(
                    <tr key={i} className='even:bg-gray-200 hover:bg-gray-100 transition h-7'>
                      <td className='text-center'>{r.id}</td> 
                      <td className='text-center'>{r.fecha}</td>
                      <td className='text-center'>{r.clienteNombre + " "+r.clienteApellido}</td>
                      <td className='text-center'>{r.producto.marca}</td>
                      <td className='text-center'>{r.numeroSerie}</td>
                      <td className='text-center'>ACCIONES</td>
                  </tr>
                  ))}
                
              </tbody>
              </table>
        </div>
        <div className='flex items-center justify-between col-span-1 my-[20px] m-[20px]'>
          {/* desde aca  empieza el paginado , por ahora no funciona */}
          <div class="flex flex-1 justify-between sm:hidden">
            <a href="#" class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
            <a href="#" class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
          </div>
          <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              {/* div sin conenido */}
            </div>
            <div>
              <nav class="isolate inline-flex -space-x-px rounded-md shadow-xs" aria-label="Pagination">
                <a href="#" class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                  <span class="sr-only">Previous</span>
                  <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                    <path fill-rule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
                  </svg>
                </a>
                <a href="#" aria-current="page" class="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">1</a>
                <a href="#" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0">2</a>
                <a href="#" class="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">3</a>
                <span class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-300 ring-inset focus:outline-offset-0">...</span>
                <a href="#" class="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">8</a>
                <a href="#" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0">9</a>
                <a href="#" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0">10</a>
                <a href="#" class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                  <span class="sr-only">Next</span>
                  <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                    <path fill-rule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                </svg>
                </a>
              </nav>
            </div>
            </div>
          </div>
        </div>
    </>
  )
}
