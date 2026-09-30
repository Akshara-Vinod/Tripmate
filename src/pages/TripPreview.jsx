import React, { useState } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'
import destinations from '../data/destinations.json'
import { saveItineraryAPI } from '../services/allAPI'


function TripPreview() {
    const navigate = useNavigate()
    const [totalCost, setTotalCost] = useState(0)
    const[itinerary, setItinerary]=useState([])
    const location = useLocation()
    const tripDetails = location.state
    const handleGenerateItinerary = async() => {
    const destinationKey = Object.keys(destinations).find(
        key => key.toLowerCase() === tripDetails.destination.trim().toLowerCase()
    )
    const destinationData = destinations[destinationKey]
    const userInterests = tripDetails.interests.toLowerCase()
const userTravelStyle = tripDetails.travelStyle.toLowerCase()
     const matchingActivities = destinationData.filter((activity) => {
        const activityType = activity.type.toLowerCase()
        return (
            userInterests.includes(activityType) ||
            userTravelStyle === activityType
        )

    })
    // console.log(destinationData)

    const otherActivities = destinationData.filter((activity) => {
    return !matchingActivities.includes(activity)
})
const activities = [
    ...matchingActivities,
    ...otherActivities
]
  
    // console.log("Matching Activities:")
    // console.log(activities)
    const userBudget = Number(tripDetails.budget)  
    const budgetActivities = []
let calculatedCost = 0
for (let i = 0; i < activities.length; i++) {
    const activityCost = activities[i].cost
    if (calculatedCost + activityCost <= userBudget) {
        budgetActivities.push(activities[i])
        calculatedCost = calculatedCost + activityCost
    }
}
setTotalCost(calculatedCost)
    const itinerary = []
for (let i = 0; i < tripDetails.days; i++) {
    const day = {
        day: i + 1,
        activities: []
    }
    itinerary.push(day)
}

for (let i = 0; i < budgetActivities.length; i++) {

    const dayIndex = i % tripDetails.days

    itinerary[dayIndex].activities.push(
        budgetActivities[i]
    )
}

const itineraryDetails = {
    tripId: tripDetails.id,
    destination: tripDetails.destination,
    days: itinerary,
    totalCost: calculatedCost
}
try {
    const response = await saveItineraryAPI(itineraryDetails)
    console.log(response.data)
    setItinerary(itinerary)
} catch (error) {
    console.log(error)
    alert('Failed to save itinerary!')
}
setItinerary(itinerary)
}
return (
    <div className="container-fluid py-5" style={{ minHeight: '100vh', backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.36), rgba(255, 255, 255, 0.43)), url('https://png.pngtree.com/png-vector/20220519/ourmid/pngtree-illustration-of-popular-world-landmarks-for-global-travel-banner-world-heritagefamous-buildings-vector-png-image_36449152.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', paddingLeft: '5%', paddingRight: '5%' }}>
        <div className="container">

            {/* Trip Header */}
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
                <div>
                    <p className="text-uppercase fw-bold mb-2" style={{ color: '#059669', letterSpacing: '2px', fontSize: '13px' }}>YOUR NEXT ADVENTURE</p>
                    <h1 className="fw-bold mb-2" style={{ fontFamily: '"Cormorant Garamond", serif', color: '#172033', fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
                        {tripDetails.destination} Trip 
                    </h1>
                    <p className="text-secondary mb-0">Your personalized travel itinerary</p>
                </div>
                <button className="btn btn-outline-dark rounded-pill px-4 py-2" onClick={() => navigate('/dashboard')}>
                     Back to Dashboard
                </button>
            </div>

            {/* Trip Information */}
            <div className="row g-3 mb-4">
                <div className="col-6 col-lg-3">
                    <div className="p-3 p-md-4 rounded-4 h-100" style={{ backgroundColor: '#FFFFFF', borderLeft: '4px solid #2563EB', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
                        <div className="mb-2" style={{ color: '#2563EB', fontSize: '22px' }}></div>
                        <p className="text-secondary mb-1">Duration</p>
                        <h4 className="fw-bold mb-0" style={{ color: '#172033' }}>{tripDetails.days} Days</h4>
                    </div>
                </div>
                <div className="col-6 col-lg-3">
                    <div className="p-3 p-md-4 rounded-4 h-100" style={{ backgroundColor: '#FFFFFF', borderLeft: '4px solid #059669', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
                        <div className="mb-2" style={{ color: '#059669', fontSize: '22px' }}></div>
                        <p className="text-secondary mb-1">Total Budget</p>
                        <h4 className="fw-bold mb-0" style={{ color: '#172033' }}>₹{tripDetails.budget}</h4>
                    </div>
                </div>
                <div className="col-6 col-lg-3">
                    <div className="p-3 p-md-4 rounded-4 h-100" style={{ backgroundColor: '#FFFFFF', borderLeft: '4px solid #EA580C', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
                        <div className="mb-2" style={{ color: '#EA580C', fontSize: '22px' }}></div>
                        <p className="text-secondary mb-1">Travel Style</p>
                        <h4 className="fw-bold mb-0 text-capitalize" style={{ color: '#172033' }}>{tripDetails.travelStyle}</h4>
                    </div>
                </div>
                <div className="col-6 col-lg-3">
                    <div className="p-3 p-md-4 rounded-4 h-100" style={{ backgroundColor: '#FFFFFF', borderLeft: '4px solid #8B5CF6', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
                        <div className="mb-2" style={{ color: '#8B5CF6', fontSize: '22px' }}></div>
                        <p className="text-secondary mb-1">Interests</p>
                        <h5 className="fw-bold mb-0 text-capitalize" style={{ color: '#172033' }}>{tripDetails.interests}</h5>
                    </div>
                </div>
            </div>

            {/* Generate Itinerary */}
            <div className="text-center p-4 p-md-5 rounded-4 mb-5" style={{ background: 'linear-gradient(120deg, #2c5f8e, #047857)', color: 'white', boxShadow: '0 10px 30px rgba(4,120,87,0.15)' }}>
                <div style={{ fontSize: '35px' }}>🗺️</div>
                <h3 className="fw-bold mt-2">Ready to explore {tripDetails.destination}?</h3>
                <p className="mb-4" style={{ color: '#D1FAE5' }}>Generate a personalized itinerary based on your interests and budget.</p>
                <button className="btn btn-light rounded-pill px-4 py-3 fw-bold" style={{ color: '#047857' }} onClick={handleGenerateItinerary}>
                    ✨ Generate Itinerary
                </button>
            </div>

            {/* Budget Summary */}
            {itinerary.length > 0 && (
                <div className="rounded-4 p-4 mb-5" style={{ backgroundColor: '#FFFFFF', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
                    <h4 className="fw-bold mb-4" style={{ color: '#123B32' }}>Budget Summary</h4>
                    <div className="row g-3">
                        <div className="col-md-4">
                            <p className="text-secondary mb-1">Total Budget</p>
                            <h4 className="fw-bold" style={{ color: '#172033' }}>₹{tripDetails.budget}</h4>
                        </div>
                        <div className="col-md-4">
                            <p className="text-secondary mb-1">Estimated Activity Cost</p>
                            <h4 className="fw-bold" style={{ color: '#EA580C' }}>₹{totalCost}</h4>
                        </div>
                        <div className="col-md-4">
                            <p className="text-secondary mb-1">Remaining Budget</p>
                            <h4 className="fw-bold" style={{ color: '#059669' }}>₹{Number(tripDetails.budget) - totalCost}</h4>
                        </div>
                    </div>
                    <div className="progress mt-3" style={{ height: '9px', borderRadius: '10px', backgroundColor: '#E2E8F0' }}>
                        <div className="progress-bar" role="progressbar" style={{ width: `${tripDetails.budget > 0 ? Math.min((totalCost / Number(tripDetails.budget)) * 100, 100) : 0}%`, backgroundColor: '#059669' }}></div>
                    </div>
                </div>
            )}

            {/* Itinerary */}
            {itinerary.length > 0 && (
                <div className="mt-5">
                    <div className="text-center mb-5">
                        <p className="text-uppercase fw-bold mb-2" style={{ color: '#059669', letterSpacing: '2px', fontSize: '13px' }}>YOUR TRAVEL PLAN</p>
                        <h2 className="fw-bold" style={{ fontFamily: '"Cormorant Garamond", serif', color: '#172033', fontSize: '2.5rem' }}>Your Itinerary</h2>
                        <p className="text-secondary">Explore your day-by-day travel schedule</p>
                    </div>

                    {itinerary.map((day) => (
                        <div key={day.day} className="mb-4">
                            <div className="d-flex align-items-center gap-3 mb-3">
                                <div className="d-flex align-items-center justify-content-center rounded-circle" style={{ width: '48px', height: '48px', minWidth: '48px', backgroundColor: '#059669', color: 'white', fontWeight: 'bold', fontSize: '18px' }}>
                                    {day.day}
                                </div>
                                <div>
                                    <h4 className="fw-bold mb-0" style={{ color: '#123B32' }}>Day {day.day}</h4>
                                    <small className="text-secondary">{day.activities.length} activities planned</small>
                                </div>
                            </div>

                            <div className="ms-md-4 ps-md-4" style={{ borderLeft: '2px solid #A7F3D0' }}>
                                {day.activities.map((activity, index) => (
                                    <div key={index} className="bg-white rounded-4 p-3 p-md-4 mb-3" style={{ border: '1px solid #D1FAE5', boxShadow: '0 4px 15px rgba(0,0,0,0.04)' }}>
                                        <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-2">
                                            <h5 className="fw-bold mb-0" style={{ color: '#123B32' }}>📍 {activity.name}</h5>
                                            <span className="badge rounded-pill px-3 py-2" style={{ backgroundColor: '#D1FAE5', color: '#047857' }}>{activity.time}</span>
                                        </div>
                                        <p className="text-secondary mb-2">📌 {activity.location}</p>
                                        <p className="mb-3">{activity.activity}</p>
                                        <div className="d-flex align-items-center gap-2 pt-2" style={{ borderTop: '1px solid #E2E8F0' }}>
                                            <span style={{ color: '#059669' }}>💰</span>
                                            <span className="fw-bold" style={{ color: '#123B32' }}>Estimated Cost: ₹{activity.cost}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
)
}

export default TripPreview
