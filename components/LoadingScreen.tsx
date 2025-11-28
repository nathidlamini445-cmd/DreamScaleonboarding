'use client'

import { useState, useEffect } from 'react'

interface LoadingScreenProps {
  userType: 'creator' | 'entrepreneur'
  onComplete: () => void
}

const CREATOR_MESSAGES = [
  "You're going to be the next big star",
  "You're going to be the next big thing",
  "They're not ready for you",
]

const ENTREPRENEUR_MESSAGES = [
  "You're going to be the next big thing",
  "They're not ready for you",
]

export default function LoadingScreen({ userType, onComplete }: LoadingScreenProps) {
  const messages = userType === 'creator' ? CREATOR_MESSAGES : ENTREPRENEUR_MESSAGES
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    // Switch messages every 2 seconds for creators, 3 seconds for entrepreneurs
    if (messages.length > 1) {
      const intervalDuration = userType === 'creator' ? 2000 : 3000
      const interval = setInterval(() => {
        setFade(false)
        setTimeout(() => {
          setCurrentMessageIndex((prev) => (prev + 1) % messages.length)
          setFade(true)
        }, 300)
      }, intervalDuration)

      return () => clearInterval(interval)
    }
  }, [userType, messages.length])

  useEffect(() => {
    // Show loading screen for 5-7 seconds (randomized between 5-7)
    const duration = Math.random() * 2000 + 5000 // 5000-7000ms
    const timer = setTimeout(() => {
      onComplete()
    }, duration)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center gap-8">
        {/* Loading spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-800 border-t-blue-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-blue-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
        </div>

        {/* Animated message */}
        <div className="text-center">
          <p
            className={`text-xl font-medium transition-opacity duration-300 text-shimmer ${
              fade ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {messages[currentMessageIndex]}
          </p>
        </div>
      </div>
    </div>
  )
}

