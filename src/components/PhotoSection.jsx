import React from 'react'

const PhotoSection = ({ 
  imagePath, 
  title = "Together Forever", 
  subtitle = "Every love story is beautiful, but ours is my favorite" 
}) => {
  return (
    <section className="relative py-20 w-full overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${imagePath})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-80">
        <div className="text-center text-white">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-script mb-4">
            {title}
          </h2>
          <p className="text-lg md:text-xl font-serif opacity-90">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  )
}

export default PhotoSection 