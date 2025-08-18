# 🎯 Seller Console

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/ba#### 🛠️ **Frontend Core**
- **⚛️ React 19** - Latest React with concurrent features
- **📘 TypeScript 5** - Static type checking and enhanced DX
- **⚡ Vite 7** - Lightning-fast build tool and dev server
- **🎨 Tailwind CSS 4** - Utility-first CSS frameworkeact-19.1-61DAFB.svg?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6.svg?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.1-646CFF.svg?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC.svg?logo=tailwind-css)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000.svg?logo=vercel)
![License](https://img.shields.io/badge/license-MIT-green.svg)

*A modern, professional lead and opportunity management system built with React, TypeScript, and cutting-edge UI frameworks.*

[🚀 Live Demo](https://seller-console-fawn.vercel.app/) • [📚 Features](#-features) • [🏗️ Architecture](#️-architecture) • [🎨 UI Components](#-ui-components)

</div>

## 📋 Overview

Seller Console is a lightweight yet powerful CRM application designed for sales teams to efficiently manage leads and convert them into opportunities. Built with modern web technologies and best practices, it provides a seamless experience across all devices.

## 🌟 Live Demo

<div align="center">

### 👀 **[Try it Live](https://seller-console-fawn.vercel.app/)**

*Experience the complete functionality in action*

[![Demo](https://img.shields.io/badge/🚀_Demo-Live_Application-success.svg?style=for-the-badge)](https://seller-console-fawn.vercel.app/)

**What you can test:**
- 📊 Browse and filter leads in real-time
- 🔍 Search through lead data with instant results
- 🔄 Convert leads to opportunities with optimistic updates
- 📱 Experience responsive design on mobile/desktop
- 🌙 Toggle between dark and light themes
- 🎯 Navigate through the complete UI workflow

*No registration required - dive right in!*

</div>

### 🎯 Key Highlights

- **🏆 Complete MVP Implementation** - All core requirements fulfilled
- **⚡ Optimistic Updates** - Instant UI feedback with automatic rollback on errors
- **📱 Mobile-First Design** - Responsive across all screen sizes
- **🔄 Real-time State Management** - Powered by Zustand and TanStack Query
- **🛡️ Type-Safe** - Full TypeScript implementation with Zod validation
- **🎨 Modern UI** - Built with Shadcn UI and Tailwind CSS
- **🌙 Dark/Light Mode** - Elegant theme toggle with system preference detection

### 🌙 Theme System

Seller Console features a sophisticated **dark/light mode toggle** that enhances user experience:

- **🎯 One-Click Toggle** - Simple button in the dashboard header
- **💾 Persistent Preference** - Theme choice saved across browser sessions
- **🖥️ System Detection** - Automatically detects OS theme preference on first visit
- **✨ Smooth Transitions** - Animated icon changes (sun/moon) with CSS transforms
- **♿ Accessibility** - Screen reader support and keyboard navigation
- **🎨 Professional Design** - Follows shadcn/ui and Tailwind CSS best practices

The theme system provides a modern, user-friendly experience while maintaining the application's professional appearance in both light and dark modes.

## ✨ Features

### 🎪 Core Functionality

#### 📊 **Lead Management**
- 📥 Load leads from local JSON data source
- 🔍 Search leads by name or company
- 🏷️ Filter leads by status (New, Contacted, Qualified, etc.)
- 📈 Sort leads by score, name, company, or creation date
- 👀 View detailed lead information in slide-over panel

#### ✏️ **Lead Editing**
- ✅ Inline edit lead status and email
- 🔐 Real-time email format validation
- 💾 Save/Cancel actions with comprehensive error handling
- 🔄 Optimistic updates with automatic rollback on failure

#### 🎯 **Opportunity Conversion**
- 🚀 Convert qualified leads to opportunities
- 📝 Create opportunities with name, stage, amount, and account details
- 🎛️ Comprehensive form validation
- 📊 Track opportunity pipeline and stages

#### 📈 **Dashboard & Analytics**
- 📊 Real-time statistics cards
- 🎯 Conversion rate tracking
- 💰 Pipeline value calculations
- 📱 Responsive navigation with mobile sidebar

### 🌟 Advanced Features

#### 🔄 **State Management**
- 💾 **Persistent Filters** - Filter preferences saved to localStorage
- ⚡ **Optimistic Updates** - Instant UI feedback with rollback capability
- 🔄 **Real-time Sync** - Automatic data synchronization
- 🛡️ **Error Boundaries** - Graceful error handling and recovery

#### 🎨 **User Experience**
- 🌐 **Responsive Design** - Mobile-first approach
- ⏳ **Loading States** - Skeleton loaders and progress indicators
- 🚫 **Empty States** - Helpful messaging when no data exists
- ❌ **Error States** - User-friendly error messages with retry options
- 🎭 **Smooth Animations** - Polished transitions and micro-interactions

#### 🔧 **Developer Experience**
- 📝 **TypeScript** - Full type safety throughout the application
- 🧪 **Schema Validation** - Runtime validation with Zod
- 🎯 **Custom Hooks** - Reusable logic abstraction
- 📦 **Component Architecture** - Well-structured, maintainable codebase

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

#### 🎨 **Frontend Core**
- **⚛️ React 19** - Latest React with concurrent features
- **📘 TypeScript 5.8** - Static type checking and enhanced DX
- **⚡ Vite 7** - Lightning-fast build tool and dev server
- **🎨 Tailwind CSS 4** - Utility-first CSS framework

#### 🧩 **UI & Components**
- **🎭 Shadcn UI** - High-quality, accessible component library
- **🎨 Radix UI** - Unstyled, accessible UI primitives
- **🎯 Lucide React** - Beautiful & consistent icon library
- **🔧 Class Variance Authority** - Component variant management

#### 📊 **State Management**
- **🐻 Zustand** - Lightweight state management
- **🔄 TanStack Query** - Server state management & caching
- **💾 Persistent Storage** - localStorage integration

#### 🔐 **Forms & Validation**
- **📝 React Hook Form** - Performant forms with minimal re-renders
- **✅ Zod** - TypeScript-first schema validation
- **🔗 @hookform/resolvers** - Seamless integration between libraries

#### 🧪 **Development & Testing**
- **🔍 Vitest** - Fast, modern test runner with native TypeScript support
- **🧪 @testing-library/react** - Simple and complete React testing utilities
- **🧪 @testing-library/jest-dom** - Custom DOM element matchers for better assertions
- **🧪 @testing-library/user-event** - Advanced user interaction simulation
- **🖥️ jsdom** - DOM implementation for testing environment
- **📊 @vitest/ui** - Visual test runner interface

### 🏛️ Architecture Patterns

#### 🎯 **Component Architecture**
- **🧱 Atomic Design** - Scalable component hierarchy
- **🔄 Composition over Inheritance** - Flexible component patterns
- **🎭 Render Props & Custom Hooks** - Logic sharing and reuse

#### 📊 **State Management Strategy**
- **🌐 Global State** - Zustand for application-wide state
- **🔄 Server State** - TanStack Query for data fetching and caching
- **📍 Local State** - React useState for component-specific state
- **📝 Form State** - React Hook Form for complex form handling

#### 🛡️ **Error Handling**
- **🎭 Error Boundaries** - Component-level error isolation
- **🔄 Retry Logic** - Automatic retry with exponential backoff
- **📊 User Feedback** - Clear error messages and recovery options

## 🎨 UI Components

### 🧩 Component Library

Our application uses a carefully curated set of components built on top of Shadcn UI:

#### 📊 **Data Display**
- **📋 Table** - Sortable, filterable data tables
- **🎯 Badge** - Status indicators and labels
- **📄 Card** - Content containers with consistent spacing
- **📊 Tabs** - Organized content sections

#### 📝 **Form Elements**
- **📝 Input** - Text inputs with validation states
- **📋 Select** - Dropdown selections with search
- **🔘 Button** - Primary, secondary, and icon variants
- **📝 Form** - Integrated form components with error handling

#### 🔄 **Feedback**
- **⏳ Loading States** - Skeleton loaders and spinners
- **❌ Error States** - User-friendly error messages
- **🔄 Sheet/Dialog** - Modal and slide-over panels

### 🎨 Design System

#### 🎨 **Color Palette**
- **Primary**: Modern blue tones for actions and highlights
- **Success**: Green for positive actions and completed states
- **Warning**: Amber for caution and pending states
- **Destructive**: Red for errors and dangerous actions
- **Muted**: Subtle grays for secondary content

#### 📐 **Typography**
- **Headings**: Clear hierarchy with appropriate weight
- **Body Text**: Optimized for readability across devices
- **Captions**: Subtle text for metadata and descriptions

#### 📏 **Spacing & Layout**
- **4px Grid System** - Consistent spacing throughout
- **Responsive Breakpoints** - Mobile-first approach
- **Flexbox & Grid** - Modern layout techniques

## 🚀 Getting Started

### 📋 Prerequisites

- **Node.js** (v18 or higher)
- **pnpm** (recommended) or npm/yarn

### ⚡ Quick Start

1. **📥 Clone the repository**
   ```bash
   git clone https://github.com/gmartins-dev/seller-console
   cd seller-console
   ```

2. **📦 Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **🚀 Start development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **🌐 Open your browser**
   Navigate to `http://localhost:5173`

### 🏗️ Build for Production

```bash
# Build the application
pnpm build

# Preview the production build
pnpm preview
```

## 🌐 Deployment

### 🚀 **Live Production**

The application is deployed and running live on **Vercel**:

- **🌍 Production URL**: [https://seller-console-fawn.vercel.app/](https://seller-console-fawn.vercel.app/)
- **🚀 Hosting Platform**: Vercel (Optimal for React/Vite applications)
- **⚡ Performance**: Edge network with global CDN
- **🔄 Auto Deployment**: Continuous deployment from `main` branch

### 🛠️ **Vercel Configuration**

The project is optimized for Vercel deployment with:

- **📦 Build Command**: `pnpm build` (TypeScript compilation + Vite build)
- **📁 Output Directory**: `dist` (Vite default output)
- **⚡ Framework**: Automatically detected as Vite/React
- **🌍 Environment**: Production optimizations enabled
- **📊 Analytics**: Vercel Web Analytics integrated

### 🔧 **Deploy Your Own**

Want to deploy your own instance? It's easy with Vercel:

1. **🔀 Fork this repository**
2. **🔗 Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your forked repository
   - Choose "seller-console" project
3. **⚙️ Configure build settings**:
   - Build Command: `pnpm build`
   - Output Directory: `dist`
   - Install Command: `pnpm install`
4. **🚀 Deploy**: Vercel handles the rest automatically

**Alternative deployment platforms:**
- **Netlify**: Works out of the box with the same build settings
- **GitHub Pages**: Use `gh-pages` branch deployment
- **Firebase Hosting**: Compatible with static site hosting
- **AWS S3 + CloudFront**: For custom infrastructure needs

## �️ Tech Stack

### 🏗️ Core Technologies

- **⚛️ React 19** - Latest React with modern features and optimizations
- **📘 TypeScript 5.8** - Type-safe development with strict mode
- **⚡ Vite 7** - Lightning-fast build tool and dev server
- **🎨 Tailwind CSS 4** - Utility-first CSS framework with JIT compilation

### 🎨 UI & Design

- **🧩 Shadcn/ui** - High-quality, accessible React components
- **🎯 Radix UI** - Unstyled, accessible UI primitives
- **🎭 Lucide React** - Beautiful, customizable SVG icons
- **🌙 Dark Mode** - Elegant theme system with system preference detection

### 📊 State Management

- **🐻 Zustand** - Simple, fast state management with persistence
- **🔄 TanStack Query** - Powerful data fetching and caching
- **📝 React Hook Form** - Performant form handling with validation
- **🛡️ Zod 4.0** - Runtime schema validation and type inference

### 🧪 Quality & Testing

- **🔍 Vitest** - Fast, modern test runner with native TypeScript support
- **🧪 @testing-library/react** - Simple and complete React testing utilities
- **🧪 @testing-library/jest-dom** - Custom DOM element matchers
- **📏 ESLint** - Code linting with React and TypeScript rules
- **✨ Prettier** - Consistent code formatting
- **📊 Coverage Reports** - Built-in coverage tracking with V8 provider
- **🎯 Test Thresholds** - Minimum 70% coverage requirements

### 🔧 Development Tools

- **📦 pnpm** - Fast, disk space efficient package manager
- **🔥 Hot Module Replacement** - Instant dev feedback with Vite
- **📊 React Query Devtools** - Debug and inspect queries in development
- **🎯 TypeScript Strict Mode** - Maximum type safety
- **🧪 Vitest UI** - Visual test runner interface
- **🎨 tw-animate-css** - Extended Tailwind CSS animations
- **🌍 ESLint Globals** - Global environment configurations

## �📚 Usage Guide

### 🎯 Managing Leads

1. **👀 View Leads**: The main dashboard displays all leads in a sortable table
2. **🔍 Search**: Use the search bar to find leads by name or company
3. **🏷️ Filter**: Select status filters to narrow down your lead list
4. **📊 Sort**: Click column headers to sort by different criteria

### ✏️ Editing Lead Details

1. **🖱️ Click any lead row** to open the detail panel
2. **✏️ Click "Edit"** to modify lead information
3. **💾 Save changes** or cancel to revert
4. **✅ Validation** ensures data integrity

### 🎯 Converting to Opportunities

1. **🎯 Open lead details** for a qualified lead
2. **🚀 Click "Convert to Opportunity"**
3. **📝 Fill in opportunity details** (name, stage, amount, account)
4. **✅ Submit** to create the opportunity

### 📊 Tracking Opportunities

1. **📊 Navigate to Opportunities tab**
2. **👀 View pipeline** with all active opportunities
3. **📈 Monitor stages** and pipeline value
4. **📊 Analyze distribution** across different stages

## 🔧 Development

### 📝 Available Scripts

```bash
# Development
pnpm dev                    # Start dev server
pnpm build                  # Build for production
pnpm preview               # Preview production build

# Code Quality
pnpm lint                  # Run ESLint
pnpm lint:fix             # Fix ESLint issues
pnpm type-check           # TypeScript type checking
pnpm format               # Format code with Prettier
pnpm format:check         # Check code formatting

# Testing
pnpm test                 # Run tests in watch mode
pnpm test:run             # Run tests once
pnpm test:coverage        # Run tests with coverage report
```

### 🧪 Testing the Application

#### � **Test Setup & Configuration**
- **📝 Vitest Config** - Modern test runner with TypeScript support
- **🧩 Test Setup** - Custom setup file with DOM mocks and utilities
- **📊 Coverage Tracking** - V8 provider with 70% minimum thresholds
- **🎯 Test Environment** - jsdom for DOM testing simulation

#### 🧪 **Unit Test Coverage**
- **⚛️ Component Tests** - React components with Testing Library
- **🔗 Hook Tests** - Custom hooks with renderHook utilities
- **📡 API Tests** - Service layer and data fetching logic
- **🧮 Business Logic** - Filtering, sorting, and state management

Current test files:
- `src/components/__tests__/mode-toggle.test.tsx` - Theme toggle functionality
- `src/components/leads/__tests__/leads-table.test.tsx` - Lead table rendering
- `src/components/leads/__tests__/leads-filter-bar.test.tsx` - Filter components
- `src/hooks/__tests__/use-lead-filters.test.ts` - Filter hook logic
- `src/lib/__tests__/api.test.ts` - API service methods

#### 🔍 **Running Tests**

```bash
# Run tests in watch mode (development)
pnpm test

# Run all tests once (CI/CD)
pnpm test:run

# Generate coverage report
pnpm test:coverage

# View coverage report (after running coverage)
open coverage/index.html
```

#### �🔍 Manual Testing Checklist

- **📊 Load and display leads** from JSON data
- **🔍 Search functionality** by name and company
- **🏷️ Status filtering** across all lead statuses
- **📈 Sorting** by score, name, company, and date
- **👀 Lead detail panel** opens and displays correctly
- **✏️ Edit functionality** with validation
- **🎯 Lead conversion** to opportunities
- **📱 Responsive behavior** across different screen sizes
- **❌ Error handling** and recovery mechanisms

#### 🎭 Edge Cases to Test

- **📭 Empty states** when no leads exist
- **🔍 Search with no results**
- **❌ Network errors** and retry functionality
- **📝 Form validation** with invalid data
- **📱 Mobile navigation** and touch interactions
- **🌙 Theme switching** between light and dark modes
- **💾 State persistence** across browser refreshes

### 🏗️ Architecture Deep Dive

#### 🧪 **Testing Architecture**

```
Test Layer Structure:
├── 🧩 Unit Tests (Components)     # Individual component behavior
├── 🔗 Unit Tests (Hooks)          # Custom hook logic and state
├── 📡 Unit Tests (API)            # Service layer and data flow
├── 🎭 Integration Tests           # Component interactions
└── 🔄 End-to-End Tests           # Full user workflows (future)
```

**Testing Principles:**
- **🎯 Test Behavior, Not Implementation** - Focus on user interactions
- **🧩 Isolated Unit Tests** - Each test runs independently
- **📊 Meaningful Coverage** - Quality over quantity metrics
- **🔄 Fast Feedback** - Tests run quickly during development

#### 🔄 State Flow

```
User Action → Component → Custom Hook → Store/Query → API → UI Update
```

1. **User Interaction** triggers component event
2. **Component** calls appropriate hook or action
3. **Custom Hook** manages local logic and calls store
4. **Store/Query** handles state updates and API calls
5. **API Layer** simulates server interactions
6. **UI Updates** reflect new state with optimistic updates

#### 📊 Data Management

- **🎯 Leads Store** - Zustand store with persistence middleware for lead data
- **🎯 Opportunities** - Created and managed through TanStack Query mutations
- **🔍 Filters** - Persisted to localStorage via Zustand middleware
- **📊 UI State** - Local React state for component-specific data
- **🌙 Theme State** - ThemeProvider context with localStorage persistence
- **⚡ Query Cache** - TanStack Query cache with intelligent invalidation

### 📝 Code Style & Best Practices

#### 🎯 **TypeScript Guidelines**
- **📘 Strict Mode** - Full type safety with strict TypeScript config
- **🔒 Type Definitions** - Comprehensive type definitions in `/src/types`
- **🛡️ Runtime Validation** - Zod schemas for API data validation
- **📝 Interface First** - Define interfaces before implementation

#### ⚛️ **React Patterns**
- **🔄 Functional Components** - Modern function component patterns
- **🪝 Custom Hooks** - Reusable logic extraction
- **🎭 Composition** - Component composition over inheritance
- **📊 State Management** - Clear separation of local vs global state

#### 🧪 **Testing Standards**
- **🎯 Behavior Testing** - Test user interactions, not implementation
- **🧩 Component Isolation** - Each component tested independently
- **📝 Descriptive Tests** - Clear test descriptions and assertions
- **🔄 Test Coverage** - Maintain 70%+ coverage on critical paths

#### 💅 **Code Formatting**
- **✨ Prettier** - Automated code formatting
- **📏 ESLint** - Code quality and consistency rules
- **🎨 Naming Conventions** - Clear, descriptive naming patterns
- **📁 File Organization** - Logical folder structure and imports

#### 🚀 **Performance Guidelines**
- **⚡ React.memo** - Prevent unnecessary re-renders
- **🔄 useMemo/useCallback** - Optimize expensive computations
- **📦 Code Splitting** - Lazy loading for better performance
- **🎯 Bundle Optimization** - Tree shaking and minimal dependencies

## 🤝 Contributing

### 📋 **Development Workflow**
1. **🔀 Fork the repository** and create your feature branch
2. **💻 Make your changes** following the code style guidelines
3. **🧪 Add tests** for new functionality
4. **✅ Run the test suite** and ensure all tests pass
5. **📝 Update documentation** if needed
6. **🔄 Submit a pull request** with a clear description

### ✅ **Pre-commit Checklist**
- [ ] All tests pass (`pnpm test:run`)
- [ ] Code is properly formatted (`pnpm format:check`)
- [ ] No linting errors (`pnpm lint`)
- [ ] TypeScript compiles without errors (`pnpm type-check`)
- [ ] Coverage threshold is maintained (`pnpm test:coverage`)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **⚛️ React Team** - For the amazing React framework
- **🎨 Shadcn** - For the beautiful component library
- **🎯 Radix UI** - For accessible UI primitives
- **🎨 Tailwind CSS** - For the utility-first CSS framework
