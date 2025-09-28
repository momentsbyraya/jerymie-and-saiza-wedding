import React from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { themeConfig } from '../config/themeConfig'
import { entourage } from '../data'

const EntourageModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  const { entourageList } = entourage

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header - Sticky */}
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-6 border-b border-gray-200 rounded-t-2xl">
          <h3 className="text-2xl font-script text-gray-800">Wedding Entourage</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-8">
            {entourageList.map((item, index) => (
              <div key={index} className="text-center">
                {/* Category Title */}
                <h3 className="text-xl font-script text-gray-800 mb-6">
                  {item.category}
                </h3>
                
                {/* Names List */}
                <div className={`grid ${item.names.length > 1 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-x-4 gap-y-3`}>
                  {item.names.map((name, nameIndex) => (
                    <p key={nameIndex} className="text-lg font-serif text-gray-800">
                      {name}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default EntourageModal 