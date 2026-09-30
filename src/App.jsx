
import {Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import CreateTrip from './pages/CreateTrip'
import TripDetails from './pages/TripDetails'
import Header from './components/Header'
import Footer from './components/Footer'
import Pnf from './pages/Pnf'
import TripPreview from './pages/TripPreview'
import Expenses from './pages/Expenses'


function App() {
 

  return (
    <>
    <Header/>
      <Routes>
         <Route path='/' element={<Login />} />
        <Route path='login' element={<Login/>}/>
        <Route path='home' element={<Home/>}/>
        
        <Route path='register' element={<Register/>}/>
        <Route path='dashboard' element={<Dashboard/>}/>
        <Route path='create-trip' element={<CreateTrip/>}/>
        <Route path="trip-preview" element={<TripPreview />} />
        <Route path='trip/:id' element={<TripDetails/>}/>
        <Route path='/trip/:id/expenses' element={<Expenses/>}/>
         {/* {redirect to pnf} */}
        <Route path='/*' element={<Pnf/>}/>
      </Routes>
    <Footer/>
    </>
  )
}

export default App
