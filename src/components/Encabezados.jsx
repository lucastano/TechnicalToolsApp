import { Paper } from '@mui/material'
import React from 'react'

export const Encabezados = ({Titulo}) => {
  return (
    <Paper >
        <h3 style={{marginLeft:"10px"}} >{Titulo}</h3>
    </Paper>
  )
}
