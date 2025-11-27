import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css'
import Login from './pages/login.jsx'
import Register from './pages/register.jsx';

function AppRouter() {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path="/login.jsx" element={<Login />} />
        <Route path="/register.jsx" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
