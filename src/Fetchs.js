
// const urlBase = 'https://proyectoserviceapirest20240901142836.azurewebsites.net/api/'
const urlBase ='https://lucast-001-site1.ptempurl.com'
//endpoint aun no implementado, devuelve el usuario solo con el token 
// el token no enviarlo como body, sino como header, ver como a partir de eso obtener el usuario con los claims del token, lo mas seguro 
// es que tenga que crear algun procedimiento mas en el backend
async function obtenerUsuarioLogeado(Token) {
  const url = urlBase + '/api/Usuario'
  const data = Json.stringify({ token: Token });
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
      throw new Error(`HTTP error! status: ${respuesta.status}`);
    } else {
      const datos = await respuesta.json();
      return datos;
    }
  }
  catch (error) {
    throw error;
  }
}

async function loginFetch(user, password, rol) {
  const url = urlBase + '/api/seguridad'
  const userLogin = {
    email: user,
    password: password,
    rol: rol
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
      console.log('datos', datos)
      throw new Error(datos.error);
    } else {
      const datos = await respuesta.json();
      if (datos.token) {
        console.log('datos', datos.usuario)
        localStorage.setItem("Token", datos.token);
        console.log('aca llego bien 1')
        const usuario = {
          nombre: datos.usuario.nombre,
          apellido: datos.usuario.apellido,
          id: datos.usuario.id,
          rol: datos.usuario.rol,
          email: datos.usuario.email
        }
        console.log('aca llego bien 2')
        localStorage.setItem("UsuarioLogeado",usuario);
        
        return datos;
      } else {
        throw new Error("No se recibio token");
      }
    }
  } catch (error) {
     throw error.message;
  }


}

async function postCliente(cliente){
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
  return { success: true, data }; 
}
catch(error){
 return  { success: false, message: error.message }
}
}
async function getClientes() {
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
    }
  } catch (error) {
    throw error;
  }
}

async function getClienteByCi(ci) {
  console.log('ci', ci)
  const url = urlBase + `/api/Clientes/ObtenerClientePorCi?ci=${ci}`
  const token = localStorage.getItem("Token");
  const opciones = {
    method: "GET",
    headers: {
      accept: "text/plain",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const respuesta = await fetch(url, opciones);
    if (!respuesta.ok) {
      throw new Error(`HTTP error! status: ${respuesta.status}`);
    } else {
      const datos = await respuesta.json();
      return datos;
    }
  } catch (error) {
    return error.message;
  }
}

async function getTecnicos() {
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
    }
  } catch (error) {
    throw error;
  }
}
async function getAdministradores() {
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
    }
  } catch (error) {
    throw error;
  }
}
async function getReparaciones(user) {
  console.log('entre fetch reparaciones con user', user)
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
      const reparaciones = datos.reparaciones;
      if(user.rol === "Tecnico"){
        const reparacionesFiltradas = reparaciones.filter(reparacion => reparacion.tecnicoId === user.id);
        console.log('reparacionesFiltradas en fetch', reparacionesFiltradas)
        return reparacionesFiltradas;
      }
      if(user.rol === "Administrador"){
        return reparaciones;
      }      
    }
  } catch (error) {
    throw error;
  }
}
async function getReparacionesPorCI(cedula) {
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
    }
  } catch (error) {
    throw error;
  }
}
async function getEmpresa(idEmpresa){
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
      return data;
    }
    
  } catch (error) {
    console.error('Error al obtener la foto:', error);
  }
}

async function getSucursal(idSucursal){
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
     return data;
    }
  } catch (error) {
    console.error('Error al obtener la foto:', error);
  }
}
async function fetModificarEmpresa (dataEmpresa) {
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
    return response.ok;
  } catch (error) {
  }
};

async function fetModificarSucursal (dataSucursal) {
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

async function getProductos(){
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
    const response = await fetch(url,opciones); 
    let data = await response.json();
    console.log('data', data)
    if (data) {
      return data;
    }
  } catch (error) {
    console.error('Error al obtener la foto:', error);
  }
}
async function postReparacion(data){
  const url = urlBase + `/api/Reparaciones`
  const token = localStorage.getItem("Token");
  const opciones = {
    method:"POST",
    headers:{
      'Content-Type':'application/json',
      Authorization : `Bearer ${token}`,
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
    return { success: true, data }; 
  }
  catch(error){
   return  { success: false, message: "error desde el servidor" }
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

const postPresupuesto = async (data) => {
  const url = urlBase + '/api/Reparaciones/Presupuestar'
  console.log('data en fetch', data)
  const token = localStorage.getItem("Token");
  const opciones = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(url, opciones);
    console.log('response', response)
    if (!response.ok) {
      throw new Error('Error al crear el presupuesto');
    }
    return response.status;
  } catch (error) {
    console.error('Error:', error);
  }
};

const postAceptarPresupuesto = async (id) => {
  const url = urlBase + `/api/Reparaciones/AceptarPresupuesto?id=${id}`
  const token = localStorage.getItem("Token");
  const opciones = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(url, opciones);
    console.log('response', response)
    if (!response.ok) {
      throw new Error('Error al crear el presupuesto');
    }
    return response.status;
  } catch (error) {
    console.error('Error:', error);
  }
}
const postNoAceptarPresupuesto = async (id,costo,razon) => {
  //id costo razon
const url = urlBase + `/api/Reparaciones/NoAceptarPresupuesto?id=${id}&costo=${costo}&razon=${razon}`
const token = localStorage.getItem("Token");
  const opciones = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(url, opciones);
    console.log('response', response)
    if (!response.ok) {
      throw new Error('Error al crear el presupuesto');
    }
    return response.status;
  } catch (error) {
    console.error('Error:', error);
  }
}
const postTerminarReparacion = async (id,reparada) => {
  console.log('id en el fetch de terminar reparacion', id)
  //id costo razon
const url = urlBase + `/api/Reparaciones/TerminarReparacion?id=${id}&reparada=${reparada}`
const token = localStorage.getItem("Token");
  const opciones = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(url, opciones);
    console.log('response', response)
    if (!response.ok) {
      throw new Error('Error al crear el presupuesto');
    }
    return response.status;
  } catch (error) {
    console.error('Error:', error);
  }
}
const postEntregarReparacion = async (id) => {
  //id costo razon
const url = urlBase + `/api/Reparaciones/EntregarReparacion?id=${id}`
const token = localStorage.getItem("Token");
  const opciones = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(url, opciones);
    console.log('response', response)
    if (!response.ok) {
      throw new Error('Error al crear el presupuesto');
    }
    return response.status;
  } catch (error) {
    console.error('Error:', error);
  }
}
export {
  loginFetch,
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
  loginprueba,
  getClienteByCi,
  postPresupuesto,
  postAceptarPresupuesto,
  postNoAceptarPresupuesto,
  postTerminarReparacion,
  postEntregarReparacion
}