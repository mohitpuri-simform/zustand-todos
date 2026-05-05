export interface Todo {
  id: number;
  task: string;
  createdAt: Date;
  isDone: boolean;
}

export type TodoState = {
  todos: Todo[];
};

export type TodoAction =
  | { type: "ADD_TODO"; payload: Todo }
  | { type: "EDIT_TODO"; payload: { id: string; task: string } }
  | { type: "MARK_AS_DONE"; payload: { id: string } }
  | { type: "DELETE_TODO"; payload: { id: string } }
  | { type: "FILTER_BY_TITLE"; payload: { task: string } };
