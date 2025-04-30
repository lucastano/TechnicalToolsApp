import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const Presupuestar = () => {
    const navigate = useNavigate()
    const {id} = useParams()

    // {
    //     "id": 0,
    //     "manoObra": 0,
    //     "descripcion": "string",
    //     "fechaPromesaEntrega": "2025-04-30T00:17:53.279Z"
    //   }
  return (
    <>
        <div className='grid grid-cols-1 bg-gray-50 h-auto my-[20px] mx-[20px] gap-8 py-3 px-4'>
            <div className='col-span-1 '>
                <p>Reparacion numero orden {id}</p>
            </div>
            <div className='col-span-1 '>
                <label for="presupuestar" className="block mb-1 text-sm/6 font-medium text-gray-900">Detalles del presupuesto</label>
                <textarea className=" w-full lg:w-[50%] block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" rows={3} name='presupuesto' type="textarea" placeholder='Detalles del presupuesto'/>
            </div>
            <div className='col-span-1 '>
                <label for="costo" className="block mb-1 text-sm/6 font-medium text-gray-900">Costo de la reparacion</label>
                <input  type="number" name="costo" id="costo" className=" w-full lg:w-[20%] rounded-md bg-white block min-w-0 py-1.5 pr-3 pl-1 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder="Cedula de identidad"/>
            </div>
            <div className='col-span-1 '>
                <label for="fechaEntrega" className="block mb-1 text-sm/6 font-medium text-gray-900">Fecha aproximada del presupuesto</label>
                    <input  
                    type="date"
                    id="fechaEntrega"
                    name="fechaEntrega"
                    className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
            </div>
            <div className='col-span-1 my-1 '>
                {/* buttons cancelar y aceptar  */}
                <button className='btnAceptar' >Agregar</button>
                <button onClick={()=>navigate('/Reparaciones')} className='btnCancelar' >Cancelar</button>
            </div>
        </div>
    </>
  )
}
