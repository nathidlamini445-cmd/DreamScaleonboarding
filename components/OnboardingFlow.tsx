'use client'

import { useState } from 'react'
import SelectionScreen from './SelectionScreen'
import QuestionFlow from './QuestionFlow'
import LoadingScreen from './LoadingScreen'
import ReviewScreen from './ReviewScreen'

export type UserType = 'creator' | 'entrepreneur' | null

export interface OnboardingData {
  userType: UserType
  // Creator fields
  channelName?: string
  brandName?: string
  contentType?: string | string[]
  targetAudience?: string | string[]
  goals?: string | string[]
  platform?: string | string[]
  monetization?: string | string[]
  currentSize?: string
  // Entrepreneur fields
  businessName?: string
  industry?: string
  businessStage?: string
  revenueGoal?: string
  targetMarket?: string | string[]
  teamSize?: string
  challenges?: string | string[]
}

type FlowState = 'selection' | 'loading' | 'questions' | 'review'

export default function OnboardingFlow() {
  const [flowState, setFlowState] = useState<FlowState>('selection')
  const [userType, setUserType] = useState<UserType>(null)
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    userType: null,
  })

  const handleSelection = (type: 'creator' | 'entrepreneur') => {
    setUserType(type)
    setOnboardingData({ userType: type })
    setFlowState('loading')
  }

  const handleLoadingComplete = () => {
    setFlowState('questions')
  }

  const handleReview = (data: OnboardingData) => {
    setOnboardingData(data)
    setFlowState('review')
  }

  const handleComplete = (data: OnboardingData) => {
    console.log('Onboarding completed:', data)
    // Here you would typically send this data to your backend
    alert('Onboarding completed! Check console for data.')
  }

  const handleBackToQuestions = () => {
    setFlowState('questions')
  }

  const handleBackToSelection = () => {
    setUserType(null)
    setOnboardingData({ userType: null })
    setFlowState('selection')
  }

  if (flowState === 'selection') {
    return <SelectionScreen onSelect={handleSelection} />
  }

  if (flowState === 'loading' && userType) {
    return <LoadingScreen userType={userType} onComplete={handleLoadingComplete} />
  }

  if (flowState === 'questions' && userType) {
    return (
      <QuestionFlow
        userType={userType}
        data={onboardingData}
        onUpdate={setOnboardingData}
        onComplete={handleComplete}
        onBackToSelection={handleBackToSelection}
        onReview={handleReview}
      />
    )
  }

  if (flowState === 'review' && userType) {
    return (
      <ReviewScreen
        userType={userType}
        data={onboardingData}
        onUpdate={setOnboardingData}
        onComplete={handleComplete}
        onBack={handleBackToQuestions}
      />
    )
  }

  return null
}

