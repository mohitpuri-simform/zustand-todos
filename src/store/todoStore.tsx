import { create } from "zustand";

interface Todo {
  id: number;
  task: string;
  createdAt: Date;
  isDone: boolean;
}

interface TodoStore {
  todos: Todo[];
}

export const useTodoStore = create<TodoStore>(() => ({
  todos: [],
}));

export const addTodo = (task: string) => {
  useTodoStore.setState((state) => ({
    todos: [
      ...state.todos,
      {
        id: state.todos.length + 1,
        task,
        createdAt: new Date(),
        isDone: false,
      },
    ],
  }));
};

export const deleteTodo = (id: number) => {
  useTodoStore.setState((state) => ({
    todos: state.todos.filter((todo) => todo.id !== id),
  }));
};

export const markAsDone = (id: number) => {
  useTodoStore.setState((state) => ({
    todos: state.todos.map((todo) =>
      todo.id === id ? { ...todo, isDone: true } : todo,
    ),
  }));
};

export const editTodo = (id: number, task: string) => {
  useTodoStore.setState((state) => ({
    todos: state.todos.map((todo) =>
      todo.id === id ? { ...todo, task } : todo,
    ),
  }));
};

export const filterByTitle = (task: string) => {
  useTodoStore.setState((state) => ({
    todos: state.todos.filter((todo) => todo.task === task),
  }));
};
