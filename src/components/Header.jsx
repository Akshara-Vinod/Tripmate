import React from 'react'
import './Header.css'
import { FaPlane } from 'react-icons/fa'

function Header() {
    return (
        <header className="header">
            <div className="logo">
                <FaPlane />
                <span>TripMate</span>
            </div>
        </header>
    )
}

export default Header