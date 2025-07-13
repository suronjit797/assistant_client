import { ConfigProvider, theme } from "antd";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import Swal from "sweetalert2";
import "./App.css";
import { routes } from "./Routes";
import { useAppSelector } from "./redux/store";
import "@ant-design/v5-patch-for-react-19";

const customDarkTheme = (isDark: boolean) => ({
  components: {
    // Button: {
    //   colorBgContainerDisabled: "#4b93fd",
    //   colorTextDisabled: "#fff",
    //   defaultHoverBorderColor: "#0d6efd",
    //   defaultHoverColor: "#0c60d0",
    // },

    Input: {
      colorTextPlaceholder: "#95a5a6",
      hoverBorderColor: "#4FC3F7",
      activeBorderColor: "#4FC3F7",
    },
  },
  token: {
    colorPrimary: "#4FC3F7",
    colorBgBase: isDark ? "#14181e" : "#ffffff", 
    colorTextBase: isDark ? "#f8fafc" : "#000000", 
    colorBgContainerDisabled: "",
    colorTextDisabled: "",
  },
  algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
});

function App() {
  const { isDark } = useAppSelector((state) => state.theme);

  // network error handler
  useEffect(() => {
    const handleNetworkChange = () => {
      if (!navigator.onLine) {
        Swal.fire({
          title: "Error!",
          text: "No Internet Connection!",
          icon: "error",
          confirmButtonText: "OK",
          timer: 3000,
        });
      }
    };

    // Set up event listeners
    window.addEventListener("offline", handleNetworkChange);
    window.addEventListener("online", handleNetworkChange);

    // Initial check
    handleNetworkChange();

    // Clean up
    return () => {
      window.removeEventListener("offline", handleNetworkChange);
      window.removeEventListener("online", handleNetworkChange);
    };
  }, []);

  // dark mode
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark"); // Add Tailwind dark mode class
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <ConfigProvider theme={customDarkTheme(isDark)}>
      <div
        className="min-h-screen bg-white text-black dark:bg-slate-800 dark:text-white"
        data-theme={isDark ? "dark" : ""}
      >
        <RouterProvider router={routes}></RouterProvider>
      </div>
    </ConfigProvider>
  );
}

export default App;
