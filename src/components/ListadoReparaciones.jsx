import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { generarOrdSrv, getReparaciones, postAceptarPresupuesto,postNoAceptarPresupuesto,postTerminarReparacion,postEntregarReparacion} from '../Fetchs';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Divider from '@mui/material/Divider';
import DialogContentText from '@mui/material/DialogContentText';
import { Loading } from './Loading';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export const ListadoReparaciones = () => {
  //open modal aceptar presupuesto
  const [openAceptarPresupuesto, setOpenAceptarPresupuesto] = React.useState(false);
  // open modal
  const [open, setOpen] = React.useState(false);
  // modo del modal
  const [modo, setmodo] = useState("")
  // reparacion seleccionada
  const [repSeleccionada, setrepSeleccionada] = useState({producto:{}})
  const [idRepSeleccionada, setidRepSeleccionada] = useState(0)
  // trato de re-renderizar el componente para probar si se vuelve a hacer el fetch de reparaciones 
  const [renderizados, setrenderizados] = useState(0)
  // valors de inputs de no aceptar presupuesto
  const [costoNoAceptar, setcostoNoAceptar] = useState(0)
  const [razonNoAceptar, setrazonNoAceptar] = useState("")

  const [reparaciones, setreparaciones] = useState([])
  const [user, setuser] = useState({})
  const [tabSelected, settabSelected] = useState("EnTaller")
  const navigate = useNavigate();
  const itemPerPage = 12;
  const [currentPage, setcurrentPage] = useState(1)
  const [totalPage, settotalPage] = useState(0)
  const [counterClickOnOrd, setcounterClickOnOrd] = useState(1)

  const [loading, setloading] = useState(true)
    useEffect(() => {
      cargarReparaciones()
    }, [])

    useEffect(() => {
      cargarReparaciones()
    }, [renderizados])
    

    const refresh =()=>{
      let num = renderizados
      num ++;
      setrenderizados(num)
    }
 
    // controles para el modal visualizar y modificar reparaciones 
      const handleClickOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };

    const onClickModificar = (id) =>{
      setmodo("Modificar")
      handleClickOpen()
    }
    const onClickVisualizar =(id) =>{
      const rep = currentItems.find(r =>r.id == id);
      setrepSeleccionada(rep)
      console.log('rep', rep)
      setmodo("Visualizar")
      handleClickOpen()
    }
    const cargarReparaciones = async () => {

      try
      { 
        const usuarioLog = JSON.parse(localStorage.getItem('UsuarioLog'))
        setuser(usuarioLog)
        const reparacionesResponse = await getReparaciones(usuarioLog)
        setreparaciones(reparacionesResponse);
      }
      catch(err)
      {
        console.log('err', err)
      }
      finally
      {
        setloading(false)
      }
    
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
    //esta accion se usa  para abrir el modal de acciones sobre la reparacion, recibe el id de la reparacion y el modo 
    // el modo se utiliza para saber los campos que va a tener el modal
    const handleClickModalReparacionGeneral = (id,modo) => {
      setmodo(modo)
      setidRepSeleccionada(id)
      setOpenAceptarPresupuesto(true);
    }
    //accion para cerrar el modal
    const handleCloseAceptarPresupuesto = () => {
      setOpenAceptarPresupuesto(false);
    };


   const clickAceptarPresupuesto = async()=>{
    console.log('idRepSeleccionada en aceptar presupuesto', idRepSeleccionada)
    const response = await postAceptarPresupuesto(idRepSeleccionada);
    refresh()
    setidRepSeleccionada(0)
    handleCloseAceptarPresupuesto()
   }
   const accionNoAceptarPresupuesto = async () => {
    // aca va el fetch de no aceptar presupuesto
    const response = await postNoAceptarPresupuesto(idRepSeleccionada,costoNoAceptar,razonNoAceptar)
    console.log('response', response)
    console.log('accion no aceptar presupuesto disaparda ')
    setidRepSeleccionada(0)
    refresh()
    handleCloseAceptarPresupuesto()
   }

   const accionTerminarReparacion = async() =>{
    // aca va el fetch para terminar la reparacion 
    // por ahora le pasamos true para probar, pero en realidad en la modal hay que agregarle un input de si fue reparada o no 
    console.log('repSeleccionada.id en la accion de terminar reparacion', repSeleccionada.id)
    const response = await postTerminarReparacion(idRepSeleccionada,true)
    console.log('response', response)
    setidRepSeleccionada(0)
    refresh()
    handleCloseAceptarPresupuesto()
   }
   const accionEntregarReparacion = async () =>{
    // aca va el fetch para entregar la reparacion
    const response = await postEntregarReparacion(idRepSeleccionada)
    console.log('response entregar reparacion', response)
    setidRepSeleccionada(0)
    refresh()
    handleCloseAceptarPresupuesto()
   }
  
  return (
    <>
    {loading && <Loading/>}
    {/* inicia el modal para aceptar un presupuesto */}
    <Dialog
        open={openAceptarPresupuesto}
        onClose={handleCloseAceptarPresupuesto}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {modo =="AceptarPresupuesto" ?
        <>
          <DialogTitle id="alert-dialog-title">
            Aceptar presupuesto de reparación
          </DialogTitle>
           <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Aceptar presupuesto para la reparación orden número {idRepSeleccionada} ?
            </DialogContentText>
          </DialogContent>
           <DialogActions>
            <button className='btnAceptar' type='button' onClick={clickAceptarPresupuesto}>Aceptar</button>
            <button className='btnCancelar' type='button' onClick={handleCloseAceptarPresupuesto} >
              Cancelar
            </button>
          </DialogActions>
          </>
          :
          modo =="NoAceptarPresupuesto"?
          <>
            <DialogTitle id="alert-dialog-title">
              No aceptar presupuesto de reparación
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <label htmlFor='txtRazon'>Razon</label>
                <textarea onChange={(e) => setrazonNoAceptar(e.target.value)} type='text' name='txtRazon' id='txtRazon' className="w-full bg-gray-100 block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" />
                <label htmlFor='costo'>Costo</label>
                <input onChange={(e)=> setcostoNoAceptar(e.target.value)} type='number' id='costo' name='costo' className="w-full  bg-gray-100 block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"></input>
                <div className='mt-4'>
                    Desea cancelar el presupuesto para la reparación orden número {idRepSeleccionada} ?
                </div> 
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              {/* tengo que cambiar las acciones del btn aceptar  */}
              <button className='btnAceptar' type='button' onClick={accionNoAceptarPresupuesto}>Aceptar</button>
              <button className='btnCancelar' type='button' onClick={handleCloseAceptarPresupuesto} >
                Cancelar
              </button>
            </DialogActions>
          </>:
          modo == "TerminarReparacion" ?
          <>
            <DialogTitle id="alert-dialog-title">
               Terminar reparación
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Desea terminar la reparación con la orden orden número {idRepSeleccionada} ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              {/* tengo que cambiar las acciones del btn aceptar  */}
              <button className='btnAceptar' type='button' onClick={accionTerminarReparacion}>Aceptar</button>
              <button className='btnCancelar' type='button' onClick={handleCloseAceptarPresupuesto} >
                Cancelar
              </button>
            </DialogActions>
          </> :
          modo == "EntregarReparacion" ?
          <>
            <DialogTitle id="alert-dialog-title">
               Entregar reparación
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Desea entregar la reparación con la orden orden número {idRepSeleccionada} ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              {/* tengo que cambiar las acciones del btn aceptar  */}
              <button className='btnAceptar' type='button' onClick={accionEntregarReparacion}>Aceptar</button>
              <button className='btnCancelar' type='button' onClick={handleCloseAceptarPresupuesto} >
                Cancelar
              </button>
            </DialogActions>
          </> :
          <p>accion desconocida</p>
        }
       
       
      </Dialog>

    {/* inicio componente del modal visualizar modificar */}
    <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Reparación - {modo}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Accordion>
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span">Datos del cliente</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Divider />
              <div className='mt-2'>
                <Typography>
                  <strong>Nombre:</strong>{" "+repSeleccionada.clienteNombre}
                </Typography>
                <Typography>
                  <strong>Apellido:</strong>{" "+repSeleccionada.clienteApellido}
                </Typography>
                <Typography>
                  <strong>Email:</strong>{" "+repSeleccionada.clienteEmail}
                </Typography>
                <Typography>
                  <strong>Telefono:</strong>{" "+repSeleccionada.clienteTelefono}
                </Typography>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography component="span">Datos de la reparacion</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Divider />
              <div className='mt-2'>
                {/* Numero de orden */}
                <div >
                  <label htmlFor="numeroOrden" className="block mb-1 text-sm/6 font-medium text-gray-900"> <strong>Número de orden:</strong></label>
                  <input value={repSeleccionada.id} disabled type="text" name="numeroOrden" id="numeroOrden" className="w-full bg-white block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"/>
                </div>

                {/* numero de serie  */}
                <div>
                  <label htmlFor="numeroSerie" className="block mb-1 text-sm/6 font-medium text-gray-900"><strong>Número de serie:</strong></label>
                  <input value={repSeleccionada.numeroSerie} disabled type="text" name="numeroSerie" id="numeroSerie" className="w-full bg-white block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"/>
                </div>
                {/* aparato  */}
                <div >
                  <label htmlFor="aparato" className="block mb-1 text-sm/6 font-medium text-gray-900"><strong>Aparato:</strong></label>
                   <input value={repSeleccionada.producto.marca + " "+repSeleccionada.producto.modelo} disabled type="text" name="aparato" id="aparato" className="w-full bg-white block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"/> 
                </div>

                {/* fecha de ingreso */}
                <div >
                  <label htmlFor="fechaIngreso" className="block mb-1 text-sm/6 font-medium text-gray-900"> <strong>Fecha de ingreso:</strong></label>
                  <input value={ new Date(repSeleccionada.fecha).toLocaleDateString()} disabled type="text" name="fechaIngreso" id="fechaIngreso" className="w-full bg-white block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"/>
                </div>
                {/* Falla */}
                <div>
                  <label htmlFor="falla" className="block mb-1 text-sm/6 font-medium text-gray-900"> <strong>Descripción de falla/desperfecto</strong></label>
                  <textarea value={repSeleccionada.descripcion} disabled name="falla" id="falla" rows="3" className="w-full block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"></textarea>
                </div>
                {/* Estado */}
                <div >
                  <label htmlFor="estado" className="block mb-1 text-sm/6 font-medium text-gray-900"><strong>Estado</strong></label>
                  <input value={repSeleccionada.estado} disabled type="text" name="estado" id="estado" className="w-full bg-white block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"/>
                </div>
            </div>
            </AccordionDetails>
          </Accordion>
          { repSeleccionada.estado != "EnTaller" &&
          <Accordion>
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span">Datos del presupuesto</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Divider />
              <div className='mt-2'>
                <Typography>
                  <strong>Descripción del presupuesto:</strong>{" "+repSeleccionada.descripcionPresupuesto}
                </Typography>
                <Typography>
                  <strong>Fecha de entrega:</strong>{" "+ new Date(repSeleccionada.fechaPromesaEntrega).toLocaleDateString()}
                </Typography>
                <Typography>
                  <strong>Costo:</strong>{" "+repSeleccionada.costo}
                </Typography>
              </div>
            </AccordionDetails>
          </Accordion>
          }
          {/* aca van las propiedades de la reparacion, en caso de ser modo modificar, el disabled es false 
          en modo modificar, solo va a ser modificable la descripcion */}
         
        </DialogContent>
          {modo === "Modificar" &&
           <DialogActions>
              <div>
                <button type='button' className='btnAceptar'>Modificar</button>
                <button type='button' onClick={handleClose}  className='btnCancelar'>Cancelar</button> 
              </div>
            </DialogActions>
          }
      </BootstrapDialog>
      {/* fin componente del modal */}
      <div className='title p-2'>
          <h1>Listado de reparaciones</h1>
      </div>
      <div className='grid grid-cols-1 bg-gray-50 h-auto my-[20px] mx-[20px] gap-8 py-3 px-2'>
        <div className='col-span-1  my-[10px] m-[10px] flex justify-between'>
          <div className='flex gap-3 items-center justify-center p-2  '>
            <div onClick={()=>selectTab("EnTaller")}  className={`${tabSelected === "EnTaller" ? "border-blue-950" : "border-blue-800"} cursor-pointer border-b-4 border-blue-800  hover:border-blue-950  p-2`} >En taller</div>
            <div onClick={()=>selectTab("Presupuestada")} className={`${tabSelected === "Presupuestada" ? "border-blue-950" : "border-blue-800"} cursor-pointer border-b-4 border-blue-800  hover:border-blue-950  p-2`} >Presupuestadas</div>
            <div onClick={()=>selectTab("PresupuestoAceptado")} className={`${tabSelected === "PresupuestoAceptado" ? "border-blue-950" : "border-blue-800"} cursor-pointer border-b-4 border-blue-800  hover:border-blue-950  p-2`} >Aceptadas</div>
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
                        <svg className='invisible size-6'  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                         <path className='invisible' strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                        </svg>
                      }
                      {counterClickOnOrd === 2 &&
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                      }
                      {counterClickOnOrd === 3 &&
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
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
                      <td className='txtRows'>{r.id}</td> 
                      <td className='txtRows'>{ new Date(r.fecha).toLocaleDateString()}</td>
                      <td className='txtRows'>{r.clienteNombre + " "+r.clienteApellido}</td>
                      <td className='txtRows'>{r.producto.marca +" "+r.producto.modelo}</td>
                      <td className='txtRows'>{r.numeroSerie}</td>
                      <td className='txtRows' > {r.descripcion}</td>
                      <td className='txtRows  flex gap-4 p-1'>
                        <div title='Visualizar' className='btnIconosGrid'>
                          <svg onClick={()=>onClickVisualizar(r.id)}  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          </svg>

                        </div>
                        <div title='Generar orden'  className='btnIconosGrid '>
                              {/* print */}
                              <svg onClick={()=>generarOrdSrv(r.id,user.idEmpresa,user.idSucursal)}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M7.875 1.5C6.839 1.5 6 2.34 6 3.375v2.99c-.426.053-.851.11-1.274.174-1.454.218-2.476 1.483-2.476 2.917v6.294a3 3 0 0 0 3 3h.27l-.155 1.705A1.875 1.875 0 0 0 7.232 22.5h9.536a1.875 1.875 0 0 0 1.867-2.045l-.155-1.705h.27a3 3 0 0 0 3-3V9.456c0-1.434-1.022-2.7-2.476-2.917A48.716 48.716 0 0 0 18 6.366V3.375c0-1.036-.84-1.875-1.875-1.875h-8.25ZM16.5 6.205v-2.83A.375.375 0 0 0 16.125 3h-8.25a.375.375 0 0 0-.375.375v2.83a49.353 49.353 0 0 1 9 0Zm-.217 8.265c.178.018.317.16.333.337l.526 5.784a.375.375 0 0 1-.374.409H7.232a.375.375 0 0 1-.374-.409l.526-5.784a.373.373 0 0 1 .333-.337 41.741 41.741 0 0 1 8.566 0Zm.967-3.97a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H18a.75.75 0 0 1-.75-.75V10.5ZM15 9.75a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V10.5a.75.75 0 0 0-.75-.75H15Z" clipRule="evenodd" />
                              </svg>
                          </div>
                          <div title='Modificar' className='btnIconosGrid'>
                            <svg onClick={()=>onClickModificar(r.id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                          </div>
                        {r.estado == "EnTaller" &&
                          <>
                            <div title='Presupuestar' className='btnIconosGrid'>
                                <svg onClick={()=>irPresupuestar(r.id)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                  <path  fillRule="evenodd" d="M12 6.75a5.25 5.25 0 0 1 6.775-5.025.75.75 0 0 1 .313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 0 1 1.248.313 5.25 5.25 0 0 1-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 1 1 2.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0 1 12 6.75ZM4.117 19.125a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z" clipRule="evenodd" />
                                </svg>
                            </div>
                          </>
                        }
                        {r.estado == "Presupuestada" &&
                          <>
                              <div title='Aceptar' className='btnIconosGrid ' >
                              {/* aceptar */}
                                <svg onClick={()=>handleClickModalReparacionGeneral(r.id,"AceptarPresupuesto")} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                  <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
                                </svg>
                              </div>
                              <div title='No aceptar' className='btnIconosGrid'>
                            {/* cancelar */}
                                <svg onClick={()=>handleClickModalReparacionGeneral(r.id,"NoAceptarPresupuesto")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54" />
                                </svg>
                            </div>
                          </>
                        }
                        {r.estado == "PresupuestoAceptado" &&
                          <>
                              <div title='Terminar' className='btnIconosGrid ' >
                              {/* terminar */}
                                <svg onClick={() => handleClickModalReparacionGeneral(r.id,"TerminarReparacion")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                </svg>

                              </div>
                          </>
                        }
                        {r.estado == "Terminada" &&
                          <>
                              <div title='Entregar' className='btnIconosGrid ' >
                              {/* Entregar */}
                                <svg onClick={() => handleClickModalReparacionGeneral(r.id,"EntregarReparacion")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
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
    </>
  )
}
