
import { Toaster } from "@/components/ui/toaster";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
      <Toaster />
    </div>
  );
}
