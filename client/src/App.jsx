import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Apllication from './pages/Apllication'
import ApplyJob from './pages/ApplyJob'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Application' element={<Apllication/>}/>
        <Route path='/Apply-Job:id' element={<ApplyJob/>}/>


      </Routes>
    </div>
  )
}

export default App
