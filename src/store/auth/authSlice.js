import { createSlice } from '@reduxjs/toolkit';

const formatearFecha = (fechaISO) => {
      return new Date(fechaISO).toLocaleDateString("es-ES");
    };


export const authSlice = createSlice({
     name: 'auth',
     initialState: {
         sesion : null,
         reparaciones:[],
         clientes : [],
         tecnicos : [],
         administradores:[],
         empresa:{
            
         },
         sucursal:{

         },
         productos:[]
      },
      reducers: {
           loginUser :(state,action) => {
            
            const sesionUser = {
               status : 'authenticated',
               userName : action.payload.nombre,
               userLastName : action.payload.apellido,
               userEmail : action.payload.email,
               userRol : action.payload.rol,
               userToken : action.payload.token,
               userId : action.payload.id,
               userAddres:action.payload.direccion,
               userCi : action.payload.ci,
               userEmpresa: action.payload.idEmpresa,
               userSucursal:action.payload.idSucursal
            }
            state.sesion = sesionUser
            
           },
           logout :(state,payload) => {

            state.sesion= null;
            state.reparaciones = [];
            state.clientes = [];
            state.tecnicos = [];
            state.administradores = []
            state.empresa = {}
           },
           cargarTecnicos:(state,action)=>{
            state.tecnicos = action.payload
           },
            cargarClientes:(state,action)=>{
                  state.clientes = action.payload

            },
            cargarReparaciones:(state,action)=>{
                  state.reparaciones = action.payload.map((r) => ({
                        ...r,
                        fecha: formatearFecha(r.fecha) // Formatear la fecha aquí
                        }));
            },
            cargarAdministradores:(state,action)=>{   
               state.administradores = action.payload;
            },
            cargarEmpresa:(state,action) =>{
                  state.empresa = action.payload;
            },
            cargarSucursal:(state,action) =>{
                  state.sucursal = action.payload;
            },
            cargarProductos:(state,action)=>{
                  state.productos = action.payload;
            },
            agregarAdministrador:(state,action)=>{
               state.administradores = [...state.administradores,action.payload]

            },
            agregarCliente :(state,action)=>{
                  console.log('action.payload', action.payload)
                  state.clientes = [...state.clientes,action.payload]
            }
            ,
            agregarTecnico :(state,action)=>{
                  state.tecnicos = [...state.tecnicos,action.payload]
            },
            agregarReparacion : (state,action)=>{
                  action.payload.fecha = formatearFecha(action.payload.fecha)
                  state.reparaciones = [...state.reparaciones,action.payload]
            },
            modificarEmpresa : (state,action)=>{
                  state.empresa=action.payload

            },
            modificarSucursal : (state,action)=>{
                  state.sucursal=action.payload

            }
   }
});
export const { loginUser,logout,cargarTecnicos,cargarClientes,cargarReparaciones,agregarCliente,agregarTecnico,agregarReparacion,cargarAdministradores,agregarAdministrador,cargarEmpresa,modificarEmpresa,cargarProductos,cargarSucursal,modificarSucursal} = authSlice.actions;
export const selectUsuario = (state)=>state.auth.sesion;
export const selectClientes = (state)=>state.auth.clientes;
export const selectTecnicos =(state)=>state.auth.tecnicos;
export const selectAdministradores =(state)=>state.auth.administradores;
export const selectReparaciones =(state)=>state.auth.reparaciones;
export const selectEmpresa = (state) => state.auth.empresa;
export const selectProductos =(state) => state.auth.productos;
export const selectSucursal =(state) => state.auth.sucursal;