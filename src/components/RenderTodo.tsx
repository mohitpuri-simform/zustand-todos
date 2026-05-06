import type { Todo } from "../types";
import { Link } from "react-router";
import { useTodoStore } from "../store/todoStore";

interface RenderTodoProps {
  todo: Todo;
  index: number;
}

function RenderTodo({ todo, index }: RenderTodoProps) {
  const isInCart = useTodoStore((state) =>
    state.cartItems.some((cartTodo) => cartTodo.id === todo.id),
  );
  const addTodoToCart = useTodoStore((state) => state.addTodoToCart);
  const removeTodoFromCart = useTodoStore((state) => state.removeTodoFromCart);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  return (
    <>
      <li className="p-4 border border-gray-300 rounded-md shadow-sm bg-gray-50">
        <p className="font-medium text-gray-700 flex items-center justify-between">
          #{index + 1}: {todo.task}
          <Link
            to={`/todos/${todo.id}`}
            className="border-2 bg-green-500 px-2 py-1 rounded-xl"
          >
            Open
          </Link>
        </p>
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
        <div className="flex gap-2 mt-1 ml-1">
          {isInCart ? (
            <button
              className="px-3 py-1 text-sm bg-orange-500 text-white rounded hover:bg-orange-600"
              onClick={() => removeTodoFromCart(todo.id)}
            >
              Remove from Cart
            </button>
          ) : (
            <button
              className="px-3 py-1 text-sm bg-indigo-500 text-white rounded hover:bg-indigo-600"
              onClick={() => addTodoToCart(todo.id)}
            >
              Add to Cart
            </button>
          )}
          <button
            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
            onClick={() => deleteTodo(todo.id)}
          >
            Delete
          </button>
        </div>
      </li>
    </>
  );
}

export default RenderTodo;
