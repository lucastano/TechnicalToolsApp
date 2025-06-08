import React, { useEffect, useState } from 'react'
import { postReparacion ,postCliente, getProductos, getClientes, getClienteByCi} from '../Fetchs';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export const NuevaReparacion = () => {
    const location = useLocation();
    const { ci, vienePantalla } = location.state || {};
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
      if (ci !== "") {
        setciCliente(ci);
      }
    }, [ci]);
    useEffect(() => {
      console.log('vienePantalla', vienePantalla)
      console.log('ci', ci)
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
      //validar que los campos no esten vacios
      if (descripcion == "" || numeroSerie == "" || ciCliente == "" || equipo == 0 || fechaPresupuesto == "") {
        seterror(true)
        seterrorDsc("Complete todos los campos")
        setTimeout(() => {
          seterror(false)
        }, 2000);
      }
      else
      {
        const hoy = new Date();
        const yyyy = hoy.getFullYear();
        const mm = String(hoy.getMonth() + 1).padStart(2, '0');
        const dd = String(hoy.getDate()).padStart(2, '0');
        const fechaHoyFormato = `${yyyy}-${mm}-${dd}`;
        if (fechaPresupuesto < fechaHoyFormato){
          seterror(true)
          seterrorDsc("Fecha de presupuesto no puede ser menor a la fecha actual")
          setTimeout(() => {
            seterror(false)
          }, 2000); 
        }
        else
        {
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
              setsuccess(true)
              setTimeout(() => {
                setsuccess(false)
                if(vienePantalla ==="ListadoClientes"){
                  navigate('/Clientes')
                }else{
                  navigate('/Reparaciones')
                }
                 
              }, 1500);
            }
        }
      }
      
    }
    const handleCancelarReparacion = () =>{
      if (vienePantalla === "ListadoClientes"){
        navigate('/Clientes')
      }
      else
      {
        navigate('/Reparaciones')
      }
    }
  return (
    <>
      <div className='title p-2'>
          <h1>Ingreso de nueva reparación</h1>
      </div>
       <div className='grid grid-cols-1 lg:grid-cols-3 bg-gray-50 h-auto my-[20px] mx-[20px] gap-8 py-3 px-2'>   
        <form onSubmit={handleSubmit} >
          <div className='col-span-1 p-2'>
            {/* input cedula */}
            <label htmlFor="ci" className="block mb-1 text-sm/6 font-medium text-gray-900">Cedula identidad</label>
            {/* <div className='flex items-center gap-2' > */}
            <div >
             <input disabled={!!ciCliente && vienePantalla ==="ListadoClientes"} value={ciCliente} onBlur={onChangeCedula} type="text" name="ci" id="ci" className="inputsTxt" placeholder="Cedula de identidad"/>
            </div>
            <div className='flex items-center'>
                {!clienteExistente && <><p className='text-red-500 my-2 peer' >Cliente no existente en el sistema</p> <button className='btnAddSmall text-sm'>+</button> </> }
                {/* <button className='btnAddSmall'>+</button> */}
            </div>
              
            
          </div>
          <div className='col-span-1  p-2' >
            <label htmlFor="equipo" className="block mb-1 text-sm/6 font-medium text-gray-900">Equipo</label>
            <select onChange={onChangeEquipo} id="equipo" name="equipo" autoComplete="equipo" className=" w-full appearance-none  bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-800 sm:text-sm/6">
                <option value={0} >seleccione equipo..</option>
               {
                productos.map((p)=>(
                  <option value={p.id} >{p.marca + " "+p.modelo+" "+p.version}</option>
                ))
               }
              </select>
          </div>
          <div className='col-span-1  p-2'>
            <label htmlFor="numeroSerie" className="block mb-1 text-sm/6 font-medium text-gray-900">Numero de serie</label>
            <input onChange={onChangeNumeroSerie} type="text" name="numeroSerie" id="numeroSerie" className="inputsTxt" placeholder="Numero de serie"/>
          </div>
          <div className='col-span-1  p-2'>
            <label htmlFor="falla" className="block mb-1 text-sm/6 font-medium text-gray-900">Descripcion de falla/desperfecto</label>
            <textarea onChange={onChangeDescripcion} name="falla" id="falla" rows="3" className="inputsTxt"></textarea>
          </div>
          <div className='col-span-1  p-2'>
            <label htmlFor="fechaPresupuesto" className="block mb-1 text-sm/6 font-medium text-gray-900">Fecha aproximada del presupuesto</label>
            <input  onChange={onChangeFechaPresupuesto}
              type="date"
              id="fechaPresupuesto"
              name="fechaPresupuesto"
              className="border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-800"
            />
          </div>
          <div className='col-span-1  p-2 flex items-center'>
            {/* seccion de botones return y aceptar */}
            <button type='submit' className='btnAceptar'>Aceptar</button>
            <button type='button' onClick={handleCancelarReparacion}  className='btnCancelar'>Cancelar</button>  
            {error && <>
              <p className=' txtError flex items-center'>
                 <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
                {" "+errorDsc}
              </p>   
            </>
               
            }
                 
          </div>
         
          {success &&
            <div className='alertSuccess flex items-center gap-2' >
            {/* aca va a ir segun lo que responda el fetch */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
              <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
            </svg>
              <p >  Reparacion ingresada correctamente</p>
            </div>
          }
        </form>
       </div>
    </>
  )
}
