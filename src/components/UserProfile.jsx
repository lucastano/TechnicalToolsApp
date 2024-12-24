import { Box, Button, Divider, FormControl, InputLabel, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Encabezados } from './Encabezados'
import { useSelector } from 'react-redux'
import { selectUsuario } from '../store/auth'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export const UserProfile = () => {
    const usuario = useSelector(selectUsuario);
    const navigate = useNavigate();

    const handleVolver =()=>{
      navigate("/")
    }
   
  return (
    <>
    <Encabezados Titulo={"Perfil de Usuario"}/>
    <Container  >
     <Paper elevation={10} sx={{marginLeft:10,marginRight:10, marginTop:2,padding:2}}>
       <Typography component="h2" variant='h5' sx={{textAlign:'left'}}>
         {usuario.userRol+" Nro: "+usuario.userId}
        </Typography>
      <Divider/>
     <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px', // Espacio entre los elementos
        marginTop: '12px',
      }}
    >
      <TextField
          disabled
          label="Nombre"
          id="outlined-size-small"
          defaultValue={usuario.userName}
          size="small"
          sx={{ maxWidth: '300px', width: '100%' }}
        />
        <TextField
          disabled
          label="Apellido"
          id="outlined-size-small"
          defaultValue={usuario.userLastName}
          size="small"
          sx={{ maxWidth: '300px', width: '100%' }}
        />
        <TextField
        
          label="Email"
          id="outlined-size-small"
          defaultValue={usuario.userEmail}
          size="small"
          sx={{ maxWidth: '300px', width: '100%' }}
        />
        
        {usuario.userRol ==="Cliente"
        ?(
          <>
          <TextField
          disabled
          label="Ci"
          id="outlined-size-small"
          defaultValue={usuario.userCi}
          size="small"
          sx={{ maxWidth: '300px', width: '100%' }}
        />
        <TextField
          
          label="Direccion"
          id="outlined-size-small"
          defaultValue={usuario.userAddres}
          size="small"
          sx={{ maxWidth: '300px', width: '100%' }}
        />
        </>

        ):null

        }
        </Box>
        <Button sx={{margin:2}} variant="contained" size="small" color='success'>
          Modificar
        </Button>
        <Button onClick={handleVolver} sx={{margin:2}} variant="contained" size="small" color="error">
          Volver
        </Button>
     </Paper>
    </Container>
     
 
       
        
 
    </>
    
  )
}
