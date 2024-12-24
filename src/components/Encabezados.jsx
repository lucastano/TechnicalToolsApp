import { Paper, Typography } from '@mui/material'
import React from 'react'

export const Encabezados = ({Titulo}) => {
  return (
    
    <div style={{backgroundColor:"#f5f4f4", padding:"5px"}} > 
      <Typography component="h1" variant='h5' sx={{textAlign:'left', mt:1,ml:1}}>
          {Titulo}
      </Typography>
    </div>
    
    
  )
}
