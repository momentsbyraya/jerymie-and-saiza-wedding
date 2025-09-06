import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import { Gift, X, Building, CreditCard, Smartphone } from 'lucide-react'
import { themeConfig } from '../config/themeConfig'
import { paymentMethods as paymentMethodsData } from '../data'

const GiftRegistry = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { paymentMethods } = paymentMethodsData

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      {/* Gift Registry Section */}
      <section className="relative py-20 xl:max-h-[800px] w-full bg-gray-900">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(/images/couple-4.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className={`${themeConfig.container.maxWidth} ${themeConfig.container.center} ${themeConfig.container.padding} relative z-10`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-script text-white mb-6">
              Gift Registry
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your presence is our present, but if you'd like to give a gift, 
              we've made it easy with digital payment options.
            </p>
          </div>

          <div className="text-center">
            <button
              onClick={openModal}
              className="inline-flex items-center space-x-3 px-8 py-4 bg-wedding-600 hover:bg-wedding-700 text-white rounded-lg transition-colors duration-200 text-lg font-medium"
            >
              <Gift className="w-6 h-6" />
              <span>Send a Gift</span>
            </button>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          />
          
          {/* Modal Content */}
          <div className={`relative ${themeConfig.backgrounds.secondary} rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto`}>
            {/* Header */}
            <div className={`flex items-center justify-between p-6 border-b ${themeConfig.borders.primary}`}>
              <h3 className={`text-2xl font-script ${themeConfig.text.primary}`}>Payment Options</h3>
              <button
                onClick={closeModal}
                className={`${themeConfig.text.muted} hover:${themeConfig.text.primary.replace('text-', '')} transition-colors duration-200`}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {paymentMethods.map((method, index) => (
                  <div key={index} className={`${themeConfig.backgrounds.secondary} rounded-lg p-6 text-center border border-gray-600`}>
                    <div className="flex items-center justify-center mb-4">
                      <div className={`w-12 h-12 ${themeConfig.backgrounds.accent} rounded-full flex items-center justify-center ${themeConfig.text.primary}`}>
                        {method.icon === 'Building' && <Building className="w-6 h-6" />}
                        {method.icon === 'CreditCard' && <CreditCard className="w-6 h-6" />}
                        {method.icon === 'Smartphone' && <Smartphone className="w-6 h-6" />}
                      </div>
                    </div>
                    
                    <h4 className={`text-lg font-medium ${themeConfig.text.primary} mb-4`}>{method.name}</h4>
                    
                    {/* QR Code Placeholder */}
                    <div className="w-32 h-32 bg-gray-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <span className={`text-sm ${themeConfig.text.muted}`}>QR Code</span>
                    </div>
                    
                    {/* Account Information */}
                    <div className={`text-left space-y-2 text-sm ${themeConfig.text.secondary}`}>
                      {method.accountInfo.bank && (
                        <p><span className="font-medium">Bank:</span> {method.accountInfo.bank}</p>
                      )}
                      {method.accountInfo.provider && (
                        <p><span className="font-medium">Provider:</span> {method.accountInfo.provider}</p>
                      )}
                      <p><span className="font-medium">Account:</span> {method.accountInfo.accountNumber}</p>
                      <p><span className="font-medium">Name:</span> {method.accountInfo.accountName}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <p className={`text-sm ${themeConfig.text.muted}`}>
                  Scan the QR code with your banking app or use the account details above for manual transfer.
                </p>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

export default GiftRegistry 