import React, { useEffect, useState } from 'react'
import { getEmpresa, getSucursal } from '../Fetchs'

export const Empresa = () => {
const [userLoged, setuserLoged] = useState({})
const [empresa, setempresa] = useState({})
const [suc, setSuc] = useState({})
const [imagen, setImagen] = useState(null);
  useEffect(() => {
    obtenerEmpresaSucursal()
  }, [])
  
  const obtenerEmpresaSucursal = async () => {
    const usu = JSON.parse(localStorage.getItem("UsuarioLog"))
    setuserLoged(usu)
    console.log('userLoged.idEmpresa', usu.idEmpresa)
    console.log('userLoged.idSucursal', usu.idSucursal)
    const empresaResponse = await getEmpresa(usu.idEmpresa)
    setempresa(empresaResponse)
    const sucursalResponse = await getSucursal(usu.idSucursal)
    setSuc(sucursalResponse)
    console.log('empresaResponse', empresaResponse)
    console.log('sucursalResponse', sucursalResponse)
  }
  
  return (
    <>
      <div className=' grid grid-cols-1 md:grid-cols-2 gap-2 bg-gray-100 m-3 '>
        <div className='col-span-1 bg-white m-3 p-3'>
          <h2>Datos de la empresa</h2>
          <label htmlFor="NombreFantasia" className="block mb-1 text-sm/6 font-medium text-gray-900">Nombre fantasia</label>
          <input type="text" id='NombreFantasia' value={empresa.nombreFantasia} className='border-2 border-gray-300 rounded-md p-2 w-full' disabled />

          <label htmlFor="RazonSocial" className="block mb-1 text-sm/6 font-medium text-gray-900">Razon social</label>
          <input type="text" id='RazonSocial' value={empresa.razonSocial} className='border-2 border-gray-300 rounded-md p-2 w-full' disabled />
          
          <label htmlFor="NumeroRut" className="block mb-1 text-sm/6 font-medium text-gray-900">RUT</label>
          <input type="text" id='NumeroRut' value={empresa.numeroRUT} className='border-2 border-gray-300 rounded-md p-2 w-full' disabled />

          <label htmlFor="Imagen" className="block mb-1 text-sm/6 font-medium text-gray-900">Imagen</label>
          <div className='m-2 p-3 flex justify-center items-center '  >
            <img src={empresa.foto} alt='foto de empresa'></img>
          </div>

        </div>
        <div className='col-span-1 bg-white m-3 p-3'>
          <p>Datos de la sucursal</p>
        </div>

      </div>

      {/* Object { id: 1, nombreFantasia: "cooltechuy", razonSocial: "lucas tano", 
      numeroRUT: "222313", foto: "http://lucast-001-site1.ptempurl.com/uploads/dcc44195-e830-4558-8da3-be7dc3a3bfde_Empresa.png", 
      politicasEmpresa: "dfds" } */}
      
    </>
  )
}



          