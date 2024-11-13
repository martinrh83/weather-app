import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="bg-gradient-to-br from-background to-muted">
      header
      <main className="min-h-screen container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <footer className="border-t backdrop-blur">
        <div className="container "></div>
      </footer>
    </div>
  );
}

export default AppLayout;
