import { Spin } from "antd";
import { JSX, Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

// Lazy imports
const Auth = lazy(() => import("./components/Auth/Auth"));
const MainLayout = lazy(() => import("./components/layouts/MainLayout"));
const Home = lazy(() => import("./pages/Home/Home"));
const Login = lazy(() => import("./pages/Login/Login"));
const Register = lazy(() => import("./pages/Login/Register"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
const PasswordManager = lazy(() => import("./pages/PasswordManager/PasswordManager"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const Todos = lazy(() => import("./pages/Todos/Todos"));
const Transactions = lazy(() => import("./pages/Transactions/Transactions"));
const Users = lazy(() => import("./pages/Users/Users"));
const Diary = lazy(() => import("./pages/Diary/Diary"));
const Blog = lazy(() => import("./pages/Blog/Blog"));
const Contacts = lazy(() => import("./pages/Contacts/Contacts"));
const Events = lazy(() => import("./pages/Events/Events"));

// Simple loading fallback

// Helper wrapper to avoid repeating <Suspense>
const withSuspense = (element: JSX.Element) => <Suspense fallback={<Spin />}>{element}</Suspense>;

export const routes = createBrowserRouter([
  {
    path: "/",
    element: withSuspense(
      <Auth>
        <MainLayout />
      </Auth>,
    ),
    children: [
      {
        index: true,
        element: withSuspense(
          <Auth>
            <Home />
          </Auth>,
        ),
      },
      {
        path: "/users",
        element: withSuspense(
          <Auth roles={["admin"]}>
            <Users />
          </Auth>,
        ),
      },
      {
        path: "/profile",
        element: withSuspense(
          <Auth>
            <Profile />
          </Auth>,
        ),
      },
      { path: "transaction", element: withSuspense(<Transactions />) },
      { path: "todo", element: withSuspense(<Todos />) },
      { path: "password-manager", element: withSuspense(<PasswordManager />) },
      { path: "diary", element: withSuspense(<Diary />) },
      { path: "blog", element: withSuspense(<Blog />) },
      { path: "contact", element: withSuspense(<Contacts />) },
      { path: "event", element: withSuspense(<Events />) },
      { path: "*", element: withSuspense(<NotFound />) },
    ],
  },
  { path: "/login", element: withSuspense(<Login />) },
  { path: "/register", element: withSuspense(<Register />) },
  { path: "*", element: withSuspense(<NotFound />) },
]);
