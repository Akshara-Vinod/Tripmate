import React from 'react'
import { FaPlane } from 'react-icons/fa'

function Footer() {
  return (
    <footer style={{ backgroundColor: '#172033', color: 'white', paddingTop: '50px' }}>
      <div className="container">
        <div className="row justify-content-between g-4 px-md-5">
          <div className="col-md-6">
            <h2 className="fw-bold mb-3" style={{ fontFamily: '"Playfair Display", serif' }}><FaPlane className="me-2" />TripMate</h2>
            <p style={{ color: '#b8c1d1', fontSize: '16px' }}>Plan your journey. Travel smarter.</p>
          </div>

          <div className="col-md-4">
            <h5 className="fw-bold mb-3" style={{ color: '#b8c1d1', fontSize: '24px',fontFamily:'cursive'}}>TripMate</h5>
            <p className="mb-2" style={{ color: '#b8c1d1', fontSize: '24px',fontFamily:'cursive'}}>Plan trips</p>
            <p className="mb-2" style={{ color: '#b8c1d1', fontSize: '24px',fontFamily:'cursive' }}>Generate itineraries</p>
            <p className="mb-2" style={{ color: '#b8c1d1', fontSize: '24px',fontFamily:'cursive'}}>Track expenses</p>
          </div>
        </div>

        <div className="text-center mt-5 py-3" style={{ borderTop: '1px solid #394354' }}>
          <p className="mb-0" style={{ color: '#b8c1d1', fontSize: '24px' }}>© 2026 TripMate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer