import React, { useRef } from 'react'
import { couples } from '../data'

function OpeningScreen({ onEnvelopeOpen }) {
  const envelopeRef = useRef(null)

  const handleEnvelopeClick = () => {
    const envelope = envelopeRef.current
    if (envelope) {
      envelope.classList.add('active')
    }
  }

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        backgroundImage: 'url(/assets/images/graphics/openine-bg-3.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <section className="cssletter flex flex-col items-center">
        {/* Couple Names */}
        <div className="mb-12 sm:mb-16 md:mb-20 lg:mb-24 text-center">
          <h1 
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-antsvalley leading-tight"
            style={{ color: '#1e3a5f' }}
          >
            <span className="block">{couples.couple.names.first} &</span>
            <span className="block">{couples.couple.names.second}</span>
          </h1>
        </div>
        <div className="envelope" ref={envelopeRef} style={{ transform: 'rotate(-5deg)' }}>
          <button 
            className="heart stamp-button" 
            id="openEnvelope" 
            aria-label="Open Envelope"
            onClick={handleEnvelopeClick}
          >
            <img 
              src="/assets/images/graphics/stamp.png" 
              alt="Stamp" 
              className="stamp-image"
            />
          </button>
          <div className="envelope-flap"></div>
          <div className="envelope-folds">
            <div className="envelope-left"></div>
            <div className="envelope-right"></div>
            <div className="envelope-bottom"></div>
          </div>
          {/* Letter that slides up when envelope opens */}
          <div className="envelope-letter">
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold">You are invited!</p>
            <img 
              src="/assets/images/graphics/cutlery-sketch.png" 
              alt="Cutlery sketch" 
              className="mt-4 w-32 sm:w-40 md:w-48 h-auto mx-auto"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default OpeningScreen

