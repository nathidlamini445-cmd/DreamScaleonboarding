'use client'

import { useState } from 'react'
import WelcomeScreen from './WelcomeScreen'
import QuestionFlow from './QuestionFlow'
import ReviewScreen from './ReviewScreen'

export type UserType = 'entrepreneur'

export interface OnboardingData {
  userType: UserType
  // Entrepreneur fields
  businessName?: string
  industry?: string | string[]
  businessStage?: string | string[]
  revenueGoal?: string | string[]
  targetMarket?: string | string[]
  teamSize?: string | string[]
  challenges?: string | string[]
  primaryRevenue?: string | string[]
  customerAcquisition?: string | string[]
  monthlyRevenue?: string | string[]
  keyMetrics?: string | string[]
  growthStrategy?: string | string[]
  biggestGoal?: string | string[]
}

type FlowState = 'welcome' | 'questions' | 'review'

export default function OnboardingFlow() {
  const [flowState, setFlowState] = useState<FlowState>('welcome')
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    userType: 'entrepreneur',
  })

  const handleWelcomeNext = () => {
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

  const handleBackToWelcome = () => {
    setOnboardingData({ userType: 'entrepreneur' })
    setFlowState('welcome')
  }

  if (flowState === 'welcome') {
    return <WelcomeScreen onNext={handleWelcomeNext} />
  }

  if (flowState === 'questions') {
    return (
      <QuestionFlow
        userType="entrepreneur"
        data={onboardingData}
        onUpdate={setOnboardingData}
        onComplete={handleComplete}
        onBackToSelection={handleBackToWelcome}
        onReview={handleReview}
      />
    )
  }

  if (flowState === 'review') {
    return (
      <ReviewScreen
        userType="entrepreneur"
        data={onboardingData}
        onUpdate={setOnboardingData}
        onComplete={handleComplete}
        onBack={handleBackToQuestions}
      />
    )
  }

  return null
}

