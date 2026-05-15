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
- **Gemini AI** for prompt refinement (Refine API)

### File Structure
```
src/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                 # Homepage (Hero & Saved/Featured sections)
│   ├── about/                   # About page with polished marquee
│   ├── browse/page.tsx          # Browse all prompts
│   ├── search/page.tsx          # Search results page
│   ├── liked/page.tsx           # User's personal library (saved prompts)
│   ├── submit/page.tsx          # Contributor submission form & Leaderboard
│   ├── category/[slug]/page.tsx # Individual category pages with local search
│   └── prompt/[slug]/page.tsx   # Individual prompt pages
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx           # Navigation with search and auth status
│   │   └── Footer.tsx           # Footer component
│   ├── sections/
│   │   ├── Hero.tsx             # Minimal hero section
│   │   ├── SavedSection.tsx     # Context-aware saved/featured prompts
│   │   ├── Leaderboard.tsx      # Contributor Hall of Fame
│   │   └── CategoryGrid.tsx     # Category browsing
│   └── ui/
│       ├── Skeleton.tsx         # Global loading skeleton system
│       ├── AuthModal.tsx        # Login/Signup modal
│       ├── RefineModal.tsx      # Advanced AI-powered prompt tailoring modal
│       └── PlatformBadge.tsx    # Platform indicator
├── lib/
│   ├── supabase.ts              # Supabase client initialization
│   ├── auth-context.tsx         # Auth state provider and modal control
│   ├── prompts.ts               # Prompt utilities and Leaderboard fetching
│   └── search.ts                # Client-side search logic
└── types/
    └── index.ts                # TypeScript interfaces
```

## Core Features

### 1. Personalized Experience (The Vault)
- **User Authentication**: Secure sign-up and login via Supabase Auth.
- **Saved Library**: Users can save prompts to their personal "Vault" by clicking the heart icon.
- **Context-Aware Sections**: The homepage dynamically switches between "Saved" prompts (for logged-in users) and "Featured" prompts (for guests/new users).

### 2. Hall of Contributors (Leaderboard)
- **Community Recognition**: A dedicated leaderboard on the submission page.
- **Contributor Tracking**: Recognition based on the number of submissions and "featured" status.
- **Professional Links**: Contributors can link their GitHub and LinkedIn profiles to their architectural submissions.

### 3. Advanced Tailor Agent (Principal Architect)
- **High-Density Refinement**: Users can provide specific context to transform general templates into expert-grade architectures.
- **Principal Architect Persona**: The AI agent enforces strict density, structural integrity (e.g., [ROLE_MANIFESTO]), and agentic reasoning.
- **Streaming UI**: Real-time streaming of generated prompts with a premium glassmorphic interface.

### 4. UX Stability & Performance
- **Anti-Stutter System**: Global skeleton loading (`GridSkeleton`, `CardSkeleton`) prevents layout shifts during data fetching.
- **Page Transitions**: Smooth `page-fade` animations across all routes for an app-like feel.
- **Category-Scoped Search**: Instant, client-side filtering within specific categories for zero-latency discovery.

### 5. Professional Prompt Library
- **Categorized Content**: Structured across professional domains (Coding, Academic, Business, etc.).
- **Multi-Platform Support**: Optimized for Claude, ChatGPT, Gemini, and Grok.
- **Difficulty Scaling**: Prompts categorized from Beginner to Advanced architectures.

## Data Model

### Prompt Interface
```typescript
interface Prompt {
  id: string;              // Unique identifier
  slug: string;            // URL-friendly identifier
  title: string;           // Human-readable title
  description: string;     // One-line summary
  prompt: string;         // Full detailed prompt architecture
  category: string;       // Category classification
  platforms: string[];     // Supported platforms
  tags: string[];         // Descriptive tags
  difficulty: string;     // Skill level
  featured: boolean;      // Highlight status
  authorName?: string;     // Contributor name
  githubUrl?: string;      // Social link
  linkedinUrl?: string;    // Social link
}
```

## Implementation Details

### State Management
- **Auth Context**: Global provider for user session and authentication modal state.
- **Supabase Real-time**: Near-instant synchronization of user likes and vault data across sessions.

### Styling System
- **Tailwind CSS 4**: Global design tokens defined in `globals.css`.
- **Gray/Amber Palette**: A curated, premium color system for an "agentic" professional aesthetic.

## Key Design Principles
1. **User Ownership**: Focus on building a personal collection of prompts.
2. **Humble & Community-Centric**: Professional yet approachable tone with contributor recognition.
3. **Architectural Density**: Prioritizing logical structure and "Master Architectures" over simple text.
4. **Visual Excellence**: State-of-the-art UI with glassmorphism, skeletons, and smooth transitions.
5. **Speed of Access**: One-click utility, zero-latency local search, and optimized loading states.
