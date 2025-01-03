import { cargarTecnicos, cargarClientes, cargarAdministradores, cargarReparaciones, cargarEmpresa,modificarEmpresa, cargarProductos } from "./store/auth";

// const urlBase = 'https://proyectoserviceapirest20240901142836.azurewebsites.net/api/'
const urlBase ='https://localhost:7105'
async function login(user, password, rol) {
  const url = urlBase + '/api/Seguridad'
  const userLogin = {
    Email: user,
    Password: password,
    Rol: rol
  }
  const data = JSON.stringify(userLogin);
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
      console.log(datos)
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
async function getClientes(dispatch) {
  const url = urlBase + '/api/Clientes'
  console.log("ruta: " + url)
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
async function getReparaciones(dispatch) {
  const url = urlBase + '/api/Reparaciones/TodasLasReparaciones';
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
      dispatch(cargarReparaciones(datos.reparaciones));
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
async function fetModificarEmpresa (data,dispatch) {
  const url = urlBase + "/api/Empresas"
  const token = localStorage.getItem("Token");
  const formData = new FormData();
      formData.append("id",data.id)
      formData.append("nombre", data.nombre);   // Nombre de la empresa
      formData.append("telefono", data.telefono); // Teléfono de la empresa
      formData.append("direccion", data.direccion); // Dirección de la empresa
      formData.append("email", data.email);     // Email de la empresa
      if (data.file) {
        console.log("file no es null")
        formData.append("foto", data.file); // La imagen seleccionada
      }else{
        console.log("file es null")
        formData.append("foto", null);
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

async function generarOrdSrv (idReparacion,idEmpresa){
const url = urlBase + `/api/Reparaciones/GenerarOrdSrv?idReparacion=${idReparacion}&idEmpresa=${idEmpresa}`
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
  getProductos
}