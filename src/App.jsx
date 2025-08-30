import { useState } from 'react'
import './App.css'
import WeddingInvitation from './components/WeddingInvitation'
import RSVPModal from './components/RSVPModal'

function App() {
  const [isRSVPModalOpen, setIsRSVPModalOpen] = useState(false)

  return (
    <div className="App min-h-screen wedding-gradient">
      <WeddingInvitation onOpenRSVP={() => setIsRSVPModalOpen(true)} />
      <RSVPModal isOpen={isRSVPModalOpen} onClose={() => setIsRSVPModalOpen(false)} />
    </div>
  )
}

export default App 