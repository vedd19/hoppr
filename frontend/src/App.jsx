import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { UserLogin } from './pages/UserLogin'
import { UserSignup } from './pages/UserSignup'
import { CaptainLogin } from './pages/CaptainLogin'
import { CaptainSignup } from './pages/CaptainSignup'
import { Logo } from './components/Logo'

const App = () => {
  return (
    <div>
      <Logo />
      <Outlet />
    </div>
  )
}

export default App