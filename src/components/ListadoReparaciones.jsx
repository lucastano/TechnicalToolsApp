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
  const navigate = useNavigate()

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
  

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  

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
    <NuevaReparacion openValue={openNewRep} onClose={handleCloseDialog} />
     <Paper elevation={2} sx={{ marginLeft: 10, marginRight: 10, marginTop: 2, padding: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 2 }}>
        <Tabs value={tab || 'EnTaller'} onChange={handleChange} textColor="primary" indicatorColor="primary" aria-label="secondary tabs example">
          <Tab  value="EnTaller" label="En taller" />
          <Tab value="Presupuestada" label="Presupuestadas" />
          <Tab value="Reparada" label="Reparadas" />
          <Tab value="Entregada" label="Entregadas" />
        </Tabs>
        <Button disabled = {rolUsuario=="Administrador"} onClick={handleNewRep} size="small" sx={{ p: 1, margin: 2, borderRadius: 1 }} endIcon={<AddCircleIcon />} variant="contained" color="success">
          Nueva
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table size="small" sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {/* Columna Orden */}
              <StyledTableCell  align="center">
                <TableSortLabel
                  active={orderBy === 'id'}
                  direction={orderBy === 'id' ? order : 'asc'}
                  onClick={() => handleRequestSort('id')}
                >
                  Orden
                </TableSortLabel>
              </StyledTableCell >

              {/* Columna Fecha de ingreso */}
              <StyledTableCell align="center">
                <TableSortLabel
                  active={orderBy === 'fecha'}
                  direction={orderBy === 'fecha' ? order : 'asc'}
                  onClick={() => handleRequestSort('fecha')}
                >
                  Fecha de ingreso
                </TableSortLabel>
              </StyledTableCell>

              {/* Columna Cliente */}
              <StyledTableCell align="center">
                <TableSortLabel
                  active={orderBy === 'clienteNombre'}
                  direction={orderBy === 'clienteNombre' ? order : 'asc'}
                  onClick={() => handleRequestSort('clienteNombre')}
                >
                  Cliente
                </TableSortLabel>
              </StyledTableCell>

              {/* Columnas no ordenables */}
              <StyledTableCell align="center">Aparato</StyledTableCell>
              <StyledTableCell align="center">Serie</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((r) => (
              <StyledTableRow   key={r.id}>
                <StyledTableCell align="center">{r.id}</StyledTableCell>
                <StyledTableCell align="center">{r.fecha}</StyledTableCell>
                <StyledTableCell align="center">{r.clienteNombre} {r.clienteApellido}</StyledTableCell>
                <StyledTableCell align="center">{r.producto.marca} {r.producto.modelo}</StyledTableCell>
                <StyledTableCell align="center">{r.numeroSerie}</StyledTableCell>
                <StyledTableCell align="center">
                  <Button id="basic-button" aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
                    Acciones
                  </Button>
                  <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{ 'aria-labelledby': 'basic-button' }}>
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                  </Menu>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Tooltip title="Generar Pdf">
                    <SimCardDownloadOutlinedIcon
                      sx={{ cursor: 'pointer' }}
                      onClick={() => handlePrint(r.id)}
                    />
                  </Tooltip>
                </StyledTableCell>
              </StyledTableRow >
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
    </>
  )
}
