import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI } from '../services/allAPI'

function Login() {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e) => {

        e.preventDefault()

        try {

            const response = await loginAPI(email)

            console.log(response.data)

            if (response.data.length === 0) {
                alert('User not found!')
                return
            }

            const user = response.data[0]

            if (user.password === password) {

                localStorage.setItem('loggedUser', JSON.stringify(user))
                alert('Login successful!')

                navigate('/home')

            } else {

                alert('Incorrect password!')

            }

        } catch (error) {

            console.log(error)

            alert('Login failed!')

        }
    }

    return (
        <div
            className="container d-flex justify-content-center align-items-center"
            style={{ minHeight: '80vh', width: '100%',
        maxWidth: '100%',
        margin: 0,
           backgroundImage: `
            url('https://i.pinimg.com/originals/d2/75/8e/d2758ec2894792d5e5fbef171f6ee139.png')
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
                    Welcome Back
                </h2>

                <p className="text-center text-muted mb-4">
                    Login to continue planning your trip
                </p>


                <form onSubmit={handleLogin}>

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
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                    </div>


                    {/* Login Button */}

                    <button
                        type="submit"
                        className="btn w-100"
                        style={{
                            backgroundColor: '#172033',
                            color: 'white',
                            padding: '10px'
                        }}
                    >
                        Login
                    </button>

                </form>


                <p className="text-center mt-3 mb-0">

                    Don't have an account?{' '}

                    <Link
                        to="/register"
                        style={{
                            color: '#0077b6',
                            textDecoration: 'none',
                            fontWeight: '600'
                        }}
                    >
                        Register
                    </Link>

                </p>

            </div>

        </div>
    )
}

export default Login
