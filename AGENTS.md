# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Balloon App is a React 18 SPA (Create React App) for browsing, booking, and managing "experiences" (balloon-related activities). It communicates with a separate backend API. The UI is in Spanish.

## Commands

- **Dev server:** `npm start` (port 3000 by default)
- **Production build:** `npm run build`
- **Run tests:** `npm test` (Jest + React Testing Library via react-scripts)
- **Run a single test:** `npm test -- --testPathPattern=<pattern>`

## Environment

Copy `.env_example` to `.env`. The only variable is `REACT_APP_BACKEND_URL` (default `http://localhost:4000`). The backend must be running for the app to function.

## Architecture

### Routing (react-router v7)

Routes are split into three nested layers:

- **`AppRoute`** — Top-level router. Wraps everything in `TokenContextProvider` → `UserContextProvider` → `FilterContextProvider`. Renders `Header`, `ToTop`, `ToastContainer`, and delegates to `PublicRoute`.
- **`PublicRoute`** — All unauthenticated pages: home (`/`), `/account` (login), `/register`, `/contact`, `/about`, `/booking/:id`, `/allFilter`, `/recovery`, `/privacity`, `/conditions`, `/error`. Catch-all (`*`) falls through to `UserRoute`.
- **`UserRoute`** — Authenticated user pages: `/profile`, `/bookingDetail/:ticket`, `/review/:ticket`. Catch-all falls through to `DashboardRoute`.
- **`DashboardRoute`** — Admin-only (guarded by `user.role === 'admin'`). Manages categories and experiences CRUD under `/dashboard/*`.

### State Management

No Redux or external state library. Global state is managed via three React Contexts:

- **`TokenContext`** — Stores the auth token in `sessionStorage` (via `useSessionStorage` hook). Provided as `[token, setToken]`.
- **`UserContext`** — Fetches the current user from `GET /user` when a token is present. Provided as `[usuario, setUsuario]`.
- **`FilterContext`** — Manages search/filter state (`searchCat`, `toSearch`, `toSearchTit`, `isFilterOn` and their setters). Consumed by `Header`, `Filter`, `ShowResults`, `NavBar`, `MenuDesktop`, `DropDown`.

All three contexts wrap the entire app in `AppRoute`.

### API Communication (`helpers/fetcher.js`)

All backend calls go through two helpers that use the native `fetch` API:

- **`fetcher(setState, setError, setLoading, path, args)`** — Standard data-fetching pattern. Constructs the URL from `REACT_APP_BACKEND_URL + '/' + path`. Expects the response shape `{ status: 'ok' | ..., message, data }`.
- **`miniFetcher(path, args)`** — Simplified version that returns data directly (used by `UserContext`).

Auth is passed via `Authorization` header (raw token, not `Bearer` prefixed).

### Custom Hooks (`hooks/`)

Each hook wraps `fetcher` for a specific API endpoint with the standard `[data, error, loading]` pattern:

- `useFiltered` — filtered experience listing (`/allFilter`)
- `useExperience` — single experience (`/experience/:id`)
- `useBookingDetails`, `useBookingQRs`, `useUserBookings` — booking data
- `useGetCategories`, `useAdminCat` — category data
- `useGetReviews`, `useGetExperienceOpinion` — reviews
- `useGetUserProfile`, `useEditExperience` — user/experience editing
- `useSessionStorage` — generic sessionStorage-backed state

### File Uploads (`helpers/fileUpload.js`)

Uses `FormData` with `PUT` method and `Authorization` header. Used for avatar and experience image uploads.

### UI Libraries

- **MUI v5** (`@mui/material` + `@emotion`) — used for some UI components
- **Formik + Yup** — form handling and validation (used in Filter and other forms)
- **date-fns** — date formatting (replaced moment.js). Uses `format(new Date(date), "yyyy-MM-dd")` pattern. Spanish locale imported as `es` from `date-fns/locale` where needed.
- **Leaflet / react-leaflet** — map display (`Mapa.js` component)
- **Swiper** — carousels (`CarouselSimilar`)
- **react-toastify** — notifications (configured in `AppRoute` with `top-center` position)
- **react-icons** — icon library
- **animate.css** — loaded from CDN in `index.html`

### Component Conventions

- Each component lives in its own folder under `src/components/` with a paired CSS file (e.g., `header/Header.js` + `header/header.css`).
- Pages follow the same pattern under `src/pages/`.
- CSS is plain CSS (no CSS modules, no Sass). CSS custom properties are used (e.g., `--main-color`).
- Mixed export styles: some components use named exports, others use default exports. Check imports when adding new references.

### Search & Filtering

Search/filter state lives in `FilterContext` and is consumed directly by `Filter`, `ShowResults`, `Header`, `NavBar`, `MenuDesktop`, and `DropDown` via `useContext(FilterContext)`. Filter parameters are reflected in URL query strings (e.g., `?experience=...&category=...&start_price=...`). Navigation uses `useNavigate` to update the URL as filters change.
