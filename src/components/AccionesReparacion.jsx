import React, { useState } from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'

export const AccionesReparacion = ({estado}) => {
   
  return (
    <>
        <DropdownButton size='sm' id="dropdown-basic-button" title="Acciones">
            
       
        <Dropdown.Item href="#/action-2">Entregar</Dropdown.Item>
        <Dropdown.Item href="#/action-3"></Dropdown.Item>
        </DropdownButton>
    </>
  )
}
