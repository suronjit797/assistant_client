import { createBrowserRouter } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import MainLayout from "./components/layouts/MainLayout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
// import Register from "./pages/Register/Register";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Auth>
        <MainLayout />
      </Auth>
    ),
    children: [
      {
        index: true,
        element: (
          // is login user
          <Home />
        ),
      },
      {
        path: '/business',
        element: (
          // is login user
          <Home />
        ),
      },
    ],
  },
  { path: "/login", element: <Login /> },
  {
    path: "*",
    element: <NotFound />,
  },
]);
