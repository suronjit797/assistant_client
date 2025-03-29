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
import CreateProduct from "./pages/Products/CreateProduct";
import EditProduct from "./pages/Products/EditProduct";
import CreateUser from "./pages/Users/CreateUser";
import EditUser from "./pages/Users/EditUser";
import EditLocation from "./pages/Locations/EditLocation";
import CreateLocation from "./pages/Locations/CreateLocation";
import ActivityLog from "./pages/Settings/ActivityLog";
import EditProfile from "./pages/Profile/EditProfile";
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
      { path: "/products/create", element: <CreateProduct /> },
      { path: "/products/edit/:id", element: <EditProduct /> },
      // 
      { path: "/users", element: <Users /> },
      { path: "/users/create", element: <CreateUser /> },
      { path: "/users/edit/:id", element: <EditUser /> },
      // 
      { path: "/locations", element: <Locations /> },
      { path: "/locations/create", element: <CreateLocation /> },
      { path: "/locations/edit/:id", element: <EditLocation /> },
      // 
      { path: "/banking-settings", element: <BankingSettings /> },
      { path: "/reporting", element: <Reporting /> },
      { path: "/notification", element: <Notifications /> },
      { path: "/settings", element: <Settings /> },
      { path: "/activity-log", element: <ActivityLog /> },
      { path: "/payments", element: <Payments /> },
      // 
      { path: "/profile", element: <Profile /> },
      { path: "/profile/edit", element: <EditProfile /> },

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
