import React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));

  const Tecnicos = [
    {Id:2,Nombre:'Nestor',CantidadReparacionesMensuales:10,CantidadReparacionesRealizadas:8,CantidadReparacionesSinRealizar:2},
    {Id:3,Nombre:'Lucas',CantidadReparacionesMensuales:25,CantidadReparacionesRealizadas:20,CantidadReparacionesSinRealizar:5},
    {Id:4,Nombre:'Simon',CantidadReparacionesMensuales:1,CantidadReparacionesRealizadas:1,CantidadReparacionesSinRealizar:0},
    {Id:4,Nombre:'Oliver',CantidadReparacionesMensuales:50,CantidadReparacionesRealizadas:45,CantidadReparacionesSinRealizar:5}
  ]

export const DashBoard = () => {
    const label = Tecnicos.map(t=>t.Nombre);
    const data = Tecnicos.map(t=>t.CantidadReparacionesMensuales);
    
  return (
  
    <Paper elevation={2} sx={{ marginLeft: 2, marginRight: 2, marginTop: 2, padding: 2 }}>
    <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={2}>
      <Grid size={4}>
        <Item>
            <h3>Reparaciones mensuales por tecnico</h3>
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
        </Item>
      </Grid>
      <Grid size={4}>
        <Item>
            <h3> Reparaciones segun estado</h3>
        <PieChart
      series={[
        {
          data: [
            { id: 0, value: 10, label: 'Terminadas' },
            { id: 1, value: 15, label: 'Entregadas' },
            { id: 2, value: 20, label: 'Sin reparacion' },
            { id: 3, value: 20, label: 'En taller' }
          ],
        },
      ]}
      width={400}
      height={200}
    />
        </Item>
      </Grid>
      <Grid size={4}>
        <Item>size=4</Item>
      </Grid>
      <Grid size={4}>
        <Item>size=8</Item>
      </Grid>
      <Grid size={4}>
        <Item>size=8</Item>
      </Grid>
      <Grid size={4}>
        <Item>size=8</Item>
      </Grid>
    </Grid>
    </Box>
    </Paper>
 
  )
}
