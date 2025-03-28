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
      <header className={`sidebar ${isNavOpen ? "active" : ""}`}>
        <Sidebar />
      </header>
      <main>
        <Header />
        <div className="p-6">
          <Outlet />
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default MainLayout;
