import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { selectEmpresa, selectReparaciones, selectSucursal, selectUsuario } from '../store/auth';
import { useSelector } from 'react-redux';
import {  MenuItem, TableSortLabel, Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SimCardDownloadOutlinedIcon from '@mui/icons-material/SimCardDownloadOutlined';
import { useNavigate } from 'react-router-dom';
import { generarOrdSrv } from '../Fetchs';
import { NuevaReparacion } from './NuevaReparacion';
import { AccionesReparacion } from './AccionesReparacion';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const ListadoReparaciones = () => {
 
  const rep = useSelector(selectReparaciones);
  const emp = useSelector(selectEmpresa);
  const suc = useSelector(selectSucursal);
  const usu = useSelector(selectUsuario);
  const [tab, setTab] =  useState("EnTaller")
  const [reparacionesFiltradas, setreparacionesFiltradas] = useState([])
  const [rolUsuario, setrolUsuario] = useState("")
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [openNewRep,setOpenNewRep] = useState(false)
  const open = Boolean(anchorEl);


  useEffect(() => {
    setrolUsuario(usu.userRol)
  }, [])
  useEffect(() => {
    const elementosFiltrados = rep.filter(r => r.estado === tab);
    setreparacionesFiltradas(elementosFiltrados)
  }, [rep])
  useEffect(() => {
    const elementosFiltrados = rep.filter(r => r.estado === tab);
    setreparacionesFiltradas(elementosFiltrados)
  }, [tab])

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const stableSort = (array, comparator) => {
    const stabilizedArray = array.map((el, index) => [el, index]);
    stabilizedArray.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedArray.map((el) => el[0]);
  };

  const comparator = (a, b) => {
    if (a < b) return order === 'desc' ? 1 : -1;
    if (a > b) return order === 'desc' ? -1 : 1;
    return 0;
  };
  const sortedData = stableSort(reparacionesFiltradas, (a, b) => comparator(a[orderBy], b[orderBy]));
  const  handlePrint = async(id)=>{
    const idReparacion = id
    const idEmpresa = emp.id
    const idSucursal = suc.id
    await generarOrdSrv(idReparacion,idEmpresa,idSucursal);
  }
  const handleNewRep =() =>{
    setOpenNewRep(true)
  }
  const handleCloseDialog = () => {
    setOpenNewRep(false); // Cierra el diálogo y actualiza el estado
  };
  return (
    <>
      <div className='Grid grid-cols-1 bg-gray-50 h-auto my-[20px] mx-[20px] gap-8 py-3 px-2'>
        {/* tabla de filtros */}
        <div className='col-span-1  my-[20px] m-[20px] flex justify-end'>
         <button className='btnAgregar'>Nueva</button>
        </div>
        <div className='col-span-1 bg-blue-900  my-[20px] m-[20px]'>
          FILTROS
        </div>
        <div className='col-span-1  my-[20px] m-[20px]'>
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className='bg-blue-950 text-white h-9'>
                  <th>Orden</th>
                  <th>Fecha de ingreso</th>
                  <th>Cliente</th>
                  <th>Aparato</th>
                  <th>Serie</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {
                  rep.map((r,i) =>(
                    <tr key={i} className='even:bg-gray-200 hover:bg-gray-100 transition h-9'>
                      <td className='text-center'>{r.id}</td> 
                      <td className='text-center'>{r.fecha}</td>
                      <td className='text-center'>{r.clienteNombre}</td>
                      <td className='text-center'>{r.producto.marca}</td>
                      <td className='text-center'>{r.numeroSerie}</td>
                      <td className='text-center'>ACCIONES</td>
                  </tr>
                  ))}
                
              </tbody>
              </table>
        </div>
        <div className='col-span-1 bg-blue-950  my-[20px] m-[20px]'>
          paginado
        </div>

      </div>
    </>
  )
}
