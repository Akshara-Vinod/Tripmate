import React from 'react'

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerAPI } from '../services/allAPI'

function Register() {

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleRegister = async (e) => {

        e.preventDefault()

        const userDetails = {
            name,
            email,
            password
        }

        try {

            const response = await registerAPI(userDetails)

            console.log(response.data)

            alert('Registration successful!')

            navigate('/login')

        } catch (error) {

            console.log(error)

            alert('Registration failed!')

        }
    }

    return (
        <div
            className="container d-flex justify-content-center align-items-center"
             style={{ minHeight: '80vh', width: '100%',
        maxWidth: '100%',
        margin: 0,
           backgroundImage: `
            url('https://wallpaperbat.com/img/53456617-travel-macbook-wallpaper.jpg')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat:'repeat',
        padding: '30px 15px'
         }}
        >

            <div
                className="card shadow p-4 border-0"
                style={{
                    width: '400px',
                    borderRadius: '15px'
                }}
            >

                <h2
                    className="text-center mb-2"
                    style={{
                        fontFamily: '"Cormorant Garamond", serif',
                        fontWeight: '700',
                        color: '#172033'
                    }}
                >
                    Create Account
                </h2>

                <p className="text-center text-muted mb-4">
                    Start planning your next adventure
                </p>

                <form onSubmit={handleRegister}>

                    {/* Name */}

                    <div className="mb-3">

                        <label className="form-label">
                            Name
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                    </div>


                    {/* Email */}

                    <div className="mb-3">

                        <label className="form-label">
                            Email
                        </label>

                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                    </div>


                    {/* Password */}

                    <div className="mb-4">

                        <label className="form-label">
                            Password
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                    </div>


                    {/* Register Button */}

                    <button
                        type="submit"
                        className="btn w-100"
                        style={{
                            backgroundColor: '#172033',
                            color: 'white',
                            padding: '10px'
                        }}
                    >
                        Register
                    </button>

                </form>


                <p className="text-center mt-3 mb-0">

                    Already have an account?{' '}

                    <Link
                        to="/login"
                        style={{
                            color: '#0077b6',
                            textDecoration: 'none',
                            fontWeight: '600'
                        }}
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>
    )
}

export default Register
