import React, { useEffect, useState } from 'react'
import { Encabezados } from './Encabezados'
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Container, Divider, Paper, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { selectEmpresa, selectSucursal, selectUsuario } from '../store/auth';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { BoxImagen } from './BoxImagen';
import { fetModificarEmpresa, fetModificarSucursal } from '../Fetchs';
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
    const sucursal = useSelector(selectSucursal)
    const usuario = useSelector(selectUsuario);
    //DATOS DE EMPRESA 
    const [id, setid] = useState(0)
    const [idSucursal, setidSucursal] = useState(0)
    const [nombre, setnombre] = useState("")
    const [razonSocial, setrazonSocial] = useState("")
    const [numeroRut, setnumeroRut] = useState("")
    const [politicasEmpresa, setpoliticasEmpresa] = useState("")
    //FIN DATOS DE EMPRESA

    //DATOS DE SUCURSAL
    const [codigoSucursal, setcodigoSucursal] = useState("")
    const [direccion, setdireccion] = useState("")
    const [telefono, settelefono] = useState("")
    const [email, setemail] = useState("")
    const [foto, setfoto] = useState("")
    const [file, setFile] = useState(null);
    //FIN DATOS DE SUCURSAL

    const [preview, setPreview] = useState("");
    const [errorDsc, seterrorDsc] = useState("")
    const [error, seterror] = useState(false)
    const [modificarOk, setmodificarOk] = useState(null)
    const [msgSuccess, setmsgSuccess] = useState("")
    const [modificando, setmodificando] = useState(false)
    const [cambio, setcambio] = useState(false)
    const [cambioEmpresa, setcambioEmpresa] = useState(false)
    const [cambioSucursal, setcambioSucursal] = useState(false)
    const [mostrarMsgSinCambios, setmostrarMsgSinCambios] = useState(false)
    const [rolUsuario, setrolUsuario] = useState("")

    useEffect(() => {
      if(empresa){
      setid(empresa.id)
      setidSucursal(sucursal.id)
      setnombre(empresa.nombreFantasia)
      setrazonSocial(empresa.razonSocial)
      setnumeroRut(empresa.numeroRUT)
      setpoliticasEmpresa(empresa.politicasEmpresa)
      setcodigoSucursal(sucursal.codigoSucursal)
      setdireccion(sucursal.direccion)
      settelefono(sucursal.telefono)
      setemail(sucursal.email)
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
      setcambioEmpresa(true)
      const selectFile = event.target.files[0]
      if(selectFile){
        setFile(selectFile)
        const previewUrl = URL.createObjectURL(selectFile);
        setPreview(previewUrl);
      }
    }
    const  handleModificar  = async()=>{
      if (cambioEmpresa){
        setmodificando(true)
        setTimeout(() => {
          setmodificando(false);
        }, 2500);
        if(!error)
        {
          const dataEmpresa = {
            id:id,
            nombreFantasia:nombre,
            razonSocial:razonSocial,
            numeroRut:numeroRut,
            politicasEmpresa:politicasEmpresa,
            file:file
          }
          console.log('llamoempresa')
          const result =  await fetModificarEmpresa(dataEmpresa,dispacth)
          if(result){
            setmsgSuccess("Datos modificados correctamente")
            setmodificarOk(true)
          }
          else{
            setmodificarOk(false)
            seterrorDsc("No se pudo modificar los datos")
          }
        }
        else
        {
          setmodificarOk(false)  
        }
      }
      if(cambioSucursal){
        setmodificando(true)
        setTimeout(() => {
          setmodificando(false);
        }, 2500);
        if(!error)
        {
          const dataSucursal = {
            id:idSucursal,
            codigoSucursal:codigoSucursal,
            direccion:direccion,
            telefono:telefono,
            email:email,
            idEmpresa:empresa.id
          }
          console.log('llamosucursal')
          const resultSucursal = await fetModificarSucursal(dataSucursal,dispacth)
          if(resultSucursal){
            setmsgSuccess("Datos modificados correctamente")
            setmodificarOk(true)
          }
          else{
            setmodificarOk(false)
            seterrorDsc("No se pudo modificar los datos")
          }
        }
        else
        {
          setmodificarOk(false)
        }
      }
      else
      {
        if(!cambioEmpresa && !cambioSucursal){
          setmostrarMsgSinCambios(true)
          setTimeout(() => {
            setmostrarMsgSinCambios(false)
          }, 2500);
        }
        
      }
      setcambioEmpresa(false)
      setcambioSucursal(false)
    }

    const onHandleChangeNombre = ({target})=>{
      setcambioEmpresa(true)
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
      setcambioSucursal(true)
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
      setcambioSucursal(true)
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
      setcambioSucursal(true)
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

    const onHandleChangeRazonSocial =({target})=>{
      setcambioEmpresa(true)
      if(!target.value)
        {
          seterrorDsc("Debe ingresar una razon social")
          seterror(true)
          setrazonSocial(target.value)
        }
        else
        {
          seterror(false)
          setrazonSocial(target.value)
        }
    }
    const onHandleChangeRUT =({target})=>{
      setcambioEmpresa(true)
      if(!target.value)
        {
          seterrorDsc("Debe ingresar RUT")
          seterror(true)
          setnumeroRut(target.value)
        }
        else
        {
          seterror(false)
          setnumeroRut(target.value)
        }
    }
    const onHandleChangePoliticas =({target})=>{
      setcambioEmpresa(true)
      if(!target.value)
        {
          seterrorDsc("Debe ingresar politicas de la empresa")
          seterror(true)
          setpoliticasEmpresa(target.value)
        }
        else
        {
          seterror(false)
          setpoliticasEmpresa(target.value)
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
      <Box sx={{
            display: 'flex', // Contenedor principal en fila
            gap: '24px', // Espacio entre las columnas de empresa y sucursal
            marginTop: '12px',
              }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px', // Espacio entre los elementos
          // marginTop: '12px',
          flex:1,
        }}
        >
          <Typography component="h4" variant='h5' sx={{textAlign:'left'}}>
           Empresa
          </Typography>
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
          label="Razon Social"
          id="outlined-size-small"
          value={razonSocial}
          size="small"
          sx={{ maxWidth: '300px', width: '100%' }}
          onChange={onHandleChangeRazonSocial}
          margin="dense"
          disabled = {rolUsuario=="Tecnico"}
        />
        <TextField
          label="Numero RUT"
          id="outlined-size-small"
          value={numeroRut}
          size="small"
          sx={{ maxWidth: '300px', width: '100%' }}
          onChange={onHandleChangeRUT}
          margin="dense"
          disabled = {rolUsuario=="Tecnico"}
        />
        <TextField
          label="Politicas"
          id="outlined-size-small"
          value={politicasEmpresa}
          size="small"
          sx={{ maxWidth: '300px', width: '100%' }}
          onChange={onHandleChangePoliticas}
          margin="dense"
          disabled = {rolUsuario=="Tecnico"}
        />
        </Box>
        <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px', // Espacio entre los elementos
              flex: 1, // Ocupa proporcionalmente el espacio disponible
            }}
          >
          <Typography component="h3" variant='h5' sx={{textAlign:'left'}}>
             Sucursal
          </Typography>
         <TextField
          label="Codigo sucursal"
          id="outlined-size-small"
          value={codigoSucursal}
          size="small"
          sx={{ maxWidth: '300px', width: '100%' }}
          margin="dense"
          disabled 
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
        </Box>
        <br/>
        <Divider></Divider>
        <br/>
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


          