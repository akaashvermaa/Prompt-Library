# PromptVault

PromptVault is a high-performance web platform and architectural repository for curated Large Language Model (LLM) instruction sets. The application provides an account-gated personal vault, contextual prompt filtering, real-time AI prompt tailoring with multi-model resilience, and a community contribution pipeline.

---

## System Architecture

The system is constructed using a layered architecture on top of the Next.js App Router, separating static presentation, dynamic client-side mutation, edge API streaming, and managed database services.

```
+-----------------------------------------------------------------------+
|                           Client Browser                              |
|  +---------------------+  +--------------------+  +----------------+  |
|  | Server Components   |  | Client Components  |  | Optimistic UI  |  |
|  | (Layout, SSG/ISR)   |  | (Auth, TailorAgent)|  | (useLikes Set) |  |
|  +----------+----------+  +---------+----------+  +--------+-------+  |
+-------------|-----------------------|----------------------|----------+
              |                       |                      |
              v                       v                      v
+-----------------------------------------------------------------------+
|                         Next.js App Runtime                           |
|  +--------------------+  +-----------------------------------------+  |
|  | Middleware / Auth  |  | Route Handlers (Edge / Node Runtimes)   |  |
|  | Context Provider   |  | - POST /api/refine-prompt (Streaming)  |  |
|  |                    |  | - POST /api/submit        (Ingestion)  |  |
|  +--------------------+  +--------------------+--------------------+  |
+-----------------------------------------------|-----------------------+
                                                |
              +---------------------------------+-----------------------+
              |                                                         |
              v                                                         v
+-------------------------------+                     +-------------------------------+
|       Supabase Backend        |                     |      Inference Providers      |
|  +-------------------------+  |                     |  +-------------------------+  |
|  | Supabase Auth           |  |                     |  | Primary:                |  |
|  +-------------------------+  |                     |  | Gemini 2.5 Flash        |  |
|  | PostgreSQL Database     |  |                     |  +-------------------------+  |
|  | - prompts               |  |                     |  | Fallback:               |  |
|  | - user_likes (RLS)      |  |                     |  | Groq (Llama 3.3 70B)    |  |
|  | - submissions (JSONB)   |  |                     |  +-------------------------+  |
|  | - RPC: search_prompts   |  |                                                     |
|  +-------------------------+  |                                                     |
+-------------------------------+                                                     |
```

---

## Core Engineering Concepts

### 1. Hybrid Rendering & Boundary Isolation
The application divides responsibilities between React Server Components (RSC) and Client Components:
- **Server Components**: Handle page layouts, static prompt indexing, category listings, and initial metadata assembly to ensure minimal JavaScript payload and search engine indexing.
- **Client Components**: Isolated to interaction boundaries (e.g., `TailorAgent`, `AuthModal`, `LikeButton`, `CategoryGrid` filtering). State mutations do not trigger re-renders of surrounding server-rendered content.

### 2. Multi-Provider Streaming Inference with Graceful Fallback
Prompt refinement utilizes a multi-model failover pipeline implemented in `src/app/api/refine-prompt/route.ts`:
- **Primary Engine**: Google Gemini 2.5 Flash (`@google/generative-ai`), leveraged for multimodal understanding and structured token generation.
- **Failover Engine**: If the primary provider fails (rate-limiting, upstream outages, quota exhaustion), execution falls back dynamically to Groq running `llama-3.3-70b-versatile` over HTTP streaming.
- **Chunked Transfer Encoding**: Responses are written to a `ReadableStream` and piped over HTTP with `Transfer-Encoding: chunked`, providing instant token rendering in the client UI without buffering delays.
- **Multimodal Signal Isolation**: For image-based prompt refinement, the vision pipeline extracts physical traits (demographics, permanent facial features, skin tone) while stripping environmental context (lighting, clothing, background) to avoid architectural drift in the base prompt.

### 3. Bidirectional Synonym Graph & Full-Text Search
Search execution uses a dual-layer strategy combining client query expansion with PostgreSQL full-text search:
- **Query Graph Expansion**: Raw search terms are parsed through an in-memory synonym adjacency map (`src/lib/synonyms.ts`), expanding domain terms (e.g., mapping `dp` to `image`, `photo`, `portrait`, `headshot`, and vice-versa).
- **Postgres Search Query Formulation**: The expanded token set is constructed into a PostgreSQL full-text search expression (`term1 | term2 | term3`).
- **Database RPC**: Queries are executed via the `search_prompts` remote procedure call against indexed text fields (`title`, `description`, `prompt`, `tags`) with category weighting.

### 4. Optimistic State Reconciliation
To eliminate perceived network latency during user interactions, prompt bookmarking utilizes an optimistic update pattern in `src/lib/use-likes.ts`:
- Local state is held in an in-memory `Set<string>`.
- Triggering a like action immediately mutates the client `Set` and returns UI feedback before network resolution.
- Asynchronous synchronization is dispatched to the `user_likes` table in Supabase.
- In the event of a network failure, the state rolls back to maintain data consistency.

### 5. Layout Stability & Zero Cumulative Layout Shift (CLS)
Asynchronous data loading routes implement structured skeleton states (`GridSkeleton`, `CardSkeleton` in `src/components/ui/Skeleton.tsx`):
- Skeleton primitives match the bounding dimensions and grid geometry of the final rendered DOM elements.
- Prevents layout thrashing and Cumulative Layout Shift during initial hydration and dynamic category filtering.

### 6. Decoupled Document Ingestion Pattern
Community prompt submissions (`src/app/api/submit/route.ts`) use a document-store pattern on top of PostgreSQL:
- Payload data is ingested as structured JSONB inside a staging table (`submissions`).
- Allows rapid iteration of prompt schema attributes without requiring immediate relational migrations.
- Submissions undergo administrative verification before promotion to the primary `prompts` relational table.

---

## Architectural Decision Records (ADRs)

### ADR-001: Selection of Next.js App Router and Server Components
- **Context**: The platform requires fast page loads, SEO discoverability for prompt architectures, and dynamic client features (AI generation, auth).
- **Decision**: Adopt Next.js App Router (v16) with React 19.
- **Consequences**: Enables zero-bundle-size server rendering for prompt pages while restricting client JavaScript to interactive modals and optimistic state handlers.

### ADR-002: Chunked HTTP Streaming over WebSockets for AI Refinement
- **Context**: The AI prompt tailoring module requires real-time token streaming to the client.
- **Decision**: Use HTTP chunked streaming (`ReadableStream` via Fetch API) instead of WebSockets.
- **Consequences**: Eliminates the overhead of maintaining persistent stateful WebSocket connections, reduces infrastructure cost, and operates cleanly through serverless/edge environments.

### ADR-003: Multi-Provider LLM Resilience (Gemini Primary + Groq Fallback)
- **Context**: Dependence on a single AI provider introduces single-point-of-failure risks during provider rate limits or downtime.
- **Decision**: Implement a cascade architecture in `/api/refine-prompt` that automatically falls back from Gemini 2.5 Flash to Groq (`llama-3.3-70b-versatile`).
- **Consequences**: High availability and uptime for prompt generation. If vision inputs are present during fallback to a text-only model tier, the system notifies the context builder and requests manual description rather than failing the entire request.

### ADR-004: PostgreSQL RPC with In-Memory Synonym Expansion
- **Context**: Users search using diverse colloquial keywords (e.g., "pfp", "avatar", "profile picture") that do not always match indexed database titles.
- **Decision**: Expand queries using an in-memory synonym graph on the application tier before sending a combined search query to Supabase via Postgres RPC.
- **Consequences**: Avoids the operational complexity of maintaining external vector search infrastructure while delivering relevant domain-specific search results.

### ADR-005: Optimistic State Mutation for User Vault Interactions
- **Context**: Toggling likes on prompts requires immediate visual feedback to maintain a native application feel.
- **Decision**: Mutate an in-memory `Set` on the client synchronously, followed by an asynchronous Supabase query.
- **Consequences**: Zero UI latency on user interaction. Requires careful synchronization on user authentication transitions.

### ADR-006: Dedicated JSONB Ingestion Layer for Community Contributions
- **Context**: Community contributions may introduce evolving metadata fields (new platform tags, parameters, social references).
- **Decision**: Store submission payloads in a JSONB column (`submissions.data`) rather than enforcing strict relational schema on unverified data.
- **Consequences**: Provides schema flexibility for contributions while keeping the primary `prompts` table strictly typed and validated.

---

## Data Models and Schema Design

### TypeScript Domain Model

```typescript
export interface Prompt {
  id: string;
  slug: string;
  title: string;
  description: string;
  prompt: string;
  category: string;
  platforms: Platform[];
  imagePlatforms?: string[];
  tags: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  featured: boolean;
  estimatedTime: string;
  variables: string[];
  exampleOutput: string;
  updatedAt: string;
  copyCount: number;
  relatedPrompts: string[];
  authorName?: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

export type Platform = "chatgpt" | "claude" | "gemini" | "grok" | "any";
```

### Relational Database Schema (PostgreSQL / Supabase)

#### `prompts` Table
Primary storage for verified prompt architectures.
```sql
CREATE TABLE prompts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    prompt TEXT NOT NULL,
    category TEXT NOT NULL,
    platforms TEXT[] NOT NULL DEFAULT '{}',
    image_platforms TEXT[] DEFAULT '{}',
    tags TEXT[] NOT NULL DEFAULT '{}',
    difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
    featured BOOLEAN DEFAULT FALSE,
    estimated_time TEXT DEFAULT '5 min',
    variables TEXT[] DEFAULT '{}',
    example_output TEXT,
    copy_count INTEGER DEFAULT 0,
    related_prompts TEXT[] DEFAULT '{}',
    author_name TEXT,
    github_url TEXT,
    linkedin_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_prompts_category ON prompts(category);
CREATE INDEX idx_prompts_slug ON prompts(slug);
CREATE INDEX idx_prompts_featured ON prompts(featured);
```

#### `user_likes` Table
Join table managing authenticated user bookmarks.
```sql
CREATE TABLE user_likes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    prompt_id UUID NOT NULL REFERENCES prompts(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, prompt_id)
);

ALTER TABLE user_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own likes"
ON user_likes FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
```

#### `submissions` Table
Staging store for community submissions.
```sql
CREATE TABLE submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    data JSONB NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## API Specifications

### `POST /api/refine-prompt`
Evolves a base prompt architecture into a platform-optimized instruction set using context and optional image traits.

- **Request Headers**: `Content-Type: application/json`
- **Request Body**:
```json
{
  "basePrompt": "string (Required)",
  "userContext": "string (Optional)",
  "targetPlatform": "claude | chatgpt | gemini | grok | any",
  "image": "data:image/png;base64,... (Optional)"
}
```
- **Response**: `200 OK` with `Content-Type: text/plain; charset=utf-8` via chunked HTTP stream.
- **Error Response**: `500 Internal Server Error` with JSON error payload if all provider fallbacks fail.

### `POST /api/submit`
Ingests a community prompt architecture proposal into the review pipeline.

- **Request Body**:
```json
{
  "title": "string (Required)",
  "description": "string (Required)",
  "prompt": "string (Required)",
  "category": "string (Required)",
  "platforms": ["string"],
  "tags": ["string"],
  "difficulty": "beginner | intermediate | advanced",
  "authorName": "string (Optional)",
  "githubUrl": "string (Optional)",
  "linkedinUrl": "string (Optional)"
}
```
- **Response**: `200 OK` with `{ "message": "Prompt submitted successfully", "id": "uuid" }`.

### `GET /api/submit`
Fetches current submissions for administrative audit and leaderboard aggregation.

---

## Project Directory Structure

```
.
├── src/
│   ├── app/
│   │   ├── about/                   # About documentation and community info
│   │   ├── admin/                   # Administration interface
│   │   ├── api/
│   │   │   ├── admin/               # Admin endpoints
│   │   │   ├── refine-prompt/       # Streaming LLM refinement route handler
│   │   │   ├── search/              # Search API route
│   │   │   └── submit/              # Submission ingestion route
│   │   ├── browse/                  # Master prompt repository catalog
│   │   ├── category/[slug]/         # Category-partitioned views
│   │   ├── liked/                   # Authenticated user personal vault
│   │   ├── prompt/[slug]/           # Dynamic prompt detail route
│   │   ├── search/                  # Search results page
│   │   ├── submit/                  # Submission form and contributor leaderboard
│   │   ├── globals.css              # Design tokens and Tailwind configuration
│   │   ├── layout.tsx               # Root layout with Auth Provider & Navigation
│   │   ├── loading.tsx              # Root loading suspension boundary
│   │   └── page.tsx                 # Homepage (Hero, Saved/Featured Prompts)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx           # Global header with search and session control
│   │   │   └── Footer.tsx           # Application footer
│   │   ├── sections/
│   │   │   ├── CategoryGrid.tsx     # Domain taxonomy grid
│   │   │   ├── Hero.tsx             # Primary landing component
│   │   │   ├── Leaderboard.tsx      # Contributor attribution ranking
│   │   │   └── SavedSection.tsx     # Context-aware user library / featured view
│   │   ├── ui/
│   │   │   ├── AuthModal.tsx        # Authentication dialog
│   │   │   ├── CopyButton.tsx       # Clipboard interaction utility
│   │   │   ├── LikeButton.tsx       # Optimistic bookmark toggle
│   │   │   ├── PlatformBadge.tsx    # Target platform classification indicator
│   │   │   ├── Skeleton.tsx         # Layout skeleton loading primitives
│   │   │   └── TailorAgent.tsx      # Interactive prompt refinement interface
│   │   └── Cursor.tsx               # Client interaction visual enhancements
│   ├── lib/
│   │   ├── auth-context.tsx         # Supabase Auth context provider
│   │   ├── prompts.ts               # Database query abstractions and sorting
│   │   ├── search.ts                # Full-text and category search dispatcher
│   │   ├── supabase.ts              # Supabase client initialization
│   │   ├── synonyms.ts              # Bidirectional synonym expansion graph
│   │   └── use-likes.ts             # Optimistic like mutation hook
│   └── types/
│       └── index.ts                 # Domain type definitions
├── public/                          # Static assets
├── package.json                     # Dependency manifests and scripts
├── tsconfig.json                    # TypeScript compiler configuration
└── next.config.ts                   # Next.js build and runtime configuration
```

---

## Environment Configuration

Create a `.env.local` file in the root directory containing the required service credentials:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# LLM Provider Configuration
GEMINI_API_KEY=your-gemini-api-key
GROK_API_KEY=your-groq-api-key
```

---

## Local Development and Verification

### Prerequisites
- Node.js 20.x or later
- npm, pnpm, or yarn

### Installation
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```
The application will be accessible at `http://localhost:3000`.

### Type Checking & Linting
```bash
npm run lint
```

### Production Build
```bash
npm run build
npm run start
```
