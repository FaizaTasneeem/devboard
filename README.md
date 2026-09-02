# DevBoard - Developer Dashboard & GitHub Analytics

[![React](https://img.shields.io/badge/React-v19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-v5-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)](https://tanstack.com/query/latest)
[![Express.js](https://img.shields.io/badge/Express.js-v5-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-v0.45-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black)](https://orm.drizzle.team/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-v7-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![Vite](https://img.shields.io/badge/Vite-v8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

**DevBoard** is a sleek, high-performance developer dashboard engineered for discovering GitHub repositories, inspecting live repository analytics, exploring open issues, and maintaining a custom annotated Watchlist.

Built using **React 19**, **TypeScript**, **Express.js**, **Drizzle ORM + PostgreSQL**, and **TanStack Query v5**, this project showcases production-grade full-stack architecture, real-time query caching, optimistic UI updates, debounced URL search state synchronization, secure server-side API proxying, and relational database persistence.

🚀 **Ready for Portfolio / CV Showcase**

🔗 **Live Demo:** [devboard-gold.vercel.app](https://devboard-gold.vercel.app/)

---

## 🛠️ Key Technical Highlights & Architecture

### 1. Server-Side GitHub API Proxy & Express REST Backend
- **Secure Token Proxying**: Integrated a **Node.js Express backend API** (`api/index.ts`) that proxies GitHub API requests (`/api/repos`, `/api/repoDetails`, `/api/issues`), securing sensitive `GITHUB_TOKEN` credentials server-side and bypassing browser CORS/rate-limiting issues.
- **RESTful Watchlist Endpoints**: Modular Express router (`api/routes/watchlistRoutes.ts`) handling CRUD interactions (`/api/watchlist/getList`, `/create`, `/update/:id`, `/delete/:id`).

### 2. Relational Database Persistence (`Drizzle ORM` + `PostgreSQL`)
- **Type-Safe Data Layer**: Configured **Drizzle ORM** with **PostgreSQL** schema definitions (`src/db/schema.ts`), replacing mock file-system storage with production-grade relational persistence for pinned watchlist repositories and personal notes.
- **Global Connection Pooling**: Configured server connection pooling (`src/db/index.ts`) with global pool caching for seamless scalability and hot-reloading support.

### 3. Advanced Async State & Cache Management (`TanStack Query v5`)
- **Infinite Query Pagination**: Implemented `useInfiniteQuery` in both repository search and issue tracking views to deliver seamless continuous data fetching (`fetchNextPage`).
- **Automatic Cache Invalidation & Refetching**: Integrated Query Keys (`['repo', query]`, `['watchlist']`, `['issues', owner, name]`) to minimize redundant network calls while guaranteeing data freshness.
- **DevTools Integration**: Configured `@tanstack/react-query-devtools` for inspecting cache states during development.

### 4. Optimistic UI Updates with Failure Rollback
- **Zero-Latency Interactions**: Watchlist additions, deletions, and note edits trigger immediate UI updates *before* server confirmation.
- **Resilient Mutation Lifecycles**: Leveraged `onMutate`, `onError`, `onSettled`, and `cancelQueries` to snapshot previous query state and perform automatic rollback on backend mutation failures.

### 5. Debounced Search & URL Synchronization
- **Rate Limit Protection**: Built custom 500ms client-side debouncing (`useEffect` timer cleanup) on search inputs to eliminate unnecessary API calls.
- **Shareable State**: Query params seamlessly sync with browser history via `useSearchParams` from React Router v7, allowing deep-linking and state restoration upon refresh.

### 6. Infinite Scrolling & Declarative Error Handling
- **Viewport Observer**: Attached `react-intersection-observer` (`useInView`) to dynamically trigger `fetchNextPage()` whenever the viewport reaches the bottom sentinel node.
- **UI Error Boundary**: Wrapped view components with **`react-error-boundary`** (`ErrorFallback.tsx`) for graceful fallback rendering upon network errors.

---

## ⚡ Technology Stack & Engineering Tools

| Domain | Technology / Library | Purpose & Rationale |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 19** + **Babel React Compiler** | High-performance component-driven architecture with automatic memoization. |
| **Backend API** | **Express 5** + **Node.js** | Lightweight REST server handling API routing, CORS, and server-side API proxying. |
| **Database & ORM** | **Drizzle ORM** + **PostgreSQL** (`pg`) | Type-safe database queries and relational storage for watchlist repositories and user notes. |
| **Language** | **TypeScript 6** | End-to-end type safety, strict interface definitions (`Repository`, `Issue`, `WatchlistType`), and runtime error prevention. |
| **State & Async Data** | **TanStack Query v5** | Server-state management, caching, background polling, and mutation management. |
| **Styling & UI** | **Tailwind CSS v4** + **React Icons** | Modern dark-mode aesthetic with utility-first responsive layout design. |
| **Error Handling** | **`react-error-boundary`** | Declarative error boundary fallback rendering. |
| **Routing** | **React Router v7** | Client-side routing with route-level query parameter synchronization. |
| **HTTP Client** | **Axios** | Standardized asynchronous REST requests for client and server HTTP calls. |
| **Build Tooling** | **Vite 8** | Lightning-fast HMR and optimized production bundling. |

---

## 📂 Directory & Architecture Overview

```text
devboard/
├── api/                          # Express backend API server
│   ├── config/
│   │   └── env.ts                # Environment variable loader
│   ├── routes/
│   │   └── watchlistRoutes.ts    # Watchlist CRUD routes (/api/watchlist)
│   ├── index.ts                  # Express app setup & GitHub proxy routes
│   └── server.ts                 # Server entrypoint (npm run server)
├── drizzle/                      # Database migrations
├── public/                       # Static assets
├── src/
│   ├── components/
│   │   ├── Dashboard.tsx         # Primary dashboard layout & search orchestrator
│   │   ├── ErrorFallback.tsx     # Error boundary fallback UI
│   │   ├── Logo.tsx              # Branding component
│   │   ├── NoResultsFound.tsx    # Empty search state component
│   │   ├── OpenIssues.tsx        # Paginated open issue list with visual label tags
│   │   ├── RepoDetails.tsx       # Deep-dive view (metadata, stars, forks, licenses, topics)
│   │   ├── RepoSearchPlaceholder.tsx # Initial state UI
│   │   ├── SearchResults.tsx     # Repository list cards with watchlist toggle
│   │   ├── Watchlist.tsx         # Sidebar watchlist panel with cache-optimistic controls
│   │   └── WatchlistItemNote.tsx # Debounced note editing component
│   ├── db/
│   │   ├── index.ts              # Drizzle ORM PostgreSQL connection pool setup
│   │   └── schema.ts             # Watchlist database table schema definition
│   ├── hooks/
│   │   ├── useIssueQueries.ts    # TanStack infinite query hooks for open issues
│   │   ├── useRepoQueries.ts     # Search & repository detail query hooks
│   │   └── useWatchlistQueries.ts # Optimistic watchlist mutation & fetch hooks
│   ├── services/
│   │   ├── githubApi.ts          # Axios wrapper calling backend GitHub proxy endpoints
│   │   └── watchlistApi.ts       # Axios wrapper calling backend Watchlist endpoints
│   ├── types/
│   │   └── index.ts              # TypeScript interfaces (Repository, Issue, WatchlistType)
│   ├── App.tsx                   # App wrapper with ErrorBoundary
│   ├── Router.tsx                # React Router v7 routes (`/` and `/repo/:owner/:name`)
│   └── main.tsx                  # QueryClientProvider & Root mounting point
├── .env                          # Environment variables
├── drizzle.config.ts             # Drizzle Kit configuration
├── package.json                  # Dependencies & scripts (`dev`, `server`, `build`)
├── tsconfig.json                 # TypeScript configuration
└── vite.config.ts                # Vite build plugin setup
```

---

## 🚀 Getting Started & Installation Guide

### Prerequisites
- **Node.js**: v18.x or higher
- **PostgreSQL**: Cloud database (e.g. Neon, Supabase) or local Postgres instance

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory:
```env
# Backend & Database Configuration
PORT=5000
FRONTEND_ORIGIN=http://localhost:5173
DATABASE_URL=your_postgresql_connection_string
GITHUB_TOKEN=your_github_personal_access_token

# Frontend Configuration
VITE_BACKEND_SERVER=http://localhost:5000/api
```

### 3. Run the Backend API Server
In one terminal, launch the Express REST server:
```bash
npm run server
```

### 4. Launch the Frontend Development Server
In a second terminal, launch the Vite dev server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to explore the dashboard!

---

## 🛡️ Engineering Highlights

- **Performance-First Design**: Optimized API calls using debounced state updates, pagination chunks, and conditional query execution (`enabled: query.length > 0`).
- **Production-Ready Security**: Passes sensitive tokens on the server backend rather than exposing them client-side in the browser.
- **Relational Data Integrity**: Strict schema definitions in PostgreSQL with type-safe access via Drizzle ORM.
- **Robust Error Handling**: Dedicated loading states, error boundary fallbacks, and defensive data checking across all async interactions.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for details.
