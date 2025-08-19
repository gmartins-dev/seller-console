# 🎯 Seller Console

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-19.x-61DAFB.svg?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.x-646CFF.svg?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC.svg?logo=tailwind-css)
![License](https://img.shields.io/badge/license-MIT-green.svg)

*A modern, professional lead and opportunity management system built with React, TypeScript, and cutting-edge UI frameworks.*

[🚀 Live Demo](#-live-demo) • [✨ Features](#-features) • [⚡ Getting Started](#-getting-started) • [📚 Usage Guide](#-usage-guide) • [🏗️ Architecture](#-architecture) • [🎨 UI Components](#-ui-components) • [🌐 Deployment](#-deployment)

</div>

## 📋 Overview

Seller Console is a lightweight yet powerful CRM application designed for sales teams to efficiently manage leads and convert them into opportunities. Built with modern web technologies and best practices, it provides a seamless experience across all devices.

## 🌟 Live Demo

Try it live: https://seller-console-fawn.vercel.app/

*Experience the complete functionality in action.*

What to explore:
- 📊 Browse and filter leads in real-time
- 🔍 Search through lead data with instant results
- 🔄 Convert leads to opportunities with optimistic updates
- 📱 Responsive design on mobile/desktop
- 🌙 Toggle between dark and light themes
- 🎯 Navigate through the complete UI workflow

## ✨ Features

### 🎯 Key Highlights
- 🏆 Complete MVP implementation (core requirements fulfilled)
- ⚡ Optimistic updates with automatic rollback on errors
- 📱 Mobile-first, responsive across all screen sizes
- 🔄 Real-time state management with Zustand and TanStack Query
- 🛡️ Type-safe with TypeScript and Zod validation
- 🎨 Modern UI with Shadcn UI and Tailwind CSS
- 🌙 Dark/Light mode with system preference detection

### 🎪 Core Functionality

#### 📊 Lead Management
- 📥 Load leads from local JSON data source
- 🔍 Search leads by name or company
- 🏷️ Filter leads by status (New, Contacted, Qualified, etc.)
- 📈 Sort leads by score, name, company, or creation date
- 👀 View detailed lead information in slide-over panel

#### ✏️ Lead Editing
- ✅ Inline edit lead status and email
- 🔐 Real-time email format validation
- 💾 Save/Cancel actions with comprehensive error handling
- 🔄 Optimistic updates with automatic rollback on failure

#### 🎯 Opportunity Conversion
- 🚀 Convert qualified leads to opportunities
- 📝 Create opportunities with name, stage, amount, and account details
- 🎛️ Comprehensive form validation
- 📊 Track opportunity pipeline and stages

#### 📈 Dashboard & Analytics
- 📊 Real-time statistics cards
- 🎯 Conversion rate tracking
- 💰 Pipeline value calculations
- 📱 Responsive navigation with mobile sidebar

### 🌟 Advanced Features

#### 🔄 State Management
- 💾 Persistent filters (localStorage)
- ⚡ Optimistic updates with rollback capability
- 🔄 Real-time sync
- 🛡️ Error boundaries for graceful recovery

#### 🎨 User Experience
- 🌐 Responsive design (mobile-first)
- ⏳ Loading states (skeletons, progress)
- 🚫 Empty states with helpful messaging
- ❌ Error states with retry options
- 🎭 Smooth transitions and micro-interactions

#### 🔧 Developer Experience
- 📝 TypeScript throughout the application
- 🧪 Schema validation with Zod
- 🎯 Custom hooks for reusable logic
- 📦 Component architecture for maintainability

### 🌙 Theme System

Seller Console features a sophisticated dark/light mode toggle that enhances user experience:

- 🎯 One-click toggle in the dashboard header
- 💾 Persistent preference across sessions
- 🖥️ System detection on first visit
- ✨ Smooth transitions (sun/moon icon transforms)
- ♿ Accessibility: screen readers and keyboard navigation
- 🎨 Professional design following shadcn/ui and Tailwind best practices

## ⚡ Getting Started

### 📋 Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm/yarn

### 🚀 Quick Start

1) Clone the repository
```bash
git clone https://github.com/gmartins-dev/seller-console
cd seller-console
```

2) Install dependencies
```bash
pnpm install
# or
npm install
```

3) Start the development server
```bash
pnpm dev
# or
npm run dev
```

4) Open your browser at http://localhost:5173

## 📚 Usage Guide

### 🎯 Managing Leads
1. 👀 View leads in the main sortable table
2. 🔍 Search by name or company
3. 🏷️ Filter by status to narrow the list
4. 📊 Click column headers to sort

### ✏️ Editing Lead Details
1. 🖱️ Click any lead row to open the detail panel
2. ✏️ Click "Edit" to modify information
3. 💾 Save changes or cancel to revert
4. ✅ Validation ensures data integrity

### 🎯 Converting to Opportunities
1. 🎯 Open details for a qualified lead
2. 🚀 Click "Convert to Opportunity"
3. 📝 Fill in opportunity details (name, stage, amount, account)
4. ✅ Submit to create the opportunity

### 📊 Tracking Opportunities
1. 📊 Navigate to the Opportunities tab
2. 👀 View pipeline with all active opportunities
3. 📈 Monitor stages and pipeline value
4. 📊 Analyze distribution across stages

## 🔧 Development

### 📝 Available Scripts

```bash
# Development
pnpm dev                    # Start dev server
pnpm build                  # Build for production
pnpm preview                # Preview production build

# Code Quality
pnpm lint                   # Run ESLint
pnpm lint:fix               # Fix ESLint issues
pnpm type-check             # TypeScript type checking
pnpm format                 # Format code with Prettier
pnpm format:check           # Check code formatting

# Testing
pnpm test                   # Run tests in watch mode
pnpm test:run               # Run tests once
pnpm test:coverage          # Run tests with coverage report
```

## 🌐 Deployment

### 🚀 Live Production

The application is deployed and running live on Vercel:

- 🌍 Production URL: https://seller-console-fawn.vercel.app/
- 🚀 Hosting Platform: Vercel (optimal for React/Vite)
- ⚡ Performance: Edge network with global CDN
- 🔄 Auto Deployment: Continuous deployment from `main` branch

## 🏗️ Architecture

### 🗂️ Project Structure

```
seller-console/
├── 📁 src/
│   ├── 📁 components/          # Reusable UI components
│   │   ├── 📁 leads/           # Lead-specific components
│   │   ├── 📁 opportunities/   # Opportunity-specific components
│   │   ├── 📁 ui/              # Base UI components (Shadcn)
│   │   └── 📁 __tests__/       # Component unit tests
│   ├── 📁 data/               # Mock data and static assets
│   ├── 📁 hooks/              # Custom React hooks
│   │   └── 📁 __tests__/       # Hook unit tests
│   ├── 📁 lib/                # Utilities and configurations
│   │   └── 📁 __tests__/       # Utility function tests
│   ├── 📁 pages/              # Page components
│   ├── 📁 stores/             # Zustand state stores
│   ├── 📁 test/               # Test setup and configuration
│   └── 📁 types/              # TypeScript type definitions
├── 📄 vitest.config.ts        # Test configuration
├── 📄 eslint.config.js        # Linting configuration
├── 📄 README.md               # Project documentation
└── 📄 package.json            # Dependencies and scripts
```

### 🛠️ Technology Stack

#### 🎨 Frontend Core
- ⚛️ React 19 — latest React with concurrent features
- 📘 TypeScript 5.8 — static type checking and enhanced DX
- ⚡ Vite 7 — lightning-fast build tool and dev server
- 🎨 Tailwind CSS 4 — utility-first CSS framework

#### 🧩 UI & Components
- 🎭 Shadcn UI — high-quality, accessible component library
- 🎨 Radix UI — unstyled, accessible UI primitives
- 🎯 Lucide React — beautiful & consistent icon library

#### 📊 State Management
- 🐻 Zustand — lightweight state management
- 🔄 TanStack Query — server state management & caching
- 💾 Persistent storage — localStorage integration

#### 🔐 Forms & Validation
- 📝 React Hook Form — performant forms with minimal re-renders
- ✅ Zod — TypeScript-first schema validation

#### 🧪 Code Quality & Testing
- 🔍 Vitest — fast, modern test runner with native TypeScript support
- 🧪 React Testing Library — simple and complete React testing utilities
- 📏 ESLint — code linting with React and TypeScript rules
- ✨ Prettier — consistent code formatting

### 🏛️ Architecture Patterns

- 🧱 Atomic design — scalable component hierarchy
- 🔄 Composition over inheritance — flexible component patterns
- 🎭 Render props & custom hooks — logic sharing and reuse
- 🌐 Global state (Zustand), 🔄 server state (TanStack Query), 📍 local state (useState), 📝 form state (React Hook Form)
- 🛡️ Error boundaries, 🔄 retry logic with backoff, 📊 clear user feedback
- 🧪 Unit test coverage across components, hooks, API layer, and business logic

## 🎨 UI Components

### 🧩 Component Library

Our application uses a carefully curated set of components built on top of Shadcn UI:

#### 📊 Data Display
- 📋 Table — sortable, filterable data tables
- 🎯 Badge — status indicators and labels
- 📄 Card — content containers with consistent spacing
- 📊 Tabs — organized content sections

#### 📝 Form Elements
- 📝 Input — text inputs with validation states
- 📋 Select — dropdown selections with search
- 🔘 Button — primary, secondary, and icon variants
- 📝 Form — integrated form components with error handling

#### 🔄 Feedback
- ⏳ Loading states — skeleton loaders and spinners
- ❌ Error states — user-friendly error messages
- 🔄 Sheet/Dialog — modal and slide-over panels

### 🎨 Design System

#### 🎨 Color Palette
- Primary: modern blue tones for actions and highlights
- Success: green for positive actions and completed states
- Warning: amber for caution and pending states
- Destructive: red for errors and dangerous actions
- Muted: subtle grays for secondary content

#### 📐 Typography
- Headings: clear hierarchy with appropriate weight
- Body text: optimized for readability across devices
- Captions: subtle text for metadata and descriptions

#### 📏 Spacing & Layout
- 4px grid system — consistent spacing throughout
- Responsive breakpoints — mobile-first approach
- Flexbox & Grid — modern layout techniques
