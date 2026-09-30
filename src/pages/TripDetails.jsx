
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getItineraryAPI, getTripAPI, getTripExpensesAPI, updateItineraryAPI } from '../services/allAPI'
import { FaMoneyCheckAlt } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import { IoPeople } from "react-icons/io5";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaRegEdit } from "react-icons/fa";
import { FaMapPin } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import { MdOutlineTravelExplore } from "react-icons/md";
function TripDetails() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [trip, setTrip] = useState(null)
    const [itinerary, setItinerary] = useState(null)
    const [expenses, setExpenses] = useState([])
    const [editActivity, setEditActivity] = useState(null)
    const [activityName, setActivityName] = useState('')
    const [activityTime, setActivityTime] = useState('')
    const [activityLocation, setActivityLocation] = useState('')
    const [activityDescription, setActivityDescription] = useState('')
    const [activityCost, setActivityCost] = useState('')

    const getTripDetails = async () => {
        try {
            const tripResponse = await getTripAPI(id)
            setTrip(tripResponse.data)

            const expensesResponse = await getTripExpensesAPI(id)
            setExpenses(expensesResponse.data)

            const itineraryResponse = await getItineraryAPI(id)
            if (itineraryResponse.data.length > 0) {
                setItinerary(itineraryResponse.data[0])
            } else {
                setItinerary(null)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTripDetails()
    }, [id])

    const calculateTotalCost = (days) => {
        let totalCost = 0
        for (let i = 0; i < days.length; i++) {
            for (let j = 0; j < days[i].activities.length; j++) {
                totalCost = totalCost + Number(days[i].activities[j].cost)
            }
        }
        return totalCost
    }

    const handleEditActivity = (activity, dayIndex, activityIndex) => {
        setEditActivity({ activity: activity, dayIndex: dayIndex, activityIndex: activityIndex })
        setActivityName(activity.name)
        setActivityTime(activity.time)
        setActivityLocation(activity.location)
        setActivityDescription(activity.activity)
        setActivityCost(activity.cost)
    }

    const handleUpdateActivity = async (e) => {
        e.preventDefault()

        const updatedActivity = {
            name: activityName,
            time: activityTime,
            location: activityLocation,
            activity: activityDescription,
            cost: Number(activityCost),
            type: editActivity.activity.type
        }

        const updatedDays = [...itinerary.days]
        updatedDays[editActivity.dayIndex].activities[editActivity.activityIndex] = updatedActivity
        const updatedTotalCost = calculateTotalCost(updatedDays)

        const updatedItinerary = { ...itinerary, days: updatedDays, totalCost: updatedTotalCost }

        try {
            const response = await updateItineraryAPI(itinerary.id, updatedItinerary)
            setItinerary(response.data)
            setEditActivity(null)
            alert('Activity updated successfully!')
        } catch (error) {
            console.log(error)
            alert('Failed to update activity!')
        }
    }

    const handleDeleteDay = async (dayNumber) => {
        const confirmDelete = confirm('Are you sure you want to delete this day?')

        if (confirmDelete) {
            const filteredDays = itinerary.days.filter((day) => day.day !== dayNumber)
            const updatedDays = []

            for (let i = 0; i < filteredDays.length; i++) {
                const updatedDay = { ...filteredDays[i], day: i + 1 }
                updatedDays.push(updatedDay)
            }

            const updatedTotalCost = calculateTotalCost(updatedDays)
            const updatedItinerary = { ...itinerary, days: updatedDays, totalCost: updatedTotalCost }

            try {
                const response = await updateItineraryAPI(itinerary.id, updatedItinerary)
                setItinerary(response.data)
                setEditActivity(null)
                alert('Day deleted successfully!')
            } catch (error) {
                console.log(error)
                alert('Failed to delete day!')
            }
        }
    }

    let totalActualExpenses = 0
    for (let i = 0; i < expenses.length; i++) {
        totalActualExpenses = totalActualExpenses + Number(expenses[i].amount)
    }

    let totalSpent = 0
let remainingBudget = 0

if (trip && itinerary) {
    totalSpent = Number(itinerary.totalCost) + totalActualExpenses
    remainingBudget = Number(trip.budget) - totalSpent
}

    return (
        <div style={{ minHeight: '100vh', backgroundImage: "linear-gradient(rgba(255,255,255,0.75), rgba(255,255,255,0.75)), url('https://happay.com/blog/wp-content/uploads/sites/12/2022/09/Business-Travel-Management-_1_-scaled-1.webp')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', paddingLeft: '5%', paddingRight: '5%' }}>
            <div className="container py-5">
                {trip && (
                    <>
                        <div className="mb-4">
                            <button className="btn btn-outline-success mb-4" onClick={() => navigate('/dashboard')} style={{ borderRadius: '10px' }}>
                                 Back to Dashboard
                            </button>
                            <h1 style={{ fontFamily: '"Poppins", sans-serif', fontWeight: '700', color: '#123B32', textAlign: 'center', fontSize: 'clamp(2rem, 5vw, 3rem)' }}>{trip.destination}</h1>
                            <p className="text-muted text-center mb-4">Your Trip Details</p>
                        </div>

                        <div className="d-flex justify-content-around align-items-center flex-wrap gap-3 py-4 my-4" style={{ borderTop: '1px solid #D1D5DB', borderBottom: '1px solid #D1D5DB' }}>
  <div className="text-center flex-fill">
    <FaCalendarAlt size={24}  className="mb-2" />
    <p className="text-muted mb-1">Duration</p>
    <h4 className="fw-bold mb-0" style={{ color: '#123B32' }}>{trip.days} Days</h4>
  </div>
  <div style={{ width: '1px', height: '65px', backgroundColor: '#D1D5DB' }}></div>
  <div className="text-center flex-fill">
    <FaMoneyCheckAlt size={24}  className="mb-2" />
    <p className="text-muted mb-1">Budget</p>
    <h4 className="fw-bold mb-0" style={{ color: '#123B32' }}>₹{trip.budget}</h4>
  </div>
  <div style={{ width: '1px', height: '65px', backgroundColor: '#D1D5DB' }}></div>
  <div className="text-center flex-fill">
    <FaClock size={24}  className="mb-2" />
    <p className="text-muted mb-1">Travel Style</p>
    <h4 className="fw-bold mb-0" style={{ color: '#123B32' }}>{trip.travelStyle}</h4>
  </div>
</div>

                        <div className="card border-0 shadow-sm mt-4 p-4" style={{ borderRadius: '16px' }}>
                            <h5 className="fw-bold mb-2" style={{ color: '#047857' }}><IoPeople /> Interests</h5>
                            <p className="mb-0 text-secondary">{trip.interests}</p>
                        </div>

                        {itinerary && (
                            <>
                                <div className="card border-0 shadow-sm mt-4 p-4" style={{ borderRadius: '16px', backgroundColor: '#ECFDF5' }}>
                                    <h5 className="fw-bold mb-3" style={{ color: '#047857' }}><GiTakeMyMoney /> Budget Summary</h5>
                                    <div className="row g-3">
                                        <div className="col-sm-6">
                                            <p className="text-secondary mb-1">Total Budget</p>
                                            <h5 className="fw-bold">₹{trip.budget}</h5>
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="text-secondary mb-1">Estimated Activity Cost</p>
                                            <h5 className="fw-bold">₹{itinerary.totalCost}</h5>
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="text-secondary mb-1">Extra Expenses</p>
                                            <h5 className="fw-bold">₹{totalActualExpenses}</h5>
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="text-secondary mb-1">{remainingBudget >= 0 ? 'Remaining Budget' : 'Budget Exceeded'}</p>
                                            <h5 className={`fw-bold ${remainingBudget >= 0 ? 'text-success' : 'text-danger'}`}>₹{Math.abs(remainingBudget)}</h5>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center mt-4">
                                    <button className="btn btn-success px-4 py-2" onClick={() => navigate(`/trip/${id}/expenses`)} style={{ borderRadius: '10px' }}>
                                        <GiTakeMyMoney /> Manage Expenses
                                    </button>
                                </div>
                            </>
                        )}

                        {editActivity !== null && (
                            <div className="card shadow-sm border-0 p-4 mt-4" style={{ borderRadius: '16px' }}>
                                <h4 className="fw-bold mb-3" style={{ color: '#047857' }}><FaRegEdit /> Edit Activity</h4>
                                <form onSubmit={handleUpdateActivity}>
                                    <div className="mb-3">
                                        <label className="form-label">Activity Name</label>
                                        <input type="text" className="form-control" value={activityName} onChange={(e) => setActivityName(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Time</label>
                                        <input type="text" className="form-control" value={activityTime} onChange={(e) => setActivityTime(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Location</label>
                                        <input type="text" className="form-control" value={activityLocation} onChange={(e) => setActivityLocation(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Description</label>
                                        <textarea className="form-control" value={activityDescription} onChange={(e) => setActivityDescription(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Estimated Cost (₹)</label>
                                        <input type="number" className="form-control" value={activityCost} onChange={(e) => setActivityCost(e.target.value)} />
                                    </div>
                                    <button type="submit" className="btn btn-success me-2">Save Changes</button>
                                    <button type="button" className="btn btn-outline-secondary" onClick={() => setEditActivity(null)}>Cancel</button>
                                </form>
                            </div>
                        )}

                        <div className="mt-5">
                            <h2 className="fw-bold text-center mb-4" style={{ fontFamily: '"Poppins", sans-serif', color: '#047857' }}><MdOutlineTravelExplore /> Your Itinerary</h2>

                            {itinerary ? (
                                <>
                                    {itinerary.days.map((day, dayIndex) => (
                                        <div key={day.day} className="card border-0 shadow-sm mb-4 p-4" style={{ borderRadius: '16px' }}>
                                            <h3 className="fw-bold mb-4" style={{ color: '#123B32' }}>Day {day.day}</h3>

                                            {day.activities.length > 0 ? (
                                                day.activities.map((activity, index) => (
                                                    <div key={index} className="border rounded-3 p-3 mb-3" style={{ backgroundColor: '#F8FAFC', borderColor: '#DCE7F2' }}>
                                                        <p className="text-muted mb-2"><FaClock /> {activity.time}</p>
                                                        <h5 className="fw-bold" style={{ color: '#047857' }}><FaMapPin /> {activity.name}</h5>
                                                        <p className="mb-2"><FaLocationDot />Location: {activity.location}</p>
                                                        <p className="text-secondary">{activity.activity}</p>
                                                        <p className="fw-semibold mb-2"><GiTakeMyMoney /> Estimated Cost: ₹{activity.cost}</p>
                                                        <button className="btn btn-outline-success btn-sm mt-2" onClick={() => handleEditActivity(activity, dayIndex, index)} style={{ borderRadius: '8px' }}>
                                                            <FaRegEdit /> Edit Activity
                                                        </button>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-muted">No activities planned for this day.</p>
                                            )}

                                            <button className="btn btn-outline-danger btn-sm align-self-start" onClick={() => handleDeleteDay(day.day)} style={{ borderRadius: '8px' }}>
                                                <FaTrashAlt /> Delete Day
                                            </button>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <div className="alert alert-light border mt-4" style={{ borderRadius: '12px' }}>
                                    <p className="mb-0">Itinerary has not been generated yet.</p>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default TripDetails