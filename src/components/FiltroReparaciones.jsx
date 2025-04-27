import React, { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'

export const FiltroReparaciones = ({setSelected}) => {

  return (
    <div classNameName='row'>
        <div style={{marginRight:'100px',marginLeft:'100px'}} classNameName='col col-10'>
        <Tabs
        defaultActiveKey="profile"
        id="justify-tab-example"
        classNameName="mb-3"
        justify
    >
        <Tab onClick={setSelected("EnReparacion")} eventKey="enReparacion" title="En Reparacion">
        En Reparacion
        </Tab>
        <Tab onClick={setSelected("Presupuestadas")} eventKey="presupuestadas" title="Presupuestadas">
        Presupuestadas
        </Tab>
        <Tab onClick={setSelected("Terminadas")} eventKey="longer-tab" title="Terminadfas">
        Terminadas
        </Tab>
        <Tab onClick={setSelected("Entregadas")} eventKey="contact" title="Entregadas">
        Entregadas
        </Tab>
    </Tabs>
        </div>
           

    </div>
    
  )
}
