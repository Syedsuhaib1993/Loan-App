import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const Authroutes = () => {
    const Auth = !!localStorage.getItem('token')
    
  return (
    Auth? <Navigate to={'/'}/>:<Outlet/>
  )
}

export default Authroutes
