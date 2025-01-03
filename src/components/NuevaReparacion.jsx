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
import { Box, Divider, MenuItem, TextField } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { selectProductos } from '../store/auth';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const NuevaReparacion = ({openValue,onClose}) => {
    const [open, setOpen] = useState(false);
    const [descripcion, setdescripcion] = useState("")
    const [numeroSerie, setnumeroSerie] = useState("")
    const [fechaIngreso, setfechaIngreso] = useState("")
    const [fechaPresupuesto,setfechaPresupuesto] = useState(dayjs('2024-12-31'));
    const productos = useSelector(selectProductos);
    const [selectedProduct, setselectedProduct] = useState(1)
    
    useEffect(() => {
        setOpen(openValue)
        console.log(openValue)
    }, [openValue])
    
    const handleAgregar = () => {
        onClose();
      };
    
      const handleClose = () => {
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
        console.log('target.value', target.value)
          setselectedProduct(target.value)
      }

     
  return (
    <>
      <Dialog maxWidth ="md" fullWidth   open={open} TransitionComponent={Transition} keepMounted aria-describedby="alert-dialog-slide-description">
      <DialogTitle>{"Nueva reparación"}</DialogTitle>
      <Divider/>
      <DialogContent>
        {/* <DialogContentText id="alert-dialog-slide-description">
          Ingresa los detalles de la nueva reparación.
        </DialogContentText> */}
        {/* Aquí puedes agregar campos para capturar información de la reparación */}
        <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px', // Espacio entre los elementos
          marginTop: '12px',
        }}
        >
          <TextField
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
          label="Numero serie"
          id="outlined-size-small"
          value={numeroSerie}
          size="small"
          sx={{ maxWidth: '500px', width: '100%' }}
          onChange={onHandleChangeSerie}
          margin="dense"        
        />
        <TextField
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
                 sx={{ maxWidth: '500px', width: '100%' }}
                 label="Fecha presupuesto" 
                 value={fechaPresupuesto}
                 onChange={(newValue)=>handleChangeFecha(newValue)}
                //  onChange={(newValue)=>setfechaPresupuesto(newValue)}
                 />
            </DemoContainer>
         </LocalizationProvider>
        
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAgregar} sx={{margin:2, borderRadius:1,p:1}} variant="contained" size="small" color='success' endIcon={<AddIcon/>} >Agregar</Button>
        <Button onClick={handleClose} sx={{p:1,margin:2,borderRadius:1}} endIcon={<KeyboardReturnSharpIcon/>} variant="contained" size="small" color="error"  >Cancelar</Button>
      </DialogActions>
    </Dialog>
      
    </>
  )
}
