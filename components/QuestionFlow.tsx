'use client'

import { useState, useEffect } from 'react'
import { UserType, OnboardingData } from './OnboardingFlow'

interface QuestionFlowProps {
  userType: UserType
  data: OnboardingData
  onUpdate: (data: OnboardingData) => void
  onComplete: (data: OnboardingData) => void
  onBackToSelection: () => void
  onReview: (data: OnboardingData) => void
}

export type QuestionType = 'text' | 'dropdown' | 'chips'

export interface Question {
  id: string
  label: string
  type: QuestionType
  placeholder?: string
  options?: string[]
}

export const CREATOR_QUESTIONS: Question[] = [
  {
    id: 'channelName',
    label: 'What is your channel name or brand name?',
    type: 'text',
    placeholder: 'e.g., @YourChannel or YourBrand',
  },
  {
    id: 'contentType',
    label: 'What type of content do you create?',
    type: 'chips',
    options: [
      'Tech Reviews',
      'Vlogs',
      'Tutorials',
      'Gaming',
      'Beauty & Fashion',
      'Fitness & Health',
      'Education',
      'Entertainment',
      'Business & Finance',
      'Other',
    ],
  },
  {
    id: 'targetAudience',
    label: 'Who is your target audience?',
    type: 'chips',
    options: [
      'Young Professionals',
      'Students',
      'Entrepreneurs',
      'Parents',
      'Teenagers',
      'Seniors',
      'General Audience',
      'Other',
    ],
  },
  {
    id: 'goals',
    label: 'What are your main goals as a creator?',
    type: 'chips',
    options: [
      'Grow Subscribers',
      'Monetize Content',
      'Build Community',
      'Increase Engagement',
      'Brand Partnerships',
      'Create Products',
      'Full-time Career',
      'Other',
    ],
  },
  {
    id: 'platform',
    label: 'What platforms do you primarily use?',
    type: 'chips',
    options: [
      'YouTube',
      'TikTok',
      'Instagram',
      'Twitch',
      'Twitter/X',
      'LinkedIn',
      'Facebook',
      'Other',
    ],
  },
  {
    id: 'currentSize',
    label: 'What is your current audience size?',
    type: 'dropdown',
    options: [
      'Just starting (0-100)',
      'Small (100-1K)',
      'Growing (1K-10K)',
      'Established (10K-100K)',
      'Large (100K-1M)',
      'Very Large (1M+)',
    ],
  },
  {
    id: 'monetization',
    label: 'How do you plan to monetize?',
    type: 'chips',
    options: [
      'Sponsorships',
      'Affiliate Marketing',
      'Products/Merch',
      'Courses',
      'Consulting',
      'Memberships',
      'Donations',
      'Other',
    ],
  },
]

export const ENTREPRENEUR_QUESTIONS: Question[] = [
  {
    id: 'businessName',
    label: 'What is your business name?',
    type: 'text',
    placeholder: 'e.g., TechStart Inc.',
  },
  {
    id: 'industry',
    label: 'What industry are you in?',
    type: 'dropdown',
    options: [
      'SaaS',
      'E-commerce',
      'Consulting',
      'Healthcare',
      'Finance',
      'Education',
      'Real Estate',
      'Food & Beverage',
      'Technology',
      'Marketing',
      'Other',
    ],
  },
  {
    id: 'businessStage',
    label: 'What stage is your business at?',
    type: 'dropdown',
    options: [
      'Idea/Planning',
      'MVP Development',
      'Early Stage',
      'Growth Stage',
      'Established',
      'Scaling',
    ],
  },
  {
    id: 'revenueGoal',
    label: 'What is your revenue goal for this year?',
    type: 'dropdown',
    options: [
      'Under $10K',
      '$10K - $50K',
      '$50K - $100K',
      '$100K - $500K',
      '$500K - $1M',
      '$1M+',
    ],
  },
  {
    id: 'targetMarket',
    label: 'Who is your target market?',
    type: 'chips',
    options: [
      'Small Businesses',
      'Enterprise',
      'Consumers',
      'B2B',
      'B2C',
      'Non-profit',
      'Government',
      'Other',
    ],
  },
  {
    id: 'teamSize',
    label: 'What is your current team size?',
    type: 'dropdown',
    options: ['Solo Founder', '2-5 People', '6-20 People', '21-50 People', '50+ People'],
  },
  {
    id: 'challenges',
    label: 'What are your biggest challenges right now?',
    type: 'chips',
    options: [
      'Customer Acquisition',
      'Product Development',
      'Scaling',
      'Funding',
      'Team Building',
      'Marketing',
      'Operations',
      'Other',
    ],
  },
]

export default function QuestionFlow({
  userType,
  data,
  onUpdate,
  onComplete,
  onBackToSelection,
  onReview,
}: QuestionFlowProps) {
  const questions =
    userType === 'creator' ? CREATOR_QUESTIONS : ENTREPRENEUR_QUESTIONS
  const [currentStep, setCurrentStep] = useState(0)
  
  // Initialize answers from existing data (in case user returns from review)
  const initialAnswers = Object.fromEntries(
    questions.map((q) => {
      const value = data[q.id as keyof OnboardingData]
      // If it's a chip question, convert string to array if needed
      if (q.type === 'chips') {
        if (Array.isArray(value)) {
          return [q.id, value]
        } else if (typeof value === 'string' && value) {
          return [q.id, [value]]
        }
        return [q.id, []]
      }
      return [q.id, value || '']
    })
  )
  const [answers, setAnswers] = useState<Record<string, string | string[]>>(initialAnswers)
  const [otherTexts, setOtherTexts] = useState<Record<string, string>>({})

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Navigate to review screen
      const reviewData: OnboardingData = {
        ...data,
        ...answers,
      }
      onReview(reviewData)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    } else {
      // Go back to selection screen
      onBackToSelection()
    }
  }

  const handleChipToggle = (option: string) => {
    const questionId = questions[currentStep].id
    const currentSelections = (answers[questionId] as string[]) || []
    
    if (option === 'Other') {
      // Toggle "Other" selection
      if (currentSelections.includes('Other')) {
        // Remove "Other" and its custom text
        const newSelections = currentSelections.filter(item => item !== 'Other')
        const newOtherTexts = { ...otherTexts }
        delete newOtherTexts[questionId]
        setOtherTexts(newOtherTexts)
        const newAnswers = { ...answers, [questionId]: newSelections }
        setAnswers(newAnswers)
        onUpdate({ ...data, ...newAnswers })
      } else {
        // Add "Other"
        const newSelections = [...currentSelections, 'Other']
        const newAnswers = { ...answers, [questionId]: newSelections }
        setAnswers(newAnswers)
        onUpdate({ ...data, ...newAnswers })
      }
    } else {
      // Toggle regular option
      const isSelected = currentSelections.includes(option)
      let newSelections: string[]
      
      if (isSelected) {
        newSelections = currentSelections.filter(item => item !== option)
      } else {
        newSelections = [...currentSelections, option]
      }
      
      const newAnswers = { ...answers, [questionId]: newSelections }
      setAnswers(newAnswers)
      onUpdate({ ...data, ...newAnswers })
    }
  }

  const handleOtherTextChange = (text: string) => {
    const questionId = questions[currentStep].id
    setOtherTexts({ ...otherTexts, [questionId]: text })
    
    // Update the answer with custom text
    const currentSelections = (answers[questionId] as string[]) || []
    const otherIndex = currentSelections.findIndex(item => item === 'Other' || item.startsWith('Other:'))
    
    if (otherIndex !== -1 && text.trim()) {
      // Replace "Other" or "Other: ..." with "Other: {text}" in the selections
      const newSelections = [...currentSelections]
      newSelections[otherIndex] = `Other: ${text.trim()}`
      const newAnswers = { ...answers, [questionId]: newSelections }
      setAnswers(newAnswers)
      onUpdate({ ...data, ...newAnswers })
    } else if (otherIndex !== -1 && !text.trim()) {
      // If text is cleared, keep "Other" but without custom text
      const newSelections = [...currentSelections]
      newSelections[otherIndex] = 'Other'
      const newAnswers = { ...answers, [questionId]: newSelections }
      setAnswers(newAnswers)
      onUpdate({ ...data, ...newAnswers })
    }
  }

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [questions[currentStep].id]: value }
    setAnswers(newAnswers)
    onUpdate({ ...data, ...newAnswers })
  }

  const currentQuestion = questions[currentStep]
  const currentAnswer = answers[currentQuestion.id] || (currentQuestion.type === 'chips' ? [] : '')
  const currentOtherText = otherTexts[currentQuestion.id] || ''
  
  // Extract custom text from "Other: {text}" format if it exists
  const getOtherTextFromAnswer = () => {
    if (currentQuestion.type === 'chips') {
      const selections = currentAnswer as string[]
      const otherItem = selections.find(item => item.startsWith('Other:'))
      if (otherItem) {
        return otherItem.replace('Other:', '').trim()
      }
    }
    return ''
  }
  
  // Initialize otherTexts from existing answers when question changes
  useEffect(() => {
    if (currentQuestion.type === 'chips') {
      const selections = currentAnswer as string[]
      const otherItem = selections.find(item => item.startsWith('Other:'))
      if (otherItem) {
        const extractedText = otherItem.replace('Other:', '').trim()
        if (extractedText && !otherTexts[currentQuestion.id]) {
          setOtherTexts(prev => ({ ...prev, [currentQuestion.id]: extractedText }))
        }
      }
    }
  }, [currentStep, currentQuestion.id, currentAnswer])

  const renderInput = () => {
    switch (currentQuestion.type) {
      case 'text':
        return (
          <input
            type="text"
            value={currentAnswer}
            onChange={(e) => handleAnswer(e.target.value)}
            placeholder={currentQuestion.placeholder}
            className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3.5 text-white text-[15px] placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all hover:border-gray-700"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter' && currentAnswer.trim()) {
                handleNext()
              }
            }}
          />
        )

      case 'dropdown':
        return (
          <div className="relative">
            <select
              value={currentAnswer}
              onChange={(e) => handleAnswer(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3.5 text-white text-[15px] font-normal focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all cursor-pointer appearance-none pr-10 hover:border-gray-700 hover:bg-gray-800/50"
              autoFocus
            >
              <option value="" className="bg-gray-900 text-gray-500">
                Select an option...
              </option>
              {currentQuestion.options?.map((option) => (
                <option key={option} value={option} className="bg-gray-900 text-white py-2.5 hover:bg-blue-600">
                  {option}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="text-gray-400"
              >
                <path
                  d="M3.5 5.25L7 8.75L10.5 5.25"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        )

      case 'chips':
        const selections = (currentAnswer as string[]) || []
        const isOtherSelected = selections.some(item => item === 'Other' || item.startsWith('Other:'))
        // Prioritize currentOtherText (what user is typing) over extracted text from answer
        const extractedText = getOtherTextFromAnswer()
        const displayOtherText = currentOtherText || extractedText
        
        return (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              {currentQuestion.options?.map((option) => {
                const isSelected = selections.some(item => 
                  item === option || (option === 'Other' && item.startsWith('Other:'))
                )
                return (
                  <button
                    key={option}
                    onClick={() => handleChipToggle(option)}
                    className={`px-4 py-2.5 rounded-lg border text-[15px] font-medium transition-all duration-200 ${
                      isSelected
                        ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20'
                        : 'bg-gray-900 border-gray-800 text-gray-300 hover:border-blue-400 hover:text-blue-300 hover:shadow-lg hover:shadow-blue-400/30 hover:bg-gray-800'
                    }`}
                  >
                    {option}
                  </button>
                )
              })}
            </div>
            {isOtherSelected && (
              <div className="mt-3">
                <input
                  type="text"
                  value={displayOtherText}
                  onChange={(e) => handleOtherTextChange(e.target.value)}
                  placeholder="Please specify..."
                  className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3.5 text-white text-[15px] placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all hover:border-gray-700"
                  autoFocus
                />
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  const canProceed =
    currentQuestion.type === 'text'
      ? (currentAnswer as string).trim() !== ''
      : currentQuestion.type === 'chips'
      ? (currentAnswer as string[]).length > 0
      : currentAnswer !== ''

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">
              Question {currentStep + 1} of {questions.length}
            </span>
            <span className="text-sm text-gray-400">
              {Math.round(((currentStep + 1) / questions.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-900 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Welcome Message - Only show on first question */}
        {currentStep === 0 && (
          <div className="mb-8">
            {userType === 'creator' ? (
              <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/20 border border-blue-800/30 rounded-lg p-6 mb-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-blue-400"
                    >
                      <rect
                        x="3"
                        y="5"
                        width="18"
                        height="14"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 9L12 12L15 9"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 15L12 12L15 15"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="7"
                        cy="7"
                        r="1"
                        fill="currentColor"
                      />
                      <circle
                        cx="17"
                        cy="7"
                        r="1"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Welcome, Creator!
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      We're excited to help you build your personal brand and grow your audience. 
                      Please take a few moments to answer these questions so we can customize DreamScale 
                      to perfectly match your creative journey and goals.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/20 border border-blue-800/30 rounded-lg p-6 mb-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-blue-400"
                    >
                      <path
                        d="M3 21H21"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5 21V7L12 3L19 7V21"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 9V17M9 21V17"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15 13V17M15 9V17"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 7V3"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Welcome, Entrepreneur!
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      We're thrilled to support your entrepreneurial journey. Please answer these questions 
                      so we can tailor DreamScale to help you build, scale, and grow your business effectively. 
                      Your success is our mission.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Question */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-6 leading-tight">
            {currentQuestion.label}
          </h2>
          {renderInput()}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
          >
            {currentStep === 0 ? 'Back to Selection' : 'Back'}
          </button>
          <button
            onClick={handleNext}
            disabled={!canProceed}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {currentStep === questions.length - 1 ? 'Complete' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}
