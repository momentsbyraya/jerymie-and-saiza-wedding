import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { themeConfig } from '../config/themeConfig'
import entourageData from '../data/entourage.json'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

// Helper function to remove middle initial from name
const removeMiddleInitial = (name) => {
  // Remove single letter followed by period (middle initial)
  // Pattern: space + single letter + period + space
  return name.replace(/\s+[A-Z]\.\s+/g, ' ').replace(/\s+/g, ' ').trim()
}

const Entourage = () => {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const officiatingMinisterRef = useRef(null)
  const groomRef = useRef(null)
  const brideRef = useRef(null)
  const parentsRef = useRef(null)
  const principalSponsorsRef = useRef(null)
  const secondarySponsorsRef = useRef(null)
  const bestmanRef = useRef(null)
  const maidOfHonorRef = useRef(null)
  const bibleBearerRef = useRef(null)
  const ringBearerRef = useRef(null)
  const coinBearerRef = useRef(null)
  const flowerGirlsRef = useRef(null)

  useEffect(() => {
    // Scroll-triggered animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 50%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    })

    // Header animation
    tl.fromTo(headerRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )

    // Officiating Minister animation
    if (officiatingMinisterRef.current) {
      ScrollTrigger.create({
        trigger: officiatingMinisterRef.current,
        start: "top 80%",
        animation: gsap.fromTo(officiatingMinisterRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        ),
        toggleActions: "play none none reverse"
      })
    }

    // Groom and Bride names - animate together as a pair
    if (groomRef.current) {
      ScrollTrigger.create({
        trigger: groomRef.current,
        start: "top 80%",
        animation: gsap.fromTo(groomRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        ),
        toggleActions: "play none none reverse"
      })
    }

    // Parents section animation - animate each name one after the other
    if (parentsRef.current) {
      const parentNames = parentsRef.current.querySelectorAll('p.font-poppins')
      if (parentNames.length > 0) {
        gsap.set(parentNames, { opacity: 0, y: 20 })
        ScrollTrigger.create({
          trigger: parentsRef.current,
          start: "top 80%",
          onEnter: () => {
            gsap.to(parentNames, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.1
            })
          },
          toggleActions: "play none none reverse"
        })
      }
    }

    // Principal Sponsors animation - animate each name one after the other
    if (principalSponsorsRef.current) {
      const ninongElements = principalSponsorsRef.current?.querySelectorAll('.ninong-item')
      const ninangElements = principalSponsorsRef.current?.querySelectorAll('.ninang-item')
      
      // Combine all items and animate sequentially
      const allItems = []
      if (ninongElements) allItems.push(...Array.from(ninongElements))
      if (ninangElements) allItems.push(...Array.from(ninangElements))
      
      if (allItems.length > 0) {
        gsap.set(allItems, { opacity: 0, y: 20 })
        ScrollTrigger.create({
          trigger: principalSponsorsRef.current,
          start: "top 80%",
          onEnter: () => {
            gsap.to(allItems, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.1
            })
          },
          toggleActions: "play none none reverse"
        })
      }
    }

    // Secondary Sponsors animation - animate each name one after the other
    if (secondarySponsorsRef.current) {
      const groomsmenElements = secondarySponsorsRef.current?.querySelectorAll('.groomsmen-item')
      const bridesmaidsElements = secondarySponsorsRef.current?.querySelectorAll('.bridesmaids-item')
      
      // Combine all items and animate sequentially
      const allItems = []
      if (groomsmenElements) allItems.push(...Array.from(groomsmenElements))
      if (bridesmaidsElements) allItems.push(...Array.from(bridesmaidsElements))
      
      if (allItems.length > 0) {
        gsap.set(allItems, { opacity: 0, y: 20 })
        ScrollTrigger.create({
          trigger: secondarySponsorsRef.current,
          start: "top 80%",
          onEnter: () => {
            gsap.to(allItems, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.1
            })
          },
          toggleActions: "play none none reverse"
        })
      }
    }

    // Bestman and Maid of Honor - animate each name one after the other
    if (bestmanRef.current && maidOfHonorRef.current) {
      const bestmanNames = bestmanRef.current.querySelectorAll('p.font-poppins')
      const maidOfHonorNames = maidOfHonorRef.current.querySelectorAll('p.font-poppins')
      
      // Combine all names and animate sequentially
      const allNames = []
      if (bestmanNames) allNames.push(...Array.from(bestmanNames))
      if (maidOfHonorNames) allNames.push(...Array.from(maidOfHonorNames))
      
      if (allNames.length > 0) {
        const pairContainer = bestmanRef.current.parentElement
        if (pairContainer) {
          gsap.set(allNames, { opacity: 0, y: 20 })
          ScrollTrigger.create({
            trigger: pairContainer,
            start: "top 80%",
            onEnter: () => {
              gsap.to(allNames, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                stagger: 0.1
              })
            },
            toggleActions: "play none none reverse"
          })
        }
      }
    }

    // Bible Bearer, Ring Bearer, Coin Bearer, and Flower Girls - animate each name one after the other
    const bearerRefs = [bibleBearerRef, ringBearerRef, coinBearerRef, flowerGirlsRef].filter(ref => ref.current)
    if (bearerRefs.length > 0) {
      const allNames = []
      bearerRefs.forEach(ref => {
        const names = ref.current.querySelectorAll('p.font-poppins')
        if (names) allNames.push(...Array.from(names))
      })
      
      if (allNames.length > 0) {
        const container = bearerRefs[0].current.parentElement
        if (container) {
          gsap.set(allNames, { opacity: 0, y: 20 })
          ScrollTrigger.create({
            trigger: container,
            start: "top 80%",
            onEnter: () => {
              gsap.to(allNames, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                stagger: 0.1
              })
            },
            toggleActions: "play none none reverse"
          })
        }
      }
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const principalSponsors = entourageData.entourageList.find(item => item.category === "Principal Sponsors")
  const secondarySponsors = entourageData.entourageList.find(item => item.category === "Secondary Sponsors")
  const bestman = entourageData.entourageList.find(item => item.category === "Bestman")
  const maidOfHonor = entourageData.entourageList.find(item => item.category === "Maid of Honor")
  const bibleBearer = entourageData.entourageList.find(item => item.category === "Bible Bearer")
  const ringBearer = entourageData.entourageList.find(item => item.category === "Ring Bearer")
  const coinBearer = entourageData.entourageList.find(item => item.category === "Coin Bearer")
  const flowerGirls = entourageData.entourageList.find(item => item.category === "Flower Girls")

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
      {/* Background Image */}
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
      {/* Content */}
      <div className="relative z-20 flex items-center justify-center py-12" style={{ backgroundColor: '#D0DCE8' }}>
        <div className="max-w-xs sm:max-w-md lg:max-w-4xl w-full mx-auto px-2 sm:px-3 md:px-3 lg:px-4 relative z-20">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h2 ref={headerRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-8">
              <span className="imperial-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl inline-block leading-none" style={{ lineHeight: '0.8', color: '#1e3a5f' }}>Entourage</span>
            </h2>
          </div>

          {/* Officiating Minister */}
          <div ref={officiatingMinisterRef} className="mb-6 text-center">
            <p className="text-[16px] sm:text-lg md:text-xl lg:text-2xl imperial-script-regular mb-2" style={{ color: '#1e3a5f' }}>Officiating Minister</p>
            <p className="text-[10px] sm:text-sm md:text-base lg:text-lg font-poppins uppercase text-[#333333]">{entourageData.officiatingMinister.name}</p>
          </div>

          {/* Couple Names Section */}
          <div ref={groomRef} className="mb-6 flex flex-row gap-4 sm:gap-6 justify-center items-center">
            {/* Groom Name */}
            <div className="flex-1">
              <p className="text-[16px] sm:text-lg md:text-xl lg:text-2xl imperial-script-regular mb-2 text-right" style={{ color: '#1e3a5f' }}>Groom</p>
              <p className="text-[10px] sm:text-sm md:text-base lg:text-lg font-poppins uppercase whitespace-nowrap overflow-hidden text-ellipsis text-right text-[#333333]">{removeMiddleInitial(entourageData.couple.groom.name)}</p>
            </div>

            {/* Bride Name */}
            <div className="flex-1">
              <p className="text-[16px] sm:text-lg md:text-xl lg:text-2xl imperial-script-regular mb-2 text-left" style={{ color: '#1e3a5f' }}>Bride</p>
              <p className="text-[10px] sm:text-sm md:text-base lg:text-lg font-poppins uppercase whitespace-nowrap overflow-hidden text-ellipsis text-left text-[#333333]">{removeMiddleInitial(entourageData.couple.bride.name)}</p>
            </div>
          </div>

          {/* Parents Section */}
          <div ref={parentsRef} className="mb-6 flex flex-row gap-4 sm:gap-6 justify-center items-center">
            {/* Groom's Parents */}
            <div className="flex-1">
              <p className="text-[16px] sm:text-lg md:text-xl lg:text-2xl imperial-script-regular mb-2 text-right" style={{ color: '#1e3a5f' }}>Groom's Parents</p>
              <p className="text-[10px] sm:text-sm md:text-base lg:text-lg font-poppins uppercase whitespace-nowrap overflow-hidden text-ellipsis text-right text-[#333333]">{entourageData.parents.groom.father}</p>
              <p className="text-[10px] sm:text-sm md:text-base lg:text-lg font-poppins uppercase whitespace-nowrap overflow-hidden text-ellipsis text-right text-[#333333]">{entourageData.parents.groom.mother}</p>
            </div>

            {/* Bride's Parents */}
            <div className="flex-1">
              <p className="text-[16px] sm:text-lg md:text-xl lg:text-2xl imperial-script-regular mb-2 text-left" style={{ color: '#1e3a5f' }}>Bride's Parents</p>
              <p className="text-[10px] sm:text-sm md:text-base lg:text-lg font-poppins uppercase whitespace-nowrap overflow-hidden text-ellipsis text-left text-[#333333]">{entourageData.parents.bride.father}</p>
              <p className="text-[10px] sm:text-sm md:text-base lg:text-lg font-poppins uppercase whitespace-nowrap overflow-hidden text-ellipsis text-left text-[#333333]">{entourageData.parents.bride.mother}</p>
            </div>
          </div>

          {/* Principal Sponsors */}
          {principalSponsors && (
            <div ref={principalSponsorsRef} className="mb-6">
              <h3 className="text-[16px] sm:text-lg md:text-xl lg:text-2xl imperial-script-regular mb-6 text-center" style={{ color: '#1e3a5f' }}>Principal Sponsors</h3>
              <div className="flex flex-row gap-4 sm:gap-6 justify-center items-center">
                {/* NINONG Column */}
                <div className="flex-1">
                  <div className="space-y-2">
                    {principalSponsors.ninong && principalSponsors.ninong.map((name, index) => (
                      <p key={index} className="ninong-item text-[10px] sm:text-sm md:text-base lg:text-lg font-poppins uppercase text-[#333333] text-right whitespace-nowrap overflow-hidden text-ellipsis">
                        {name}
                      </p>
                    ))}
                  </div>
                </div>
                {/* NINANG Column */}
                <div className="flex-1">
                  <div className="space-y-2">
                    {principalSponsors.ninang && principalSponsors.ninang.map((name, index) => (
                      <p key={index} className="ninang-item text-[10px] sm:text-sm md:text-base lg:text-lg font-poppins uppercase text-[#333333] text-left whitespace-nowrap overflow-hidden text-ellipsis">
                        {name}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Secondary Sponsors */}
          {secondarySponsors && (
            <div ref={secondarySponsorsRef} className="mb-6">
              <h3 className="text-[16px] sm:text-lg md:text-xl lg:text-2xl imperial-script-regular mb-6 text-center" style={{ color: '#1e3a5f' }}>Secondary Sponsors</h3>
              
              {/* Bestman and Maid of Honor */}
              <div className="flex flex-row gap-4 sm:gap-6 justify-center items-center mb-6">
                {/* Bestman */}
                {bestman && (
                  <div ref={bestmanRef} className="flex-1">
                    <p className="text-[16px] sm:text-lg md:text-xl lg:text-2xl imperial-script-regular mb-2 text-right" style={{ color: '#1e3a5f' }}>Bestman</p>
                    {bestman.names && bestman.names.map((name, index) => (
                      <p key={index} className="text-[10px] sm:text-sm md:text-base lg:text-lg font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis text-right">
                        {name}
                      </p>
                    ))}
                  </div>
                )}

                {/* Maid of Honor */}
                {maidOfHonor && (
                  <div ref={maidOfHonorRef} className="flex-1">
                    <p className="text-[16px] sm:text-lg md:text-xl lg:text-2xl imperial-script-regular mb-2 text-left" style={{ color: '#1e3a5f' }}>Maid Of Honor</p>
                    {maidOfHonor.names && maidOfHonor.names.map((name, index) => (
                      <p key={index} className="text-[10px] sm:text-sm md:text-base lg:text-lg font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis text-left">
                        {name}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-row gap-4 sm:gap-6 justify-center items-start">
                {/* GROOMSMEN Column */}
                <div className="flex-1">
                  <p className="text-[16px] sm:text-lg md:text-xl lg:text-2xl imperial-script-regular mb-2 text-right" style={{ color: '#1e3a5f' }}>Groomsmen</p>
                  <div className="space-y-2">
                    {secondarySponsors.groomsmen && secondarySponsors.groomsmen.map((name, index) => (
                      <p key={index} className="groomsmen-item text-[10px] sm:text-sm md:text-base lg:text-lg font-poppins uppercase text-[#333333] text-right whitespace-nowrap overflow-hidden text-ellipsis">
                        {name}
                      </p>
                    ))}
                  </div>
                </div>
                {/* BRIDESMAID Column */}
                <div className="flex-1">
                  <p className="text-[16px] sm:text-lg md:text-xl lg:text-2xl imperial-script-regular mb-2 text-left" style={{ color: '#1e3a5f' }}>Bridesmaids</p>
                  <div className="space-y-2">
                    {secondarySponsors.bridesmaid && secondarySponsors.bridesmaid.map((name, index) => (
                      <p key={index} className="bridesmaids-item text-[10px] sm:text-sm md:text-base lg:text-lg font-poppins uppercase text-[#333333] text-left whitespace-nowrap overflow-hidden text-ellipsis">
                        {name}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Candle, Veil, Cord, Ribbon - Two Column Layout */}
              {(secondarySponsors.candle || secondarySponsors.veil || secondarySponsors.cord || secondarySponsors.ribbon) && (
                <div className="flex flex-row gap-4 sm:gap-6 justify-center items-start mt-8">
                  {/* Left Column - CANDLE and VEIL */}
                  <div className="flex-1">
                    {/* CANDLE */}
                    {secondarySponsors.candle && (
                      <div className="mb-6">
                        <p className="text-[16px] sm:text-lg md:text-xl lg:text-2xl imperial-script-regular mb-2 text-right" style={{ color: '#1e3a5f' }}>Candle</p>
                        <div className="space-y-2">
                          {secondarySponsors.candle.names && secondarySponsors.candle.names.map((name, index) => (
                            <p key={index} className="text-[10px] sm:text-sm md:text-base lg:text-lg font-poppins uppercase text-[#333333] text-right whitespace-nowrap overflow-hidden text-ellipsis">
                              {name}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                    {/* VEIL */}
                    {secondarySponsors.veil && (
                      <div>
                        <p className="text-[16px] sm:text-lg md:text-xl lg:text-2xl imperial-script-regular mb-2 text-right" style={{ color: '#1e3a5f' }}>Veil</p>
                        <div className="space-y-2">
                          {secondarySponsors.veil.names && secondarySponsors.veil.names.map((name, index) => (
                            <p key={index} className="text-[10px] sm:text-sm md:text-base lg:text-lg font-poppins uppercase text-[#333333] text-right whitespace-nowrap overflow-hidden text-ellipsis">
                              {name}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Right Column - RIBBON and CORD */}
                  <div className="flex-1">
                    {/* RIBBON */}
                    {secondarySponsors.ribbon && (
                      <div className="mb-6">
                        <p className="text-[16px] sm:text-lg md:text-xl lg:text-2xl imperial-script-regular mb-2 text-left" style={{ color: '#1e3a5f' }}>Ribbon</p>
                        <div className="space-y-2">
                          {secondarySponsors.ribbon.names && secondarySponsors.ribbon.names.map((name, index) => (
                            <p key={index} className="text-[10px] sm:text-sm md:text-base lg:text-lg font-poppins uppercase text-[#333333] text-left whitespace-nowrap overflow-hidden text-ellipsis">
                              {name}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                    {/* CORD */}
                    {secondarySponsors.cord && (
                      <div>
                        <p className="text-[16px] sm:text-lg md:text-xl lg:text-2xl imperial-script-regular mb-2 text-left" style={{ color: '#1e3a5f' }}>Cord</p>
                        <div className="space-y-2">
                          {secondarySponsors.cord.names && secondarySponsors.cord.names.map((name, index) => (
                            <p key={index} className="text-[10px] sm:text-sm md:text-base lg:text-lg font-poppins uppercase text-[#333333] text-left whitespace-nowrap overflow-hidden text-ellipsis">
                              {name}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Bible Bearer, Ring Bearer, Coin Bearer, and Flower Girls */}
          {(bibleBearer || ringBearer || coinBearer || flowerGirls) && (
            <div className="mb-6">
              <div className="flex flex-col gap-6 justify-center items-center mt-6">
                {/* Bible Bearer */}
                {bibleBearer && (
                  <div ref={bibleBearerRef}>
                    <p className="text-[16px] sm:text-lg md:text-xl lg:text-2xl imperial-script-regular mb-2 text-center" style={{ color: '#1e3a5f' }}>Bible Bearer</p>
                    {bibleBearer.names && bibleBearer.names.map((name, index) => (
                      <p key={index} className="text-[10px] sm:text-sm md:text-base lg:text-lg font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis text-center">
                      {name}
                    </p>
                    ))}
                  </div>
                )}

                {/* Ring Bearer */}
                {ringBearer && (
                  <div ref={ringBearerRef}>
                    <p className="text-[16px] sm:text-lg md:text-xl lg:text-2xl imperial-script-regular mb-2 text-center" style={{ color: '#1e3a5f' }}>Ring Bearer</p>
                    {ringBearer.names && ringBearer.names.map((name, index) => (
                      <p key={index} className="text-[10px] sm:text-sm md:text-base lg:text-lg font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis text-center">
                      {name}
                    </p>
                    ))}
                  </div>
                )}

                {/* Coin Bearer */}
                {coinBearer && (
                  <div ref={coinBearerRef}>
                    <p className="text-[16px] sm:text-lg md:text-xl lg:text-2xl imperial-script-regular mb-2 text-center" style={{ color: '#1e3a5f' }}>Coin Bearer</p>
                    {coinBearer.names && coinBearer.names.map((name, index) => (
                      <p key={index} className="text-[10px] sm:text-sm md:text-base lg:text-lg font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis text-center">
                      {name}
                    </p>
                    ))}
                  </div>
                )}

                {/* Flower Girls */}
                {flowerGirls && (
                  <div ref={flowerGirlsRef}>
                    <p className="text-[16px] sm:text-lg md:text-xl lg:text-2xl imperial-script-regular mb-2 text-center" style={{ color: '#1e3a5f' }}>Flower Girls</p>
                    {flowerGirls.names && flowerGirls.names.map((name, index) => (
                      <p key={index} className="text-[10px] sm:text-sm md:text-base lg:text-lg font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis text-center">
                      {name}
                    </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Entourage
