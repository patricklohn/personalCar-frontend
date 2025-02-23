import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

//pages
import CreateCar from './routes/CreateCar.jsx'
import ErrorPage from './routes/ErrorPage.jsx'
import Home from './routes/Home.jsx'
import Cars from './routes/Cars.jsx'
import EditCar from './routes/EditCar.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage/>,
    children:[
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/car/new",
        element: <CreateCar/>
      },
      {
        path: "/cars/:id",
        element: <Cars/>
      },
      {
        path: "/car/edit/:id",
        element: <EditCar/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)

