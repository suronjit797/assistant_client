import { createBrowserRouter } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import MainLayout from "./components/layouts/MainLayout";
import BankingSettings from "./pages/BankingSettings/BankingSettings";
import Home from "./pages/Home/Home";
import CreateLocation from "./pages/Locations/CreateLocation";
import EditLocation from "./pages/Locations/EditLocation";
import Locations from "./pages/Locations/Locations";
import ForgotPassword from "./pages/Login/ForgotPassword";
import Login from "./pages/Login/Login";
import { ResetPassword } from "./pages/Login/ResetPassword";
import NotFound from "./pages/NotFound/NotFound";
import Notifications from "./pages/Notifications/Notifications";
import ManualReconciliation from "./pages/Payments/ManualReconciliation";
import ReconciliationSummary from "./pages/Payments/ReconciliationSummary";
import CreateProduct from "./pages/Products/CreateProduct";
import EditProduct from "./pages/Products/EditProduct";
import Products from "./pages/Products/Products";
import EditProfile from "./pages/Profile/EditProfile";
import Profile from "./pages/Profile/Profile";
import Reporting from "./pages/Reporting/Reporting";
import ActivityLog from "./pages/Settings/ActivityLog";
import Settings from "./pages/Settings/Settings";
import CreateUser from "./pages/Users/CreateUser";
import EditUser from "./pages/Users/EditUser";
import Users from "./pages/Users/Users";
import PaymentSummary from "./pages/Payments/PaymentSummary";
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
      //
      { path: "/manual-reconciliation", element: <ManualReconciliation /> },
      { path: "/reconciliation-summary", element: <ReconciliationSummary /> },
      { path: "/payment-summary", element: <PaymentSummary /> },
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
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/reset-password/:token", element: <ResetPassword /> },
  {
    path: "*",
    element: <NotFound />,
  },
]);
