'use client'

import { useState } from 'react'

interface SelectionScreenProps {
  onSelect: (type: 'creator' | 'entrepreneur') => void
}

export default function SelectionScreen({ onSelect }: SelectionScreenProps) {
  const [hoveredType, setHoveredType] = useState<'creator' | 'entrepreneur' | null>(null)

  const creatorFeatures = [
    {
      title: 'Content Creation',
      description: 'AI-powered tools and templates to create stunning content that converts and engages your audience.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      title: 'Social Media Growth',
      description: 'Grow your following by 300% + with proven viral strategies and engagement optimization across all platforms.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3 3V21H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M7 16L12 11L16 15L21 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 10H16V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      title: 'Analytics & Insights',
      description: 'Real-time performance tracking with actionable insights to maximize your content ROI and reach.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3 3V21H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M7 12L12 7L16 11L21 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      title: 'Brand Building',
      description: 'Build a powerful personal brand that attracts opportunities and monetizes your expertise effectively.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M12 2C14.5 6 16.5 10 18 14C16.5 18 14.5 22 12 22C9.5 22 7.5 18 6 14C7.5 10 9.5 6 12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ]

  const entrepreneurFeatures = [
    {
      title: 'Business Scaling',
      description: 'Scale your operations efficiently with automated workflows and intelligent resource management.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3 21H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M5 21V7L12 3L19 7V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 9V17M9 21V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M15 13V17M15 9V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      title: 'Market Analytics',
      description: 'Deep market insights and competitive analysis to make data-driven decisions and stay ahead.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M9 9L12 6L16 10L21 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 5H16V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      title: 'Revenue Optimization',
      description: 'Maximize revenue streams with intelligent pricing strategies and conversion optimization tools.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2V22M2 12H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      ),
    },
    {
      title: 'Team Management',
      description: 'Streamline collaboration and manage your team effectively with integrated project management tools.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M17 21V19C17 17.9 16.1 17 15 17H9C7.9 17 7 17.9 7 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl">
        {/* Breathing Moon with Mist */}
        <div className="flex justify-center mb-3 relative">
          <div className="relative w-20 h-20">
            {/* Mist layers */}
            <div className="moon-mist-1"></div>
            <div className="moon-mist-2"></div>
            <div className="moon-mist-3"></div>
            {/* Moon */}
            <div className="moon-breathe w-20 h-20 rounded-full bg-white shadow-[0_0_60px_rgba(255,255,255,0.8),0_0_100px_rgba(255,255,255,0.4)] relative z-10"></div>
          </div>
        </div>
        <h1 className="text-3xl font-semibold text-white text-center mb-2">
          What are you going to use{' '}
          <span className="bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 bg-clip-text text-transparent">
            DreamScale
          </span>{' '}
          for?
        </h1>
        <p className="text-gray-400 text-center mb-8 text-sm">
          Built for Visionaries like you
        </p>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {/* Creator Card */}
            <div
              className="relative z-10"
              onMouseEnter={() => setHoveredType('creator')}
              onMouseLeave={() => setHoveredType(null)}
            >
              <button
                onClick={() => onSelect('creator')}
                className="w-full bg-gray-900 hover:bg-white border border-gray-800 hover:border-gray-200 rounded-lg p-5 flex items-start gap-4 transition-all duration-500 ease-in-out text-left group"
              >
                <div className="flex-shrink-0 mt-1">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-gray-400 group-hover:text-black transition-all duration-500 ease-in-out"
                  >
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="14"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M9 9l4 2.5L9 14V9z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-white group-hover:text-black font-medium mb-1 transition-all duration-500 ease-in-out">
                    Creator
                  </h3>
                  <p className="text-gray-400 group-hover:text-black text-sm transition-all duration-500 ease-in-out">
                    Build your personal brand, create engaging content, and grow your audience across platforms
                  </p>
                </div>
              </button>
            </div>

            {/* Entrepreneur Card */}
            <div
              className="relative z-10"
              onMouseEnter={() => setHoveredType('entrepreneur')}
              onMouseLeave={() => setHoveredType(null)}
            >
              <button
                onClick={() => onSelect('entrepreneur')}
                className="w-full bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-lg p-5 flex items-start gap-4 transition-colors text-left group"
              >
                <div className="flex-shrink-0 mt-1">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-gray-400 group-hover:text-white transition-colors"
                  >
                    <path
                      d="M3 21h18"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M5 21V7l8-4 8 4v14"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 9v4M9 17v4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M15 13v4M15 9v4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium mb-1 group-hover:text-blue-300 group-hover:drop-shadow-[0_0_8px_rgba(96,165,250,0.8)] transition-all duration-200">
                    Entrepreneur
                  </h3>
                  <p className="text-gray-400 text-sm group-hover:text-blue-200 group-hover:drop-shadow-[0_0_6px_rgba(96,165,250,0.6)] transition-all duration-200">
                    Build your own business, lead innovative projects, and create value in the market
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Feature Cards Grid - Creator */}
          <div
            className={`absolute top-full left-0 right-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 transition-opacity duration-500 ease-out ${
              hoveredType === 'creator'
                ? 'opacity-100 pointer-events-auto'
                : 'opacity-0 pointer-events-none'
            }`}
          >
            {creatorFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-all duration-300"
                style={{
                  transitionDelay: hoveredType === 'creator' ? `${index * 100}ms` : '0ms',
                }}
              >
                <div className="text-gray-800 mb-2">{feature.icon}</div>
                <h4 className="text-black font-semibold mb-1 text-sm">{feature.title}</h4>
                <p className="text-gray-600 text-xs leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Feature Cards Grid - Entrepreneur */}
          <div
            className={`absolute top-full left-0 right-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 transition-opacity duration-500 ease-out ${
              hoveredType === 'entrepreneur'
                ? 'opacity-100 pointer-events-auto'
                : 'opacity-0 pointer-events-none'
            }`}
          >
            {entrepreneurFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-gray-900 rounded-lg p-4 border border-gray-800 hover:bg-gray-800 hover:shadow-lg transition-all duration-300"
                style={{
                  transitionDelay: hoveredType === 'entrepreneur' ? `${index * 100}ms` : '0ms',
                }}
              >
                <div className="text-gray-400 mb-2">{feature.icon}</div>
                <h4 className="text-white font-semibold mb-1 text-sm">{feature.title}</h4>
                <p className="text-gray-400 text-xs leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

