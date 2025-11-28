# DreamScale Onboarding

A beautiful onboarding flow for DreamScale, inspired by Notion's design. This Next.js application provides an elegant, animated onboarding experience for creators and entrepreneurs.

## 🚀 Features

- **Two User Types**: Creator and Entrepreneur paths with customized questions
- **7 Questions Per User Type**: Comprehensive onboarding flow
- **Beautiful Animations**: 
  - Breathing moon animation with mist effects
  - Smooth hover transitions
  - Feature cards with staggered animations
- **Notion-Inspired Design**: Clean, modern dark theme with gradient blue styling
- **Progress Tracking**: Visual progress bar and percentage indicator
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **TypeScript**: Fully typed for better development experience

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn

## 🛠️ Getting Started

### Installation

First, clone the repository and install the dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the onboarding flow.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── app/                 # Next.js app directory
│   ├── globals.css     # Global styles and animations
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── LoadingScreen.tsx
│   ├── OnboardingFlow.tsx
│   ├── QuestionFlow.tsx
│   ├── ReviewScreen.tsx
│   └── SelectionScreen.tsx
├── package.json
├── tsconfig.json
└── tailwind.config.js
```

## 🎨 Key Components

- **SelectionScreen**: Initial screen with Creator/Entrepreneur selection and feature cards
- **QuestionFlow**: Dynamic question flow with progress tracking
- **ReviewScreen**: Review and edit answers before completion
- **LoadingScreen**: Smooth transition between screens

## 🚢 Deployment

This project can be easily deployed on:
- [Vercel](https://vercel.com) (recommended for Next.js)
- [Netlify](https://netlify.com)
- Any Node.js hosting platform

## 📝 License

This project is private and proprietary.

