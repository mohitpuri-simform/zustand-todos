import type { Ref } from "react";

interface AddTodoProps {
  inputRef: Ref<HTMLInputElement>;
  handleAddTodo: () => void;
}

function AddTodo({ inputRef, handleAddTodo }: AddTodoProps) {
  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Add a Todo"
        ref={inputRef}
        className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={handleAddTodo}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Add
      </button>
    </div>
  );
}

export default AddTodo;
