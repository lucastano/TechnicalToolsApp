import React, { useEffect, useState } from 'react'
import { Encabezados } from './Encabezados'
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Container, Divider, Paper, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { selectEmpresa, selectUsuario } from '../store/auth';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { BoxImagen } from './BoxImagen';
import { fetModificarEmpresa } from '../Fetchs';
import { AlertMsg } from './AlertMsg';
import { Update } from '@mui/icons-material';
import KeyboardReturnSharpIcon from '@mui/icons-material/KeyboardReturnSharp';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export const Empresa = () => {

    const dispacth =  useDispatch()
    const empresa = useSelector(selectEmpresa);
    const usuario = useSelector(selectUsuario);
    const [id, setid] = useState(0)
    const [nombre, setnombre] = useState("")
    const [direccion, setdireccion] = useState("")
    const [telefono, settelefono] = useState("")
    const [email, setemail] = useState("")
    const [foto, setfoto] = useState("")
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState("");
    const [errorDsc, seterrorDsc] = useState("")
    const [error, seterror] = useState(false)
    const [modificarOk, setmodificarOk] = useState(null)
    const [msgSuccess, setmsgSuccess] = useState("")
    const [modificando, setmodificando] = useState(false)
    const [cambio, setcambio] = useState(false)
    const [mostrarMsgSinCambios, setmostrarMsgSinCambios] = useState(false)
    const [rolUsuario, setrolUsuario] = useState("")

    useEffect(() => {
      if(empresa){
      setid(empresa.id)
      setnombre(empresa.nombre)
      setdireccion(empresa.direccion)
      settelefono(empresa.telefono)
      setemail(empresa.email)
      setfoto(empresa.foto)
      if(usuario){
      setrolUsuario(usuario.userRol)
      }
      }
    }, [empresa])

    useEffect(() => {
      return () => {
        if (preview) {
          URL.revokeObjectURL(preview); // Limpia la URL creada
        }
      };
    }, [preview]);
    

    const handleVolver =() =>{
        
    }
    const HandleFileChange =(event) =>{
      setcambio(true)
      const selectFile = event.target.files[0]
      if(selectFile){
        setFile(selectFile)
        const previewUrl = URL.createObjectURL(selectFile);
        setPreview(previewUrl);
      }
    }
    const  handleModificar  = async()=>{
      if (cambio){
        setmodificando(true)
        setTimeout(() => {
          setmodificando(false);
        }, 2500);
        if(!error)
        {
          const data = {
            id:id,
            nombre:nombre,
            telefono:telefono,
            direccion:direccion,
            email:email,
            file:file
          }
          const result =  await fetModificarEmpresa(data,dispacth)
          if(result){
            setmsgSuccess("Datos de la empresa modificados correctamente")
            setmodificarOk(true)
          }
          else{
            setmodificarOk(false)
            seterrorDsc("No se pudo modificar los datos de la empresa")
          }
        }
        else
        {
          setmodificarOk(false)
          
        }
      }
      else
      {
        setmostrarMsgSinCambios(true)
        setTimeout(() => {
          setmostrarMsgSinCambios(false)
        }, 2500);

      }
      
    }

    const onHandleChangeNombre = ({target})=>{
      setcambio(true)
      if(!target.value){
        seterror(true)
        seterrorDsc("Debe ingresar un nombre")
        setnombre(target.value) 
      }
      else
      {
        setnombre(target.value)
        seterror(false)
      }
     
    }
    const onHandleChangeTelefono =({target}) =>{
      setcambio(true)
      if(!target.value){
        seterrorDsc("Debe ingresar un telefono")
        seterror(true)
        settelefono(target.value)
      }
      else
      {
        settelefono(target.value)
        seterror(false)
      }
    }
    const onHandleChangeDireccion =({target})=>{
      setcambio(true)
      if(!target.value)
      {
        seterrorDsc("Debe ingresar una direccion")
        seterror(true)
        setdireccion(target.value)
      }
      else
      {
        setdireccion(target.value)
        seterror(false)
      }
    }
    const onHandleChangeEmail =({target})=>{
      setcambio(true)
      if(!target.value)
        {
          seterrorDsc("Debe ingresar un email")
          seterror(true)
          setemail(target.value)
        }
        else
        {
          seterror(false)
          setemail(target.value)
        }
    }
  return (
    <>
    {/* <Encabezados/> */}
    <Container>
     <Paper elevation={5} sx={{ marginTop:2,padding:2}}>
     <Box sx={{ width:370}} >
        <Paper elevation={0}  style={{ padding: '10px', backgroundColor: 'rgb(245, 244, 244)',borderRadius: 0  }}>
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%', // Asegura que el contenedor ocupe todo el espacio disponible
          }}>
            <img
                srcSet={preview ||`${foto}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                src={foto}
                alt="img"
                loading="lazy"
                style={{
                  width: "300px", // Ancho fijo
                  height: "300px", // Alto fijo
                  objectFit: "cover", // Recorta la imagen para ajustarla sin distorsión
                  borderRadius: "8px", // Opcional: bordes redondeados
                }}
                 />
          </Box>
              
              <br/>
              <Button
                    component="label"
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    disabled = {rolUsuario=="Tecnico"}
                    size='small'
                      >
                    Subir imagen
                    <VisuallyHiddenInput
                      type="file"
                      onChange={HandleFileChange}
                      multiple
                    />
              </Button>
        </Paper>
      </Box>
      <br/>
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
          label="Nombre"
          id="outlined-size-small"
          value={nombre}
          size="small"
          sx={{ maxWidth: '300px', width: '100%' }}
          onChange={onHandleChangeNombre}
          margin="dense"
          disabled = {rolUsuario=="Tecnico"}
        />
        <TextField
          label="Telefono"
          id="outlined-size-small"
          value={telefono}
          size="small"
          sx={{ maxWidth: '300px', width: '100%' }}
          onChange={onHandleChangeTelefono}
          margin="dense"
          type='number'
          disabled = {rolUsuario=="Tecnico"}
        />
          <TextField
          label="Direccion"
          id="outlined-size-small"
          value={direccion}
          size="small"
          sx={{ maxWidth: '300px', width: '100%' }}
          onChange={onHandleChangeDireccion}
          margin="dense"
          disabled = {rolUsuario=="Tecnico"}
        />
        <TextField
          label="Email"
          id="outlined-size-small"
          value={email}
          size="small"
          sx={{ maxWidth: '300px', width: '100%' }}
          onChange={onHandleChangeEmail}
          margin="dense"
          type='email'
          disabled = {rolUsuario=="Tecnico"}
        />
        </Box>
        <Button  disabled = {rolUsuario=="Tecnico"} onClick={handleModificar} sx={{margin:2, p:1,margin:2,borderRadius:0}} variant="contained" size="small" color='success' startIcon={<Update/>} >
          Modificar
        </Button>
        <Button onClick={handleVolver} sx={{margin:2, p:1,margin:2,borderRadius:0}} variant="contained" size="small" color="error"  endIcon={<KeyboardReturnSharpIcon/>}>
          Volver
        </Button>
        {modificando &&
        (modificarOk ? (<AlertMsg msg={msgSuccess} type={"success"} />):( error&&<AlertMsg msg={errorDsc} type={"error"} />))
        }
        {mostrarMsgSinCambios && <AlertMsg msg={"No hubieron cambios"} type={"info"} />}
     </Paper>
    </Container>
    </>
  )
}


          