import type { ReactNode } from "react";
import { Navigate } from "react-router";

function PrivateRouter({ children }: { children: ReactNode }) {
  const token = localStorage.getItem("token");
  if (token) return children;
  return <Navigate to={"/login"} />;
}

export default PrivateRouter;
