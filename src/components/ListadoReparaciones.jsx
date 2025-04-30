import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { generarOrdSrv, getReparaciones } from '../Fetchs';



export const ListadoReparaciones = () => {
  const [reparaciones, setreparaciones] = useState([])
  const [user, setuser] = useState({})
  const [tabSelected, settabSelected] = useState("EnTaller")
  const navigate = useNavigate();
  const itemPerPage = 12;
  const [currentPage, setcurrentPage] = useState(1)
  const [totalPage, settotalPage] = useState(0)
  const [counterClickOnOrd, setcounterClickOnOrd] = useState(1)
    useEffect(() => {
      cargarReparaciones()
    }, [])

    const cargarReparaciones = async () => {
      const usuarioLog = JSON.parse(localStorage.getItem('UsuarioLog'))
      setuser(usuarioLog)
      const reparacionesResponse = await getReparaciones(usuarioLog)
      setreparaciones(reparacionesResponse);
    }
    const reparacionesFiltradas = reparaciones.filter((r) => r.estado === tabSelected);
    useEffect(() => {
      const total = Math.ceil(reparacionesFiltradas.length / itemPerPage);
      settotalPage(total);
    }, [reparacionesFiltradas]);

    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    let currentItems = reparacionesFiltradas.slice(indexOfFirstItem, indexOfLastItem);
    let currentItemsResp = reparacionesFiltradas.slice(indexOfFirstItem, indexOfLastItem);

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
    const selectTab = (tab) => {
      setcurrentPage(1)
      settabSelected(tab)
    }
    const onChangeOrdNroOrdn = ()=>{
      if(counterClickOnOrd === 4){
        setcounterClickOnOrd(1)
      }else{
        let counterClickOnOrdAux = counterClickOnOrd + 1
        setcounterClickOnOrd(counterClickOnOrdAux);
      }
      console.log('click en orden',counterClickOnOrd)
      //CERO - SIN FILTROS
      // UNO - DECRECIENTE
      if(counterClickOnOrd === 1){
        ordenarDesc()
        console.log('es 2')
      }
      else if(counterClickOnOrd === 2){
        ordenarAsc()
        console.log('es 3')
      }
      else {
        console.log('es 1')
        sinOrdenar()
      }

    }
    const  ordenarAsc =()=>{
      const currentItemsAux = currentItems.sort((a,b)=>a.id - b.id);
      console.log('currentItemsAux', currentItemsAux)
      currentItems = currentItemsAux;
    }
    const ordenarDesc = () =>{
      const currentItemsAux = currentItems.sort((a,b)=>b.id - a.id);
      console.log('currentItemsAux', currentItemsAux)
      currentItems = currentItemsAux;
    }
    const sinOrdenar = () =>{
      currentItems = currentItemsResp;
    }

    const irPresupuestar = (id) => {
      navigate(`/Presupuestar/${id}`)
    }
  
  
  return (
    <>
      <div className='grid grid-cols-1 bg-gray-50 h-auto my-[20px] mx-[20px] gap-8 py-3 px-2'>
        <div className='col-span-1  my-[10px] m-[10px] flex justify-between'>
          <div className='flex gap-3 items-center justify-center p-2  '>
            <div onClick={()=>selectTab("EnTaller")}  className={`${tabSelected === "EnTaller" ? "border-blue-950" : "border-blue-800"} cursor-pointer border-b-4 border-blue-800  hover:border-blue-950  p-2`} >En taller</div>
            <div onClick={()=>selectTab("Presupuestada")} className={`${tabSelected === "Presupuestada" ? "border-blue-950" : "border-blue-800"} cursor-pointer border-b-4 border-blue-800  hover:border-blue-950  p-2`} >Presupuestadas</div>
            <div onClick={()=>selectTab("Aceptada")} className={`${tabSelected === "Aceptada" ? "border-blue-950" : "border-blue-800"} cursor-pointer border-b-4 border-blue-800  hover:border-blue-950  p-2`} >Aceptadas</div>
            <div onClick={()=>selectTab("Terminada")} className={`${tabSelected === "Terminada" ? "border-blue-950" : "border-blue-800"} cursor-pointer border-b-4 border-blue-800  hover:border-blue-950  p-2`}  >Terminadas</div>
            <div onClick={()=>selectTab("Entregada")} className={`${tabSelected === "Entregada" ? "border-blue-950" : "border-blue-800"} cursor-pointer border-b-4 border-blue-800  hover:border-blue-950  p-2`} >Entregadas</div>
          </div>
          <div > <button onClick={()=>navigate('/NuevaReparacion')} className='btnAgregar cursor-pointer'>Nueva</button></div>
        </div>
        <div className='col-span-1  my-[5px] m-[20px]'>
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className='bg-blue-950 text-white h-7'>
                  <th className='cursor-pointer flex justify-center gap-2' onClick={onChangeOrdNroOrdn} > Nro. Orden
                    <div>
                      {counterClickOnOrd === 1 &&
                        <svg className='invisible'  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                         <path className='invisible' strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                        </svg>
                      }
                      {counterClickOnOrd === 2 &&
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                      }
                      {counterClickOnOrd === 3 &&
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                         <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                        </svg>
                      }
                    </div>
                  </th>
                  <th>Fecha de ingreso</th>
                  <th>Cliente</th>
                  <th>Aparato</th>
                  <th>Serie</th>
                  <th>Falla</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {
                  currentItems.map((r,i) =>(
                    <tr key={i} className='even:bg-gray-200 hover:bg-gray-100 transition h-7'>
                      <td className='text-center'>{r.id}</td> 
                      <td className='text-center'>{ new Date(r.fecha).toLocaleDateString()}</td>
                      <td className='text-center'>{r.clienteNombre + " "+r.clienteApellido}</td>
                      <td className='text-center'>{r.producto.marca}</td>
                      <td className='text-center'>{r.numeroSerie}</td>
                      <td className='text-center' > {r.descripcion}</td>
                      <td className='text-center flex gap-4 p-1'>
                        <div title='Generar orden'  className='btnIconosGrid '>
                              {/* print */}
                              <svg onClick={()=>generarOrdSrv(r.id,user.idEmpresa,user.idSucursal)}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                <path fillRule="evenodd" d="M7.875 1.5C6.839 1.5 6 2.34 6 3.375v2.99c-.426.053-.851.11-1.274.174-1.454.218-2.476 1.483-2.476 2.917v6.294a3 3 0 0 0 3 3h.27l-.155 1.705A1.875 1.875 0 0 0 7.232 22.5h9.536a1.875 1.875 0 0 0 1.867-2.045l-.155-1.705h.27a3 3 0 0 0 3-3V9.456c0-1.434-1.022-2.7-2.476-2.917A48.716 48.716 0 0 0 18 6.366V3.375c0-1.036-.84-1.875-1.875-1.875h-8.25ZM16.5 6.205v-2.83A.375.375 0 0 0 16.125 3h-8.25a.375.375 0 0 0-.375.375v2.83a49.353 49.353 0 0 1 9 0Zm-.217 8.265c.178.018.317.16.333.337l.526 5.784a.375.375 0 0 1-.374.409H7.232a.375.375 0 0 1-.374-.409l.526-5.784a.373.373 0 0 1 .333-.337 41.741 41.741 0 0 1 8.566 0Zm.967-3.97a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H18a.75.75 0 0 1-.75-.75V10.5ZM15 9.75a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V10.5a.75.75 0 0 0-.75-.75H15Z" clipRule="evenodd" />
                              </svg>
                          </div>
                        {r.estado == "EnTaller" &&
                          <>
                            <div title='Presupuestar' className='btnIconosGrid'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                  <path onClick={()=>irPresupuestar(r.id)} fillRule="evenodd" d="M12 6.75a5.25 5.25 0 0 1 6.775-5.025.75.75 0 0 1 .313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 0 1 1.248.313 5.25 5.25 0 0 1-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 1 1 2.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0 1 12 6.75ZM4.117 19.125a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z" clipRule="evenodd" />
                                </svg>
                            </div>
                          </>
                        }
                        {r.estado == "Presupuestada" &&
                          <>
                              <div title='Aceptar' className='btnIconosGrid ' >
                              {/* aceptar */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                  <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
                                </svg>
                              </div>
                              <div title='Cancelar' className='btnIconosGrid'>
                            {/* cancelar */}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54" />
                                </svg>
                            </div>
                          </>
                        }
                        {r.estado == "Aceptada" &&
                          <>
                              <div title='Terminar' className='btnIconosGrid ' >
                              {/* aceptar */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                  <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
                                </svg>
                              </div>
                              <div title='Cancelar' className='btnIconosGrid'>
                            {/* cancelar */}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54" />
                                </svg>
                            </div>
                          </>
                        }
                        {r.estado == "Terminada" &&
                          <>
                              <div title='Entregar' className='btnIconosGrid ' >
                              {/* Entregar */}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                </svg>
                              </div>
                          </>
                        }
                      </td>
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
                {/* Previous */}
                <a onClick={previousPage} class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                  <span class="sr-only">Previous</span>
                  <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                    <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                  </svg>
                </a>

                {/* ToFirst */}
                <a onClick={toFirst} class="relative inline-flex items-center  px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                  <span class="sr-only">Previous</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                    <path fillRule="evenodd" d="M10.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L12.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5Z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M4.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L6.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5Z" clipRule="evenodd" />
                  </svg> 
                </a>

                {/* CURRENT + TOTALPAGES */}
                <a class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0">{currentPage} de {totalPage}</a>

                {/* ToLast */}
                <a onClick={toLast} class="relative inline-flex items-center  px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                  <span class="sr-only">Next</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                    <path fillRule="evenodd" d="M13.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M19.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                  </svg>
                </a>

                {/* ToNext */}
                <a onClick={nextPage} class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                  <span class="sr-only">Next</span>
                  <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                    <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
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
