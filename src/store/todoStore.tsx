import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface Todo {
  id: number;
  task: string;
  createdAt: Date;
  isDone: boolean;
}

interface TodoStore {
  todos: Todo[];
}

export const useTodoStore = create<TodoStore>()(
  immer(() => ({
    todos: [],
  })),
);

export const addTodo = (task: string) => {
  useTodoStore.setState((state) => {
    state.todos.push({
      id: state.todos.length + 1,
      task,
      createdAt: new Date(),
      isDone: false,
    });
  });
};

export const deleteTodo = (id: number) => {
  useTodoStore.setState((state) => {
    state.todos = state.todos.filter((todo) => todo.id !== id);
  });
};

export const markAsDone = (id: number) => {
  useTodoStore.setState((state) => {
    const todo = state.todos.find((todo) => todo.id === id);
    if (todo) todo.isDone = true;
  });
};

export const editTodo = (id: number, task: string) => {
  useTodoStore.setState((state) => {
    const todo = state.todos.find((todo) => todo.id === id);
    if (todo) todo.task = task;
  });
};

export const filterByTitle = (task: string) => {
  useTodoStore.setState((state) => {
    state.todos = state.todos.filter((todo) => todo.task === task);
  });
};
