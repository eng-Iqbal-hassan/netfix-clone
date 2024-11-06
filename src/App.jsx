import React from 'react'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      
    </div>
  )
}

export default App
