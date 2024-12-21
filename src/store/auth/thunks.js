// import { login } from '../../Fetchs';
// import {checkingCredentials, loginUser, logout, userAuthenticated} from './authSlice'

// export const checkingAuthentication =(email,password,rol) => {
//     return async (dispatch) =>{
        
//         dispatch(checkingCredentials());
//         const datos = await login(email,password,rol)
//         if(datos.statusCode == 200){
//             const user = {
//                 id:datos.usuario.id,
//                 nombre:datos.usuario.nombre,
//                 apellido:datos.usuario.apellido,
//                 email:datos.usuario.email,
//                 token:datos.token,
//                 rol:datos.usuario.rol
//             }
//             dispatch(userAuthenticated())
//             dispatch(loginUser(user))
//         }
//         else{

//         }
       
//     }
// }