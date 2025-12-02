'use client'

interface WelcomeScreenProps {
  onNext: () => void
}

export default function WelcomeScreen({ onNext }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl text-center">
        {/* Breathing Moon with Mist */}
        <div className="flex justify-center mb-6 relative">
          <div className="relative w-20 h-20">
            {/* Mist layers */}
            <div className="moon-mist-1"></div>
            <div className="moon-mist-2"></div>
            <div className="moon-mist-3"></div>
            {/* Moon */}
            <div className="moon-breathe w-20 h-20 rounded-full bg-white shadow-[0_0_60px_rgba(255,255,255,0.8),0_0_100px_rgba(255,255,255,0.4)] relative z-10"></div>
          </div>
        </div>
        
        <h1 className="text-4xl font-semibold text-white mb-4">
          Welcome to{' '}
          <span className="bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900 bg-clip-text text-transparent">
            DreamScale
          </span>
        </h1>
        
        <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-xl mx-auto">
          We're excited to help you build, scale, and grow your business. 
          Let's get started by learning more about your entrepreneurial journey.
        </p>

        <button
          onClick={onNext}
          className="px-8 py-3.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-medium transition-all duration-200 shadow-lg shadow-blue-700/20 hover:shadow-blue-800/30 text-lg"
        >
          Next Step
        </button>
      </div>
    </div>
  )
}

