import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import { Container } from '@mui/material'
import { Card } from '@mui/material'
import { CardContent } from '@mui/material'
import { Typography } from '@mui/material'
import { TextField } from '@mui/material'
import { FormControl } from '@mui/material'
import { InputLabel } from '@mui/material'
import { Select } from '@mui/material'
import { MenuItem } from '@mui/material'
import { Button } from '@mui/material'
import { addTripAPI } from '../services/allAPI'
import destinations from '../data/destinations.json'

function CreateTrip() {
    const navigate = useNavigate()
    const [destination, setDestination] = useState('')
    const [days, setDays] = useState('')
    const [budget, setBudget] = useState('')
    const [travelStyle, setTravelStyle] = useState('')
    const [interests, setInterests] = useState('')
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'))
    // Get destination names from destinations.json
    const destinationOptions = Object.keys(destinations)
    // Get activity types from destinations.json for the Interests dropdown
    const interestOptions = [
        ...new Set(
            Object.values(destinations).flat().map((activity) => activity.type))]
    const handleCreateTrip = async (e) => {
        e.preventDefault()
        if (!loggedUser) {
            alert('Please login first!')
            navigate('/login')
            return
        }
        const tripDetails = {
            destination: destination,
            days: days,
            budget: budget,
            travelStyle: travelStyle,
            userId: loggedUser.id,
            interests: interests
        }
        try {
            const response = await addTripAPI(tripDetails)
            console.log(response.data)
            navigate('/trip-preview', {
                state: response.data})
        } catch (error) {
            console.log(error)
            alert('Something went wrong!')
        }
    }
    return (
        <div style={{ minHeight: '100vh', backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.33), rgba(255, 255, 255, 0.23)), url('https://cdn.vectorstock.com/i/500p/76/93/it-is-travel-time-vector-20807693.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', paddingLeft: '5%', paddingRight: '5%' }}>
        <Container maxWidth="md" >
            <Box sx={{minHeight: '80vh',display: 'flex',alignItems: 'center',justifyContent: 'center',py: 5 }}>
                <Card elevation={4} sx={{width: '100%',maxWidth: 600,borderRadius: 3}}>
                    <CardContent sx={{ p: 4 }}>
                        <Typography variant="h4" align="center" sx={{fontFamily: '"Cormorant Garamond", serif',fontWeight: 700,color: '#172033',mb: 1}}>
                            Plan Your Trip ✈️
                        </Typography>

                        <Typography align="center" color="text.secondary" sx={{ mb: 4 }}>
                                 Tell us about your next adventure
                        </Typography>
                        <Box component="form" onSubmit={handleCreateTrip}>
                            {/* Destination Dropdown */}
                            <FormControl fullWidth required sx={{ mb: 3 }}>
                                <InputLabel>Destination</InputLabel>
                                <Select value={destination} label="Destination"
                                onChange={(e) =>setDestination(e.target.value)}>

                                    {destinationOptions.map((place) => (
                                        <MenuItem key={place} value={place}>
                                            {place}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {/* Number of Days Dropdown */}
                            <FormControl fullWidth required sx={{ mb: 3 }} >
                                <InputLabel>Number of Days</InputLabel>
                                <Select value={days} label="Number of Days" onChange={(e) =>setDays(e.target.value)}>
                                    {Array.from(
                                        { length: 10 },
                                        (_, index) => index + 1
                                    ).map((day) => (
                                        <MenuItem key={day} value={day}>
                                            {day} {day === 1 ? 'Day' : 'Days'}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {/* Budget */}
                            <TextField fullWidth type="number" label="Budget" placeholder="Eg: 50000" value={budget} onChange={(e) =>setBudget(e.target.value) }
                                inputProps={{ min: 1 }}
                                required
                                sx={{ mb: 3 }}/>
                            {/* Travel Style */}
                            <FormControl fullWidth required sx={{ mb: 3 }}>
                                <InputLabel>Travel Style</InputLabel>
                                <Select value={travelStyle} label="Travel Style" onChange={(e) =>setTravelStyle(e.target.value)}>
                                    <MenuItem value="Adventure">Adventure</MenuItem>
                                    <MenuItem value="Relaxation">Relaxation</MenuItem>
                                    <MenuItem value="Cultural"> Cultural</MenuItem>
                                    <MenuItem value="Family"> Family</MenuItem>
                                    <MenuItem value="Luxury">Luxury</MenuItem>
                                </Select>
                            </FormControl>
                            {/* Interests Dropdown */}
                            <FormControl fullWidth required sx={{ mb: 4 }}>
                                <InputLabel>Interests</InputLabel>
                                <Select value={interests} label="Interests" onChange={(e) =>setInterests(e.target.value)}>
                                    {interestOptions.map((interest) => (
                                        <MenuItem key={interest} value={interest}>
                                            {interest}
                                        </MenuItem>))}
                                </Select>
                            </FormControl>
                            {/* Create Trip Button */}
                            <Button type="submit"  variant="contained" fullWidth size="large" sx={{backgroundColor: '#172033',py: 1.3,'&:hover': {backgroundColor: '#253653'}}}>
                              Create Trip  
                            </Button> 
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Container>
        </div>
    )
}
export default CreateTrip