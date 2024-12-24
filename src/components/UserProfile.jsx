import { Divider, FormControl, InputLabel, Paper, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Encabezados } from './Encabezados'
import { useSelector } from 'react-redux'
import { selectUsuario } from '../store/auth'


export const UserProfile = () => {
    // const usuario = useSelector(selectUsuario());
    const usuario = useSelector(selectUsuario);
    console.log(usuario)
  return (
    <>
    <Encabezados Titulo={"Perfil"}/>
    <Paper>
        <FormControl fullWidth >
            {/* <InputLabel id="name">Nombre</InputLabel>
            <TextField value={usuario.userName} ></TextField>
            <InputLabel id="apellido">Apellido</InputLabel>
            <TextField value={usuario.userLastName} ></TextField>
            <InputLabel id="name">Email</InputLabel>
            <TextField value={usuario.userEmail} ></TextField>
            <InputLabel id="name">Rol</InputLabel>
            <TextField value={usuario.userRol} ></TextField> */}
        </FormControl>
        
    </Paper>
    </>
    
  )
}
