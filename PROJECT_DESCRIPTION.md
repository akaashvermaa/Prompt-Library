# PromptVault - Project Description

## Overview
PromptVault is a modern, minimalist web application that serves as a curated library of AI prompts for popular language models including Claude, ChatGPT, Gemini, and Grok. The application provides a clean, distraction-free interface for discovering, searching, and copying prompts for various use cases.

## Architecture

### Framework
- **Next.js 16.2.6** with App Router
- **React 19.2.4** for UI components
- **TypeScript** for type safety
- **Tailwind CSS v4** for styling
- **Lucide React** for icons

### File Structure
```
src/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                 # Homepage (ultra-simple)
│   ├── browse/page.tsx          # Browse all prompts
│   ├── search/page.tsx          # Search results page
│   ├── category/[slug]/page.tsx # Individual category pages
│   └── prompt/[slug]/page.tsx   # Individual prompt pages
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx           # Navigation with search
│   │   └── Footer.tsx           # Footer component
│   ├── sections/
│   │   ├── Hero.tsx             # Minimal hero section
│   │   ├── FeaturedPrompts.tsx  # Featured prompts display
│   │   ├── CategoryGrid.tsx     # Category browsing
│   │   ├── PromptGrid.tsx       # Prompt grid with filters
│   │   └── RelatedPrompts.tsx   # Related prompts
│   └── ui/
│       ├── SearchBar.tsx        # Search component
│       ├── PromptCard.tsx       # Individual prompt card
│       ├── CategoryPill.tsx     # Category selector
│       ├── PlatformBadge.tsx    # Platform indicator
│       └── CopyButton.tsx       # Copy to clipboard
├── data/
│   ├── prompts/                 # Categorized prompt data
│   │   ├── business.json
│   │   ├── coding.json
│   │   ├── study.json
│   │   ├── writing.json
│   │   ├── teaching.json
│   │   ├── review.json
│   │   ├── testing.json
│   │   └── linkedin.json
│   └── categories.json          # Category definitions
├── lib/
│   └── prompts.ts              # Prompt utilities and filtering
└── types/
    └── index.ts                # TypeScript interfaces
```

## Core Features

### 1. Minimalist Design Philosophy
- Clean, distraction-free interface
- No unnecessary animations or visual effects
- Focus on content and functionality
- Dark theme with amber/orange accents
- Responsive design for all devices

### 2. Search Functionality
- Real-time search across prompt fields (title, description, tags, content)
- Debounced input for performance
- Search results displayed in clean grid layout
- URL-based search state persistence
- No filters initially - pure search experience

### 3. Prompt Organization
- **Categories**: Study & Learning, Code & Development, Writing & Essays, Teaching & Explaining, Business & Email, Review & Feedback, QA & Testing, LinkedIn & Career
- **Platforms**: ChatGPT, Claude, Gemini, Grok (with universal support)
- **Difficulty Levels**: Beginner, Intermediate, Advanced
- **Tags**: Additional categorization and discovery
- **Featured Prompts**: Handpicked quality content

### 4. User Experience
- One-click copy functionality
- Clean preview of prompt content
- Individual prompt detail pages
- Breadcrumb navigation
- Empty states for better UX

## Data Model

### Prompt Interface
```typescript
interface Prompt {
  id: string;              // Unique identifier
  slug: string;            // URL-friendly identifier
  title: string;           // Human-readable title
  description: string;     // One-line summary
  prompt: string;         // Full detailed prompt
  category: string;       // Category classification
  platforms: Platform[];   // Supported platforms
  tags: string[];         // Descriptive tags
  difficulty: string;     // Skill level
  featured: boolean;      // Highlight status
}
```

### Category Structure
```typescript
interface Category {
  id: string;             // Unique identifier
  slug: string;           // URL-friendly identifier
  label: string;          // Display name
  description: string;    // Category description
  icon: string;           // Lucide icon name
  color: string;          // Tailwind color class
  count: number;          // Number of prompts
}
```

## Key Components

### SearchBar Component
- Simple input field with clear button
- Debounced search (300ms delay)
- Redirects to search results page
- Mobile-responsive design

### PromptCard Component
- Displays title and description
- Shows difficulty indicator
- Platform badges
- One-click copy button
- Link to full prompt view

### Navigation Structure
1. **Homepage**: Ultra-simple - logo and search bar only
2. **Browse**: All prompts with optional filtering
3. **Search**: Search results page
4. **Category**: Specific category pages
5. **Prompt**: Individual prompt details

## Implementation Details

### State Management
- Client-side state management with React hooks
- URL synchronization for search and filters
- No server-side state required
- All data loaded from static JSON files

### Performance Considerations
- Static data loading (no API calls)
- Debounced search for responsive UX
- Lazy loading for prompt grids
- Minimal re-renders with React optimization

### Search Algorithm
```typescript
// Multi-field search with case insensitivity
result = prompts.filter(p =>
  p.title.toLowerCase().includes(searchTerm) ||
  p.description.toLowerCase().includes(searchTerm) ||
  p.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
  p.prompt.toLowerCase().includes(searchTerm)
);
```

## Design System

### Color Palette
- **Primary**: Gray 900 (background), Gray 800 (cards)
- **Accent**: Amber 400 / Orange 500 (highlights)
- **Text**: White (primary), Gray 300/400 (secondary)

### Typography
- Headings: Geist font (from Next.js)
- Body: System font stack
- Monospace: For prompt content display

### Spacing System
- Container: Max-width with responsive padding
- Components: Consistent spacing units
- Grid: Responsive columns (1-4 based on screen size)

## Browser Support
- Modern browsers with ES6+ support
- Mobile-first responsive design
- Touch-friendly interface elements

## Development Workflow
- **Development**: `npm run dev` (localhost:3000)
- **Build**: `npm run build` (production optimization)
- **Start**: `npm start` (production server)
- **Linting**: `npm run lint` (code quality)

## Deployment
- Static site generation (SSG) compatible
- Can be deployed to Vercel, Netlify, or any static hosting
- No database required
- CDN-friendly with static assets

## Future Enhancements
- Server-side search for large datasets
- User authentication and contributions
- Tag-based navigation
- Advanced filtering options
- Prompt rating system
- Export functionality
- Dark/light mode toggle

## Key Design Principles
1. **Simplicity**: Remove all unnecessary elements
2. **Performance**: Fast loading and responsive search
3. **Accessibility**: Semantic HTML and keyboard navigation
4. **Maintainability**: Clean code structure with TypeScript
5. **User Focus**: Content over design, functionality over features
