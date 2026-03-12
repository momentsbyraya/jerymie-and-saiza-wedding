import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import entourageData from '../data/entourage.json'

gsap.registerPlugin(ScrollTrigger)

const Entourage = () => {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const groomRef = useRef(null)
  const brideRef = useRef(null)
  const ringBearerRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 50%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    })

    tl.fromTo(headerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    )

    if (groomRef.current) {
      ScrollTrigger.create({
        trigger: groomRef.current,
        start: 'top 80%',
        animation: gsap.fromTo(groomRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
        ),
        toggleActions: 'play none none reverse'
      })
    }

    if (ringBearerRef.current) {
      ScrollTrigger.create({
        trigger: ringBearerRef.current,
        start: 'top 80%',
        animation: gsap.fromTo(ringBearerRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
        ),
        toggleActions: 'play none none reverse'
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const ringBearer = entourageData.entourageList?.find(item => item.category === 'Ring Bearer')
  const principalSponsors = entourageData.entourageList?.find(item => item.category === 'Principal Sponsors')
  const specialGuest = entourageData.entourageList?.find(item => item.category === 'Special Guest')

  return (
    <section
      ref={sectionRef}
      className="relative py-20 w-full overflow-hidden"
      style={{
        paddingLeft: '1rem',
        paddingRight: '1rem',
        paddingTop: '4rem',
        paddingBottom: '4rem'
      }}
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/assets/images/graphics/openine-bg-6.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.5
        }}
      />
      <div className="relative z-20 flex items-center justify-center py-12" style={{ backgroundColor: '#F4EEE8' }}>
        <div className="max-w-xs sm:max-w-md lg:max-w-4xl w-full mx-auto px-2 sm:px-3 md:px-3 lg:px-4 relative z-20">
          <div className="text-center mb-12">
            <h2 ref={headerRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-8">
              <span className="imperial-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl inline-block leading-none" style={{ lineHeight: '0.8', color: '#C46A3A' }}>Entourage</span>
            </h2>
          </div>

          {/* Couple */}
          <div ref={groomRef} className="mb-6 flex flex-row gap-4 sm:gap-6 justify-center items-center">
            <div className="flex-1">
              <p className="text-[16px] sm:text-lg md:text-xl lg:text-2xl imperial-script-regular mb-2 text-right" style={{ color: '#C46A3A' }}>Groom</p>
              <p className="text-[10px] sm:text-sm md:text-base lg:text-lg font-poppins uppercase whitespace-nowrap overflow-hidden text-ellipsis text-right text-[#2F2F2F]">{entourageData.couple.groom.name}</p>
            </div>
            <div className="flex-1">
              <p className="text-[16px] sm:text-lg md:text-xl lg:text-2xl imperial-script-regular mb-2 text-left" style={{ color: '#C46A3A' }}>Bride</p>
              <p className="text-[10px] sm:text-sm md:text-base lg:text-lg font-poppins uppercase whitespace-nowrap overflow-hidden text-ellipsis text-left text-[#2F2F2F]">{entourageData.couple.bride.name}</p>
            </div>
          </div>

          {/* Ring Bearer */}
          {ringBearer && ringBearer.names && ringBearer.names.length > 0 && (
            <div ref={ringBearerRef} className="mb-6">
              <p className="text-[16px] sm:text-lg md:text-xl lg:text-2xl imperial-script-regular mb-2 text-center" style={{ color: '#C46A3A' }}>Ring Bearer</p>
              {ringBearer.names.map((name, index) => (
                <p key={index} className="text-[10px] sm:text-sm md:text-base lg:text-lg font-poppins uppercase text-[#2F2F2F] text-center whitespace-nowrap overflow-hidden text-ellipsis">
                  {name}
                </p>
              ))}
            </div>
          )}

          {/* Principal Sponsors */}
          {principalSponsors && principalSponsors.names && principalSponsors.names.length > 0 && (
            <div className="mb-6">
              <p className="text-[16px] sm:text-lg md:text-xl lg:text-2xl imperial-script-regular mb-2 text-center" style={{ color: '#C46A3A' }}>Principal Sponsors</p>
              {principalSponsors.names.map((name, index) => (
                <p key={index} className="text-[10px] sm:text-sm md:text-base lg:text-lg font-poppins text-[#2F2F2F] text-center overflow-hidden text-ellipsis">
                  {name}
                </p>
              ))}
            </div>
          )}

          {/* Special Guest */}
          {specialGuest && specialGuest.names && specialGuest.names.length > 0 && (
            <div className="mb-6">
              <p className="text-[16px] sm:text-lg md:text-xl lg:text-2xl imperial-script-regular mb-2 text-center" style={{ color: '#C46A3A' }}>Special Guest</p>
              {specialGuest.names.map((name, index) => (
                <p key={index} className="text-[10px] sm:text-sm md:text-base lg:text-lg font-poppins text-[#2F2F2F] text-center overflow-hidden text-ellipsis">
                  {name}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Entourage
