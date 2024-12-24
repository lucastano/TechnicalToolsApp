import React from 'react'
import Alert from '@mui/material/Alert';

export const AlertMsg = ({msg,type}) => {
  return (
    <Alert severity={type}>{msg}</Alert>
  )
}
