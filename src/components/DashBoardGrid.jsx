import React from 'react'
import { BarChart } from '@mui/x-charts/BarChart';

const Tecnicos = [
    {Id:2,Nombre:'Nestor',CantidadReparacionesMensuales:10,CantidadReparacionesRealizadas:8,CantidadReparacionesSinRealizar:2},
    {Id:3,Nombre:'Lucas',CantidadReparacionesMensuales:25,CantidadReparacionesRealizadas:20,CantidadReparacionesSinRealizar:5},
    {Id:4,Nombre:'Simon',CantidadReparacionesMensuales:1,CantidadReparacionesRealizadas:1,CantidadReparacionesSinRealizar:0},
    {Id:4,Nombre:'Oliver',CantidadReparacionesMensuales:50,CantidadReparacionesRealizadas:45,CantidadReparacionesSinRealizar:5}
  ]

export const DashBoardGrid = () => {
    const label = Tecnicos.map(t=>t.Nombre);
    const data = Tecnicos.map(t=>t.CantidadReparacionesMensuales);

  return (
    <div className='grid grid-cols-6 gap-2 p-4 bg-gray-100 m-5'>
        {/* SUPERIORES OCUPAN 2 COL  X 3 ESPACIOS*/}
        <div className=' cardLx md:col-span-2  col-span-6' >
            <p className='titleCards' >Reparaciones mensuales</p>
            <p className='numberCards block '> 10</p>
        </div>

        <div className=' cardLx md:col-span-2 col-span-6' >
        <p className='titleCards' >Reparadas</p>
        <p className='numberCards block '>7</p>
        </div>

        <div className=' cardLx md:col-span-2 col-span-6  '>
        <p className='titleCards' >Sin reparacion</p>
        <p className='numberCards block '>3</p>
        </div>

        {/* HASTA ACA VA OCUPAN 2 COL */}

        <div className=' md:col-span-1 col-span-6   bg-white'>
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
                width={250}
                height={250}
            />
        </div>
        <div className=' md:col-span-1 col-span-6 bg-white'> span 5</div>
        <div className=' md:col-span-1 col-span-6 bg-white'>span 6</div>
        <div className=' md:col-span-1 col-span-6 bg-white'>span 7</div>
        <div className=' md:col-span-1 col-span-6 bg-white'>span 8</div>
        <div className=' md:col-span-1 col-span-6 md:row-span-2 bg-white'>span 9</div>
        <div className=' md:col-span-1 col-span-6 bg-white'>span 10</div>
        <div className=' md:col-span-1 col-span-6 bg-white'>span 11</div>
        <div className=' md:col-span-1 col-span-6 bg-white'>span 12</div>
        <div className=' md:col-span-1 col-span-6 bg-white'>span 13</div>
        <div className=' md:col-span-1 col-span-6 bg-white'>span 14</div>
    </div>
  )
}
