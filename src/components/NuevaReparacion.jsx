import React, { useEffect, useState } from 'react'
import { postReparacion ,postCliente, getProductos, getClientes, getClienteByCi} from '../Fetchs';
import { useNavigate } from 'react-router-dom';
//body reparaciones
// {
//   "ciCliente": "string",
//   "idTecnico": 0,
//   "idEmpresa": 0,
//   "idSucursal": 0,
//   "idProducto": 0,
//   "numeroSerie": "string",
//   "descripcion": "string",
//   "fechaPromesaPresupuesto": "2025-04-27T00:45:09.972Z"
// }

export const NuevaReparacion = () => {
    const [descripcion, setdescripcion] = useState("")
    const [numeroSerie, setnumeroSerie] = useState("")
    const [ciCliente, setciCliente] = useState("")
    const [equipo, setequipo] = useState(0)
    const [fechaPresupuesto,setfechaPresupuesto] = useState("");
    const [productos, setproductos] = useState([])
    const [userLoged, setuserLoged] = useState({})
    const [error, seterror] = useState(false)
    const [success, setsuccess] = useState(false)
    const [clienteExistente, setclienteExistente] = useState(true)
    const [errorDsc, seterrorDsc] = useState("")
    const navigate = useNavigate();
    useEffect(() => {
      CargarDatosNegocio()
    }, [])

    const CargarDatosNegocio = async() =>{
      const productosResponse = await getProductos()
      setproductos(productosResponse)
      const usu = JSON.parse(localStorage.getItem("UsuarioLog"))
      setuserLoged(usu)
    }

    const onChangeCedula = async(event)=>{
      const responseGetCliente = await getClienteByCi(event.target.value)
      if(responseGetCliente.statusCode != 200){
        setclienteExistente(false)
      }else{
        setciCliente(event.target.value);
        setclienteExistente(true)
      }
      // el fetch por ahora responde undefined si no existe el cliente, ya lo arregle en el backend pero no lo actualice en el servidor
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
        idTecnico:userLoged.id,
        idEmpresa:userLoged.idEmpresa,
        idSucursal:userLoged.idSucursal,
        idProducto:equipo,
        numeroSerie:numeroSerie,
        descripcion:descripcion,
        fechaPromesaPresupuesto:fechaPresupuesto
      }
      const response = await postReparacion(reparacion);
      if(!response.success)
      {
        // no se agrego
        seterror(true)
        setTimeout(() => {
          seterror(false)
        }, 2000);
      }
      else
      {
        // se agrego reparacion
       
        setsuccess(true)
        setTimeout(() => {
          setsuccess(false)
           navigate('/Reparaciones')
        }, 1500);
       
      }

    }
  return (
    <>
       <div className='grid grid-cols-1 lg:grid-cols-3 bg-gray-50 h-auto my-[20px] mx-[20px] gap-8 py-3 px-2'>
        <form onSubmit={handleSubmit} >
          <div className='col col-span-1 p-2'>
            {/* input cedula */}
            <label for="ci" className="block mb-1 text-sm/6 font-medium text-gray-900">Cedula identidad</label>
            {/* <div className='flex items-center gap-2' > */}
            <div>
             <input onBlur={onChangeCedula} type="text" name="ci" id="ci" className=" w-full bg-white block min-w-0 py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" placeholder="Cedula de identidad"/>
              {!clienteExistente && <p className='text-red-500 my-2 peer' >Cliente no existente en el sistema</p> }
             {/* <button className='btnAddSmall'>+</button> */}
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
            <button type='button' onClick={()=>navigate('/Reparaciones')}  className='btnCancelar'>Cancelar</button>
            <button type='submit' className='btnAceptar'>Aceptar</button>
          </div>
          {error &&
            <div className='alertError flex items-center gap-2' >
              {/* aca va a ir segun lo que responda el fetch */}
              <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
              </svg>
              <p>  Error al crear la reparacion</p>
            </div>
          }
          {success &&
            <div className='alertSuccess flex items-center gap-2' >
            {/* aca va a ir segun lo que responda el fetch */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
              <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd" />
            </svg>
              <p>  Reparacion ingresada correctamente</p>
            </div>
          }
        </form>
       </div>
    </>
  )
}
