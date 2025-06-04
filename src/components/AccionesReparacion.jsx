
import React, { useState } from 'react'
import { useEffect } from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider } from '@mui/material';


export const AccionesReparacion = ({estado="EnTaller",objeto="object"}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [verDetalles, setverDetalles] = useState(false);
  const [cambioEstado, setcambioEstado] = useState(false);
  const [reparacion, setreparacion] = useState(objeto);
  const open = Boolean(anchorEl);
  const [openModal, setOpenModal] = React.useState(false);
  const handleClose = () => {
    setOpenModal(false);
  };
  
  const obtenerAcciones = () => {
    switch (estado) {
      case 'EnTaller':
        return ['Presupuestar','Ver detalles'];
      case 'Presupuestada':
        return ['Aceptar', 'No aceptar','Ver detalles'];
      case 'PresupuestoNoAceptado':
        return ['Terminar','Ver detalles'];
      case 'PresupuestoAceptado':
        return ['Terminar','Ver detalles'];
      case 'Terminada':
        return ['Entregar','Ver detalles'];
      default:
        return [];
    }
  };
  const acciones = obtenerAcciones();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSelect = (r) => {
    setAnchorEl(null);
    setverDetalles(false)
    if(r === "Ver detalles"){
      setcambioEstado(false)
      setverDetalles(true)
      setOpenModal(true)
    }else{
      setverDetalles(false)
      setcambioEstado(true)
      setOpenModal(true)
    }
  };
 
  return (
    <>
    {
      verDetalles&&
      (<>
          <Dialog
        fullWidth
        maxWidth='md'
        open={openModal}
        onClose={handleClose}
      >
        <DialogTitle>Detalles de orden {"reparacion.id"}</DialogTitle>
        <Divider/>
        <DialogContent>
          <DialogContentText>
            You can set my maximum width and whether to adapt or not.
          </DialogContentText>
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content',
            }}
          >
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
      </>
      )
    }
    {
      cambioEstado&&
      (<>
          <Dialog
        
        maxWidth='xs'
        open={openModal}
        onClose={handleClose}
      >
        <DialogTitle>Cambiar estado de orden {"reparacion.id"} ?</DialogTitle>
        <Divider/>
        <DialogContent>
          <DialogContentText>
            You can set my maximum width and whether to adapt or not.
          </DialogContentText>
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content',
            }}
          >
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
      </>
      
      )
    }
    <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Acciones
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleSelect}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {
          acciones.map((r,index)=>(
            <MenuItem  onClick={()=>handleSelect(r)}>{r}</MenuItem>
          ))
      }
      </Menu>
    </>
  )
}
