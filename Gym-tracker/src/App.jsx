import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RegisterPage } from './components/Register'
import { LoginPage } from './components/Login'
import { TrackerPage } from './components/Tracker'

function App() {

    return (
    <BrowserRouter>
        <Routes>
        <Route path='/Register' element={<RegisterPage />} />
        <Route path='/Login' element={<LoginPage />} />
        <Route path='/Tracker' element={<TrackerPage />} />
        </Routes>
    </BrowserRouter>
    )
}

export default App
