# 🎯 Seller Console

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-19.x-61DAFB.svg?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.x-646CFF.svg?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC.svg?logo=tailwind-css)
![License](https://img.shields.io/badge/license-MIT-green.svg)

*A modern, professional lead and opportunity management system built with React, TypeScript, and cutting-edge UI frameworks.*

[🚀 Live Demo](#-getting-started) • [📚 Features](#-features) • [🏗️ Architecture](#️-architecture) • [🎨 UI Components](#-ui-components)

</div>

## 📋 Overview

Seller Console is a lightweight yet powerful CRM application designed for sales teams to efficiently manage leads and convert them into opportunities. Built with modern web technologies and best practices, it provides a seamless experience across all devices.

### 🎯 Key Highlights

- **🏆 Complete MVP Implementation** - All core requirements fulfilled
- **⚡ Optimistic Updates** - Instant UI feedback with automatic rollback on errors
- **📱 Mobile-First Design** - Responsive across all screen sizes
- **🔄 Real-time State Management** - Powered by Zustand and TanStack Query
- **🛡️ Type-Safe** - Full TypeScript implementation with Zod validation
- **🎨 Modern UI** - Built with Shadcn UI and Tailwind CSS

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
│   │   └── 📁 ui/              # Base UI components (Shadcn)
│   ├── 📁 data/               # Mock data and static assets
│   ├── 📁 hooks/              # Custom React hooks
│   ├── 📁 lib/                # Utilities and configurations
│   ├── 📁 pages/              # Page components
│   ├── 📁 stores/             # Zustand state stores
│   └── 📁 types/              # TypeScript type definitions
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
   git clone <repository-url>
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

## 📚 Usage Guide

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
```

### 🧪 Testing the Application

#### 🔍 Manual Testing Checklist

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

### 🏗️ Architecture Deep Dive

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

- **🎯 Leads**: Stored in Zustand with TanStack Query caching
- **🎯 Opportunities**: Created and managed through mutations
- **🔍 Filters**: Persisted to localStorage via Zustand middleware
- **📊 UI State**: Local React state for component-specific data

### 📝 Code Style

- **TypeScript**: Use strict typing throughout
- **Components**: Follow functional component patterns
- **Hooks**: Extract reusable logic into custom hooks
- **Styling**: Use Tailwind CSS utilities consistently

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

[🚀 Back to Top](#-mini-seller-console)

</div>
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
