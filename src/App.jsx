import { useState } from 'react'
import './App.css'
import WeddingInvitation from './components/WeddingInvitation'
import RSVPModal from './components/RSVPModal'
import DynamicTitle from './components/DynamicTitle'
import OpeningScreen from './components/OpeningScreen'

function App() {
  const [isRSVPModalOpen, setIsRSVPModalOpen] = useState(false)
  const [showOpeningScreen, setShowOpeningScreen] = useState(true)

  const handleEnvelopeOpen = () => {
    setShowOpeningScreen(false)
  }

  return (
    <div className="App min-h-screen wedding-gradient">
      {showOpeningScreen ? (
        <OpeningScreen onEnvelopeOpen={handleEnvelopeOpen} />
      ) : (
        <>
          <DynamicTitle />
          <WeddingInvitation onOpenRSVP={() => setIsRSVPModalOpen(true)} />
          <RSVPModal isOpen={isRSVPModalOpen} onClose={() => setIsRSVPModalOpen(false)} />
        </>
      )}
    </div>
  )
}

export default App 