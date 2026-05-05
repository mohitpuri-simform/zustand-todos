# Zustand Todo POC

A small React + TypeScript proof of concept that demonstrates todo state management with Zustand, nested routing with React Router, and simple auth-gated pages.

## Tech Stack

- React 19
- TypeScript
- Vite
- Zustand
- React Router v7
- Tailwind CSS

## What This Project Demonstrates

- Global todo state with Zustand (`useTodoStore`)
- Store actions implemented outside components (`addTodo`, `editTodo`, `markAsDone`, `deleteTodo`)
- Protected routes through `PrivateRouter` using a token in `localStorage`
- Nested routes for todo list and todo detail pages
- URL-based search/filter using query params (`?title=`)

## App Flow

1. Open app and login from `/login` (demo token is written to `localStorage`).
2. Authenticated users can access `/`, `/about`, and `/todos`.
3. In `/todos`, users can:
   - Add todos
   - Search todos by title
   - Open a single todo detail page (`/todos/:id`)
   - Edit task text from detail page
   - Mark todo as done
   - Delete todo from list page

## Routes

- `/login` -> Login button sets a dummy auth token
- `/` -> Home page (protected)
- `/about` -> About page (protected)
- `/todos` -> Todo page + total count wrapper (protected)
- `/todos/:id` -> Single todo detail page (protected)
- `*` -> Not found page

## Zustand Store

Store file: `src/store/todoStore.tsx`

- State:
  - `todos: Todo[]`
- Actions:
  - `addTodo(task: string)`
  - `deleteTodo(id: number)`
  - `markAsDone(id: number)`
  - `editTodo(id: number, task: string)`

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

## Project Structure

```text
src/
  components/      # Reusable UI pieces (login, navbar, todo item, etc.)
  layout/          # Shared app layout
  pages/           # Route-level page components
  routes/          # Route config, router builder, private route wrapper
  store/           # Zustand store and actions
  utils/           # Utility helpers
```

## Notes

- This is a POC focused on store and routing concepts.
- Auth is intentionally mock-based (localStorage token).
- Todo data is in-memory and resets on page refresh.
