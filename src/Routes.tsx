import { createBrowserRouter } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import MainLayout from "./components/layouts/MainLayout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import Users from "./pages/Users/Users";
import Profile from "./pages/Profile/Profile";
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
      // { path: "transaction", element: <Transactions /> },
      //     { path: "summary", element: <TransactionSummary /> },
      //     { path: "calender", element: <Calender /> },
      //     { path: "routine", element: <Routine /> },
      //     { path: "todo", element: <Todo /> },
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
