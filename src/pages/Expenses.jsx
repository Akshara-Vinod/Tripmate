
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { addExpenseAPI, deleteExpenseAPI, getItineraryAPI, getTripExpensesAPI, updateExpenseAPI } from '../services/allAPI'
import { Bar } from 'react-chartjs-2'
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js'
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)
function Expenses() {
    const { id } = useParams()
    const navigate = useNavigate()   
    const [expenses, setExpenses] = useState([])
    const [itinerary, setItinerary] = useState(null)
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [amount, setAmount] = useState('')
    const [editExpense, setEditExpense] = useState(null)
    const [editTitle, setEditTitle] = useState('')
    const [editCategory, setEditCategory] = useState('')
    const [editAmount, setEditAmount] = useState('')
    const categories = [
        'Food',
        'Transport',
        'Accommodation',
        'Shopping',
        'Activities',
        'Other'
    ]
   // Get Expenses and Itinerary
const getExpenses = async () => {
    try {
        const response = await getTripExpensesAPI(id)
        setExpenses(response.data)
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
    // Load Trip and Expenses
    useEffect(() => {       
        getExpenses()
    }, [id])

    // Add Expense
    const handleAddExpense = async (e) => {
        e.preventDefault()
        const expenseDetails = {
            tripId: id,
            title: title,
            category: category,
            amount: Number(amount)
        }
        try {
            const response = await addExpenseAPI(expenseDetails)
            setExpenses([...expenses, response.data])
            setTitle('')
            setCategory('')
            setAmount('')
            alert('Expense added successfully!')
        } catch (error) {
            console.log(error)
            alert('Failed to add expense!')
        }
    }
    // Select Expense for Editing
    const handleEditExpense = (expense) => {
        setEditExpense(expense)
        setEditTitle(expense.title)
        setEditCategory(expense.category)
        setEditAmount(expense.amount)
    }
    // Update Expense
    const handleUpdateExpense = async (e) => {
        e.preventDefault()
        const updatedExpense = {
            tripId: id,
            title: editTitle,
            category: editCategory,
            amount: Number(editAmount)
        }
        try {
            const response = await updateExpenseAPI(
                editExpense.id,
                updatedExpense
            )
            const updatedExpenses = expenses.map((expense) =>
                expense.id === editExpense.id ? response.data : expense
            )
            setExpenses(updatedExpenses)
            setEditExpense(null)
            alert('Expense updated successfully!')
        } catch (error) {
            console.log(error)
            alert('Failed to update expense!')
        }
    }
    // Delete Expense
    const handleDeleteExpense = async (expenseId) => {
        const confirmDelete = confirm(
            'Are you sure you want to delete this expense?'
        )
        if (confirmDelete) {
            try {
                await deleteExpenseAPI(expenseId)
                const updatedExpenses = expenses.filter((expense) =>
                    expense.id !== expenseId
                )
                setExpenses(updatedExpenses)
                alert('Expense deleted successfully!')
            } catch (error) {
                console.log(error)
                alert('Failed to delete expense!')
            }
        }
    }
// Calculate total expenses
const totalExpenses = expenses.reduce((total, expense) => {
    return total + Number(expense.amount)
}, 0)

// Get estimated activity cost
const activityCost = itinerary ? Number(itinerary.totalCost) : 0
// Calculate total expenses and activity cost
const totalBudgetedCost = totalExpenses + activityCost
// Get category-wise expense amounts
const chartLabels = [...categories, 'Activity Cost']
const chartAmounts = categories.map((category) => {
    const categoryExpenses = expenses.filter((expense) => {
        return expense.category === category
    })
    return categoryExpenses.reduce((total, expense) => {
        return total + Number(expense.amount)
    }, 0)
})
// Add estimated activity cost
chartAmounts.push(activityCost)
// Chart data
const chartData = {
    labels: chartLabels,
    datasets: [
        {
            label: 'Amount Spent (₹)',
            data: chartAmounts,
            backgroundColor: [
                '#36A2EB',
                '#FF6384',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40',
                '#845EC2'
            ],
            borderRadius: 6
        }
    ]
}
const chartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false
        },
        title: {
            display: true,
            text: 'Category-wise Expenses'
        }
    },
    scales: {
        y: {
            beginAtZero: true,
            title: {
                display: true,
                text: 'Amount (₹)'
            }
        },
        x: {
            title: {
                display: true,
                text: 'Expense Category'
            }
        }
    }
}
    return (
        <div className="container py-5">

            <button
                className="btn btn-outline-dark mb-4"
                onClick={() => navigate(`/trip/${id}`)}
            >
                Back to Trip
            </button>

            <h2 className="mb-4"> Trip Expense Tracker</h2>

            {/* Add Expense */}
            {/* Add Expense */}
<div className="mb-4 p-4 p-md-5" style={{ backgroundColor: '#F0FDF4', borderRadius: '20px', border: '1px solid #D1FAE5' }}>
    <h4 className="fw-bold mb-1" style={{ color: '#123B32' }}>Add New Expense</h4>
    <p className="text-muted mb-4">Record your spending for this trip.</p>

    <form onSubmit={handleAddExpense}>
        <div className="row g-3 align-items-end">
            <div className="col-md-4">
                <label className="form-label fw-semibold">Expense Title</label>
                <input type="text" className="form-control" placeholder="e.g. Lunch" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ borderRadius: '10px', padding: '12px' }} />
            </div>

            <div className="col-md-3">
                <label className="form-label fw-semibold">Category</label>
                <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)} required style={{ borderRadius: '10px', padding: '12px' }}>
                    <option value="">Select Category</option>
                    {categories.map((item) => (
                        <option key={item} value={item}>{item}</option>
                    ))}
                </select>
            </div>

            <div className="col-md-3">
                <label className="form-label fw-semibold">Amount (₹)</label>
                <input type="number" className="form-control" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} min="1" required style={{ borderRadius: '10px', padding: '12px' }} />
            </div>

            <div className="col-md-2">
                <button type="submit" className="btn w-100 text-white fw-semibold" style={{ backgroundColor: '#059669', borderRadius: '10px', padding: '12px' }}>+ Add</button>
            </div>
        </div>
    </form>
</div>

            {/* Edit Expense */}
            {editExpense && (
                <div className="card shadow-sm border-0 p-4 mb-4">
                    <h4 className="mb-3"> Edit Expense</h4>

                    <form onSubmit={handleUpdateExpense}>
                        <div className="mb-3">
                            <label className="form-label">
                                Expense Title
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Category</label>
                            <select
                                className="form-select"
                                value={editCategory}
                                onChange={(e) => setEditCategory(e.target.value)}
                                required
                            >
                                {categories.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Amount (₹)</label>
                            <input
                                type="number"
                                className="form-control"
                                value={editAmount}
                                onChange={(e) => setEditAmount(e.target.value)}
                                min="1"
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-dark me-2">
                            Update Expense
                        </button>

                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => setEditExpense(null)}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            )}
            {/* Expense History */}
<div className="mt-5">
    <h4 className="fw-bold mb-1 text-center" style={{ color: '#047857', fontFamily: '"Poppins", sans-serif' }}>Expense History</h4>
    <p className="text-muted text-center mb-4">Your recorded trip expenses</p>

    {expenses.length > 0 ? (
        <div className="bg-white rounded-4 px-3 px-md-4 shadow-sm">
            {expenses.map((expense, index) => (
                <div key={expense.id} className="py-3" style={{ borderBottom: index !== expenses.length - 1 ? '1px solid #E2E8F0' : 'none' }}>
                    <div className="d-flex align-items-center gap-3 flex-wrap">
                        <div className="d-flex align-items-center justify-content-center rounded-3" style={{ width: '58px', height: '58px', minWidth: '58px', color: '#059669' }}>
                            {expense.category === 'Food' ? '🍽️' : expense.category === 'Transport' ? '🚕' : expense.category === 'Accommodation' ? '🏨' : expense.category === 'Shopping' ? '🛍️' : expense.category === 'Activities' ? '🎯' : '💳'}
                        </div>

                        <div className="flex-grow-1">
                            <h6 className="fw-bold mb-1" style={{ color: '#123B32' }}>{expense.title}</h6>
                            <small className="text-muted">{expense.category}</small>
                        </div>

                        <h5 className="fw-bold mb-0" style={{ color: '#123B32' }}>₹{expense.amount}</h5>
                    </div>

                    <div className="d-flex justify-content-end gap-2 mt-3">
                        <button className="btn btn-sm btn-outline-success px-3" onClick={() => handleEditExpense(expense)}>✏️ Edit</button>
                        <button className="btn btn-sm btn-outline-danger px-3" onClick={() => handleDeleteExpense(expense.id)}>🗑️ Delete</button>
                    </div>
                </div>
            ))}
        </div>
    ) : (
        <p className="text-muted text-center py-4">No expenses added yet.</p>
    )}
</div>
   {/* CHART */}
            <div className="card p-4 mt-4">
    <h4 className="mb-3">Visual Budget Dashboard</h4>

    <Bar data={chartData} options={chartOptions} />

    <h5 className="text-center mt-3">
    Total Expenses and Activity Cost: ₹{totalBudgetedCost}
</h5>
</div>

        </div>
    )
}

export default Expenses