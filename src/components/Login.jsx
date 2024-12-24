import React, { useEffect } from 'react'
import { useState } from 'react';
import {login,getClientes,getTecnicos, getReparaciones, getReparacionesPorCI} from '../Fetchs'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Box, Button, Container, FormControl, Grid2, InputLabel, Link, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from "@mui/icons-material/lockOutlined"
import { loginUser } from '../store/auth/authSlice';
import { AlertMsg } from './AlertMsg';
import PropTypes from "prop-types";
export const Login = ({setAutenticacionL}) => {
  
    const dispatch = useDispatch()
    const usuarioLogeado = useSelector((state)=>state.auth)
    const [show, setShow] = useState(true);
    const [Correo, setCorreo] = useState("")
    const [password, setPassword] = useState("")
    const [Rol, setRol] = useState("")
    const [error, seterror] = useState(false)
    const [ValorBtnLogin, setValorBtnLogin] = useState("Iniciar")

    useEffect(() => {
      const Token = localStorage.getItem("Token")
      console.log(Token)
      if(Token !=""){
        setAutenticacionL(true)
        setShow(false)
      }else{
        setShow(true)
      }
    }, [])

    const onChangeCorreo =({target})=>{
        setCorreo(target.value);
     
    }
    const onChangePassword =({target})=>{
        setPassword(target.value);
    }
    const onChangeRol =({target})=>{
        setRol(target.value)
    }
    const handleLogin = async (event)=>{
      event.preventDefault();
      let seguir = true
      let response = null
      setValorBtnLogin("Cargando...")
      try
      {
       response = await login(Correo,password,Rol)
        seguir = true
      }
      catch(error)
      {
        seguir = false

      }
      if (seguir){
        const user = {
          id:response.usuario.id,
          nombre:response.usuario.nombre,
          apellido:response.usuario.apellido,
          rol:response.usuario.rol,
          email:response.usuario.email,
          ci:response.usuario.ci,
          direccion:response.usuario.direccion,
          telefono:response.usuario.telefono,
          token:response.token
        }
        dispatch(loginUser(user))
        const rol = response.usuario.rol
        if(rol == 'Administrador' || rol == 'Tecnico' ){
          if(rol == 'Administrador'){
            await getClientes(dispatch)
            await getTecnicos(dispatch)
            await getReparaciones(dispatch)
          }
          else
          {
            await getClientes(dispatch)
            await getReparaciones(dispatch)

          }

        }
        else
        {
          await getReparacionesPorCI(user.ci,dispatch)

        }
       
        
        setAutenticacionL(true)
        setShow(false)
        
      }else{
        setValorBtnLogin("Iniciar")
        seterror(true)
        setTimeout(() => {
          seterror(false) // Ocultar la alerta después de 3 segundos
        }, 3000);
      }
    }
  return (

    <Container maxWidth="xs" >
      <Paper elevation={10} sx={{marginTop:10,padding:2}}>
        <Avatar sx={{
          mx:'auto',
          bgcolor:'secondary.main',
          textAlign:'center',
          mb:1
        }}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant='h5' sx={{textAlign:'center'}}>
          Log In
        </Typography>
        <Box component='form' onSubmit={handleLogin} noValidate sx={{mt:1}} >
          <TextField
           placeholder='Correo'
           fullWidth 
           required 
           autoFocus 
           sx={{ mb:2 }}
           onChange={onChangeCorreo}>
          </TextField>
          <TextField 
          placeholder='Contraseña'
          fullWidth
          required
          autoFocus
          sx={{mb:2}}
          type='password'
          onChange={onChangePassword}>
          </TextField>
          <FormControl fullWidth>
            <InputLabel id='lblselect'>Rol</InputLabel>
            <Select
            labelId='lblselect'
            id='selectRol'
            value ={Rol}
            label = 'Rol'
            onChange={onChangeRol}
            >
              <MenuItem value = "Tecnico" >Tecnico</MenuItem>
              <MenuItem value = "Administrador" >Administrador</MenuItem>
              <MenuItem value = "Cliente" >Cliente</MenuItem>
            </Select>
          </FormControl>
          <Button type='submit' variant='contained' fullWidth sx={{mt:1}}>
           {ValorBtnLogin}
          </Button>
        </Box>
        <Grid2 container justifyContent='space-between' sx={{mt:1}}>
          <Grid2 item >
            <Link>Perdi la contraseña</Link>
          </Grid2>
        </Grid2>
        {error && <AlertMsg msg={"Error de inicio"} type={"error"} />}
      </Paper>
    
     
      
    
    </Container>
  )
}
Login.propTypes = {
  setAutenticacionL: PropTypes.func.isRequired, // Asegura que sea una función
};