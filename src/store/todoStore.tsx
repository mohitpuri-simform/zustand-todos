import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createJSONStorage, persist } from "zustand/middleware";
import { createAuthSlice } from "./slices/authSlice";
import { createCartSlice } from "./slices/cartSlice";
import { createTodoSlice } from "./slices/todoSlice";
import type { AppStore } from "./slices/types";

export const useTodoStore = create<AppStore>()(
  persist(
    immer((...stateCreatorArgs) => ({
      ...createAuthSlice(...stateCreatorArgs),
      ...createTodoSlice(...stateCreatorArgs),
      ...createCartSlice(...stateCreatorArgs),
    })),
    {
      name: "app-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        userEmail: state.userEmail,
        todos: state.todos,
        cartItems: state.cartItems,
      }),
      merge: (persistedState, currentState) => {
        const typedPersisted = persistedState as Partial<AppStore>;

        return {
          ...currentState,
          ...typedPersisted,
          todos:
            typedPersisted.todos?.map((todo) => ({
              ...todo,
              createdAt: new Date(todo.createdAt),
            })) ?? currentState.todos,
          cartItems:
            typedPersisted.cartItems?.map((todo) => ({
              ...todo,
              createdAt: new Date(todo.createdAt),
            })) ?? currentState.cartItems,
        };
      },
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
