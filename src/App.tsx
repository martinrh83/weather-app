import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import AppLayout from "./ui/AppLayout";
import { ThemeProvider } from "./contexts/theme-provider";
import Dashboard from "./pages/Dashboard";
import City from "./pages/City";

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/city/:cityName",
          element: <City />,
        },
      ],
    },
    {
      path: "/",
      element: <Navigate to="/dashboard" replace />,
    },
  ]);
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
