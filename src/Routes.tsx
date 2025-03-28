import { createBrowserRouter } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import MainLayout from "./components/layouts/MainLayout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import Products from "./pages/Products/Products";
import Users from "./pages/Users/Users";
import Locations from "./pages/Locations/Locations";
import BankingSettings from "./pages/BankingSettings/BankingSettings";
import Reporting from "./pages/Reporting/Reporting";
import Notifications from "./pages/Notifications/Notifications";
import Settings from "./pages/Settings/Settings";
import Profile from "./pages/Profile/Profile";
import Payments from "./pages/Payments/Payments";
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

      { path: "/products", element: <Products /> },
      { path: "/users", element: <Users /> },
      { path: "/locations", element: <Locations /> },
      { path: "/banking-settings", element: <BankingSettings /> },
      { path: "/reporting", element: <Reporting /> },
      { path: "/notification", element: <Notifications /> },
      { path: "/settings", element: <Settings /> },
      { path: "/payments", element: <Payments /> },
      { path: "/profile", element: <Profile /> },

      {
        path: "/business",
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
