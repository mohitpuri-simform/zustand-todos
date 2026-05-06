import type { SliceCreator, TodoSlice } from "./types";

export const createTodoSlice: SliceCreator<TodoSlice> = (set) => ({
  todos: [],
  addTodo: (task: string) => {
    set((state) => {
      state.todos.push({
        id: state.todos.length + 1,
        task,
        createdAt: new Date(),
        isDone: false,
      });
    });
  },
  deleteTodo: (id: number) => {
    set((state) => {
      state.todos = state.todos.filter((todo) => todo.id !== id);
      state.cartItems = state.cartItems.filter((todo) => todo.id !== id);
    });
  },
  markAsDone: (id: number) => {
    set((state) => {
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.isDone = true;
      }

      const cartTodo = state.cartItems.find((todo) => todo.id === id);
      if (cartTodo) {
        cartTodo.isDone = true;
      }
    });
  },
  editTodo: (id: number, task: string) => {
    set((state) => {
      const todo = state.todos.find((item) => item.id === id);
      if (todo) {
        todo.task = task;
      }

      const cartTodo = state.cartItems.find((item) => item.id === id);
      if (cartTodo) {
        cartTodo.task = task;
      }
    });
  },
  filterByTitle: (task: string) => {
    set((state) => {
      state.todos = state.todos.filter((todo) => todo.task === task);
    });
  },
});
