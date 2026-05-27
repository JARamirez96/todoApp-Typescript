import { createBrowserRouter } from "react-router";
import { Layout } from "./todo/components/Layout";

import { TodoPage } from "./pages/TodoPage";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <TodoPage />,
      },
    ],
  },
]);
