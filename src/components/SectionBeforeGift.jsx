import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { weddingConfig } from '../config/weddingConfig'
import { themeConfig } from '../config/themeConfig'

gsap.registerPlugin(ScrollTrigger)

const SectionBeforeGift = () => {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)

  const imagePath = weddingConfig.photos?.sectionBeforeGift

  useEffect(() => {
    if (!imageRef.current || !sectionRef.current) return
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      animation: gsap.fromTo(
        imageRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      ),
      toggleActions: 'play none none reverse'
    })
    return () => st.kill()
  }, [])

  if (!imagePath) return null

  return (
    <section
      ref={sectionRef}
      className={`relative py-12 sm:py-16 w-full overflow-hidden min-h-[313px] sm:min-h-[40vh] ${themeConfig.calendar.background}`}
      aria-label="Section before gift"
    >
      <div
        ref={imageRef}
        className="absolute rounded-none sm:rounded-lg overflow-hidden shadow-lg"
        style={{
          left: -157,
          top: -613,
          width: 'calc(100% + 314px)',
          height: 'calc(100% + 1226px)'
        }}
      >
        <img
          src={imagePath}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  )
}

export default SectionBeforeGift
