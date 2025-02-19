import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import KeyboardReturnSharpIcon from '@mui/icons-material/KeyboardReturnSharp';
import AddIcon from '@mui/icons-material/Add';
import { Alert, Box, Divider, MenuItem, Snackbar, TextField } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { useDispatch, useSelector } from 'react-redux';
import { selectClientes, selectEmpresa, selectProductos, selectSucursal, selectUsuario } from '../store/auth';
import { postReparacion ,postCliente} from '../Fetchs';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const NuevaReparacion = ({openValue,onClose}) => {
    dayjs.locale('es');
    const [clienteEncontrado, setclienteEncontrado] = useState(false)
    const [open, setOpen] = useState(false);
    const [openMsj, setopenMsj] = useState(false)
    const [descripcion, setdescripcion] = useState("")
    const [numeroSerie, setnumeroSerie] = useState("")
    const [ciCliente, setciCliente] = useState("")
    const [nombre, setnombre] = useState("")
    const [apellido, setapellido] = useState("")
    const [telefono, settelefono] = useState("")
    const [direccion, setdireccion] = useState("")
    const [email, setemail] = useState("")
    const [mostrarInputClientes, setMostrarInputClientes] = useState(false)
    const [fechaPresupuesto,setfechaPresupuesto] = useState(dayjs());
    const [Msj,setMsj] = useState("")
    const [severity, setseverity] = useState("")
    const productos = useSelector(selectProductos);
    const clientes = useSelector(selectClientes);
    const emp = useSelector(selectEmpresa);
    const suc = useSelector(selectSucursal);
    const usu = useSelector(selectUsuario);
    const [selectedProduct, setselectedProduct] = useState(1)
    const [radioSelected, setradioSelected] = useState("Existente")
    const [inputsReparacion, setInputsReparacion] = useState(true)
    const dispatch = useDispatch()

    
    useEffect(() => {
        setOpen(openValue)
        console.log(openValue)
    }, [openValue])

    const resetForm = ()=>{
      setnombre("");
      setapellido("");
      setdireccion("");
      settelefono("");
      setemail("");
      setdescripcion("");
      setnumeroSerie("");
      setciCliente("");
      setMostrarInputClientes(false)
      setradioSelected("Existente")
    }
    
    const  handleAgregar = async () => {
      let seguir = true;
      if(radioSelected != "Existente" && clienteEncontrado== false)
        {
          console.log('encontrado???', clienteEncontrado)
          console.log('entro a cliente nuevo y cliente no encontrado')
          const cliente = {
            nombre,
            apellido,
            email,
            direccion,
            telefono,
            ci:ciCliente
          }
          const response = await postCliente(dispatch,cliente);
          if(!response.success){
            console.log('first', response.message)
            setMsj(response.message)
            setseverity("error")
            setopenMsj(true)
            setTimeout(() => {
              setopenMsj(false)
              setMsj("")
            }, 2000);
            seguir = false;
          }
      }
     
      if(seguir){
        const reparacion =
            {
              ciCliente: ciCliente,
              idTecnico: usu.userId,
              idEmpresa: emp.id,
              idSucursal: suc.id,
              idProducto: selectedProduct,
              numeroSerie: numeroSerie,
              descripcion: descripcion,
              fechaPromesaPresupuesto: fechaPresupuesto
            }
            const responseRep = await postReparacion(dispatch,reparacion)
            if(!responseRep.success){
              setMsj(responseRep.message)
              console.log('first', responseRep.message)
              setseverity("error")
              setopenMsj(true)
              setTimeout(() => {
                setopenMsj(false)
                setMsj("")
              }, 2000);
            }else{
              setMsj("Reparacion ingresada correctamente")
              setseverity("success")
              setopenMsj(true)
              setTimeout(() => {
                setopenMsj(false)
                setMsj("")
                setOpen(false);
                onClose();
                resetForm()
              }, 1000);
            }
      }
      };
    
      const handleClose = () => {
        resetForm()
        setOpen(false);
        onClose();
      };

      

      const onHandleChangeDsc = ({target}) =>{
        setdescripcion(target.value)
      }
      const onHandleChangeSerie = ({target}) =>{
        setnumeroSerie(target.value)
      }

      const handleChangeFecha =(newValue)=>{
        setfechaPresupuesto(newValue)
      }
      const handleSelectProduct =({target})=>{
          setselectedProduct(target.value)
      }
      const onHandleChangeCiCliente = ({target}) =>{
        setciCliente(target.value);
      }
      const onBlurCiCliente =()=>{
        if(ciCliente != ""){
          if(radioSelected == "Existente"){
            const clienteBuscado = clientes.find(c=>c.ci === ciCliente);
            if (clienteBuscado){
                setclienteEncontrado(true)
                setInputsReparacion(false)
                setnombre(clienteBuscado.nombre);
                setapellido(clienteBuscado.apellido);
                setdireccion(clienteBuscado.direccion);
                settelefono(clienteBuscado.telefono);
                setemail(clienteBuscado.email);
                setopenMsj(true)
                setMsj("Cliente encontrado")
                setseverity("success")
                setMostrarInputClientes(false)
                setTimeout(() => {
                  setseverity("")
                  setopenMsj(false)
                  setMsj("")
                }, 2000);
            } 
            else{
              setclienteEncontrado(false)
              setInputsReparacion(true)
              setopenMsj(true)
              setMsj("Cliente no encontrado")
              setseverity("info")
              // setMostrarInputClientes(true)
              setTimeout(() => {
                setseverity("")
                setopenMsj(false)
                // setradioSelected("Nuevo")
                setMsj("")
                  }, 2000);
              
                }
          }else{
            //entra si es Cliente nuevo 
            const clienteBuscado = clientes.find(c=>c.ci === ciCliente);
            if (clienteBuscado){
                setclienteEncontrado(true)
              
                setInputsReparacion(false)
                setnombre(clienteBuscado.nombre);
                setapellido(clienteBuscado.apellido);
                setdireccion(clienteBuscado.direccion);
                settelefono(clienteBuscado.telefono);
                setemail(clienteBuscado.email);
                setopenMsj(true)
                setMsj("La cedula de identidad ingresada ya se encuentra en el sistema")
                setseverity("success")
                setMostrarInputClientes(false)
                setTimeout(() => {
                  setseverity("")
                  setopenMsj(false)
                  setMsj("")
                }, 2000);
            } 
          }
        }
      }
      const onHandleChangeNombre =({target}) =>{
        setnombre(target.value)
      }

      const onHandleChangeApellido =({target})=>{
        setapellido(target.value)
      }
      const onHandleChangeTelefono =({target})=>{
        settelefono(target.value)
      }
      const onHandleChangeEmail =({target})=>{
        setemail(target.value)
      }
      const onHandleChangeDireccion =({target})=>{
        setdireccion(target.value)
      }

      const radioHandleChange = (event) =>{
        resetForm()
        if(event.target.value = "Nuevo"){
          setInputsReparacion(false)
        }
        setradioSelected(event.target.value);
        
      }

     
  return (
    <>
      <Dialog maxWidth ="md" fullWidth   open={open} TransitionComponent={Transition} keepMounted aria-describedby="alert-dialog-slide-description">
      <DialogTitle>{"Nueva reparación"}</DialogTitle>
      <Divider/>
      <DialogContent>
        <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px', // Espacio entre los elementos
          marginTop: '12px',
        }}
        >
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group" 
            value={radioSelected}
            onChange={radioHandleChange}
          >
            <FormControlLabel selected value="Nuevo" control={<Radio />} label="Cliente nuevo" />
            <FormControlLabel value="Existente" control={<Radio />} label="Cliente existente" />
          </RadioGroup>
          <TextField
          label="Cedula de cliente"
          id="outlined-size-small"
          value={ciCliente}
          size="small"
          sx={{ maxWidth: '500px', width: '100%' }}
          onChange={onHandleChangeCiCliente}
          onBlur={onBlurCiCliente}
          margin="dense"        
        />
        {radioSelected == 'Nuevo' && (
          <>
          <TextField
          label="Nombre"
          id="outlined-size-small"
          value={nombre}
          size="small"
          sx={{ maxWidth: '500px', width: '100%' }}
           onChange={onHandleChangeNombre}
          margin="dense"        
        />
        <TextField
          label="Apellido"
          id="outlined-size-small"
          value={apellido}
          size="small"
          sx={{ maxWidth: '500px', width: '100%' }}
           onChange={onHandleChangeApellido}
          margin="dense"        
        />
        <TextField
          label="Telefono"
          id="outlined-size-small"
          value={telefono}
          size="small"
          sx={{ maxWidth: '500px', width: '100%' }}
           onChange={onHandleChangeTelefono}
          margin="dense"        
        />
        <TextField
          label="Email"
          id="outlined-size-small"
          value={email}
          size="small"
          sx={{ maxWidth: '500px', width: '100%' }}
           onChange={onHandleChangeEmail}
          margin="dense"        
        />
        <TextField
          label="Direccion"
          id="outlined-size-small"
          value={direccion}
          size="small"
          sx={{ maxWidth: '500px', width: '100%' }}
           onChange={onHandleChangeDireccion}
          margin="dense"        
        />
        </>
        )}
        
          <TextField
          disabled ={inputsReparacion}
          id="outlined-select-currency"
          select
          label="Producto"
          defaultValue="Seleccione..."
          value={selectedProduct}
          onChange={handleSelectProduct}
          helperText="Seleccione un producto"
          sx={{ maxWidth: '500px', width: '100%' }}
        >
          {productos.map((p) => (
            <MenuItem key={p.id} value={p.id}>
              {p.marca} {p.modelo} {p.version}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          disabled ={inputsReparacion}
          label="Numero serie"
          id="outlined-size-small"
          value={numeroSerie}
          size="small"
          sx={{ maxWidth: '500px', width: '100%' }}
          onChange={onHandleChangeSerie}
          margin="dense"        
        />
        <TextField
          disabled ={inputsReparacion}
          label="Descripcion"
          id="outlined-multiline-static"
          value={descripcion}
          size="small"
          multiline
          rows={4}
          sx={{ maxWidth: '500px', width: '100%' }}
          onChange={onHandleChangeDsc}
          margin="dense"        
        />
         <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
                <DatePicker 
                  disabled ={inputsReparacion}
                  inputFormat="YYYY-MM-DD"
                  defaultValue={dayjs()}
                  sx={{ maxWidth: '500px', width: '100%' }}
                  label="Fecha presupuesto" 
                  value={fechaPresupuesto}
                  onChange={(newValue)=>handleChangeFecha(newValue)}
                 />
            </DemoContainer>
         </LocalizationProvider>
        
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAgregar} sx={{margin:2, borderRadius:1,p:1}} variant="contained" size="small" color='success' endIcon={<AddIcon/>}  disabled ={inputsReparacion} >Agregar</Button>
        <Button onClick={handleClose} sx={{p:1,margin:2,borderRadius:1}} endIcon={<KeyboardReturnSharpIcon/>} variant="contained" size="small" color="error"  >Cancelar</Button>
      </DialogActions>
    </Dialog>
    <Snackbar
        open={openMsj}
        autoHideDuration={3000}
      >
        <Alert
          severity={severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
         {Msj}
        </Alert>
      </Snackbar>
      
    </>
  )
}
