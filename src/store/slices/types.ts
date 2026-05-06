import type { StateCreator } from "zustand";
import type { Todo } from "../../types";

export interface AuthSlice {
  isAuthenticated: boolean;
  hasHydrated: boolean;
  userEmail: string | null;
  setHasHydrated: (value: boolean) => void;
  login: (email: string) => void;
  logout: () => void;
}

export interface TodoSlice {
  todos: Todo[];
  addTodo: (task: string) => void;
  deleteTodo: (id: number) => void;
  markAsDone: (id: number) => void;
  editTodo: (id: number, task: string) => void;
  filterByTitle: (task: string) => void;
}

export interface CartSlice {
  cartItems: Todo[];
  addTodoToCart: (id: number) => void;
  removeTodoFromCart: (id: number) => void;
  clearCart: () => void;
}

export type AppStore = AuthSlice & TodoSlice & CartSlice;

export type SliceCreator<T> = StateCreator<
  AppStore,
  [["zustand/immer", never]],
  [],
  T
>;
