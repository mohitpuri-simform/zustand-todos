import { useRef, type ChangeEvent } from "react";
import RenderTodo from "../components/RenderTodo";

import { useSearchParams } from "react-router";
import AddTodo from "../components/AddTodo";
import { addTodo, useTodoStore } from "../store/todoStore";

function TodoPage() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const todos = useTodoStore((state) => state.todos);

  const filteredTitle = searchParams.get("title")?.toLowerCase() ?? "";

  const filteredTodos = todos.filter((todo) =>
    todo.task.toLowerCase().includes(filteredTitle),
  );

  function handleFilterChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearchParams({ title: value });
  }

  function handleAddTodo() {
    if (!inputRef.current) return;
    const text = inputRef.current.value.trim();
    if (!text) {
      return;
    }

    addTodo(text);
    inputRef.current.value = "";
  }

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-md">
      <AddTodo inputRef={inputRef} handleAddTodo={handleAddTodo} />

      <div>
        <input
          type="text"
          placeholder="search the todos by title"
          className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          ref={searchInputRef}
          value={filteredTitle}
          onChange={handleFilterChange}
        />
      </div>

      <div>
        <p className="text-lg font-semibold mb-2">Your Todos:</p>
        <ul className="space-y-4">
          {filteredTodos.map((todo, index) => (
            <RenderTodo index={index} todo={todo} key={todo.id} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoPage;
