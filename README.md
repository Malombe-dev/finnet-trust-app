# Finnet Trust — User Dashboard & Post Manager

A MERN-stack assessment build: Express + Mongoose API (with an automatic
in-memory fallback so it runs with zero external setup) and a React + Vite
+ Tailwind CSS frontend.

## Structure

```
finnet-trust-app/
├── backend/    Express API (users, posts)
└── frontend/   React + Tailwind dashboard
```

## Quick start

**Backend**
```bash
cd backend
cp .env.example .env
npm install
npm run dev          # http://localhost:5000
```
By default `MONGO_URI` in `.env` is empty, so the API runs against a seeded
in-memory store (4 users, 5 posts) — no database required to try it out.
To use real MongoDB, set `MONGO_URI` to your connection string (e.g. a free
MongoDB Atlas cluster) and restart; the same Mongoose models take over
automatically.
`NB` For Review am using my  `MONGO_URI`

**Frontend**
```bash
cd frontend
npm install
npm run dev           # http://localhost:5173
```
`frontend/.env` points `VITE_API_URL` at `http://localhost:5000/api` —
update it if your backend runs elsewhere.

## API

| Method | Route                          | Description                  |
|--------|---------------------------------|-------------------------------|
| GET    | `/api/users`                    | List all users                |
| GET    | `/api/users/:userId`            | Single user profile           |
| GET    | `/api/users/:userId/posts`      | Posts for a user, newest first|
| POST   | `/api/users/:userId/posts`      | Create a post (validated)     |

All responses are `{ data: ... }`; errors are `{ error: "...", details?: [] }`
with appropriate HTTP status codes (404, 422, 500).

## Frontend features

- User list (sidebar on desktop, slide-over drawer on mobile) with profile cards
- Scrollable posts feed with expand/collapse on long posts
- Validated create-post form; new posts prepend to the feed instantly, no refresh
- Skeleton loaders for users, profile, and posts; explicit error states with **Retry**
- Fully responsive (mobile/tablet/desktop), visible keyboard focus states, `prefers-reduced-motion` respected

## Design direction

A "ledger" aesthetic suited to a financial-trust brand: deep ink-navy
background, a brass accent for emphasis and interactive states, a serif
display face (Fraunces) for names/headings, and a monospace face (IBM Plex
Mono) for metadata like account IDs, timestamps, and tags — evoking a
physical record book rather than a generic SaaS dashboard.
