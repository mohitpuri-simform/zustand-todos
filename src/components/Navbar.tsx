import { Link, useNavigate } from "react-router";

function Navbar() {
  const navigate = useNavigate();
  function handleLogout() {
    const token = localStorage.getItem("token");
    if (token) localStorage.removeItem("token");
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
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
