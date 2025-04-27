import React from 'react'
import { BarChart } from '@mui/x-charts/BarChart';


const Tecnicos = [
    {Id:2,Nombre:'Nestor',CantidadReparacionesMensuales:10,CantidadReparacionesRealizadas:8,CantidadReparacionesSinRealizar:2},
    {Id:3,Nombre:'Lucas',CantidadReparacionesMensuales:25,CantidadReparacionesRealizadas:20,CantidadReparacionesSinRealizar:5},
    {Id:4,Nombre:'Simon',CantidadReparacionesMensuales:1,CantidadReparacionesRealizadas:1,CantidadReparacionesSinRealizar:0},
    {Id:4,Nombre:'Oliver',CantidadReparacionesMensuales:50,CantidadReparacionesRealizadas:45,CantidadReparacionesSinRealizar:5}
  ]

export const NewDash = () => {
    const label = Tecnicos.map(t=>t.Nombre);
    const data = Tecnicos.map(t=>t.CantidadReparacionesMensuales);

    

  return (
        <div classNameName='flex place-content-around  bg-gray-100 rounded-2xl h-180 mx-10 my-10 p-7 flex-wrap' >
          <div classNameName=' bg-white w-96 h-24 grid place-content-center rounded-lg m-7  text-black '>
               
          </div>
          <div classNameName=' bg-white w-96 h-24 grid place-content-center rounded-lg m-7  text-black '>
               
          </div>
          <div classNameName=' bg-white w-96 h-24 grid place-content-center rounded-lg m-7  text-black '>
               
          </div>
            <div classNameName=' bg-white w-72 h-72 grid place-content-center rounded-lg m-7  text-black  '>two</div>
            <div classNameName=' bg-white w-72 h-72 grid place-content-center rounded-lg m-7  text-black overflow-hidden '>
            <span classNameName='text-center text-lg space-y-2 ' >Reparaciones mensuales por tecnico</span>
                 <BarChart
                      xAxis={[
                        {
                          id: 'barReparaciones',
                          data: label,
                          scaleType: 'band',
                        },
                      ]}
                      series={[
                        {
                          data: data,
                        },
                      ]}
                      width={300}
                      height={300}
                    />
            </div>
            
            <div classNameName=' bg-white w-72 h-72 grid place-content-center rounded-lg m-7  text-black  '>
                
            </div>
            <div classNameName=' bg-white w-72 h-72 grid place-content-center rounded-lg m-7  text-black  '>two</div>
            
            
        </div>
  
  )
}
