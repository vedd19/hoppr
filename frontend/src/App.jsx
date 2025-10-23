import React, { useContext } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'

import { Logo } from './components/Logo'
import { UserDataContext } from './context/userContext'



const App = () => {
  const { isLogo } = useContext(UserDataContext);
  return (
    <div>
      {isLogo && <Logo />}
      <Outlet />
    </div>
  )
}

export default App