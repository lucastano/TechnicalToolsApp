
import React, { useState } from 'react'
import { useEffect } from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export const AccionesReparacion = ({estado}) => {
  // const [acciones, setAcciones] = useState([""])
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
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
  const handleClose = () => {
    setAnchorEl(null);
  };
 
  console.log('estado', acciones)

  return (
    <>
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
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {
          acciones.map((r,index)=>(
            <MenuItem onClick={handleClose}>{r}</MenuItem>
          ))
      }
      </Menu>
    </>
  )
}
