import { createBrowserRouter } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import MainLayout from "./components/layouts/MainLayout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import Users from "./pages/Users/Users";
import Profile from "./pages/Profile/Profile";
import Transactions from "./pages/Transactions/Transactions";
import Todos from "./pages/Todos/Todos";
import Routines from "./pages/Routine/Routine";
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
          <Auth>
            <Home />
          </Auth>
        ),
      },

      // admin
      {
        path: "/users",
        element: (
          //! is user match his role
          <Auth roles={["admin"]}>
            <Users />
          </Auth>
        ),
      },
      {
        path: "/profile",
        element: (
          //! is user match his role
          <Auth>
            <Profile />
          </Auth>
        ),
      },
      { path: "transaction", element: <Transactions /> },
      { path: "todo", element: <Todos /> },
      { path: "routine", element: <Routines /> },

      //     {
      //       path: "/admin",
      //       element: (
      //         //! is user match his role
      //         <Auth roles={["admin"]}>
      //           <Admin />
      //         </Auth>
      //       ),
      //     },

      //     // services routes
      //     { path: "summary", element: <TransactionSummary /> },
      //     { path: "calender", element: <Calender /> },
      //     { path: "event", element: <Event /> },

      //     //  not found route
      { path: "*", element: <NotFound /> },
    ],
  },
  { path: "/login", element: <Login /> },
  // { path: "/register", element: <Register /> },
  {
    path: "*",
    element: <NotFound />,
  },
]);
