import type { CartSlice, SliceCreator } from "./types";

export const createCartSlice: SliceCreator<CartSlice> = (set) => ({
  cartItems: [],
  addTodoToCart: (id: number) => {
    set((state) => {
      const todo = state.todos.find((item) => item.id === id);
      const alreadyAdded = state.cartItems.some((item) => item.id === id);

      if (todo && !alreadyAdded) {
        state.cartItems.push(todo);
      }
    });
  },
  removeTodoFromCart: (id: number) => {
    set((state) => {
      state.cartItems = state.cartItems.filter((todo) => todo.id !== id);
    });
  },
  clearCart: () => {
    set((state) => {
      state.cartItems = [];
    });
  },
});
