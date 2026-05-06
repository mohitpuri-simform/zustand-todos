import type { FormEvent } from "react";
import { useNavigate } from "react-router";
import { useTodoStore } from "../store/todoStore";

function Login() {
  const navigate = useNavigate();
  const login = useTodoStore((state) => state.login);
  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    login("email");
    navigate("/");
  }

  return (
    <form
      className="flex justify-center items-center m-2 "
      onSubmit={handleFormSubmit}
    >
      <button className="border-2 bg-green-400 p-2" type="submit">
        Click here to Login
      </button>
    </form>
  );
}

export default Login;
