import fs from 'fs';
import path from 'path';

const rawText = `PROMPT 01 — Stack Trace Autopsy
Best for: Claude, ChatGPT
When to use: You have a crash, an exception, or a production error and need
             a full breakdown, not just a quick fix.

Act as a senior site reliability engineer doing a post-mortem. Analyze the
following stack trace completely:

Stack trace:
[PASTE FULL STACK TRACE HERE]

Context:
- When it happens: [DESCRIBE THE TRIGGER — on login / under load / randomly]
- Recent changes made before this started: [WHAT CHANGED]
- Environment: [Dev / Staging / Production] + [runtime and version]
- Frequency: [Always / Intermittent / Only under load]

Provide:
1. Line-by-line explanation of the stack trace in plain English — what each
   frame means and why it appears
2. Root cause identification with a confidence level (High / Medium / Low)
   and your reasoning
3. Environmental or config factors that likely contributed
4. The exact corrected code with inline comments explaining each fix
5. A regression test to confirm the fix holds under the same conditions
6. A prevention strategy — what architectural or process change stops this
   entire class of error from recurring

----------------------------------------------------------------

PROMPT 02 — Memory Leak Detective
Best for: Claude, ChatGPT, Gemini
When to use: Your app's memory keeps climbing over time, response times
             degrade, or the process eventually crashes.

You are a performance engineer specializing in memory profiling. Analyze
the following code for memory leaks:

Code:
[PASTE CODE HERE]

Language and runtime: [e.g., Node.js 20, Python 3.12, Java 17]
Observed symptoms: [e.g., heap grows 50MB every hour, GC pauses increasing]
Environment: [container size, load pattern]

Identify:
1. Every potential memory leak source — unreleased references, unclosed
   connections, growing caches, event listener accumulation, closure traps
2. For each leak: the exact line(s), why it retains memory, and the severity
   (Critical / High / Medium)
3. The corrected code for each issue
4. The profiling commands or tools to confirm the leak is gone
5. Monitoring metrics to add so this gets caught early in future

----------------------------------------------------------------

PROMPT 03 — Race Condition & Concurrency Debugger
Best for: Claude, ChatGPT
When to use: You have bugs that only appear under concurrent load, flaky
             tests, or data corruption in multi-threaded code.

Act as a concurrency expert. Debug the following code for race conditions,
deadlocks, and thread-safety issues:

Code:
[PASTE CODE HERE]

Problem description: [WHAT GOES WRONG AND WHEN]
Concurrency model: [threads / async-await / goroutines / actors]
Language and version: [LANGUAGE + VERSION]

Provide:
1. Every race condition identified — which variables or resources are
   unsafely shared, and under what timing does it fail
2. Any deadlock risks — the exact lock acquisition order that causes it
3. A thread-safe rewrite of the affected sections
4. The synchronization primitives used and why they were chosen over
   alternatives
5. A stress test or deterministic test to reproduce and verify the fix
6. Performance impact of the fix and whether a lock-free alternative exists

----------------------------------------------------------------

PROMPT 04 — Production-Ready Function Generator
Best for: Claude, ChatGPT, Grok
When to use: You need a single function or module written properly from
             scratch — not skeleton code, actual production-quality output.

You are a senior [LANGUAGE] developer. Generate a complete, production-ready
implementation of the following:

Task: [DESCRIBE EXACTLY WHAT THE FUNCTION MUST DO]
Language and version: [e.g., Python 3.12, TypeScript 5.4]
Framework context: [e.g., FastAPI, Express, Django — or "standalone"]
Performance constraints: [e.g., must handle 1000 req/s, <100ms p99]
External dependencies allowed: [YES / NO — list approved libraries]

The output must include:
1. Full implementation with no placeholder comments or TODOs
2. Type hints / TypeScript types on every parameter and return value
3. Input validation with clear error messages for every failure case
4. Docstring or JSDoc covering purpose, params, returns, and exceptions
5. Unit test stubs covering the happy path and at least 3 edge cases
6. One usage example showing it integrated into a real caller

----------------------------------------------------------------

PROMPT 05 — Full CRUD API Endpoint Builder
Best for: Claude, ChatGPT, Gemini
When to use: You need a complete, working API resource — not a template,
             but fully wired-up endpoints ready to drop into a codebase.

Act as a backend engineer. Generate complete CRUD API endpoints for:

Resource name: [e.g., User, Product, Order]
Framework: [e.g., FastAPI, Express/TypeScript, Spring Boot, Django REST]
Database and ORM: [e.g., PostgreSQL + SQLAlchemy, MongoDB + Mongoose]

Fields:
- [field name]: [type] — [required / optional] — [any constraints]
- [field name]: [type] — [required / optional] — [any constraints]

Authentication: [JWT / API Key / Session / None]
Required behaviors:
- Pagination on list endpoint (cursor-based preferred)
- Input validation with descriptive error responses
- Soft delete on the DELETE endpoint
- Audit fields (created_at, updated_at, created_by)

Include:
1. Model or schema definition
2. All five endpoints: CREATE, READ one, LIST all (paginated), UPDATE, DELETE
3. Request and response shapes for each endpoint
4. Error handling with correct HTTP status codes
5. At least one integration test per endpoint

----------------------------------------------------------------

PROMPT 06 — MVP Boilerplate Scaffolder
Best for: Claude, ChatGPT
When to use: Starting a new project and want a clean, opinionated structure
             rather than fighting config from scratch.

You are an expert full-stack developer. Generate complete MVP boilerplate for:

Product description: [WHAT THE APP DOES IN 2 SENTENCES]
Tech stack:
- Frontend: [e.g., React 18 + TypeScript + TailwindCSS]
- Backend: [e.g., Node.js + Express / Python + FastAPI]
- Database: [e.g., PostgreSQL + Prisma ORM]
- Auth: [e.g., JWT, OAuth2, Clerk]
- Hosting target: [e.g., AWS, Vercel + Railway, Fly.io]

Generate:
1. Full project folder structure with every file listed
2. Core config files: package.json / pyproject.toml, tsconfig, .env.example,
   .gitignore, Dockerfile
3. Database schema or model definitions
4. Auth middleware wired up
5. A working health-check endpoint
6. README with setup instructions from git clone to running locally

----------------------------------------------------------------

PROMPT 07 — Comprehensive Unit Test Suite Writer
Best for: Claude, ChatGPT, Gemini
When to use: You have a function or class that needs serious test coverage,
             not just one or two happy-path checks.

Act as a lead QA engineer. Write a complete unit test suite for the following:

Code to test:
[PASTE FUNCTION OR CLASS HERE]

Testing framework: [e.g., Pytest, Jest, JUnit, RSpec]
Mock library: [e.g., unittest.mock, Jest mocks, Mockito]

The test suite must cover:
1. Happy path — expected inputs producing expected outputs
2. All boundary conditions — empty inputs, zero, max values, single items
3. All error and exception paths — what the code throws and when
4. Any null or undefined input scenarios
5. At least one property-based or fuzz test if the framework supports it

Each test must:
- Have a descriptive name that reads like a sentence (test_returns_error_when_email_is_invalid)
- Include an Arrange / Act / Assert comment structure
- Mock all external dependencies — no real network or DB calls
- Be fully deterministic — no randomness, no sleep(), no timing dependencies

----------------------------------------------------------------

PROMPT 08 — End-to-End Test Scenario Generator
Best for: Claude, Gemini
When to use: You need to test a full user flow across the UI and backend,
             not just isolated units.

You are a senior test automation engineer. Write end-to-end tests for the
following user flow:

User flow description:
[DESCRIBE THE FLOW STEP BY STEP — e.g., User lands on login page →
enters credentials → gets redirected to dashboard → creates a new project]

Test framework: [Playwright / Cypress / Selenium]
Application type: [Web / Mobile Web]
Base URL: [e.g., https://staging.myapp.com]

Generate tests covering:
1. Full happy path — every step succeeds as expected
2. Authentication edge cases — wrong password, expired session, locked account
3. Form validation errors — required fields missing, invalid formats
4. Network failure handling — what the UI shows when the API is down
5. Access control — a user trying to reach a resource they should not see

Each test must include:
- Page Object Model structure (separate selectors from test logic)
- Retry logic for flaky async waits
- Screenshots on failure
- A teardown block that cleans up test data

----------------------------------------------------------------

PROMPT 09 — Mock and Stub Factory
Best for: Claude, ChatGPT
When to use: You need to isolate a unit from its dependencies for testing
             and want correctly structured mocks rather than brittle ones.

Act as a test infrastructure engineer. Create mocks and stubs for the
following external dependencies:

System under test:
[PASTE THE CODE THAT CALLS EXTERNAL SERVICES]

Dependencies to mock:
- [e.g., Stripe payment API]
- [e.g., SendGrid email service]
- [e.g., PostgreSQL database layer]

Mock framework: [Jest / Sinon / unittest.mock / Mockito]

For each dependency provide:
1. A factory function that returns a correctly typed mock
2. A success scenario response
3. A rate-limit or timeout error scenario response
4. A partial failure scenario (some items succeed, some fail)
5. A spy setup to assert the mock was called with the right arguments
6. A reset function to clear call history between tests

----------------------------------------------------------------

PROMPT 10 — Microservices Architecture Designer
Best for: Claude, ChatGPT, Gemini
When to use: You are designing a new system or breaking up a monolith and
             need a complete, opinionated architecture before writing code.

Act as a principal software architect. Design a microservices architecture for:

Application: [DESCRIBE WHAT THE SYSTEM DOES]
Expected scale: [e.g., 50,000 daily active users, 500 req/s at peak]
Team size: [e.g., 4 backend engineers, 2 frontend]
Current state: [Greenfield / Existing monolith to migrate]

Provide:
1. Service boundary definitions — each service, its single responsibility,
   and what it owns exclusively
2. Communication patterns — which services use REST, which use gRPC, which
   use async events (Kafka / RabbitMQ) and why
3. Data management strategy — which service owns which database, how you
   avoid cross-service DB joins
4. Service discovery and API gateway approach
5. Observability plan — distributed tracing, centralized logging, metrics
6. A text-based architecture diagram
7. Top 3 risks of this design and how to mitigate each

----------------------------------------------------------------

PROMPT 11 — System Design Interview-Style Breakdown
Best for: Claude, ChatGPT
When to use: Designing a large-scale system (URL shortener, Twitter clone,
             payment system, etc.) and want a rigorous structured breakdown.

You are a staff engineer. Walk through a complete system design for:

System: [e.g., Design a URL shortening service like bit.ly]
Scale requirements:
- Read:  [e.g., 10,000 requests per second]
- Write: [e.g., 100 new URLs per second]
- Storage: [e.g., 5 years of data, ~100 bytes per record]
Constraints: [e.g., global availability, <50ms read latency, no auth needed]

Structure your response as:
1. Requirements clarification — functional and non-functional
2. Capacity estimation — storage, bandwidth, memory calculations shown
3. High-level architecture diagram (text-based)
4. Core component deep-dives — database choice and schema, caching layer,
   hashing strategy, CDN usage
5. API design — endpoints, request/response shapes
6. Bottlenecks identified and how you would scale past each one
7. Trade-offs made and what you would do differently at 10x scale

----------------------------------------------------------------

PROMPT 12 — Design Pattern Implementer
Best for: Claude, ChatGPT, Grok
When to use: You know you need a pattern (Observer, Strategy, CQRS, Saga,
             etc.) but want a concrete, real-world implementation — not a
             textbook toy example.

Act as a software design expert. Implement the [PATTERN NAME] pattern for
the following real-world use case:

Use case: [DESCRIBE THE ACTUAL PROBLEM — e.g., "We have 12 different
          notification channels and adding a new one requires editing 6 files"]
Language: [LANGUAGE + VERSION]
Existing code to integrate with:
[PASTE RELEVANT EXISTING CODE IF ANY]

Provide:
1. An explanation of why this pattern fits this problem specifically
2. Full implementation of the pattern in the given language — not pseudocode
3. Integration example showing it wired into the existing code
4. What would need to change to add a new variant (the extensibility test)
5. The trade-offs of this pattern vs the most obvious alternative
6. One anti-pattern warning — the wrong way people commonly implement this

----------------------------------------------------------------

PROMPT 13 — Legacy Code Modernizer
Best for: Claude, ChatGPT
When to use: You have old code — callback hell, class-based React, Python 2,
             jQuery spaghetti — that needs bringing up to current standards.

Act as a senior engineer specializing in modernization. Refactor the
following legacy code to current best practices:

Legacy code:
[PASTE LEGACY CODE HERE]

Language version being migrated from: [e.g., Python 2.7, JavaScript ES5]
Language version to migrate to: [e.g., Python 3.12, TypeScript 5.4]
Framework changes: [e.g., class components → hooks, callbacks → async/await]
Constraints: [e.g., public API must not change, no new dependencies]

Provide:
1. A before/after comparison for every changed section
2. An explanation of each modernization and why it is better
3. Any behavior differences between old and new (even subtle ones)
4. A migration checklist if this is part of a larger codebase
5. Tests to verify the refactored version is behaviorally identical

----------------------------------------------------------------

PROMPT 14 — God Class / Large Function Decomposer
Best for: Claude, ChatGPT
When to use: You have a class or function that does far too much and needs
             breaking apart without breaking the behavior.

You are a software architect focused on clean code. Decompose the following
oversized code:

Code:
[PASTE THE LARGE CLASS OR FUNCTION]

Context: [What this code does in the system]
Constraints:
- [External API must remain unchanged: YES / NO]
- [Database schema is fixed: YES / NO]
- [Must not introduce new external dependencies: YES / NO]

Provide:
1. An analysis of the current responsibilities — list every distinct thing
   this code does
2. The proposed decomposition — what each new class or function is named,
   what it owns, and what it does not own
3. The full refactored code for each new unit
4. The updated caller code showing how the pieces connect
5. A characterization test for the original behavior that passes before
   and after the refactor

----------------------------------------------------------------

PROMPT 15 — Async/Await Migration Specialist
Best for: Claude, Grok
When to use: Converting callback-based or Promise-chain code to clean
             async/await with proper error handling.

Act as an async programming expert. Migrate the following code from
[callbacks / Promise chains] to clean async/await:

Code to migrate:
[PASTE CODE HERE]

Language: [JavaScript / TypeScript / Python]
Error handling requirement: [Crash fast / Recover and continue / Log and skip]
Concurrency requirement: [Sequential / Parallel where possible]

Provide:
1. The fully migrated code using async/await throughout
2. Proper try/catch placement — explain why each catch is placed where it is
3. Parallel execution using Promise.all or asyncio.gather where appropriate,
   with the reasoning for each parallelization decision
4. Handling of partial failures — what happens when one async call fails mid-flow
5. A side-by-side comparison showing how error handling changed
6. Any edge cases where async/await behaves differently from the original

----------------------------------------------------------------

PROMPT 16 — REST API Contract Designer
Best for: Claude, ChatGPT, Gemini
When to use: Designing a new API or auditing an existing one for consistency,
             correctness, and developer experience.

Act as an API design expert. Design (or audit) a RESTful API for:

Product/feature: [DESCRIBE WHAT THE API DOES]
Consumer: [Internal service / Mobile app / Third-party developers]
Auth method: [JWT / OAuth2 / API Key]

Resources to cover:
- [Resource 1]
- [Resource 2]

For each endpoint provide:
1. HTTP method and URL — following REST conventions strictly
2. Request body schema with field types and validation rules
3. Success response schema with HTTP status code
4. All error responses with status codes and machine-readable error codes
5. Pagination strategy for list endpoints
6. Rate limiting headers to include
7. Versioning approach (URI / header / query param) and the reasoning

Also provide:
- Naming consistency rules for this API (casing, pluralization, nesting depth)
- One complete OpenAPI YAML snippet for the most complex endpoint
- Three API design decisions you made and what alternatives you rejected

----------------------------------------------------------------

PROMPT 17 — GraphQL Schema Builder
Best for: Claude, ChatGPT
When to use: Designing a GraphQL API from scratch or migrating from REST,
             and want a complete, resolver-connected schema.

You are a GraphQL architect. Design a complete GraphQL schema for:

Domain: [DESCRIBE THE BUSINESS DOMAIN]
Key entities: [LIST THE MAIN DATA TYPES]
Auth context: [How user identity is passed — JWT in header, etc.]
Primary consumers: [Web app / Mobile / Both]

Deliver:
1. Full SDL schema — all types, queries, mutations, subscriptions
2. Input types with validation directives
3. Resolver signatures for every query and mutation
4. DataLoader setup to prevent N+1 query problems — show the batching logic
5. Error handling approach — union types vs extensions vs throwing
6. Pagination: implement Relay-spec cursor-based pagination on at least
   one list field
7. An example query and its expected response for the most complex operation

----------------------------------------------------------------

PROMPT 18 — GitHub Actions CI/CD Pipeline Builder
Best for: ChatGPT, Claude, Gemini
When to use: Setting up or improving a CI/CD pipeline — want a real,
             working YAML file, not a generic template.

Act as a DevOps engineer. Write a complete GitHub Actions CI/CD pipeline for:

Stack:
- Language and version: [e.g., Node.js 20 / Python 3.12]
- Framework: [e.g., Next.js, FastAPI, Django]
- Test framework: [e.g., Jest, Pytest]
- Containerized: [YES / NO]

Deployment target: [e.g., AWS ECS, Vercel, Fly.io, GCP Cloud Run]
Branch strategy: [e.g., main → production, develop → staging]
Secrets to use: [list the secret names — e.g., AWS_ACCESS_KEY, DOCKER_TOKEN]

The pipeline must include:
1. Trigger conditions — push, pull_request, manual dispatch
2. Lint and format check job
3. Unit and integration test job with coverage report uploaded as artifact
4. Docker image build (multi-stage, minimal final image) and push to registry
5. Deployment job with environment protection rules
6. Rollback step triggered on deployment failure
7. Slack or email notification on pipeline success and failure

----------------------------------------------------------------

PROMPT 19 — Dockerfile Optimizer
Best for: Claude, ChatGPT, Gemini
When to use: Your Docker images are too large, builds are slow, or your
             Dockerfile has security or caching problems.

You are a containerization expert. Review and optimize the following Dockerfile:

Current Dockerfile:
[PASTE DOCKERFILE HERE]

Application type: [e.g., Python web app, Node.js API, Go binary]
Current image size: [if known]
Current build time: [if known]
Production or dev image: [PRODUCTION / DEV / BOTH NEEDED]

Provide:
1. An analysis of every problem in the current Dockerfile — wrong base image,
   cache-busting mistakes, running as root, unnecessary layers, large files
2. A fully optimized multi-stage Dockerfile with comments on each decision
3. A .dockerignore file
4. The expected size and build time improvement
5. Security hardening steps applied — non-root user, read-only filesystem,
   no unnecessary packages
6. Docker Compose snippet for local development with hot reload

----------------------------------------------------------------

PROMPT 20 — Infrastructure as Code Generator (Terraform)
Best for: Claude, ChatGPT, Gemini
When to use: Standing up cloud infrastructure and want production-grade
             Terraform rather than click-ops.

Act as a cloud infrastructure engineer. Write Terraform code to provision:

Cloud provider: [AWS / GCP / Azure]
Infrastructure needed:
- [e.g., ECS cluster with auto-scaling]
- [e.g., RDS PostgreSQL with read replica]
- [e.g., CloudFront CDN in front of S3]
- [e.g., VPC with public and private subnets]

Environment: [dev / staging / prod — or all three using workspaces]
State backend: [S3 + DynamoDB / GCS / Terraform Cloud]

Generate:
1. Full Terraform module structure (main.tf, variables.tf, outputs.tf,
   versions.tf) for each resource
2. All variables with types, descriptions, and sensible defaults
3. Outputs for all values needed by other systems (ARNs, endpoints, IPs)
4. Remote state config and locking
5. Tagging strategy applied consistently across all resources
6. A README explaining how to run plan and apply for each environment

----------------------------------------------------------------

PROMPT 21 — Developer Documentation Writer
Best for: Claude, ChatGPT
When to use: You need real documentation — not just inline comments, but
             proper reference docs a new team member can use.

Act as a technical writer with deep engineering experience. Write complete
developer documentation for:

Code:
[PASTE FUNCTION, CLASS, OR MODULE]

Audience: [Junior devs on the team / External API consumers / Both]
Documentation format: [Markdown / Sphinx RST / JSDoc / OpenAPI]

Structure the documentation as:
1. Overview — purpose, when to use this, and when NOT to use this
2. Prerequisites and dependencies
3. API reference — every method, parameter, return type, and exception,
   with types clearly stated
4. Three real usage examples progressing from simple to complex
5. Common errors with their causes and solutions
6. Performance notes — time complexity, known bottlenecks, recommended limits
7. Changelog section (stub with the current version and date)

----------------------------------------------------------------

PROMPT 22 — Technical Specification Writer
Best for: Claude, ChatGPT, Gemini
When to use: A feature needs a proper spec before development starts —
             something engineers, PMs, and QA can all work from.

You are a staff engineer. Write a complete technical specification for:

Feature name: [FEATURE NAME]
Problem it solves: [WHY THIS IS BEING BUILT]
Stakeholders: [Who requested it, who it affects]

Document must cover:
1. Functional requirements — what the system must do, written as
   numbered acceptance criteria
2. Non-functional requirements — performance targets, availability SLA,
   security requirements, compliance constraints
3. Technical approach — chosen solution and the 2 alternatives rejected
   with reasoning
4. Data model changes — new tables, fields, or schema migrations required
5. API contracts — new or changed endpoints with request/response shapes
6. Sequence diagram (text-based) for the primary flow
7. Testing strategy — unit, integration, and E2E coverage expectations
8. Rollout plan — feature flag, canary, or full release, with rollback steps
9. Open questions that must be resolved before development starts

----------------------------------------------------------------

PROMPT 23 — README Generator
Best for: Claude, ChatGPT, Grok
When to use: Your repo needs a proper README that actually helps people
             get started — not the default one-liner.

Act as a developer advocate. Write a complete README.md for:

Project name: [PROJECT NAME]
What it does: [ONE PARAGRAPH DESCRIPTION]
Tech stack: [LIST LANGUAGES, FRAMEWORKS, DATABASES USED]
Target audience: [Who will use this — developers, end users, both]

The README must include:
1. Project banner section with name, one-line description, and badges
   (build status, coverage, license, version)
2. Features list — what makes this worth using
3. Prerequisites — exact versions required
4. Installation — step-by-step from git clone to running, with every command
5. Configuration — every environment variable documented with type,
   default, and whether it is required
6. Usage examples — at least 3 real-world examples with code blocks
7. API reference section (or link to full docs)
8. Contributing guide — branch naming, PR process, test requirements
9. License section

----------------------------------------------------------------

PROMPT 24 — Performance Profiling & Optimization Guide
Best for: Claude, ChatGPT, Gemini
When to use: Your app is slow and you need a structured approach to finding
             and fixing bottlenecks — not random micro-optimizations.

Act as a performance engineer. Profile and optimize the following:

Code or system description:
[PASTE CODE OR DESCRIBE THE SYSTEM BOTTLENECK]

Current performance: [e.g., p50: 200ms, p99: 4000ms, throughput: 120 req/s]
Target performance: [e.g., p99 < 500ms, throughput > 1000 req/s]
Profiling data available: [PASTE FLAME GRAPH TEXT / QUERY PLANS / NONE]

Provide:
1. Profiling approach — exact commands to run to gather data before touching code
2. Bottleneck analysis — what is actually slow and why, with evidence
3. Optimization plan ranked by expected impact vs implementation effort
4. Optimized code for each change
5. Before/after benchmark methodology — how to measure that the fix worked
6. Caching opportunities — what to cache, at what layer, with TTL reasoning
7. The one change that will give the biggest win and should be done first

----------------------------------------------------------------

PROMPT 25 — Algorithm Complexity Analyzer & Optimizer
Best for: Claude, ChatGPT
When to use: You suspect an algorithm is inefficient but want a rigorous
             analysis before rewriting it.

You are a computer science expert. Analyze and optimize the following algorithm:

Code:
[PASTE THE ALGORITHM]

Input characteristics:
- Typical input size: [e.g., n = 1,000 / n = 10,000,000]
- Input data shape: [e.g., nearly sorted, random, many duplicates]
- Memory constraint: [e.g., must run in O(1) extra space]

Provide:
1. Time complexity analysis of the current implementation with the derivation
   shown — not just the Big-O notation
2. Space complexity analysis
3. The specific input that hits the worst case
4. An optimized implementation with its complexity analysis
5. The trade-off between time and space for the optimized version
6. A benchmark comparing the original and optimized versions with sample inputs
7. When the original is actually preferable (small n, readability, etc.)

----------------------------------------------------------------

PROMPT 26 — Database Schema Designer
Best for: Claude, ChatGPT, Gemini
When to use: Designing a database from requirements — want a normalized,
             indexed schema rather than figuring it out as you go.

Act as a senior database architect. Design the database schema for:

System description: [WHAT THE SYSTEM DOES]
Database: [PostgreSQL / MySQL / MongoDB / DynamoDB]
Approximate scale: [rows per table at 1 year, read/write ratio]
Access patterns (list the most frequent queries):
- [e.g., fetch all orders for a user, sorted by date]
- [e.g., count active subscriptions per plan]

Deliver:
1. Full schema with every table, column, data type, and constraint
2. Primary keys, foreign keys, and unique constraints with reasoning
3. Indexes — which columns get indexes, what type (B-tree, GIN, partial),
   and why each one is needed for the stated access patterns
4. Normalization analysis — why you chose the normal form you did, and
   any deliberate denormalization with justification
5. Migration SQL to create the schema from scratch
6. Seed SQL with realistic sample data for local development

----------------------------------------------------------------

PROMPT 27 — Database Migration Script Writer
Best for: Claude, ChatGPT
When to use: You need to alter a production schema safely without downtime
             or data loss.

You are a database reliability engineer. Write a safe migration for:

Current schema:
[PASTE CURRENT TABLE DEFINITIONS]

Required change: [DESCRIBE WHAT NEEDS TO CHANGE — e.g., add column,
                 rename column, split table, add index on large table]

Database: [PostgreSQL / MySQL]
Table size: [approximate row count and table size in GB]
Downtime allowed: [ZERO / MAINTENANCE WINDOW OF X MINUTES]

Provide:
1. The migration SQL — using a safe, non-blocking approach for large tables
2. A rollback SQL script to undo every change cleanly
3. Backfill strategy if adding a non-null column to an existing table
4. Index creation strategy — CONCURRENTLY for PostgreSQL, ALGORITHM=INPLACE
   for MySQL, with estimated time based on table size
5. Pre-migration checklist — things to verify before running
6. Post-migration verification queries to confirm the change succeeded

----------------------------------------------------------------

PROMPT 28 — Framework Version Migration Planner
Best for: Claude, ChatGPT
When to use: Upgrading a major framework version (React 17→18, Django 3→5,
             Next.js 13→15, etc.) and need a complete, safe migration plan.

Act as a migration specialist. Plan the upgrade from [FRAMEWORK vX] to
[FRAMEWORK vY] for:

Current codebase size: [e.g., 80,000 lines, 200 components, 40 API routes]
Current version: [EXACT CURRENT VERSION]
Target version: [EXACT TARGET VERSION]
Key dependencies that must also be upgraded: [LIST THEM]

Produce:
1. Breaking changes — every breaking change between current and target version
   that applies to this type of codebase
2. File-by-file migration strategy — which files to change first and why
3. Codemods available — automated migration scripts from the framework's
   official tooling, with exact commands
4. Manual changes required — things codemods cannot handle
5. A phased rollout plan — how to migrate incrementally without a big-bang
   cutover
6. Testing checkpoints at each phase before proceeding
7. A rollback plan if the migration needs to be aborted mid-way

----------------------------------------------------------------

PROMPT 29 — Monolith to Microservices Migration Planner
Best for: Claude, ChatGPT, Gemini
When to use: Breaking apart an existing monolith — need a realistic,
             incremental plan rather than a risky big rewrite.

You are a principal architect. Plan the migration of the following monolith
to microservices:

Monolith description:
[DESCRIBE THE CURRENT SYSTEM — language, framework, database, rough size]

Pain points driving the migration:
- [e.g., deploy frequency is blocked by one slow team]
- [e.g., one module consumes all memory and starves others]

Team structure: [NUMBER OF TEAMS AND THEIR DOMAINS]
Downtime tolerance: [ZERO / PLANNED WINDOWS]

Produce:
1. Domain analysis using Domain-Driven Design — proposed bounded contexts
   and which module of the monolith maps to each
2. The Strangler Fig migration sequence — which service to extract first,
   second, third, and why in that order
3. The data ownership split — how shared database tables get separated
   without breaking running features
4. The anti-corruption layer design for the transition period
5. Feature flag strategy to route traffic between old and new code
6. Success metrics to confirm each extracted service is ready to own its domain
7. Estimated timeline per extraction with team size assumptions

----------------------------------------------------------------

PROMPT 30 — Pull Request Reviewer
Best for: Claude, Grok, ChatGPT
When to use: Reviewing a PR and want a structured, senior-level review that
             goes beyond style comments.

Act as a senior engineer doing a thorough pull request review. Review the
following diff:

PR diff:
[PASTE THE DIFF OR CHANGED CODE]

PR description: [WHAT THIS PR IS SUPPOSED TO DO]
Codebase context: [LANGUAGE, FRAMEWORK, WHAT THE SURROUNDING SYSTEM DOES]
Review focus: [All issues / Security only / Performance only / Logic only]

Provide your review as:
1. Summary — does this PR do what the description claims? Yes / No / Partially
2. Critical blockers — bugs, security holes, or data loss risks that must be
   fixed before merge (tag each: BUG / SECURITY / DATA)
3. Important improvements — not blockers but strongly recommended changes
4. Nitpicks — style or minor improvements the author can take or leave
5. Positive callouts — what was done well (required — at least one)
6. Suggested test cases the PR is missing
7. A merge recommendation: APPROVE / APPROVE WITH MINOR CHANGES / REQUEST CHANGES

----------------------------------------------------------------

PROMPT 31 — Architecture Decision Record (ADR) Writer
Best for: Claude, ChatGPT
When to use: You made a significant technical decision and need to document
             it in a way the team can reference and revisit later.

Act as a staff engineer. Write an Architecture Decision Record for:

Decision being made: [e.g., "Choose between PostgreSQL and DynamoDB for
                     the user-events store"]
Context: [WHAT PROBLEM TRIGGERED THIS DECISION]
Decision maker(s): [WHO IS MAKING THIS CALL]
Date: [TODAY'S DATE]

The ADR must include:
1. Status: [Proposed / Accepted / Deprecated / Superseded by ADR-XXX]
2. Context — the full situation that requires a decision, including constraints
3. Decision — exactly what was decided, stated clearly
4. Options considered — at least 3, each with honest pros and cons
5. Consequences — what becomes easier, what becomes harder, what risks
   are accepted by this decision
6. Dissenting opinions — if any team members disagreed, record their concern
7. Review date — when this decision should be revisited

----------------------------------------------------------------

PROMPT 32 — React Component Architect
Best for: Claude, ChatGPT, Gemini
When to use: Building a non-trivial React component and want it done
             properly — typed, accessible, tested, and reusable.

You are a senior React engineer. Build a production-ready React component for:

Component purpose: [DESCRIBE EXACTLY WHAT IT DOES]
Framework: React [VERSION] + TypeScript [VERSION]
Styling: [TailwindCSS / CSS Modules / Styled Components / plain CSS]
State management: [Local state only / Zustand / Redux / Context]

Requirements:
- [e.g., handles both controlled and uncontrolled usage]
- [e.g., supports keyboard navigation and screen readers]
- [e.g., renders a virtualized list of 10,000+ items]

Deliver:
1. Full TypeScript component with Props interface documented via JSDoc
2. All state and side effects handled cleanly — no stale closures, no
   unnecessary re-renders
3. Accessibility: correct ARIA roles, keyboard event handling, focus management
4. Error boundary integration
5. A Storybook story with at least 3 variants (default, loading, error state)
6. Unit tests with React Testing Library covering user interactions

----------------------------------------------------------------

PROMPT 33 — Frontend Performance Auditor
Best for: Claude, Gemini
When to use: Your web app is slow on load or during interaction and you need
             a structured audit, not guesswork.

Act as a frontend performance specialist. Audit the following for performance
issues:

Code or system:
[PASTE COMPONENT TREE, BUNDLE CONFIG, OR DESCRIBE THE SETUP]

Observed problems:
- [e.g., LCP > 4s, FID > 200ms, bundle size 2.4MB]
- [e.g., laggy scroll on the product listing page]

Tech stack: [React / Next.js / Vue / plain JS] + [bundler: Webpack/Vite/etc.]

Audit across:
1. Bundle size — unnecessary dependencies, duplicate packages, missing
   tree-shaking, unoptimized images
2. Render performance — unnecessary re-renders, missing memoization, heavy
   computations on the main thread
3. Loading strategy — code splitting opportunities, lazy loading, preloading
   critical resources, font loading
4. Core Web Vitals impact — what specifically hurts LCP, CLS, and INP
5. Provide the top 5 fixes ranked by impact, with implementation code
   for each and the expected metric improvement

----------------------------------------------------------------

PROMPT 34 — Codebase Onboarding Accelerator
Best for: Claude, Gemini
When to use: You just joined a team or inherited a repo and need to
             understand how it works quickly.

Act as a principal engineer onboarding a new senior developer. Analyze the
following codebase excerpt or description and produce a complete onboarding
guide:

Codebase:
[PASTE KEY FILES OR DESCRIBE THE REPO STRUCTURE]

Language and framework: [LANGUAGE + FRAMEWORK]
My background: [e.g., strong Python background, new to Django]

Produce:
1. Architecture overview — the main layers and how data flows through them
   from a user request to a database response and back
2. Module map — what each major directory and file does in one sentence
3. The 5 most important files to read first and why
4. Key conventions this codebase uses that differ from standard practices
5. The most common task a developer does (e.g., add a new API endpoint) —
   walk through it step by step
6. Known gotchas, tech debt areas, and things to be careful about
7. Glossary of domain-specific terms used in the codebase

----------------------------------------------------------------

PROMPT 35 — Code-to-Flowchart Explainer
Best for: Claude, ChatGPT, Grok
When to use: You need to explain complex logic to a non-technical stakeholder,
             write documentation, or simply understand a tangled flow yourself.

Act as a technical communicator. Take the following code and produce a
complete, plain-English explanation of the logic flow:

Code:
[PASTE CODE HERE]

Audience: [Non-technical PM / Junior developer / QA engineer]
Purpose of this explanation: [Documentation / Stakeholder demo / Team review]

Provide:
1. A plain-English summary of what this code does in 3–5 sentences,
   no jargon
2. A numbered step-by-step walkthrough of the execution path —
   what happens first, what decision is made, what branches are possible
3. A text-based flowchart showing every branch and decision point
4. The most likely failure point and what triggers it
5. Three questions a non-technical stakeholder would likely ask, with answers
6. One sentence explaining the business purpose this code serves
`;

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const chunks = rawText.split('----------------------------------------------------------------');

const parsedPrompts = chunks.map((chunk, i) => {
  const lines = chunk.trim().split('\n');
  const titleLine = lines.find(l => l.startsWith('PROMPT'));
  if (!titleLine) return null;

  const titleMatch = titleLine.match(/PROMPT \d+\s*—\s*(.*)/);
  const title = titleMatch ? titleMatch[1].trim() : "Unknown Title";

  const bestForLine = lines.find(l => l.startsWith('Best for:'));
  const platformsStr = bestForLine ? bestForLine.replace('Best for:', '').trim() : '';
  const platforms = platformsStr.split(',').map(s => s.trim().toLowerCase());

  const whenToUseStart = lines.findIndex(l => l.startsWith('When to use:'));
  let useCase = "";
  let promptBodyStartIndex = whenToUseStart + 1;
  if (whenToUseStart !== -1) {
    const useCaseLines = [];
    useCaseLines.push(lines[whenToUseStart].replace('When to use:', '').trim());
    for (let j = whenToUseStart + 1; j < lines.length; j++) {
      if (lines[j].trim() === '') {
        promptBodyStartIndex = j + 1;
        break;
      }
      useCaseLines.push(lines[j].trim());
    }
    useCase = useCaseLines.join(' ');
  }

  const promptLines = lines.slice(promptBodyStartIndex);
  const promptBody = promptLines.join('\n').trim();

  // Create a description (short version of usecase)
  let description = useCase;
  if (description.length > 120) {
    description = description.substring(0, 117) + '...';
  }

  return {
    id: `code-${String(i + 11).padStart(3, '0')}`,
    slug: slugify(title),
    title: title,
    description: description,
    prompt: promptBody,
    category: "code-dev",
    platforms: platforms,
    tags: ["coding", "development", title.split(' ')[0].toLowerCase()],
    difficulty: "intermediate",
    featured: false,
    source: "Community",
    useCase: useCase
  };
}).filter(Boolean);

const existingPath = path.join('d:', 'Prompt', 'newjson', 'code-dev.json');
let existing = JSON.parse(fs.readFileSync(existingPath, 'utf-8'));

// Only add those not already in the existing array (by slug)
for (const p of parsedPrompts) {
  if (!existing.some(e => e.slug === p.slug)) {
    existing.push(p);
  }
}

fs.writeFileSync(existingPath, JSON.stringify(existing, null, 2));
console.log(`Added ${parsedPrompts.length} prompts. Total is now ${existing.length}.`);

// Also update categories.json
const catPath = path.join('d:', 'Prompt', 'newjson', 'categories.json');
const cats = JSON.parse(fs.readFileSync(catPath, 'utf-8'));
const devCat = cats.find(c => c.slug === 'code-dev');
if (devCat) {
  devCat.count = existing.length;
}
fs.writeFileSync(catPath, JSON.stringify(cats, null, 2));
console.log(`Updated categories.json code-dev count to ${existing.length}.`);

