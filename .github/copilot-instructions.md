# Project Guidelines

## Code Style

Plain CSS with custom properties (e.g., --main-color). Component structure: src/components/[name]/[Name].js + [name].css. Mixed export styles—check imports. See [AGENTS.md](AGENTS.md) for component conventions.

## Architecture

React 18 SPA (Create React App) for browsing, booking, and managing experiences. Nested routing with react-router v7, context-based state management (Token, User, Filter contexts). API communication via fetcher helpers. See [AGENTS.md](AGENTS.md) for detailed architecture.

## Build and Test

- Dev server: `npm start` (port 3000)
- Production build: `npm run build`
- Run tests: `npm test` (Jest + React Testing Library)
- Run single test: `npm test -- --testPathPattern=<pattern>`

See [AGENTS.md](AGENTS.md) for environment setup.

## Conventions

Consistent data-fetching hooks pattern ([data, error, loading]). Form handling with Formik or manual state. Date formatting with date-fns. Notifications via react-toastify. See [AGENTS.md](AGENTS.md) for UI libraries and search/filtering.
