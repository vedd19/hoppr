import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Start } from './pages/Start.jsx'
import { UserLogin } from './pages/UserLogin.jsx'
import { UserSignup } from './pages/UserSignup.jsx'
import { CaptainLogin } from './pages/CaptainLogin.jsx'
import { CaptainSignup } from './pages/CaptainSignup.jsx'
import { UserContext } from './context/userContext.jsx'
import { Home } from './pages/Home.jsx'
import UserProtectedWrapper from './pages/UserProtectedWrapper.jsx'
import { CaptainContext } from './context/CaptainContext.jsx'
import { SnackbarProvider } from 'notistack';
import { CaptainHome } from './pages/CaptainHome.jsx'
import { CaptainProtectedWrapper } from './pages/CaptainProtectedWrapper.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Start />
      },
      {
        path: '/home',
        element: <UserProtectedWrapper><Home /></UserProtectedWrapper>
      },
      {
        path: '/captain-home',
        element: <CaptainProtectedWrapper><CaptainHome /></CaptainProtectedWrapper>
      },
      {
        path: '/login',
        element: <UserLogin />
      },
      {
        path: '/signup',
        element: <UserSignup />
      },
      {
        path: '/captain-login',
        element: <CaptainLogin />
      },
      {
        path: '/captain-signup',
        element: <CaptainSignup />
      },
    ],
  }
])

const root = createRoot(document.getElementById('root'))

root.render(

  <StrictMode>
    <SnackbarProvider>
      <CaptainContext>
        <UserContext>
          <RouterProvider router={router} />
        </UserContext>
      </CaptainContext>
    </SnackbarProvider>
  </StrictMode>,
)

