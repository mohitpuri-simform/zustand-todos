import Login from "../components/Login";
import TodoCount from "../components/TodoCount";
import Layout from "../layout/Layout";
import AboutPage from "../pages/AboutPage";
import DisplayTodoItem from "../pages/DisplayTodoItem";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import TodoPage from "../pages/TodoPage";
import CartPage from "../pages/CartPage";

export interface RouteConfig {
  path?: string;
  element: React.FC;
  children?: RouteConfig[];
  index?: boolean;
  isAuth?: boolean;
}

export const routes: RouteConfig[] = [
  {
    path: "/",
    element: Layout,
    children: [
      {
        index: true,
        path: "",
        element: HomePage,
        isAuth: true,
      },
      {
        path: "about",
        element: AboutPage,
        isAuth: true,
      },
      {
        path: "todos",
        element: TodoCount,
        isAuth: true,
        children: [
          {
            path: "",
            element: TodoPage,
            isAuth: true,
          },
          {
            path: ":id",
            element: DisplayTodoItem,
            isAuth: true,
          },
        ],
      },
      {
        path: "cart",
        element: CartPage,
        isAuth: true,
      },
    ],
  },
  {
    path: "login",
    element: Login,
  },
  {
    path: "*",
    element: NotFoundPage,
  },
];
