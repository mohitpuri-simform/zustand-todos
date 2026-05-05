import type { FormEvent } from "react";
import { useNavigate } from "react-router";

function Login() {
  const navigate = useNavigate();
  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    localStorage.setItem(
      "token",
      JSON.stringify({
        email: "email",
        pass: "pass",
      })
    );
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
