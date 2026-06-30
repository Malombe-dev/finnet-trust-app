# Finnet Trust — User Dashboard & Post Manager

A MERN-stack technical assessment build: an Express + Mongoose REST API (with
an automatic in-memory fallback so it runs with zero external setup) and a
React + Vite + Tailwind CSS frontend.

**Live demo:** https://frontend-fin-beta.vercel.app/
**Live API:** https://backend-fin-q4yr.onrender.com/api/users

> Note: the backend is hosted on Render's free tier, which spins down after
> 15 minutes of inactivity. The first request after idle time can take
> 30–60 seconds to wake up — this is expected, not a bug.

## Project structure

```
finnet-trust-app/
├── backend/                 Express API
│   ├── src/
│   │   ├── config/db.js     MongoDB connection (falls back to in-memory store)
│   │   ├── controllers/     Route handlers (users, posts)
│   │   ├── data/            In-memory seed data (fallback mode)
│   │   ├── middleware/      Centralized error handling
│   │   ├── models/          Mongoose schemas (User, Post)
│   │   ├── routes/          Route definitions
│   │   ├── scripts/seed.js  Seeds real MongoDB with 5 users × 3 posts
│   │   ├── app.js           Express app setup (CORS, middleware, routes)
│   │   └── server.js        Entry point
│   └── package.json
└── frontend/                React + Vite + Tailwind dashboard
    ├── src/
    │   ├── api/client.js    Fetch wrapper for the backend API
    │   ├── components/      Sidebar, ProfileCard, PostsFeed, PostForm, etc.
    │   └── App.jsx          Top-level state & data flow
    └── package.json
```

## Prerequisites

- Node.js 18+
- npm
- (Optional) a MongoDB connection string — a free MongoDB Atlas cluster works fine.
  Without one, the API automatically runs on a built-in in-memory data store.

## Setup & running locally

**Backend**
```bash
cd backend
cp .env.example .env
npm install
npm run dev          # http://localhost:5000
```

`backend/.env`:
```
PORT=5000
MONGO_URI=            # leave empty to use the in-memory store, or paste your connection string
CLIENT_ORIGIN=http://localhost:5173
```

**Frontend**
```bash
cd frontend
npm install
npm run dev           # http://localhost:5173
```

`frontend/.env`:
```
VITE_API_URL=http://localhost:5000/api
```

## Seed data

**In-memory mode** (no `MONGO_URI` set): the API auto-seeds itself on every
start with 5 users and 3 posts per user (15 posts total) — nothing to run.

**Real MongoDB mode** (`MONGO_URI` set): run the seed script once after
connecting:
```bash
cd backend
npm run seed
```
This clears the `users` and `posts` collections and re-inserts 5 sample
users with 3 posts each, so it's safe to re-run any time you want a clean
data set. Each user includes `name`, `email`, `role`, `company`,
`address: { city, street }`, `avatarColor`, and `bio`.

## API reference

| Method | Route                          | Description                          |
|--------|----------------------------------|----------------------------------------|
| GET    | `/api/users`                    | List all users                        |
| GET    | `/api/users/:userId`            | Single user profile                   |
| GET    | `/api/users/:userId/posts`      | Posts for a user, newest first        |
| POST   | `/api/users/:userId/posts`      | Create a post (`title`, `body` required, `tag` optional) |

All success responses are shaped `{ data: ... }`. Errors are
`{ error: "...", details?: [...] }` with status codes:
- `400` malformed ID
- `404` user not found
- `409` duplicate value (e.g. unique constraint, if added later)
- `422` validation failure (missing/invalid title or body)
- `500` unexpected server error

## Frontend features

- User list (sidebar on desktop, slide-over drawer on mobile) with full profile cards including address
- Scrollable posts feed with expand/collapse on long posts
- Validated create-post form; new posts prepend to the feed instantly, no refresh
- Skeleton loaders for users, profile, and posts; explicit error states with a **Retry** button on every section
- Fully responsive (mobile/tablet/desktop), visible keyboard focus states, `prefers-reduced-motion` respected

## Design decisions & trade-offs

- **Data layer choice:** MongoDB via Mongoose was chosen for the production
  deploy because it maps naturally onto the user/post relationship and
  scales beyond a take-home assessment. An in-memory fallback was added on
  top so the project also runs instantly with no setup, which made local
  development and grading easier without requiring a database connection
  string up front.
- **Visual direction:** rather than a generic SaaS dashboard look, the UI
  uses a deliberate "financial ledger" aesthetic — deep ink-navy
  background, a brass accent, a serif display face (Fraunces) for names and
  headings, and a monospace face (IBM Plex Mono) for metadata like
  timestamps and tags — to fit a financial-trust brand rather than looking
  templated.
- **State management:** plain React state + `useCallback`/`useEffect` was
  used instead of a data-fetching library (React Query/SWR), since the
  app's data needs are small and the explicit loading/error states map
  directly onto the brief's required UX states without extra abstraction.
- **Validation is duplicated** client-side (immediate feedback) and
  server-side via express-validator (source of truth), which is intentional
  — the API never trusts the client.
- **Trade-off:** pagination on the posts endpoint was left out (it's marked
  optional in the brief) since each user only has a handful of posts; the
  scrollable feed already handles the current data volume without it.

## Deployment

Frontend is deployed on Vercel, backend on Render, connected to a MongoDB
Atlas cluster. Key environment variables to set on each platform:

- **Render (backend):** `MONGO_URI`, `CLIENT_ORIGIN` (set to the Vercel
  frontend URL), `PORT` (Render sets this automatically).
- **Vercel (frontend):** `VITE_API_URL` (set to the Render backend URL +
  `/api`).