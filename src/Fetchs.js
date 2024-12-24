import { cargarTecnicos, cargarClientes, cargarAdministradores, cargarReparaciones } from "./store/auth";

const urlBase = 'https://proyectoserviceapirest20240901142836.azurewebsites.net/api/'
async function login(user, password, rol) {
  console.log("ENTRO A LOGIN")
  const url = urlBase + 'Seguridad'
  const userLogin = {
    Email: user,
    Password: password,
    Rol: rol
  }
  console.log(user)
  console.log(password)
  console.log(rol)

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
      throw new Error(`HTTP error! status: ${respuesta.status}`);
    } else {
      const datos = await respuesta.json();
      if (datos.token) {
        localStorage.setItem("Token", datos.token);
      } else {
        throw new Error("No se recibio token");
      }
      return datos;
      //   dispatch(loginExito(datos.usuario));
    }
  } catch (error) {
    throw error;
  }


}
async function getClientes(dispatch) {
  const url = urlBase + 'Clientes'
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
  const url = urlBase + 'Tecnicos';
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
      console.log(datos)
      dispatch(cargarTecnicos(datos.tecnicos));
    }
  } catch (error) {
    throw error;
  }
}
async function getAdministradores(dispatch) {
  const url = urlBase + 'Administradores';
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
  const url = urlBase + 'Reparaciones/TodasLasReparaciones';
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
  const url = urlBase + `Reparaciones/ReparacionesDeClienteCedula?cedula=${cedula}`;
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
export {
  login,
  getClientes,
  getTecnicos,
  getAdministradores,
  getReparaciones,
  getReparacionesPorCI
}