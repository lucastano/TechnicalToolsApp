
import { Route, Routes } from 'react-router-dom';
import './App.css'
import { LoginPrueba } from './components/LoginPrueba';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';
import { ListadoReparaciones } from './components/ListadoReparaciones';
import { UserProfile } from './components/UserProfile';
import { Empresa } from './components/Empresa';
import { NuevaReparacion } from './components/NuevaReparacion';
function App() {
  return (
    <>
      <Routes>
        {/* ruta publica */}
        <Route path='/Login' element={<LoginPrueba/>}/>
        {/* rutas protegidas  */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path='/Reparaciones' element={<ListadoReparaciones />} />
            <Route path='/PerfilUsuario' element={<UserProfile />} />
            <Route path='/Empresa' element={<Empresa />} />
            <Route path='/NuevaReparacion' element={<NuevaReparacion />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
