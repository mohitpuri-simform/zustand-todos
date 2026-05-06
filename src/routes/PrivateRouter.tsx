import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { useTodoStore } from "../store/todoStore";

function PrivateRouter({ children }: { children: ReactNode }) {
  const isAuthenticated = useTodoStore((state) => state.isAuthenticated);
  const hasHydrated = useTodoStore((state) => state.hasHydrated);

  if (!hasHydrated) {
    return null;
  }

  if (isAuthenticated) return children;
  return <Navigate to={"/login"} />;
}

export default PrivateRouter;
