import { Outlet } from "react-router";
import { Header } from "./Header";

export const Layout = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 pt-12 pb-6">
        <Header />
      </div>
      <Outlet />
    </main>
  );
};
