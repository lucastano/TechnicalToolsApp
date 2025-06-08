import React, { useEffect, useState } from 'react'
import { getClientes , postCliente,getReparacionesDeClientePorCedula} from '../Fetchs'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider } from '@mui/material';
import { useNavigate } from "react-router-dom";

export const ListadoClientes = () => {
    //navegacion 
    const navigate = useNavigate();
    //PAGINADO
    const [currentPage, setcurrentPage] = useState(1)
    const [totalPage, settotalPage] = useState(0)
    const itemPerPage = 15;
    setcurrentPage
    //open modal
    const [open, setOpen] = useState(false)
    const [modoModal, setModoModal] = useState("")
    //states de post cliente 
    const [nombrePost, setNombrePost] = useState("")
    const [apellidoPost, setApellidoPost] = useState("")
    const [emailPost, setEmailPost] = useState("")
    const [direccionPost, setDireccionPost] = useState("")
    const [telefonoPost, setTelefonoPost] = useState("")
    const [ciPost, setCiPost] = useState("")
    const [error, seterror] = useState(false)
    const [errorMsj, seterrorMsj] = useState("")
    //variables orden
    //POR DEFECTO ORDEN ALFABETICO
    const [ordenAZ, setOrdenAZ] = useState(true)
    // reparaciones de cliente 
    const [reparacionesCliente, setreparacionesCliente] = useState([])

    const [clientesAux, setclientesAux] = useState([])
    const [clientes, setClientes] = useState([])
    const [email, setEmail] = useState("")
    const [nombre, setNombre] = useState("")
    const [telefono, setTelefono] = useState("")
    const [ci, setCi] = useState("")

    useEffect(() => {
      getClientesStart();
    }, [])

    useEffect(() => {
        setcurrentPage(1)
        const copia = [...clientes];
        copia.sort((a, b) => {
        if (ordenAZ) {
            return a.nombre.localeCompare(b.nombre); // A-Z
        } else {
            return b.nombre.localeCompare(a.nombre); // Z-A
        }
        });
        setClientes(copia);
    }, [ordenAZ]);
    

    //open dialog desde visualizar cliente 
    const handleClickOpenVisualizarCliente = async(ci)=>{
        setModoModal("Visualizar")
        const cliente = clientes.find(c=>c.ci === ci);
        console.log('cliente', cliente)
        setCiPost(cliente.ci)
        setNombrePost(cliente.nombre)
        setApellidoPost(cliente.apellido)
        setTelefonoPost(cliente.telefono)
        setDireccionPost(cliente.direccion)
        setEmailPost(cliente.email)
        const reparaciones = await getReparacionesDeClientePorCedula(cliente.ci);
        console.log('reparaciones', reparaciones)
        setreparacionesCliente(reparaciones)
        setOpen(true)
    }

    //open dialog desde agregar cliente 
    const handleClickOpen = () => {
        setModoModal("Crear")
    setOpen(true);
    };
  //close dialog
    const handleClose = () => {
        setcurrentPage(1)
        setNombrePost("")
        setApellidoPost("")
        setCiPost("")
        setDireccionPost("")
        setTelefonoPost("")
        setEmailPost("")
        seterror(false)
        seterrorMsj("")
        setOpen(false);
    };

    const onChangeNombre = (event) => {
        setNombre(event.target.value);
    }
    const onChangeEmail =(event) => {
        setEmail(event.target.value);
    }
    const onChangeTelefono =(event) =>{
        setTelefono(event.target.value)
    }
    const onChangeCi =(event) => {
        setCi(event.target.value)
    }
    
    const aplicarFiltros = () => {
        setcurrentPage(1)
        if (nombre === "" && email === "" && telefono ==="" && ci === "") {
            setClientes(clientesAux);
        } else {
        const resultado = (nombre || email || telefono || ci)
        ? clientes.filter(c =>
            (nombre === "" || c.nombre.toLowerCase().includes(nombre.toLowerCase())) &&
            (email === "" || c.email.toLowerCase().includes(email.toLowerCase())) &&
            (telefono === "" || c.telefono.toLowerCase().includes(telefono.toLowerCase())) &&
            (ci === "" || c.ci.toLowerCase().includes(ci.toLowerCase()))

            )
        : clientesAux;
        setClientes(resultado)  
        }
    }
    const resetearFiltros = () =>{
        setcurrentPage(1)
        setClientes(clientesAux)
        setEmail("")
        setNombre("")
        setTelefono("")
        setCi("")
    }

    const getClientesStart = async () =>{
        const response = await getClientes();
        const list = response.clientes;
        console.log('list', list)
        if (ordenAZ){
            list.sort((a,b)=>a.nombre.localeCompare(b.nombre));
        }
        else {
            list.sort((a,b)=>b.nombre.localeCompare(a.nombre));
        }
        setClientes(response.clientes)
        setclientesAux(response.clientes)
         const total = Math.ceil(response.clientes.length / itemPerPage);
        settotalPage(total);
    }


    const handleAgregarCliente = async() =>{
        let seguir = true
        switch (seguir) {
        case nombrePost === "":
            seguir = false
            break;
        case apellidoPost === "":
            seguir = false
            break;
        case emailPost === "":
            seguir = false
            break;
        case direccionPost === "":
            seguir = false
            break;
        case telefonoPost === "":
            seguir = false
            break;
        case ciPost === "":
            seguir = false
            break;
        default:
            seguir = true
            break;
        }
        if (seguir)
        {
            const newCliente = {
            nombre: nombrePost,
            apellido: apellidoPost,
            email: emailPost,
            direccion: direccionPost,
            telefono: telefonoPost,
            ci: ciPost
            }
            const response = await postCliente(newCliente)
            if (response.success){
                getClientesStart()
                handleClose()
                setcurrentPage(1)
            }
            else
            {
                //accion cuando falla el fetch

            }
        }
        else
        {
            seterrorMsj("Debe completar todos los campos")
            seterror(true)
            setTimeout(() => {
                seterror(false)
                seterrorMsj("")
                
            }, 2000);

        }
       
    }
    // PAGINADO
    const nextPage = ()=>{
      let page = currentPage
      page++;
      if(page<=totalPage){
        setcurrentPage(page)
      }
    }
    const previousPage = ()=>{
      console.log('next')
      let page = currentPage
      page--;
      if(page >=1){
        setcurrentPage(page)
      }
    }
    const toLast = ()=>{
      setcurrentPage(totalPage)
    }
    const toFirst =()=>{
      setcurrentPage(1)
    }

    const startIndex = (currentPage - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;
    const clientesMostrados = clientes.slice(startIndex, endIndex);

    const handleNuevaReparacion = (ci) =>{
        navigate("/NuevaReparacion", { state: { ci: ci,vienePantalla:"ListadoClientes"} });
    }

  return (
    <>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm" // xs, sm, md, lg, xl
        fullWidth // hace que use todo el ancho disponible hasta el maxWidth
        >
        <DialogTitle id="alert-dialog-title">
            { modoModal === "Visualizar" ?
             <p>Cliente - Visualizar</p>:<p>Cliente - Crear</p>
            }
          
        </DialogTitle>
        <Divider></Divider>
        <DialogContent>
            <div className=' p-2'>
                <label htmlFor='nombre'>Nombre</label>
                <input disabled={modoModal === "Visualizar"} onChange={(e)=>setNombrePost(e.target.value)} value={nombrePost} className='inputsTxt' type='text' name='nombre' id='nombre'></input>
            </div>
            <div className=' p-2'>
                <label htmlFor='apellido'>Apellido</label>
                <input disabled={modoModal === "Visualizar"} onChange={(e)=>setApellidoPost(e.target.value)} value={apellidoPost} className='inputsTxt' type='text' name='apellido' id='apellido'></input>
            </div>
            <div className=' p-2'>
                <label htmlFor='telefono'>Telefono</label>
                <input disabled={modoModal === "Visualizar"} onChange={(e)=>setTelefonoPost(e.target.value)} value={telefonoPost} className='inputsTxt' type='text' name='telefono' id='telefono'></input>
            </div>
            <div className=' p-2'>
                <label htmlFor='email'>Email</label>
                <input disabled={modoModal === "Visualizar"} onChange={(e)=>setEmailPost(e.target.value)} value={emailPost} className='inputsTxt' type='text' name='email' id='email'></input>
            </div>
             <div className=' p-2'>
                <label htmlFor='direccion'>Dirección</label>
                <input disabled={modoModal === "Visualizar"} onChange={(e)=>setDireccionPost(e.target.value)} value={direccionPost} className='inputsTxt' type='text' name='direccion' id='direccion'></input>
            </div>
            <div className=' p-2'>
                <label htmlFor='documento'>Documento de identidad</label>
                <input disabled={modoModal === "Visualizar"} onChange={(e)=>setCiPost(e.target.value)} value={ciPost} className='inputsTxt' type='text' name='documento' id='documento'></input>
            </div>
            {modoModal === "Visualizar" &&
                <div className=' p-2'>
                    <label htmlFor='documento'>Cantidad de reparaciones:</label>
                    <p>{reparacionesCliente.length}</p>
                </div>
            }
            
            <div className=' p-2 txtError flex items-center gap-2'>
                {error &&
                <>
                    <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>
                    <p className='mr-2'>{errorMsj}</p>
                </>    
                }
            </div>
        </DialogContent>
        <DialogActions>
            {modoModal ==="Crear" &&
              <button onClick={handleAgregarCliente} className='btnAceptar'>Agregar</button>
            }
            <button className='btnCancelar' onClick={handleClose}>{modoModal === "Crear" ? "Cancelar":"Volver"}</button>
        </DialogActions>
      </Dialog>
        <div className='title p-2'>
            <h1>Listado de clientes</h1>
        </div>
        <div className='grid grid-cols-1  md:grid-cols-5  h-auto my-[20px] mx-[20px] gap-8 py-3 px-2'>
            <div className='col-span-1 md:col-span-1 title flex flex-col '>
                <div className='p-2 m-2 bg-gray-50'>
                    <h1 className='p-2'>Filtros</h1>
                    <div className='flex items-center p-2'>
                        <label className='text-sm w-20' htmlFor='nombre'>Nombre:</label>
                        <input onChange={onChangeNombre} value={nombre} type='text' className='inputsSmallTxt'></input>
                    </div>
                    <div className='flex items-center p-2'>
                        <label className='text-sm w-20 ' htmlFor='ci'>Cedula: </label>
                        <input onChange={onChangeCi} value={ci} type='text' className='inputsSmallTxt'></input>
                    </div>
                    <div className='flex items-center p-2'>
                        <label className='text-sm w-20 ' htmlFor='email'>Telefono: </label>
                        <input onChange={onChangeTelefono} value={telefono} type='text' className='inputsSmallTxt'></input>
                    </div>
                    <div className='flex items-center p-2'>
                        <label className='text-sm w-20 ' htmlFor='email'>Email: </label>
                        <input onChange={onChangeEmail} value={email} type='text' className='inputsSmallTxt'></input>
                    </div>
                    <div>
                        <button onClick={aplicarFiltros} className='btnAceptarFiltros'>Buscar</button>
                        <button onClick={resetearFiltros}  className='btnResetFiltros'>Resetear</button>
                    </div>
                </div>
                <div className='p-2 m-2 bg-gray-50'>
                    <h1 className='p-2'>Orden</h1>
                    <div className='flex p-2'>
                        <input
                            type="radio"
                            id="ordenaz"
                            name="ordenNombre"
                            checked={ordenAZ}
                            onChange={()=>setOrdenAZ(true)}
                            className="accent-blue-500 mx-2"
                        />
                        <label className='text-sm w-35' htmlFor='ordenaz'>Nombre A-Z</label>
                    </div>
                    <div className='flex p-2'>
                        <input
                            type="radio"
                            id="ordenZA"
                            name="ordenNombre"
                            checked={!ordenAZ}
                            onChange={()=>setOrdenAZ(false)}
                            className="accent-blue-500 mx-2"
                        />
                        <label className='text-sm w-35' htmlFor='ordenZA'>Nombre Z-A</label>
                    </div>
                </div>
                <div className='p-2 m-2 bg-gray-50'>
                    <h1 className='p-2'>Acciones</h1>
                    <button onClick={handleClickOpen} className='btnAceptarFiltros'>Agregar</button>
                </div>
            </div>

            {/* comienza div de tabla */}
            <div className='col-span-1 md:col-span-4'>
                <div>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr className='bg-blue-950 text-white h-7'>
                            <th className='text-left px-4'>Nombre</th>
                            <th className='text-left px-4'>Cedula</th>
                            <th  className='text-left px-4'>Telefono</th>
                            <th  className='text-left px-4'>Email</th>
                            <th  className='text-left px-4'>Dirección</th>
                            <th  className='text-left px-4'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            clientesMostrados.map((c,i) =>(
                                <tr key={i} className='even:bg-gray-200 hover:bg-gray-100 transition h-7'>
                                <td className='txtRows '>{c.nombre+" "+c.apellido}</td> 
                                <td className='txtRows'>{c.ci}</td>
                                <td className='txtRows '>{ c.telefono}</td>
                                <td className='txtRows '>{c.email}</td>
                                <td className='txtRows '>{c.direccion}</td>
                                <td className='txtRows flex justify-center items-center '>
                                    {/* darle estilos al btn en el div */}
                                    <div className='bg-green-700 cursor-pointer text-white flex items-center justify-center w-7 h-7 m-1' title='Agregar reparación'>
                                        {/* accion nueva reparacion */}
                                        <svg  onClick={()=>handleNuevaReparacion(c.ci)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>

                                    </div>
                                    <div title='Visualizar' className='btnIconosGrid'>
                                        <svg onClick={()=>handleClickOpenVisualizarCliente(c.ci)}  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                    </div>
                                </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div>
                    <div className='flex items-center justify-between col-span-1 my-[20px] m-[20px]'>
            {/* desde aca  empieza el paginado , por ahora no funciona */}
            <div className="flex flex-1 justify-between sm:hidden">
                <a href="#" className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
                <a href="#" className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                {/* div sin conenido */}
                </div>
                <div>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-xs" aria-label="Pagination">
                    {/* Previous */}
                    <a onClick={previousPage} className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    <span className="sr-only">Previous</span>
                    <svg className="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                        <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                    </svg>
                    </a>

                    {/* ToFirst */}
                    <a onClick={toFirst} className="relative inline-flex items-center  px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    <span className="sr-only">Previous</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M10.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L12.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5Z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M4.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L6.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5Z" clipRule="evenodd" />
                    </svg> 
                    </a>

                    {/* CURRENT + TOTALPAGES */}
                    <a className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0">{currentPage} de {totalPage}</a>

                    {/* ToLast */}
                    <a onClick={toLast} className="relative inline-flex items-center  px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    <span className="sr-only">Next</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M13.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M19.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                    </svg>
                    </a>

                    {/* ToNext */}
                    <a onClick={nextPage} className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    <span className="sr-only">Next</span>
                    <svg className="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                        <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                    </a>
                </nav>
                </div>
                </div>
            </div>

            </div>   
            </div>
        </div>
    </>
  )
}
