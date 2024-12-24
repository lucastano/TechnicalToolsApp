import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

export const authSlice = createSlice({
     name: 'auth',
     initialState: {
         sesion : null,
         reparaciones:[],
         clientes : [],
         tecnicos : [],
         administradores:[]
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
               userCi : action.payload.ci 
            }
            state.sesion = sesionUser
            
           },
           logout :(state,payload) => {

            state.sesion= null;
            state.reparaciones = [];
            state.clientes = [];
            state.tecnicos = [];
            state.administradores = []
           },
           cargarTecnicos:(state,action)=>{
            console.log("en cargar tecnicos: "+action.payload)
            state.tecnicos = action.payload
           },
            cargarClientes:(state,action)=>{
                  state.clientes = action.payload

            },
            cargarReparaciones:(state,action)=>{
                  state.reparaciones = action.payload
            },
            cargarAdministradores:(state,action)=>{   
               state.administradores = action.payload
            },
            agregarAdministrador:(state,action)=>{
               state.administradores = [...state.administradores,action.payload]

            },
            agregarCliente :(state,action)=>{
                  state.clientes = [...state.clientes,action.payload]
            }
            ,
            agregarTecnico :(state,action)=>{
                  state.tecnicos = [...state.tecnicos,action.payload]
            },
            agregarReparacion : (state,action)=>{
                  state.reparaciones = [...state.reparaciones,action.payload]
            }
   }
});

// 
export const { loginUser,logout,cargarTecnicos,cargarClientes,cargarReparaciones,agregarCliente,agregarTecnico,agregarReparacion,cargarAdministradores,agregarAdministrador} = authSlice.actions;
export const selectUsuario = (state)=>state.auth.sesion;
export const selectClientes = (state)=>state.auth.clientes;
export const selectTecnicos =(state)=>state.auth.tecnicos;
export const selectAdministradores =(state)=>state.auth.administradores;
export const selectReparaciones =(state)=>state.auth.reparaciones;