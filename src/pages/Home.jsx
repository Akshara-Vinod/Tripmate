import React from 'react'
import { Button } from 'react-bootstrap'
import { FaArrowRight,FaMapMarkedAlt,FaPlaneDeparture,FaWallet } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { RiAiGenerate3dLine } from "react-icons/ri";
import { GiJourney } from "react-icons/gi";
import { Box, Card, CardContent, Typography } from '@mui/material';
function Home() {
  const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('loggedUser')
        alert('Logged out successfully!')
        navigate('/login')
    }
    const goToDashboard = () => {
        navigate('/dashboard')
    }
  return (
    <div>
         {/* ================= HERO SECTION ================= */}
      <section
        className="d-flex align-items-center"
        style={{minHeight: '600px', background: 'linear-gradient(rgba(23,32,51,0.55), rgba(23,32,51,0.55)), url("https://img.freepik.com/premium-photo/planning-travel-itinerary-world-map_98908-5385.jpg?w=2000") center/cover no-repeat',color: 'white'}}>
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <p className="fw-semibold mb-3" style={{letterSpacing: '3px', fontSize: '14px'}}>
                YOUR JOURNEY STARTS HERE
              </p>
              <h1 className="display-1 fw-bold mb-4" style={{fontFamily: '"Cormorant Garamond", serif',lineHeight: '1'}}>
                Plan your trip.
              <br />
                <span style={{ color: '#7dd3fc' }}>
                  Travel smarter.
                </span>
              </h1>
              <p className="lead mb-4" style={{maxWidth: '600px',lineHeight: '1.7'}}>
                Create personalized travel plans, discover amazing destinations, and organize your entire journey in one place.
              </p>
              <Button className="btn btn-lg d-inline-flex align-items-center gap-2" onClick={goToDashboard}
                style={{backgroundColor: '#7dd3fc',color: '#172033',border: 'none',fontWeight: '600',padding: '12px 25px',borderRadius: '8px'}}>
                Start Planning
                <FaArrowRight />
              </Button>
<div className="d-flex gap-3 mt-3 flex-wrap">
    <Button className="btn btn-outline-light" onClick={goToDashboard}>Go to Dashboard</Button>
    <Button className="btn btn-danger" onClick={handleLogout}>Logout</Button>
</div>
            </div>
          </div>
        </div>
      </section>
      {/* ================= FEATURES SECTION ================= */}
      <section className="py-5">
  <div className="container py-4">
    <div className="text-center mb-5">
      <h2
        className="display-5 fw-bold"
        style={{ fontFamily: '"Playfair Display", serif', color: '#0f3484' }}
      >
        Everything you need for your journey
      </h2>

      <p
        className="mx-auto"
        style={{
          maxWidth: '650px',
          fontSize: '28px',
          lineHeight: '1.8',
          color: '#671c71',
          fontWeight: '400',
          letterSpacing: '0.3px',
          marginTop: '15px',
          marginBottom: '30px'
        }}
      >
        TripMate brings your travel planning, itinerary and budget management
        together in one simple platform.
      </p>
    </div>

    <div className="row g-4">
      {/* Plan Your Trip */}
      <div className="col-md-4">
        <Card
          sx={{
            height: '100%',
            backgroundColor: '#5e87b3',
            borderRadius: '20px',
            boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
            transition: '0.3s',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: '0 12px 28px rgba(0,0,0,0.15)'
            }
          }}
        >
          <CardContent
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              p: 3,
              '&:last-child': { pb: 3 }
            }}
          >
            <Box
              sx={{
                backgroundColor: '#D2E8FF',
                color: '#2878D0',
                minWidth: 65,
                height: 65,
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <FaMapMarkedAlt size={30} />
            </Box>

            <Box>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Plan Your Trip
              </Typography>
              <Typography color="text.secondary" variant="body2">
                Create your travel plan based on your destination, budget and
                interests.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </div>

      {/* Generate Itinerary */}
      <div className="col-md-4">
        <Card
          sx={{
            height: '100%',
            backgroundColor: '#63bd87',
            borderRadius: '20px',
            boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
            transition: '0.3s',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: '0 12px 28px rgba(0,0,0,0.15)'
            }
          }}
        >
          <CardContent
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              p: 3,
              '&:last-child': { pb: 3 }
            }}
          >
            <Box
              sx={{
                backgroundColor: '#CFF0DB',
                color: '#239653',
                minWidth: 65,
                height: 65,
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <FaPlaneDeparture size={30} />
            </Box>

            <Box>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Generate Itinerary
              </Typography>
              <Typography color="text.secondary" variant="body2">
                Get a day-wise itinerary with suggested places and activities
                for your trip.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </div>

      {/* Track Your Budget */}
      <div className="col-md-4">
        <Card
          sx={{
            height: '100%',
            backgroundColor: '#f19749',
            borderRadius: '20px',
            boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
            transition: '0.3s',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: '0 12px 28px rgba(0,0,0,0.15)'
            }
          }}
        >
          <CardContent
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              p: 3,
              '&:last-child': { pb: 3 }
            }}
          >
            <Box
              sx={{
                backgroundColor: '#FFE0C2',
                color: '#E17A24',
                minWidth: 65,
                height: 65,
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <FaWallet size={30} />
            </Box>

            <Box>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Track Your Budget
              </Typography>
              <Typography color="text.secondary" variant="body2">
                Monitor your travel expenses and keep your spending within your
                budget.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</section>
      {/* ================= HOW IT WORKS ================= */}
      <section className="py-5" style={{ minHeight: '100vh', backgroundImage: "linear-gradient(rgba(255,255,255,0.75), rgba(255,255,255,0.75)), url('https://wallpapercave.com/wp/wp4069456.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', paddingLeft: '5%', paddingRight: '5%' }}>
  <div className="container py-4">
    <div className="text-center mb-5">
      <h2 className="display-5 fw-bold" style={{ color: '#0d3488', fontFamily: '"Playfair Display", serif' }}>How TripMate Works</h2>
      <p className="text-secondary">Plan your journey in three simple steps.</p>
    </div>

    <div className="row justify-content-center g-4">
      <div className="col-md-4">
        <Card sx={{ height: '100%', backgroundColor: '#000035d7', borderRadius: '20px', textAlign: 'center', boxShadow: '0 6px 20px rgba(0,0,0,0.07)', transition: '0.3s', '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 28px rgba(0,0,0,0.13)' } }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ width: 80, height: 80, borderRadius: '50%', color: '#2878D0', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3, fontSize: '35px' }}>
              <FaMapMarkedAlt />
            </Box>
            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{color:'white'}}>Choose Your Destination</Typography>
            <Typography sx={{color:'white'}}>Enter the destination you want to explore.</Typography>
          </CardContent>
        </Card>
      </div>

      <div className="col-md-4">
        <Card sx={{ height: '100%', backgroundColor: '#000035d7', borderRadius: '20px', textAlign: 'center', boxShadow: '0 6px 20px rgba(0,0,0,0.07)', transition: '0.3s', '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 28px rgba(0,0,0,0.13)' } }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ width: 80, height: 80, borderRadius: '50%', color: '#239653', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3, fontSize: '35px' }}>
              <RiAiGenerate3dLine />
            </Box>
            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{color:'white'}}>Generate Your Trip</Typography>
            <Typography sx={{color:'white'}}>Enter the number of days and generate your personalized itinerary.</Typography>
          </CardContent>
        </Card>
      </div>

      <div className="col-md-4 ">
        <Card sx={{ height: '100%', backgroundColor: '#000035d7', borderRadius: '20px', textAlign: 'center', boxShadow: '0 6px 20px rgba(0,0,0,0.07)', transition: '0.3s', '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 28px rgba(0,0,0,0.13)' } }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ width: 80, height: 80, borderRadius: '50%', color: '#E17A24', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3, fontSize: '35px' }}>
              🌍
            </Box>
            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{color:'white'}}>Enjoy Your Journey</Typography>
            <Typography sx={{color:'white'}} >Follow your itinerary, manage your budget and enjoy your trip.</Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</section>
      {/* ================= CALL TO ACTION ================= */}
      <section className="py-5 text-center" style={{backgroundColor: '#172033',color: 'white'}}>
        <div className="container py-4">
          <h2 style={{fontSize: '45px'}}>Ready to plan your next adventure?</h2>
   <p className="text-light mb-4"> Let TripMate turn your travel idea into a complete plan.</p>
          <Button className="btn btn-lg" onClick={goToDashboard} style={{backgroundColor: '#7dd3fc',color: '#172033',fontWeight: '600',padding: '12px 28px'}}>
            Start Planning <GiJourney />
          </Button>     
        </div>
            <hr />
      </section>
      {/* ================= TRAVEL GALLERY ================= */}
<section className="py-5" style={{ minHeight: '100vh', backgroundImage: "linear-gradient(rgba(255,255,255,0.75), rgba(255,255,255,0.75)), url('https://wallpapercave.com/wp/wp2004054.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', paddingLeft: '5%', paddingRight: '5%' }}>
  <div className="container py-4">
    <div className="text-center mb-5">
      <h2 className="display-5 fw-bold" style={{ color: '#09328b' }}>Explore the World</h2>
      <p className="text-secondary mx-auto" style={{ maxWidth: '650px', fontSize: '28px', lineHeight: '1.8', color: '#671c71', fontWeight: '400', letterSpacing: '0.3px', marginTop: '15px', marginBottom: '30px', fontFamily:'cursive'}}>Get inspired for your next adventure.</p>
    </div>

    <div className="row g-3">
      {/* Image 1 */}
      <div className="col-md-6">
        <div style={{ height: '420px', overflow: 'hidden', borderRadius: '15px' }}>
          <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e" alt="Tropical beach" className="w-100 h-100" style={{ objectFit: 'cover' }} />
        </div>
      </div>

      {/* Right side */}
      <div className="col-md-6">
        <div className="row g-3">
          {/* Image 2 */}
          <div className="col-6">
            <div style={{ height: '200px', overflow: 'hidden', borderRadius: '15px' }}>
              <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b" alt="Mountain landscape" className="w-100 h-100" style={{ objectFit: 'cover' }} />
            </div>
          </div>

          {/* Image 3 */}
          <div className="col-6">
            <div style={{ height: '200px', overflow: 'hidden', borderRadius: '15px' }}>
              <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1" alt="Travel destination" className="w-100 h-100" style={{ objectFit: 'cover' }} />
            </div>
          </div>

          {/* Image 4 */}
          <div className="col-12">
            <div style={{ height: '200px', overflow: 'hidden', borderRadius: '15px' }}>
              <img src="https://images.unsplash.com/photo-1500534623283-312aade485b7" alt="Beautiful travel destination" className="w-100 h-100" style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    </div>
  )
}

export default Home
