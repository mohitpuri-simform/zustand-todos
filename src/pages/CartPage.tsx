import { Link } from "react-router";
import { useTodoStore } from "../store/todoStore";

function CartPage() {
  const cartItems = useTodoStore((state) => state.cartItems);
  const removeTodoFromCart = useTodoStore((state) => state.removeTodoFromCart);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-md">
        <p className="text-center text-lg text-gray-500">Your cart is empty</p>
        <Link
          to="/todos"
          className="text-blue-500 hover:underline block text-center mt-4"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      <div className="space-y-4">
        {cartItems.map((item, index) => (
          <div
            key={item.id}
            className="p-4 border border-gray-300 rounded-md shadow-sm bg-gray-50 flex justify-between items-start"
          >
            <div className="flex-1">
              <p className="font-medium text-gray-700">
                #{index + 1}: {item.task}
              </p>
              <p className="text-sm text-gray-500">
                Added: {item.createdAt.toLocaleString()}
              </p>
              <p
                className={`text-sm font-semibold ${
                  item.isDone ? "text-green-600" : "text-yellow-600"
                }`}
              >
                Status: {item.isDone ? "Completed" : "Pending"}
              </p>
            </div>
            <button
              className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 ml-4"
              onClick={() => removeTodoFromCart(item.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-100 rounded-md">
        <p className="text-lg font-semibold">Total Items: {cartItems.length}</p>
        <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 w-full">
          Checkout
        </button>
      </div>

      <Link
        to="/todos"
        className="text-blue-500 hover:underline block text-center mt-4"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

export default CartPage;
