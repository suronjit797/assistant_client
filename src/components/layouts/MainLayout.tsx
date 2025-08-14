import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import "./mainLayout.css";
import Sidebar from "./Sidebar";
import { useAppSelector } from "@/redux/store";

const MainLayout: React.FC = () => {
  const { isNavOpen, isDark } = useAppSelector((state) => state.theme);
  return (
    <div className="mainLayout">
      <header className={`h-screen overflow-y-scroll shadow-lg sidebar ${isNavOpen ? "active" : ""}`}>
        <Sidebar />
      </header>
      <main
        className={`${isNavOpen ? "active" : ""} h-screen overflow-y-auto ${isDark ? "bg-[#1a212d]" : "bg-gray-100"}`}
      >
        <Header />
        <div className="mx-4 rounded-md h-full shadow-sm bg-white dark:bg-slate-800 p-5 overflow-y-scroll no-scrollbar">
          <Outlet />
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default MainLayout;
