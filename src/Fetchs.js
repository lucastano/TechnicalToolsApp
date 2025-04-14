import { cargarTecnicos, cargarClientes, cargarAdministradores, cargarReparaciones, cargarEmpresa,modificarEmpresa, cargarProductos, cargarSucursal, modificarSucursal, agregarReparacion, agregarCliente } from "./store/auth";

// const urlBase = 'https://proyectoserviceapirest20240901142836.azurewebsites.net/api/'
const urlBase ='http://lucast-001-site1.ptempurl.com'
async function login(user, password, rol) {
  const url = urlBase + '/api/seguridad'
  const userLogin = {
    email: user,
    password: password,
    rol: rol
  }
  const data = JSON.stringify(userLogin);
  console.log('data', data)
  const opciones = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: data,
  };
  try {
    const respuesta = await fetch(url, opciones);
    if (!respuesta.ok) {
      const datos = await respuesta.json();
      console.log("aca salat el error",datos)
      throw new Error(datos.error);
    } else {
      const datos = await respuesta.json();
      if (datos.token) {
        localStorage.setItem("Token", datos.token);
      } else {
        throw new Error("No se recibio token");
      }
      return datos;
    }
  } catch (error) {
     throw error.message;
  }


}

async function postCliente(dispatch,cliente){
  console.log('cliente', cliente)
const url = urlBase + '/api/Clientes'
const token = localStorage.getItem("Token");
const opciones ={
  method:"POST",
  headers:{
    'Content-Type':'application/json',
    Authorization:`Bearer ${token}`
  },
  body:JSON.stringify(cliente)
}
try{
  const response = await fetch(url,opciones);
  if(!response.ok){
    const errorData = await response.json();
    console.log('errorData', errorData)
    throw new Error(errorData.message)
  }
  const data = await response.json();
  console.log('data', data)
  dispatch(agregarCliente(data))
  return { success: true, data }; 
}
catch(error){
 return  { success: false, message: error.message }
}


}
async function getClientes(dispatch) {
  const url = urlBase + '/api/Clientes'
  const token = localStorage.getItem("Token");
  const opciones = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const respuesta = await fetch(url, opciones);
    if (!respuesta.ok) {
      throw new Error(`HTTP error! status: ${respuesta.status}`);
    } else {
      const datos = await respuesta.json();
      console.log("fetch clientes: "+datos)
       dispatch(cargarClientes(datos.clientes));
    }
  } catch (error) {
    throw error;
  }
}

async function getTecnicos(dispatch) {
  const url = urlBase + '/api/Tecnicos';
  const token = localStorage.getItem("Token");
  const opciones = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const respuesta = await fetch(url, opciones);
    if (!respuesta.ok) {
      throw new Error(`HTTP error! status: ${respuesta.status}`);
    } else {
      const datos = await respuesta.json();
      dispatch(cargarTecnicos(datos.tecnicos));
    }
  } catch (error) {
    throw error;
  }
}
async function getAdministradores(dispatch) {
  const url = urlBase + '/api/Administradores';
  const token = localStorage.getItem("token");
  const opciones = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const respuesta = await fetch(url, opciones);
    if (!respuesta.ok) {
      throw new Error(`HTTP error! status: ${respuesta.status}`);
    } else {
      const datos = await respuesta.json();
      dispatch(cargarAdministradores(datos.administradores));
    }
  } catch (error) {
    throw error;
  }
}
async function getReparaciones(dispatch,user) {
  const url = urlBase + '/api/Reparaciones/TodasLasReparaciones';
  const token = localStorage.getItem("Token");
  const opciones = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  console.log('user', user)
  try {
    const respuesta = await fetch(url, opciones);
    if (!respuesta.ok) {
      throw new Error(`HTTP error! status: ${respuesta.status}`);
    } else {
      const datos = await respuesta.json();
      const reparaciones = datos.reparaciones;
      if(user.rol==="Tecnico"){
        const reparacionesFiltradas = reparaciones.filter(r=>r.id > 0);
        // const reparacionesFiltradas = reparaciones.filter(r=>r.tecnicoId===user.id);
        dispatch(cargarReparaciones(reparacionesFiltradas));
      }else{
        dispatch(cargarReparaciones(reparaciones));
      }
      
    }
  } catch (error) {
    throw error;
  }
}
async function getReparacionesPorCI(cedula, dispatch) {
  const url = urlBase + `/api/Reparaciones/ReparacionesDeClienteCedula?cedula=${cedula}`;
  const token = localStorage.getItem("Token");
  const opciones = {
    method: "GET",
    headers: {
      accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const respuesta = await fetch(url, opciones);
    if (!respuesta.ok) {
      throw new Error(`HTTP error! status: ${respuesta.status}`);
    } else {
      const datos = await respuesta.json();
      console.log(datos)
      dispatch(cargarReparaciones(datos));
    }
  } catch (error) {
    throw error;
  }
}
async function getEmpresa(dispatch,idEmpresa){
  const url = urlBase + `/api/Empresas/ObtenerEmpresaPorId?id=${idEmpresa}`
  const token = localStorage.getItem("Token");
  const opciones = {
    method: "GET",
    headers: {
      accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
  }
  try {
    const response = await fetch(url,opciones); // Cambia esta URL según tu API
    let data = await response.json();
    const urlPhoto = urlBase+data.foto;
    data.foto =urlPhoto
    if (data && data.foto) {
      dispatch(cargarEmpresa(data))
    }
  } catch (error) {
    console.error('Error al obtener la foto:', error);
  }
}

async function getSucursal(dispatch,idSucursal){
  console.log("sucursal en fetch"+idSucursal)
  const url = urlBase + `/api/Sucursales/ObtenerPorId?id=${idSucursal}`
  const token = localStorage.getItem("Token");
  const opciones = {
    method: "GET",
    headers: {
      accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
  }
  try {
    const response = await fetch(url,opciones); // Cambia esta URL según tu API
    let data = await response.json();
    if (data ) {
      console.log('sucursal despues del fetch', data)
      dispatch(cargarSucursal(data))
    }
  } catch (error) {
    console.error('Error al obtener la foto:', error);
  }
}
async function fetModificarEmpresa (dataEmpresa,dispatch) {
  console.log('dataEmpresa', dataEmpresa)
  const url = urlBase + "/api/Empresas"
  const token = localStorage.getItem("Token");
  console.log()
  const formData = new FormData();
      formData.append("Id",dataEmpresa.id)
      formData.append("NombreFantasia", dataEmpresa.nombreFantasia);   // Nombre de la empresa
      formData.append("RazonSocial", dataEmpresa.razonSocial); // Teléfono de la empresa
      formData.append("NumeroRUT", dataEmpresa.numeroRut); // Dirección de la empresa
      formData.append("PoliticasEmpresa", dataEmpresa.politicasEmpresa);
           // Email de la empresa
      if (dataEmpresa.file) {
        console.log("file no es null")
        formData.append("Foto", dataEmpresa.file); // La imagen seleccionada
      }else{
        console.log("file es null")
        formData.append("Foto", null);
      }

  try {
    const response = await fetch(url, {
      method: "PUT",
      body: formData,
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`, 
      },
    });
    if (!response.ok) {
      throw new Error("Error al modificar la empresa");
    }
    const result = await response.json();
    const aux = result.foto
    result.foto = urlBase + aux
    dispatch(modificarEmpresa(result))
    return response.ok;
  } catch (error) {
  }
};

async function fetModificarSucursal (dataSucursal,dispatch) {
  console.log('dataSucursal', dataSucursal.id)
  const url = urlBase + "/api/Sucursales"
  const token = localStorage.getItem("Token");
  const data = {
    id:dataSucursal.id,
    codigoSucursal:dataSucursal.codigoSucursal,
    direccion:dataSucursal.direccion,
    telefono:dataSucursal.telefono,
    email:dataSucursal.email
  }
  console.log('data', data)
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        'Content-Type':'application/json',
        Authorization: `Bearer ${token}`  
      },
      body:JSON.stringify(data)
    });
    console.log('response', response)
    if (!response.ok) {
      throw new Error("Error al modificar la empresa");
    }
    const result = await response.json();
    dispatch(modificarSucursal(result))
    return response.ok;
  } catch (error) {
  }
};

async function generarOrdSrv (idReparacion,idEmpresa,idSucursal){
const url = urlBase + `/api/Reparaciones/GenerarOrdSrv?idReparacion=${idReparacion}&idEmpresa=${idEmpresa}&idSucursal=${idSucursal}`
const token = localStorage.getItem("Token");
try
{
  const response = await fetch(url,{
    method:'GET',
    headers:{
      'Content-Type':'application/json',
      'Authorization':`Bearer ${token}`
    },
  });
  if(!response.ok)
  {
    throw new Error(`Error en la solicitud: ${response.status}`);
  }
  const resultado = await response.json();
  if (typeof resultado !== "string") {
    throw new Error("Formato de datos inesperado para la orden de servicio");
  }
    const cadenaCaracteres = resultado;
    const binaryString = window.atob(cadenaCaracteres);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: 'application/pdf' });
    const urlG = window.URL.createObjectURL(blob);
     // Crea un enlace para descargar el archivo
     const link = document.createElement('a');
     link.href = urlG;
     link.setAttribute('download', 'archivo.pdf'); // Nombre del archivo
     document.body.appendChild(link);
     link.click();
     // Limpia el enlace y revoca la URL
     link.parentNode.removeChild(link);
     window.URL.revokeObjectURL(urlG);
}
catch(error)
{

  console.error('Error al realizar el fetch:', error);
}

};

async function getProductos(dispatch){
  const url = urlBase + `/api/Productos`
  const token = localStorage.getItem("Token");
  console.log(url)
  const opciones = {
    method: "GET",
    headers: {
      accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
  }
  try {
    const response = await fetch(url,opciones); // Cambia esta URL según tu API
    let data = await response.json();
    if (data) {
      dispatch(cargarProductos(data))
    }
  } catch (error) {
    console.error('Error al obtener la foto:', error);
  }
}
async function postReparacion(dispatch,data){
  console.log('data', data)
  console.log('data', data)
  const url = urlBase + `/api/Reparaciones`
  const token = localStorage.getItem("Token");
  const opciones = {
    method:"POST",
    headers:{
      'Content-Type':'application/json',
    },
    body:JSON.stringify(data),
  }
  try{
    const response = await fetch(url,opciones);
    if(!response.ok){
      const errorData = await response.json();
      throw new Error(errorData.message)
    }
    const data = await response.json();
    dispatch(agregarReparacion(data))
    return { success: true, data }; 
  }
  catch(error){
   return  { success: false, message: error.message }
  }
}

async function loginprueba() {
  const userLogin = {
    email: "lucasgabriel.tano@gmail.com",
    password: "Lu3472759",
    rol: "Administrador"
  }
  const url = urlBase + '/api/seguridad'
  const data = JSON.stringify(userLogin);
  console.log('data', data)
  const opciones = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: data,
  };
  try {
    const respuesta = await fetch(url, opciones);
    if (!respuesta.ok) {
      const datos = await respuesta.json();
      console.log("aca salat el error",datos)
      throw new Error(datos.error);
    } else {
      const datos = await respuesta.json();
      if (datos.token) {
        localStorage.setItem("Token", datos.token);
      } else {
        throw new Error("No se recibio token");
      }
      return datos;
    }
  } catch (error) {
     throw error.message;
  }
  
}
export {
  login,
  getClientes,
  getTecnicos,
  getAdministradores,
  getReparaciones,
  getReparacionesPorCI,
  getEmpresa,
  fetModificarEmpresa,
  generarOrdSrv,
  getProductos,
  getSucursal,
  fetModificarSucursal,
  postReparacion,
  postCliente,
  loginprueba
}