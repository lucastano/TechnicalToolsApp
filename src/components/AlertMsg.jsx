import React from 'react'
import Alert from '@mui/material/Alert';

export const AlertMsg = ({msg,type}) => {
  return (
     <Alert sx={{m:1}} severity={type}>{msg}</Alert>
   
  )
}
