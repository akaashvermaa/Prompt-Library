# PromptVault - Project Description

## Overview
PromptVault is a modern, high-performance web application that serves as a curated library of AI prompts for popular language models including Claude, ChatGPT, Gemini, and Grok. Originally built as a static resource, it has evolved into a personalized, account-gated experience where users can build their own "vault" of saved prompt architectures. The application combines a minimalist, premium aesthetic with deep integration into Supabase for real-time data and authentication.

## Architecture

### Framework
- **Next.js 16.2.6** with App Router
- **React 19.2.4** for UI components
- **TypeScript** for type safety
- **Tailwind CSS v4** for styling and utility-first design
- **Supabase** for Backend-as-a-Service (Database & Auth)
- **Lucide React** for icons

### File Structure
```
src/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                 # Homepage (Hero & Saved/Featured sections)
│   ├── about/                   # About page with marquee
│   ├── browse/page.tsx          # Browse all prompts
│   ├── search/page.tsx          # Search results page
│   ├── liked/page.tsx           # User's personal library (saved prompts)
│   ├── submit/page.tsx          # Prompt submission form
│   ├── admin/                   # Admin management (protected)
│   ├── category/[slug]/page.tsx # Individual category pages
│   └── prompt/[slug]/page.tsx   # Individual prompt pages
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx           # Navigation with search and auth status
│   │   └── Footer.tsx           # Footer component
│   ├── sections/
│   │   ├── Hero.tsx             # Minimal hero section
│   │   ├── SavedSection.tsx     # Context-aware saved/featured prompts
│   │   ├── CategoryGrid.tsx     # Category browsing
│   │   └── RelatedPrompts.tsx   # Related prompts
│   └── ui/
│       ├── SearchBar.tsx        # Search component
│       ├── PromptCard.tsx       # Individual prompt card
│       ├── AuthModal.tsx        # Login/Signup modal
│       ├── RefineModal.tsx      # AI-powered prompt tailoring modal
│       ├── TailorButton.tsx     # Trigger for prompt refinement
│       ├── LikeButton.tsx       # Heart button for saving prompts
│       ├── CopyButton.tsx       # Copy to clipboard
│       └── PlatformBadge.tsx    # Platform indicator
├── lib/
│   ├── supabase.ts              # Supabase client initialization
│   ├── auth-context.tsx         # Auth state provider and modal control
│   ├── use-likes.ts             # Custom hook for managing liked prompts
│   ├── prompts.ts               # Prompt utilities and data fetching
│   └── search.ts                # Client-side search logic
├── types/
│   └── index.ts                # TypeScript interfaces
└── data/
    └── categories.json          # Category definitions
```

## Core Features

### 1. Personalized Experience (The Vault)
- **User Authentication**: Secure sign-up and login via Supabase Auth.
- **Saved Library**: Users can save prompts to their personal "Vault" by clicking the heart icon.
- **Context-Aware Sections**: The homepage dynamically switches between "Saved" prompts (for logged-in users) and "Featured" prompts (for guests/new users).

### 2. Agentic Refinement (New)
- **Tailor This Prompt**: Users can provide specific context to general templates.
- **AI-Powered Generation**: Uses Gemini AI to transform templates into "dense," ready-to-deploy prompts.
- **Streaming Output**: Real-time streaming of generated prompt variations.
- **Custom Vault**: Refined variations can be saved to a personal `user_custom_prompts` table.

### 2. High-Performance Search
- **Instant Search**: Real-time filtering across title, description, tags, and prompt content.
- **Debounced Input**: Optimized performance for smooth typing experience.
- **Semantic Synonyms**: Search logic includes synonym matching for better discovery.

### 3. Professional Prompt Library
- **Categorized Content**: Structured across 8+ domains (Coding, Writing, Business, etc.).
- **Multi-Platform Support**: Optimized for Claude, ChatGPT, Gemini, and Grok.
- **Difficulty Scaling**: Prompts categorized from Beginner to Advanced architectures.
- **One-Click Utility**: Instant copy-to-clipboard functionality.

### 4. Premium Aesthetic
- **Minimalist Design**: Clean, distraction-free interface focusing on prompt content.
- **Tailwind CSS 4**: Utilizing the latest styling engine for modern, responsive layouts.
- **Glassmorphism & Gradients**: Subtle visual effects for a premium "agentic" feel.

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
  difficulty: string;     // Skill level (Beginner, Intermediate, Advanced)
  featured: boolean;      // Highlight status
  created_at: string;     // ISO timestamp
}
```

### User Interactions
- **Likes (Saved Prompts)**: Stored in Supabase `likes` table, linking `user_id` to `prompt_id`.

## Implementation Details

### State Management
- **Auth Context**: Global provider for user session and authentication modal state.
- **Custom Hooks**: `useLikes` for real-time synchronization of saved prompts.
- **URL Sync**: Search queries and filtering are synchronized with the URL.

### Backend (Supabase)
- **Database**: PostgreSQL hosted on Supabase.
- **Real-time**: Near-instant synchronization of user likes across sessions.
- **Auth**: Email-based authentication with managed session handling.

### Styling System
- **Tailwind CSS 4**: Global design tokens defined in `globals.css`.
- **CSS Variables**: Theme-based variables for easy maintenance of the gray/amber color palette.

## Development Workflow
- **Development**: `npm run dev`
- **Build**: `npm run build`
- **Database**: Migration scripts for Supabase schema management.

## Deployment
- **Platform**: Optimized for Vercel deployment.
- **Database Hosting**: Supabase Cloud.

## Key Design Principles
1. **User Ownership**: Focus on building a personal collection of prompts.
2. **Humble & Community-Centric**: Professional yet approachable tone.
3. **Speed of Access**: One-click copy, instant search, fast navigation.
4. **Architectural Clarity**: Highlighting the structure and "logic" of prompts.
5. **Modern Tech Stack**: Leveraging Next.js 16, React 19, and Tailwind 4.
