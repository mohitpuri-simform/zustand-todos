import { useRef, useState } from "react";
import { useParams } from "react-router";
import type { Todo } from "../types";

import ActionButtonWrapper from "../components/ActionButtonWrapper";
import { editTodo, markAsDone, useTodoStore } from "../store/todoStore";

type Params = {
  id: string;
};

function DisplayTodoItem() {
  const params = useParams<Params>();
  const [isEditing, setIsEditing] = useState(false);
  const editRef = useRef<HTMLInputElement>(null);
  function handleInputBlur(todo: Todo) {
    setIsEditing(false);
    editTodo(todo.id, editRef.current?.value || todo.task);
  }
  const todos = useTodoStore((state) => state.todos);
  const todo = todos.find((todoItem) => todoItem.id === Number(params.id));
  if (!todo) return;

  return (
    <div>
      <div
        key={todo.id}
        className="p-4 border border-gray-300 rounded-md shadow-sm bg-gray-50"
      >
        {isEditing ? (
          <input
            className="border-2"
            type="text"
            defaultValue={todo.task}
            ref={editRef}
            onBlur={() => handleInputBlur(todo)}
          />
        ) : (
          <p className="font-medium text-gray-700 flex items-center justify-between">
            {todo.task}
          </p>
        )}
        <p className="text-sm text-gray-500">
          Created at: {todo.createdAt.toLocaleString()}
        </p>
        <p
          className={`text-sm font-semibold ${
            todo.isDone ? "text-green-600" : "text-yellow-600"
          }`}
        >
          Status: {todo.isDone ? "Completed" : "Pending"}
        </p>
        <ActionButtonWrapper
          editFn={() => {
            setIsEditing(true);
            editRef.current?.focus();
          }}
          markAsDoneFn={() => markAsDone(todo.id)}
        />
      </div>
    </div>
  );
}

export default DisplayTodoItem;
