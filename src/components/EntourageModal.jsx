import React from 'react'
import { X } from 'lucide-react'
import { themeConfig } from '../config/themeConfig'

const EntourageModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  const entourageList = [
    {
      category: "Principal Sponsors (Godparents)",
      names: [
        "Lorna Alvarado", 
        "Margarita Perez", 
        "Pedro Fernandez", 
        "Richard Sanchez", 
        "Teddy Yu", 
        "Jamie Chastain", 
        "Dani Martinez", 
        "Isabel Mercado"
      ]
    },
    {
      category: "Secondary Sponsors",
      names: [
        "Hannah Morales", 
        "Yael Amari", 
        "Francisco Andrade", 
        "Sebastian Bennett", 
        "Noah Schumacher", 
        "Chiaki Sato"
      ]
    },
    {
      category: "Groomsmen",
      names: [
        "Morgan Maxwell", 
        "Jonathan Patterson", 
        "Howard Ong", 
        "James Thompson", 
        "David Wilson", 
        "Robert Lee"
      ]
    },
    {
      category: "Bridesmaids",
      names: [
        "Kimberly Nguyen", 
        "Chiaki Sato", 
        "Juliana Silva", 
        "Lars Peeters", 
        "Harper Russo", 
        "Helene Paquet"
      ]
    },
    {
      category: "Ring Bearer",
      names: ["Taylor Alonso"]
    },
    {
      category: "Flower Girl",
      names: ["Henrietta Mitchell"]
    }
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className={`relative ${themeConfig.backgrounds.secondary} rounded-2xl max-w-[1300px] w-full max-h-[90vh] overflow-y-auto`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${themeConfig.borders.primary}`}>
          <h3 className={`text-2xl font-script ${themeConfig.text.primary}`}>Wedding Entourage</h3>
          <button
            onClick={onClose}
            className={`${themeConfig.text.muted} hover:${themeConfig.text.primary.replace('text-', '')} transition-colors duration-200`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-12">
            {entourageList.map((item, index) => (
              <div key={index} className="text-center">
                {/* Category Title */}
                <h3 className={`text-2xl font-script ${themeConfig.text.theme} mb-6`}>
                  {item.category}
                </h3>
                
                {/* Names List */}
                <div className={`grid ${item.names.length > 1 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-x-2 gap-y-3`}>
                  {item.names.map((name, nameIndex) => (
                    <p key={nameIndex} className={`text-lg font-serif ${themeConfig.text.primary}`}>
                      {name}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EntourageModal 