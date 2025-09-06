# Script Evaluation Table - Sales Call Audit System

A comprehensive React application for auditing sales calls with a structured evaluation system.

## Features

- **7 Sales Stages**: Complete evaluation framework covering the entire sales process
- **Interactive Checklists**: Track completion of key criteria for each stage
- **Scoring System**: 1-5 point scoring for each stage
- **Comments Section**: Detailed feedback and observations
- **Summary Dashboard**: Real-time totals and progress tracking
- **Export Functionality**: Save evaluations as JSON files
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Smooth Animations**: Framer Motion powered expand/collapse animations

## Sales Stages

1. **Welcome & Confirmation** - Initial contact and rapport building
2. **Initial Objections** - Handling early concerns
3. **Identification of Needs** - Discovery and needs analysis
4. **Product Presentation** - Tailored solution presentation
5. **Preparation for Courses** - Course structure and expectations
6. **Price & Objection Handling** - Pricing discussion and objection management
7. **Completion of Sale** - Closing and next steps

## Technology Stack

- **React 18** - Modern functional components with hooks
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Vite** - Fast build tool and development server

## Installation & Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Usage

1. **Expand Stages**: Click on any stage header to expand and view details
2. **Complete Checklists**: Check off completed criteria items
3. **Assign Scores**: Select a score (1-5) for each stage
4. **Add Comments**: Provide detailed feedback in the comments section
5. **View Summary**: Monitor total scores and completion progress
6. **Export Data**: Download evaluation results as JSON

## Component Structure

- **App.jsx** - Main application component with state management
- **Custom UI Components** - Card, Checkbox, Select, Textarea, Button
- **Responsive Layout** - Grid-based design with mobile optimization
- **Animation System** - Smooth expand/collapse transitions

## State Management

The application uses React hooks for state management:
- `useState` for component state
- Local state for stage expansion, checklist items, scores, and comments
- Real-time calculations for totals and progress

## Export Format

Exported JSON includes:
- Timestamp
- Total score
- Checklist statistics
- Complete stage data with criteria and responses

## Responsive Design

- **Desktop**: Full grid layout with side-by-side components
- **Tablet**: Adjusted grid with optimized spacing
- **Mobile**: Single-column layout with touch-friendly interactions# CODAUDIT
