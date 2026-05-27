import { RouterProvider } from "react-router";
import { appRouter } from "./app.router";

export const TodoApp = () => {
  return <RouterProvider router={appRouter} />;
};
