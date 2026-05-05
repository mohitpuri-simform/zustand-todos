import { Outlet } from "react-router";
import { useTodoStore } from "../store/todoStore";

function TodoCount() {
  const todos = useTodoStore((state) => state.todos);

  return (
    <>
      <nav className="bg-gray-800 p-2 w-full text-white">
        Total Todos: {todos.length}
      </nav>
      <Outlet />
    </>
  );
}

export default TodoCount;
