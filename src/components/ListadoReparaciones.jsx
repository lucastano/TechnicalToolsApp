import React, { useEffect, useState } from 'react'
import { FiltroReparaciones } from './FiltroReparaciones'
import { Col, Dropdown, DropdownButton, Form, Row, Table } from 'react-bootstrap'
import { AccionesReparacion } from './AccionesReparacion'

export const ListadoReparaciones = () => {

    const [selected, setSelected] = useState("EnReparacion")
    useEffect(() => {

        console.log("filtro seleccionado: "+selected)
      
    }, [selected])
    
  return (
    <>
    <Row style={{marginBottom:"20px", marginTop:"20px"}} >
      <Col sm={12}>
      <h2>LISTADO DE REPARACIONES</h2>
      </Col>
    </Row>
    <Row>
    <Col style={{margin:"10px", border:"solid 2px black"}} sm={12}>
    {/* ACA VAN LOS FILTROS     */}
    ACA VAN LOS FILTROS
    </Col>

    </Row>
      <Row>
       
        <Col sm={11} >
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>Nro Orden</th>
          <th>Nombre</th>
          <th>Telefono</th>
          <th>Aparato</th>
          <th>Falla</th>
          <th>Acciones</th>

        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>@mdo</td>
          <td>
            <AccionesReparacion estado ={"reparada"}/>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
          <td>@mdo</td>
          <td>@mdo</td>
        </tr>
        <tr>
        <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
          <td>@mdo</td>
          <td>@mdo</td>
         
        </tr>
      </tbody>
    </Table>
        </Col>
      </Row>
   
    </>
  )
}
