'use client'

import { useState, useEffect } from 'react'
import { UserType, OnboardingData } from './OnboardingFlow'
import { Question, CREATOR_QUESTIONS, ENTREPRENEUR_QUESTIONS } from './QuestionFlow'

interface ReviewScreenProps {
  userType: UserType
  data: OnboardingData
  onUpdate: (data: OnboardingData) => void
  onComplete: (data: OnboardingData) => void
  onBack: () => void
}

export default function ReviewScreen({
  userType,
  data,
  onUpdate,
  onComplete,
  onBack,
}: ReviewScreenProps) {
  const questions = userType === 'creator' ? CREATOR_QUESTIONS : ENTREPRENEUR_QUESTIONS
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editedAnswers, setEditedAnswers] = useState<Record<string, string>>(
    Object.fromEntries(
      questions.map((q) => [q.id, data[q.id as keyof OnboardingData] || ''])
    )
  )

  // Sync editedAnswers when data prop changes (e.g., when user goes back and returns)
  useEffect(() => {
    setEditedAnswers(
      Object.fromEntries(
        questions.map((q) => [q.id, data[q.id as keyof OnboardingData] || ''])
      )
    )
  }, [data, userType]) // userType determines which questions array to use

  const handleEdit = (questionId: string) => {
    setEditingId(questionId)
  }

  const handleSave = (questionId: string, value: string) => {
    const newAnswers = { ...editedAnswers, [questionId]: value }
    setEditedAnswers(newAnswers)
    setEditingId(null)
    
    // Update the parent data
    const updatedData: OnboardingData = {
      ...data,
      ...newAnswers,
    }
    onUpdate(updatedData)
  }

  const handleCancel = () => {
    setEditingId(null)
    // Reset to original data
    setEditedAnswers(
      Object.fromEntries(
        questions.map((q) => [q.id, data[q.id as keyof OnboardingData] || ''])
      )
    )
  }

  const handleSubmit = () => {
    const finalData: OnboardingData = {
      ...data,
      ...editedAnswers,
    }
    onComplete(finalData)
  }

  const renderEditableField = (question: Question) => {
    const questionId = question.id
    const currentValue = editedAnswers[questionId] || ''
    const isEditing = editingId === questionId

    if (!isEditing) {
      return (
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className="text-gray-400 text-sm mb-1">{question.label}</p>
            <p className="text-white text-base">
              {currentValue || <span className="text-gray-500 italic">Not answered</span>}
            </p>
          </div>
          <button
            onClick={() => handleEdit(questionId)}
            className="flex-shrink-0 px-3 py-1.5 text-sm text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-colors"
          >
            Edit
          </button>
        </div>
      )
    }

    // Editing mode
    switch (question.type) {
      case 'text':
        return (
          <div className="space-y-3">
            <p className="text-gray-400 text-sm">{question.label}</p>
            <input
              type="text"
              value={currentValue}
              onChange={(e) => setEditedAnswers({ ...editedAnswers, [questionId]: e.target.value })}
              placeholder={question.placeholder}
              className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white text-[15px] placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={() => handleSave(questionId, currentValue)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )

      case 'dropdown':
        return (
          <div className="space-y-3">
            <p className="text-gray-400 text-sm">{question.label}</p>
            <div className="relative">
              <select
                value={currentValue}
                onChange={(e) => setEditedAnswers({ ...editedAnswers, [questionId]: e.target.value })}
                className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white text-[15px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer appearance-none pr-10"
                autoFocus
              >
                <option value="" className="bg-gray-900 text-gray-500">
                  Select an option...
                </option>
                {question.options?.map((option) => (
                  <option key={option} value={option} className="bg-gray-900 text-white">
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
            <div className="flex gap-2">
              <button
                onClick={() => handleSave(questionId, currentValue)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )

      case 'chips':
        return (
          <div className="space-y-3">
            <p className="text-gray-400 text-sm">{question.label}</p>
            <div className="flex flex-wrap gap-3">
              {question.options?.map((option) => (
                <button
                  key={option}
                  onClick={() => setEditedAnswers({ ...editedAnswers, [questionId]: option })}
                  className={`px-4 py-2.5 rounded-lg border text-[15px] font-medium transition-all duration-200 ${
                    currentValue === option
                      ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20'
                      : 'bg-gray-900 border-gray-800 text-gray-300 hover:border-blue-400 hover:text-blue-300 hover:shadow-lg hover:shadow-blue-400/30 hover:bg-gray-800'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleSave(questionId, currentValue)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-white mb-2">
            Review Your Answers
          </h1>
          <p className="text-gray-400 text-sm">
            Please review your answers below. You can edit any answer by clicking the "Edit" button.
          </p>
        </div>

        {/* Answers List */}
        <div className="space-y-4 mb-8">
          {questions.map((question, index) => (
            <div
              key={question.id}
              className="bg-gray-900 border border-gray-800 rounded-lg p-5 hover:border-gray-700 transition-colors"
            >
              <div className="flex items-start gap-3 mb-2">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600/20 text-blue-400 text-xs font-medium flex items-center justify-center">
                  {index + 1}
                </span>
                {renderEditableField(question)}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={onBack}
            className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
          >
            Back to Questions
          </button>
          <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-600/20"
          >
            Submit Answers
          </button>
        </div>
      </div>
    </div>
  )
}

