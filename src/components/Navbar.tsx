import { Link, useNavigate } from "react-router";
import { useTodoStore } from "../store/todoStore";

function Navbar() {
  const navigate = useNavigate();
  const cartItems = useTodoStore((state) => state.cartItems);
  const userEmail = useTodoStore((state) => state.userEmail);
  const logout = useTodoStore((state) => state.logout);
  function handleLogout() {
    logout();
    navigate("/login");
  }
  return (
    <>
      <nav>
        <ul className="flex gap-3 items-center p-2 bg-black text-white">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/todos">Todos</Link>
          </li>
          <li>
            <Link to="/cart">Cart ({cartItems.length})</Link>
          </li>
          <li>{userEmail ? `User: ${userEmail}` : "User: guest"}</li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
