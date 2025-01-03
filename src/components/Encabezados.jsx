import { Box, Breadcrumbs, Divider, Link, Paper,Typography } from '@mui/material'
import React from 'react'
import { useLocation , Link as RouterLink} from 'react-router-dom'

export const Encabezados = () => {

  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Generar los breadcrumbs, acumulando cada segmento de la ruta
  const breadcrumbs = pathnames.map((value, index) => {
    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
    return {
      label: capitalize(value),
      to,
    };
  });

  return (
    
    <>
   <Paper elevation={0} style={{ padding: '10px', backgroundColor: 'rgb(245, 244, 244)',borderRadius: 0  }}>
      <Breadcrumbs aria-label="breadcrumb">
        {/* Enlace a la página principal */}
        <Link component={RouterLink} to="/" underline="hover" color="inherit">
          Inicio
        </Link>
        
        {/* Generar y mostrar los breadcrumbs acumulativos */}
        {breadcrumbs.map(({ label, to }, index) => (
          <Link key={to} component={RouterLink} to={to} underline="hover" color="inherit">
            {label}
          </Link>
        ))}
      </Breadcrumbs>
    </Paper>
      
    </>
    
    
  )
}
const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

