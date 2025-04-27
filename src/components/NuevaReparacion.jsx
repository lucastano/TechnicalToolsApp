import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { postReparacion ,postCliente} from '../Fetchs';
import { useNavigate } from 'react-router-dom';

export const NuevaReparacion = ({openValue,onClose}) => {
  
    const [descripcion, setdescripcion] = useState("")
    const [numeroSerie, setnumeroSerie] = useState("")
    const [ciCliente, setciCliente] = useState("")
    const [equipo, setequipo] = useState(0)
    const [fechaPresupuesto,setfechaPresupuesto] = useState("");
    const productos = useSelector(selectProductos);
    const emp = useSelector(selectEmpresa);
    const suc = useSelector(selectSucursal);
    const usu = useSelector(selectUsuario);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    useEffect(() => {
      
      // setproductosSelect(productos)
      console.log('productos', productos)
    }, [])

    const onChangeCedula =(event)=>{
      setciCliente(event.target.value);
      

    }
    const onChangeEquipo = (event)=>{
      const idEquipo = Number(event.target.value);
      setequipo(idEquipo);
    }
    const onChangeNumeroSerie = (event)=>{
      setnumeroSerie(event.target.value);
    }
    const onChangeDescripcion =(event)=>{
      setdescripcion(event.target.value)
    }
    const onChangeFechaPresupuesto =(event)=>{
      setfechaPresupuesto(event.target.value);
    }
    
    const handleSubmit = async(event)=>{
      event.preventDefault()
      const reparacion ={
        ciCliente:ciCliente,
        idTecnico:usu.userId,
        idEmpresa:emp.id,
        idSucursal:suc.id,
        idProducto:equipo,
        numeroSerie:numeroSerie,
        descripcion:descripcion,
        fechaPromesaPresupuesto:fechaPresupuesto
      }
      console.log('reparacion antes de post', reparacion)
      const response = await postReparacion(dispatch,reparacion);
      if(!response.success)
      {
        // no se agrego
      }
      else
      {
        // se agrego reparacion
        navigate('/Reparaciones')
      }

    }
  return (
    <>
       <div className='grid grid-cols-1 lg:grid-cols-3 bg-gray-50 h-auto my-[20px] mx-[20px] gap-8 py-3 px-2'>
        <form onSubmit={handleSubmit} >
          <div className='col col-span-1 p-2'>
            {/* input cedula */}
            <label for="ci" className="block mb-1 text-sm/6 font-medium text-gray-900">Cedula identidad</label>
            <div className='flex items-center gap-2' >
             <input onChange={onChangeCedula} type="text" name="ci" id="ci" className=" w-full bg-white block min-w-0 py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" placeholder="Cedula de identidad"/>
             <button className='btnAddSmall'>+</button>
            </div>
          </div>
          <div className='col col-span-1  p-2' >
            <label for="equipo" className="block mb-1 text-sm/6 font-medium text-gray-900">Equipo</label>
            <select onChange={onChangeEquipo} id="equipo" name="equipo" autocomplete="equipo" className=" w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                <option value={0} >seleccione equipo..</option>
               {
                productos.map((p)=>(
                  <option value={p.id} >{p.marca + " "+p.modelo+" "+p.version}</option>
                ))
               }
              </select>
          </div>
          <div className='col col-span-1  p-2'>
            <label for="numeroSerie" className="block mb-1 text-sm/6 font-medium text-gray-900">Numero de serie</label>
            <input onChange={onChangeNumeroSerie} type="text" name="numeroSerie" id="nomnumeroSeriebre" className="w-full bg-white block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" placeholder="Numero de serie"/>
          </div>
          <div className='col col-span-1  p-2'>
            <label for="falla" className="block mb-1 text-sm/6 font-medium text-gray-900">Descripcion de falla/desperfecto</label>
            <textarea onChange={onChangeDescripcion} name="falla" id="falla" rows="3" className="w-full block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"></textarea>
          </div>
          <div className='col col-span-1  p-2'>
            <label for="fechaPresupuesto" className="block mb-1 text-sm/6 font-medium text-gray-900">Fecha aproximada del presupuesto</label>
            <input  onChange={onChangeFechaPresupuesto}
              type="date"
              id="fechaPresupuesto"
              name="fechaPresupuesto"
              className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className='col col-span-1  p-2'>
            {/* seccion de botones return y aceptar */}
            <button onClick={()=>navigate('/Reparaciones')}  className='btnCancelar'>Cancelar</button>
            <button type='submit' className='btnAceptar'>Aceptar</button>
          </div>
        </form>
       </div>
    </>
  )
}
