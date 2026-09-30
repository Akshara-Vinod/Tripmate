import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { deleteTripAPI, getUserTripsAPI } from '../services/allAPI'
import { Button } from 'react-bootstrap'
import { Card, CardContent, Typography, Box } from '@mui/material'
import { FaMapMarkedAlt, FaPlaneDeparture, FaWallet, FaTrashAlt, FaArrowRight } from 'react-icons/fa'
import { FaCarSide } from "react-icons/fa";

function Dashboard() {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [trips, setTrips] = useState([])

    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem('loggedUser'))
        if (loggedUser) {
            setUser(loggedUser)
            getUserTrips(loggedUser.id)
        }
    }, [])

    const getUserTrips = async (userId) => {
        try {
            const response = await getUserTripsAPI(userId)
            setTrips(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    const handleDeleteTrip = async (tripId) => {
        if (confirm('Are you sure you want to delete this trip?')) {
            try {
                await deleteTripAPI(tripId)
                setTrips(trips.filter((trip) => trip.id !== tripId))
                alert('Trip deleted successfully!')
            } catch (error) {
                console.log(error)
                alert('Failed to delete trip!')
            }
        }
    }
    const handleLogout = () => {
        localStorage.removeItem('loggedUser')
        navigate('/login')
    }
    if (!localStorage.getItem('loggedUser')) {
        return <Navigate to="/login" replace />
    }
    const cardStyle = {height: '100%',border: 'none',borderRadius: '20px',boxShadow: '0 6px 20px rgba(0,0,0,0.07)',transition: '0.3s', '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 12px 28px rgba(0,0,0,0.13)' }}
    return (
        <div  className="container-fluid py-5" style={{ minHeight: '100vh', backgroundImage: "linear-gradient(rgba(255,255,255,0.75), rgba(255,255,255,0.75)), url('https://wallpaperaccess.com/full/185289.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', paddingLeft: '5%', paddingRight: '5%' }}>
            <div className="d-flex justify-content-between align-items-center mb-5">
                <Button variant="outline-primary" onClick={() => navigate('/home')}>← Back to Home</Button>
                <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
            </div>
            {user && (
                <>
                    <div className="mb-5">
                        <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: '700', color: '#172033' }}>
                            Welcome, {user.name}! <FaCarSide />
                        </h1>
                        <p className="text-secondary" style={{ fontFamily: '"cursive", serif', fontWeight: '700', color: '#172033', fontSize:'20'}}>Plan your next adventure with TripMate.</p>
                    </div>
                    <div className="row g-4 mb-5">
  {/* Create a Trip */}
  <div className="col-md-4">
    <Box onClick={() => navigate('/create-trip')} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, borderBottom: '2px solid #DBEAFE', cursor: 'pointer', transition: '0.3s', '&:hover': { backgroundColor: '#EFF6FF' } }}>
      <Box sx={{ width: 55, height: 55, minWidth: 55, borderRadius: '14px', backgroundColor: '#DBEAFE', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <FaMapMarkedAlt size={25} />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography fontWeight="bold">Create a Trip</Typography>
        <Typography variant="body2" color="text.secondary">Start planning your next adventure.</Typography>
      </Box>
      <FaArrowRight color="#2563EB" />
    </Box>
  </div>

  {/* Expenses */}
  <div className="col-md-4">
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, borderBottom: '2px solid #FFEDD5', transition: '0.3s', '&:hover': { backgroundColor: '#FFF7ED' } }}>
      <Box sx={{ width: 55, height: 55, minWidth: 55, borderRadius: '14px', backgroundColor: '#FFEDD5', color: '#EA580C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <FaWallet size={25} />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography fontWeight="bold">Expenses</Typography>
        <Typography variant="body2" color="text.secondary">Keep track of your travel spending.</Typography>
      </Box>
      <Typography variant="body2" fontWeight="medium" color="#EA580C">Manage budget</Typography>
    </Box>
  </div>

  {/* My Trips */}
  <div className="col-md-4">
    <Box onClick={() => document.getElementById('my-trips')?.scrollIntoView({ behavior: 'smooth' })} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, borderBottom: '2px solid #D1FAE5', cursor: 'pointer', transition: '0.3s', '&:hover': { backgroundColor: '#ECFDF5' } }}>
      <Box sx={{ width: 55, height: 55, minWidth: 55, borderRadius: '14px', backgroundColor: '#D1FAE5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <FaPlaneDeparture size={25} />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography fontWeight="bold">My Trips</Typography>
        <Typography variant="body2" color="text.secondary">You have {trips.length} trip(s) planned.</Typography>
      </Box>
      <FaArrowRight color="#059669" />
    </Box>
  </div>
</div>
                    <h2 id="my-trips" className="mb-4" style={{ fontFamily: '"Poppins", sans-serif', fontWeight: '700', color: '#1050d9', textAlign: 'center' }}>My Trips</h2>
                    {trips.length === 0 ? (
                        <div className="text-center py-5">
                            <FaPlaneDeparture size={45} color="#94a3b8" className="mb-3" />
                            <h5>No trips yet</h5>
                            <p className="text-secondary">Create your first trip and start planning!</p>
                            <Button style={{ backgroundColor: '#172033', border: 'none' }} onClick={() => navigate('/create-trip')}>Create Your First Trip</Button>
                        </div>
                    ) : (
                        <div className="row g-4">
  {trips.map((trip) => (
    <div className="col-12" key={trip.id}>
      <Card sx={{ border: '1px solid #75aee7', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', transition: '0.3s', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' } }}>
        <Box sx={{ backgroundColor: '#041465', p: 2.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography sx={{ color: 'white', fontSize: '12px', fontWeight: 'bold', letterSpacing: 1, mb: 1 }}>PLANNED TRIP</Typography>
            <Typography variant="h5" fontWeight="bold" sx={{ color: 'white' }}>{trip.destination}</Typography>
          </Box>
          <Box sx={{ width: 48, height: 48, borderRadius: '14px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FaPlaneDeparture size={23} />
          </Box>
        </Box>

        <CardContent sx={{ p: 3 }}>
          <div className="row g-3 mb-4">
            <div className="col-4">
              <Typography color="text.secondary" fontSize="13px">Duration</Typography>
              <Typography fontWeight="bold">{trip.days} days</Typography>
            </div>
            <div className="col-4">
              <Typography color="text.secondary" fontSize="13px">Budget</Typography>
              <Typography fontWeight="bold">₹{trip.budget}</Typography>
            </div>
            <div className="col-4">
              <Typography color="text.secondary" fontSize="13px">Travel Style</Typography>
              <Typography fontWeight="bold">{trip.travelStyle}</Typography>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <Typography color="text.secondary" fontSize="13px">Ready to explore?</Typography>
            <div className="d-flex gap-2">
              <Button variant="outlined" color="error" onClick={() => handleDeleteTrip(trip.id)} sx={{ textTransform: 'none', borderRadius: '10px' }}>
                <FaTrashAlt className="me-2" /> Delete
              </Button>
              <Button variant="contained" onClick={() => navigate(`/trip/${trip.id}`)} sx={{ backgroundColor: '#059669', '&:hover': { backgroundColor: '#047857' }, textTransform: 'none', borderRadius: '10px', boxShadow: 'none' }}>
                View Trip <FaArrowRight className="ms-2" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  ))}
</div>
                    )}
                </>
            )}
        </div>
    )
}

export default Dashboard