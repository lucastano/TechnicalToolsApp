
import { Route, Routes,Navigate } from 'react-router-dom';
import './App.css'
import { LoginPrueba } from './components/LoginPrueba';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';
import { ListadoReparaciones } from './components/ListadoReparaciones';
import { UserProfile } from './components/UserProfile';
import { Empresa } from './components/Empresa';
import { NuevaReparacion } from './components/NuevaReparacion';
import {DashBoardGrid} from './components/DashBoardGrid';
import { Presupuestar } from './components/Presupuestar';
import { ListadoClientes } from './components/ListadoClientes';
function App() {
  return (
    <>
      <Routes>
        {/* ruta publica */}
        <Route path='/' element={<Navigate to="/Login" replace />} />
        <Route path='/Login' element={<LoginPrueba/>}/>
        {/* rutas protegidas  */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path='/Reparaciones' element={<ListadoReparaciones />} />
            <Route path='/PerfilUsuario' element={<UserProfile />} />
            <Route path='/Empresa' element={<Empresa />} />
            <Route path='/NuevaReparacion' element={<NuevaReparacion />} />
            <Route path='/DashBoard' element = {<DashBoardGrid/>}/>
            <Route path='/Presupuestar/:id' element={<Presupuestar/>} />
            <Route path='/Clientes' element={<ListadoClientes/>}/>
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
