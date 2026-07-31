# 🚀 DevBoard — Developer Repository & Issue Intelligence Dashboard

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-v5-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)](https://tanstack.com/query/latest)
[![Vite](https://img.shields.io/badge/Vite-8.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-v7-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)](https://reactrouter.com/)

**DevBoard** is a sleek, high-performance developer dashboard engineered for discovering GitHub repositories, inspecting live repository analytics, exploring open issues, and maintaining a custom annotated Watchlist. 

Built using **React 19**, **TypeScript**, and **TanStack Query v5**, this project showcases production-grade frontend architecture, real-time query caching, optimistic UI updates, debounced URL search state synchronization, and infinite scrolling.

---

## 🌟 Key Technical Highlights & Architecture

### ⚡ 1. Advanced Async State & Cache Management (`TanStack Query v5`)
- **Infinite Query Pagination**: Implemented `useInfiniteQuery` in both repository search and issue tracking pages to deliver seamless continuous data fetching (`fetchNextPage`).
- **Automatic Cache Invalidation & Refetching**: Integrated Query Keys (`['repo', query]`, `['watchlist']`, `['issues', owner, name]`) to minimize redundant network calls while guaranteeing data freshment.
- **DevTools Integration**: Configured `@tanstack/react-query-devtools` for inspecting cache states during development.

### 🔄 2. Optimistic UI Updates with Failure Rollback
- **Zero-Latency Interactions**: Watchlist additions and deletions trigger immediate UI updates *before* server confirmation.
- **Resilient Mutation Lifecycles**: Leveraged `onMutate`, `onError`, `onSettled`, and `cancelQueries` to snapshot previous query state and perform automatic rollback on backend mutation failures.

### 🔍 3. Debounced Search & URL Synchronization
- **Rate Limit Protection**: Built custom 500ms client-side debouncing (`useEffect` timer cleanup) on search inputs to eliminate unnecessary GitHub API calls.
- **Shareable State**: Query params seamlessly sync with browser history via `useSearchParams` from React Router v7, allowing deep-linking and state restoration upon refresh.

### 📜 4. Infinite Scrolling with Intersection Observer
- Seamlessly attached `react-intersection-observer` (`useInView`) to dynamically trigger `fetchNextPage()` whenever the viewport reaches the bottom sentinel node.

### 📝 5. Persistent Repository Annotations (CRUD REST API)
- Integrated Axios with local REST endpoints (`http://localhost:4000/watchlist`) allowing developers to pin favorite repositories and attach auto-saving personal notes.

### ⏱️ 6. Cache Tuning (`staleTime` vs `gcTime`)
- **Configured `staleTime` (60s)**: Configured `staleTime: 1000 * 60` (60 seconds) in `QueryClient` defaults.
- **Why Tune `staleTime`**: By default, TanStack Query sets `staleTime: 0`, marking data as stale immediately upon fetch. This causes background refetches every time the user refocuses the browser window or navigates between tabs. Setting `staleTime` to 60s keeps fetched GitHub repository data fresh for 1 minute, preventing unnecessary GitHub REST API calls and protecting against rate limits.

---

## 🛠️ Technology Stack & Engineering Tools

| Domain | Technology / Library | Purpose & Rationale |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 19** + **Babel React Compiler** | High-performance component-driven architecture with automatic memoization. |
| **Language** | **TypeScript 6** | End-to-end type safety, strict interface definitions (`Repository`, `Issue`), and runtime error prevention. |
| **State & Async Data** | **TanStack Query v5** | Server-state management, caching, background polling, and mutation management. |
| **Styling & UI** | **Tailwind CSS v4** + **React Icons** | Modern dark-mode aesthetic with utility-first responsive layout design. |
| **Routing** | **React Router v7** | Client-side routing with route-level query parameter synchronization. |
| **HTTP Client** | **Axios** | Standardized asynchronous REST requests with bearer token authorization header injection. |
| **Build Tooling** | **Vite 8** | Lightning-fast HMR and optimized production bundling. |

---

## 📂 Directory & Architecture Overview

```text
devboard/
├── public/                 # Static assets
├── src/
│   ├── api/
│   │   └── axios.ts        # Axios client instance & watchlist CRUD service methods
│   ├── components/
│   │   ├── Dashboard.tsx               # Primary dashboard layout & search orchestrator
│   │   ├── Logo.tsx                    # Branding component
│   │   ├── NoResultsFound.tsx          # Empty search state component
│   │   ├── OpenIssues.tsx              # Paginated open issue list with visual label tags
│   │   ├── RepoDetails.tsx             # Deep-dive view (metadata, stars, forks, licenses, topics)
│   │   ├── RepoSearchPlaceholder.tsx   # Initial state UI
│   │   ├── SearchResults.tsx           # Repository list cards with watchlist toggle
│   │   ├── Watchlist.tsx               # Sidebar watchlist panel with cache-optimistic controls
│   │   └── WatchlistItemNote.tsx       # Debounced note editing component
│   ├── data/
│   │   └── db.json         # Mock database backend for JSON Server (Watchlist CRUD)
│   ├── types/
│   │   └── index.ts        # Strictly typed TypeScript interfaces (Repository, Issue, Label)
│   ├── App.tsx             # App wrapper
│   ├── Router.tsx          # React Router v7 routes (`/` and `/repo/:owner/:name`)
│   └── main.tsx            # QueryClientProvider & Root mounting point
├── package.json            # Project dependencies & scripts
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build plugin setup
```

---

## ⚙️ Getting Started & Installation Guide

### Prerequisites
- **Node.js**: v18.x or higher
- **npm** or **pnpm** / **yarn**

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/your-username/devboard.git
cd devboard
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory and add your GitHub Personal Access Token (PAT) to prevent API rate limiting:
```env
VITE_GITHUB_TOKEN=your_github_personal_access_token_here
```

### 3. Run the Local Backend (JSON Server)
In a separate terminal, launch the mock server for persistent watchlist & note storing:
```bash
npx json-server --watch src/data/db.json --port 4000
```

### 4. Launch Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to explore the dashboard!

---

## 💡 Engineering Highlights for Recruiters

- **Performance-First Design**: Optimized API calls using debounced state updates, pagination chunks, and conditional query execution (`enabled: query.length > 0`).
- **Production-Ready Code Standards**: Modular component separation, clear directory structure, strict type declarations without `any` usage, and semantic HTML elements.
- **Robust Error Handling**: Dedicated loading states, error fallback displays, and defensive data checking across all async interactions.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for details.
