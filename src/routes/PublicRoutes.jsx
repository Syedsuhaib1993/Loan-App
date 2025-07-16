import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Home from '../components/Home'
import AboutUs from '../components/AboutUs'
import Services from '../components/Services'
import LoanForm from '../components/LoanForm'

const PublicRoutes = () => {
    const Auth = !!localStorage.getItem('token')
    console.log(Auth);
    
  return (
    Auth? <Outlet/>:<Navigate to={'/login'}/>
  )
}

export default PublicRoutes
