# Zustand Todo POC

A React + TypeScript proof of concept that demonstrates advanced state management with Zustand, including a multi-slice store architecture, localStorage persistence, shopping cart functionality, and auth-gated pages with nested routing.

## Tech Stack

- React 19
- TypeScript
- Vite
- **Zustand** (with immer & persist middleware)
- React Router v7
- Tailwind CSS

## What This Project Demonstrates

### Zustand Features

- **Single Store + Multi-Slice Architecture**: One unified store (`useTodoStore`) composed of three separate slices:
  - **Auth Slice** — Login/logout, user state, authentication flag
  - **Todo Slice** — CRUD operations for todos, idempotent updates
  - **Cart Slice** — Shopping cart with add/remove actions
- **Immer Middleware** — Mutable draft-style state updates (no spread operators needed)
- **Persist Middleware** — Automatic localStorage persistence with:
  - Selective persistence (auth, todos, cart persist; hydration flag does not)
  - Custom merge function to rehydrate Date objects correctly
  - Hydration state flag to prevent flash redirects on auth-gated routes
- **Hydration State Management** — Safe rehydration that waits for persisted data before auth checks
- **Shopping Cart Workflow** — Users can add/remove todos to cart, cart clears on logout

### Routing & Auth

- Protected routes through `PrivateRouter` using Zustand auth state (not localStorage tokens)
- Nested routes for todo list and todo detail pages
- URL-based search/filter using query params (`?title=`)

## App Flow

1. Open app → hydration waits for persisted state from localStorage.
2. If authenticated, redirects to `/`; otherwise, redirects to `/login`.
3. Click **Login** button to authenticate (writes to Zustand auth slice, auto-persisted).
4. Authenticated users can access `/`, `/about`, `/todos`, and `/cart`.
5. In `/todos`, users can:
   - Add new todos (persisted to localStorage)
   - Search todos by title using URL query params (`?title=search`)
   - **Add/remove todos to shopping cart** (persisted along with auth state)
   - Open a single todo detail page (`/todos/:id`)
   - Edit task text from detail page
   - Mark todo as completed
   - Delete todo from list page (also removes from cart if present)
6. In `/cart`, users can:
   - View all added todos
   - Remove items from cart
   - See total cart count in navbar
7. Click **Logout** button → clears auth state, empties cart, resets to login page
8. Reload page → hydrates persisted todos & cart (if logged in before)

## Routes

- `/login` → Login button triggers auth slice action
- `/` → Home page (protected)
- `/about` → About page (protected)
- `/todos` → Todo list page + total count wrapper (protected)
- `/todos/:id` → Single todo detail page (protected)
- `/cart` → Shopping cart page (protected)
- `*` → Not found page

## Zustand Store Architecture

**Main Store File**: `src/store/todoStore.tsx`

**Slice Files** (in `src/store/slices/`):

- `types.ts` — TypeScript interfaces for AppStore, AuthSlice, TodoSlice, CartSlice
- `authSlice.ts` — Auth state & actions (login, logout, hasHydrated flag)
- `todoSlice.ts` — Todo CRUD operations
- `cartSlice.ts` — Shopping cart actions

### Store Composition

The store is created by composing three independent slices using Zustand's middleware composition:

```typescript
export const useTodoStore = create<AppStore>()(
  persist(
    immer((...stateCreatorArgs) => ({
      ...createAuthSlice(...stateCreatorArgs),
      ...createTodoSlice(...stateCreatorArgs),
      ...createCartSlice(...stateCreatorArgs),
    })),
    {
      /* persist config */
    },
  ),
);
```

### Auth Slice

**State**:

- `isAuthenticated: boolean` — Whether user is logged in
- `userEmail: string | null` — Authenticated user's email
- `hasHydrated: boolean` — Rehydration status flag

**Actions**:

- `login(email: string)` — Set authenticated state & user email
- `logout()` — Clear auth state & empty cart (side effect)
- `setHasHydrated(value: boolean)` — Update hydration status

### Todo Slice

**State**:

- `todos: Todo[]` — Array of todo items with id, task, createdAt, isDone

**Actions**:

- `addTodo(task: string)` — Add new todo
- `deleteTodo(id: number)` — Remove todo by id (also removes from cart)
- `markAsDone(id: number)` — Mark todo as completed (updates cart too)
- `editTodo(id: number, task: string)` — Update todo task text (& cart mirror)
- `filterByTitle(task: string)` — Filter todos by title

### Cart Slice

**State**:

- `cartItems: Todo[]` — Todos added to shopping cart

**Actions**:

- `addTodoToCart(id: number)` — Add todo to cart (no duplicates)
- `removeTodoFromCart(id: number)` — Remove todo from cart
- `clearCart()` — Empty entire cart

### Persistence Configuration

- **Storage**: `localStorage` with key `"app-store"`
- **Persisted Fields**: `isAuthenticated`, `userEmail`, `todos`, `cartItems`
- **Hydration Behavior**:
  - Custom `merge` function converts string dates back to Date objects
  - `onRehydrateStorage` callback sets `hasHydrated = true` after rehydration
  - PrivateRouter waits for `hasHydrated` before auth checks (prevents redirect flicker)
- **Logout Behavior**: Cart is explicitly cleared in logout action

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

### 3. Type check / build / lint

```bash
npx tsc --noEmit
npm run build
npm run lint
```

## Why This Project is a Good Zustand POC

1. **Multi-Slice Pattern** — Demonstrates how to organize a large store into focused, reusable slices without losing type safety.
2. **Middleware Stacking** — Shows real-world composition of immer + persist in a single store.
3. **Persistence Best Practices** — Custom merge/rehydrate logic handles Date serialization correctly.
4. **Auth + Derived State** — Combines auth state with protected routing, showing how Zustand integrates with React Router.
5. **Cross-Slice Dependencies** — Cart actions reference todos, demonstrating slice interaction patterns.
6. **Hydration Safety** — Illustrates the hydration flag pattern to prevent UI flicker during persistence rehydration.
7. **Clean Component Integration** — Components use hooks selectively, accessing only the state/actions they need.

## Notes

- This is a POC focused on Zustand store architecture, middleware, and persistence concepts.
- Auth is mock-based; use real auth (JWT, OAuth) in production.
- All data persists to localStorage; clears on logout or browser data clear.
- Date objects are properly reconstructed during rehydration (see merge function in persist config).

## Project Structure

```text
src/
  components/      # Reusable UI pieces (Login, Navbar, RenderTodo, etc.)
  layout/          # Shared app layout (Navbar + Outlet)
  pages/           # Route-level page components (Home, Todos, Cart, About, etc.)
  routes/          # Route config, router builder, private route guard (PrivateRouter)
  store/           # Zustand store & slices
    └── slices/    # Individual slice creators (authSlice, todoSlice, cartSlice) + types
  utils/           # Utility helpers (getCurrentDate, etc.)
  types.ts         # Shared TypeScript definitions (Todo interface)
```

## Key Implementation Details

### Immer + Immer Middleware

All state updates use immutable draft-style mutations, enabled by Zustand's immer middleware:

```typescript
// No spread operators needed—just mutate the draft
addTodo: (task: string) => {
  set((state) => {
    state.todos.push({
      id: state.todos.length + 1,
      task,
      createdAt: new Date(),
      isDone: false,
    });
  });
};
```

### Hydration Safety

PrivateRouter waits for hydration before making auth decisions:

```typescript
const isAuthenticated = useTodoStore((state) => state.isAuthenticated);
const hasHydrated = useTodoStore((state) => state.hasHydrated);

if (!hasHydrated) return null; // Wait for localStorage to load
if (isAuthenticated) return children;
return <Navigate to="/login" />;
```

This prevents redirect flicker on page refresh when auth state is loading from persistence.

### Cart Clears on Logout

The logout action explicitly empties the cart, enforcing the requirement that cart persists only while logged in:

```typescript
logout: () => {
  set((state) => {
    state.isAuthenticated = false;
    state.userEmail = null;
    state.cartItems = []; // Clears cart
  });
};
```
