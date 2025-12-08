# Admin Dashboard

A modern, responsive admin dashboard built with Next.js 16, Material-UI, Zustand, and NextAuth.

## Features

- ✅ Authentication with NextAuth
- ✅ User management with pagination and search
- ✅ Product catalog with filters and categories
- ✅ State management with Zustand
- ✅ Client-side caching
- ✅ Fully responsive UI
- ✅ Performance optimizations (React.memo, useCallback, useMemo)

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI Library:** Material-UI (MUI)
- **State Management:** Zustand
- **Authentication:** NextAuth.js
- **API:** DummyJSON REST API
- **Language:** TypeScript

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Shop-Dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
```

4. Run development server:
```bash
npm run dev
```

5. Open http://localhost:3000

## Demo Credentials

- Username: `emilys`
- Password: `emilyspass`

## Project Structure

src/
├── app/              # Next.js app directory
├── components/       # Reusable components
├── store/           # Zustand stores
├── lib/             # API clients
└── types/           # TypeScript types

## Why Zustand?

- **Simplicity:** Less boilerplate than Redux
- **Size:** Only 1KB minified
- **No Providers:** Works without context providers
- **TypeScript:** Excellent type inference
- **Async Actions:** Built-in support
- **Performance:** Only re-renders affected components

## Caching Strategy

- Uses `Map` for in-memory caching
- Prevents redundant API calls
- Cache key format: `${endpoint}-${params}`
- Benefits: Faster loading, reduced API calls

## Performance Optimizations

1. **React.memo:** Prevents unnecessary component re-renders
2. **useCallback:** Memoizes callback functions
3. **useMemo:** Memoizes computed values
4. **API-side pagination:** Loads only required data
5. **Client-side caching:** Reduces API calls

## API Endpoints Used

- **Auth:** `POST /auth/login`
- **Users:** `GET /users`, `GET /users/search`, `GET /users/{id}`
- **Products:** `GET /products`, `GET /products/search`, `GET /products/category/{category}`

## Future Improvements

- [ ] Add unit tests (Jest, React Testing Library)
- [ ] Implement error boundaries
- [ ] Add loading skeletons
- [ ] Implement infinite scroll
- [ ] Add dark mode toggle
- [ ] Implement CRUD operations
- [ ] Add analytics dashboard

