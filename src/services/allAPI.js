import apiService from '../api/apiServices'
//register
export const registerAPI = async (userDetails) => {
    return await apiService('POST', '/users', userDetails)
}

// Login User
export const loginAPI = async (email) => {
    return await apiService('GET', `/users?email=${email}`, {})
}

// Add Trip
export const addTripAPI = async (tripDetails) => {
    return await apiService('POST', '/trips', tripDetails)
}

// Get logged-in user's trips
export const getUserTripsAPI = async (userId) => {
    return await apiService('GET', `/trips?userId=${userId}`, {})
}

// Get single trip
export const getTripAPI = async (tripId) => {
    return await apiService('GET', `/trips/${tripId}`, {})
}


// Add Itinerary
export const generateItineraryAPI = async (itineraryDetails) => {
    return await apiService('POST', '/itineraries', itineraryDetails)
}

export const saveItineraryAPI = async (itineraryDetails) => {
    return await apiService('POST', '/itineraries', itineraryDetails)
}

export const getItineraryAPI = async (tripId) => {
    return await apiService('GET', `/itineraries?tripId=${tripId}`, {})
}


// Update an existing itinerary
export const updateItineraryAPI = async (itineraryId, itineraryDetails) => {
    return await apiService('PUT', `/itineraries/${itineraryId}`, itineraryDetails)
}


// Delete a trip
export const deleteTripAPI = async (tripId) => {
    return await apiService('DELETE', `/trips/${tripId}`, {})
}



//expenses
// Add Expense
export const addExpenseAPI = async (expenseDetails) => {
    return await apiService('POST', '/expenses', expenseDetails)
}

// Get Trip Expenses
export const getTripExpensesAPI = async (tripId) => {
    return await apiService('GET', `/expenses?tripId=${tripId}`, {})
}

// Update Expense
export const updateExpenseAPI = async (expenseId, expenseDetails) => {
    return await apiService('PUT', `/expenses/${expenseId}`, expenseDetails)
}

// Delete Expense
export const deleteExpenseAPI = async (expenseId) => {
    return await apiService('DELETE', `/expenses/${expenseId}`, {})
}