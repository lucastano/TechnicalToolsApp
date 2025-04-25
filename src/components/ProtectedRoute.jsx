import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = () => {
    const token = localStorage.getItem("Token")
    const { isAuthenticated } = useAuth();
    console.log('isAuthenticated', isAuthenticated)
  return (
    <>
    {/* {token ? <Outlet/> : <Navigate to="/Login" replace/>} */}
    {isAuthenticated ? <Outlet /> : <Navigate to="/Login" replace />}
    </>
  )
}
