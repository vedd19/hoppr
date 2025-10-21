import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'

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