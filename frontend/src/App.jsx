import React from 'react'
import Layout from "./components/Layout"
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const App = () => { 
  return (
    <>
      <Layout>
        <Outlet />
      </Layout>
      <ToastContainer autoClose={700} hideProgressBar={true} />
    </>
  )
}

export default App;