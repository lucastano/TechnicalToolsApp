import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { postPresupuesto } from '../Fetchs'

export const Presupuestar = () => {
    const navigate = useNavigate()
    
    const [detalles, setdetalles] = useState("")
    const [costo, setcosto] = useState("")
    const [fecha, setfecha] = useState("")
    const {id} = useParams()
    const [success, setsuccess] = useState(false)
    const [error, seterror] = useState(false)
    const [mensajeError, setmensajeError] = useState("")
    const [mensajeSuccess, setmensajeSuccess] = useState("")

    
    const onHandleAdd = async (event) => {
        event.preventDefault()
        const data = {
            id: id,
            manoObra: costo,
            descripcion: detalles,
            fechaPromesaEntrega: fecha
        }

        if (detalles != "" && costo != "" && fecha != "") {

            const hoy = new Date();
            const yyyy = hoy.getFullYear();
            const mm = String(hoy.getMonth() + 1).padStart(2, '0');
            const dd = String(hoy.getDate()).padStart(2, '0');
            const fechaHoyFormato = `${yyyy}-${mm}-${dd}`;
            if (data.fechaPromesaEntrega >= fechaHoyFormato) 
            {
                console.log('fecha es mayor ')
                const status = await postPresupuesto(data)
                if (status == 200) {
                    setsuccess(true)
                    seterror(false)
                    setmensajeSuccess("Presupuesto agregado correctamente")
                    setTimeout(() => {
                        setsuccess(false)
                        setmensajeSuccess("")
                        navigate('/Reparaciones')
                    }
                    , 2000)
                }else{
                    seterror(true)
                    setsuccess(false)
                    setmensajeError("Error al agregar el presupuesto")
                    setTimeout(() => {
                        seterror(false)
                        setmensajeError("")
                    }, 2000)
                }
            }
            else
            {
                seterror(true)
                setsuccess(false)
                setmensajeError("Fecha de entrega no puede ser menor a la fecha actual")
                setTimeout(() => {
                    seterror(false)
                    setmensajeError("")
                }, 2000)
            }
        }else{
            
            seterror(true)
            setsuccess(false)
            setmensajeError("Por favor complete todos los campos")
            setTimeout(() => {
                seterror(false)
                setmensajeError("")
            }, 2000)
        }
    }

    const onChangeDetalles = (event) => {
        setdetalles(event.target.value)
    }
    const onChangeCosto = (event) => {
        setcosto(event.target.value)
    }
    const onChangeFecha = (event) => {
        setfecha(event.target.value)
    }
    

    
  return (
    <>
        <form className='grid grid-cols-1 bg-gray-50 h-auto my-[20px] mx-[20px] gap-8 py-3 px-4'>
            <div className='col-span-1 '>
                <p>Reparacion numero orden {id}</p>
            </div>
            <div className='col-span-1 '>
                <label htmlFor="presupuestar" className="block mb-1 text-sm/6 font-medium text-gray-900">Detalles del presupuesto</label>
                <textarea onChange={onChangeDetalles} className=" w-full lg:w-[50%] block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" rows={3} name='presupuesto' type="textarea" placeholder='Detalles del presupuesto'/>
            </div>
            <div className='col-span-1 '>
                <label htmlFor="costo" className="block mb-1 text-sm/6 font-medium text-gray-900">Costo de la reparacion</label>
                <input onChange={onChangeCosto}  type="number" name="costo" id="costo" className=" w-full lg:w-[20%] rounded-md bg-white block min-w-0 py-1.5 pr-3 pl-1 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder="Costo de la reparacion $"/>
            </div>
            <div className='col-span-1 '>
                <label htmlFor="fechaEntrega" className="block mb-1 text-sm/6 font-medium text-gray-900">Fecha aproximada del presupuesto</label>
                    <input  
                    type="date"
                    onChange={onChangeFecha}
                    id="fechaEntrega"
                    name="fechaEntrega"
                    className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
            </div>
            <div className='col-span-1 my-1 '>
                {/* buttons cancelar y aceptar  */}
                <button type='submit' className='btnAceptar' onClick={onHandleAdd}>Aceptar</button>
                <button type='button' onClick={()=>navigate('/Reparaciones')} className='btnCancelar' >Cancelar</button>
            </div>
            <div className='col-span-1 '>
                {success && <div className="alertSuccess" role="alert">
                    {mensajeSuccess}
                </div>}
                {error && <div className="alertError" role="alert">
                    {mensajeError}
                </div>}
            </div>
        </form>
    </>
  )
}
