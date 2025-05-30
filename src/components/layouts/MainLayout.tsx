import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import "./mainLayout.css";
import Sidebar from "./Sidebar";
import { useAppSelector } from "@/redux/store";

const MainLayout: React.FC = () => {
  const { isNavOpen } = useAppSelector((state) => state.theme);
  return (
    <div className="mainLayout">
      <header className={`h-screen overflow-y-scroll shadow-lg sidebar ${isNavOpen ? "active" : ""}`}>
        <Sidebar />
      </header>
      <main className={`${isNavOpen ? "active" : ""} h-screen overflow-y-auto`}>
        <Header />
        <div className="p-4 border border-gray-300 dark:border-slate-600 h-full mx-4 rounded-md">
          <Outlet />
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default MainLayout;
