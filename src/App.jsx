import React from 'react'
import { Routes, Route } from 'react-router-dom'
import WeddingInvitation from './components/WeddingInvitation'
import RSVPForm from './components/RSVPForm'
import Gallery from './components/Gallery'
import './App.css'

function App() {
  return (
    <div className="App min-h-screen wedding-gradient">
      <Routes>
        <Route path="/" element={<WeddingInvitation />} />
        <Route path="/rsvp" element={<RSVPForm />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </div>
  )
}

export default App 