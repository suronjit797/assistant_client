import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import "./mainLayout.css";
import Sidebar from "./Sidebar";
import { useAppSelector } from "@/redux/store";

const MainLayout: React.FC = () => {
  const { isNavOpen, isDark } = useAppSelector((state) => state.theme);
  return (
    <div className="mainLayout min-h-screen">
      {/* Sidebar */}
      <aside className={`h-screen shadow-2xl sidebar transition-all duration-300 ease-in-out ${isNavOpen ? "active" : ""} ${isDark ? "shadow-black/20" : "shadow-blue-500/10"}`}>
        <div className="h-full overflow-y-auto modern-scrollbar">
          <Sidebar />
        </div>
      </aside>
      
      {/* Main Content Area */}
      <main
        className={`${isNavOpen ? "active" : ""} h-screen flex flex-col transition-all duration-300 ease-in-out ${
          isDark 
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" 
            : "bg-gradient-to-br from-blue-50 via-white to-cyan-50"
        }`}
      >
        {/* Header */}
        <Header />
        
        {/* Content Area */}
        <div className="flex-1 p-6 overflow-hidden">
          <div className={`
            h-full rounded-2xl shadow-xl modern-card overflow-hidden
            ${
              isDark 
                ? "bg-gray-800/50 border border-gray-700/50" 
                : "bg-white/90 border border-blue-200/50"
            }
            backdrop-blur-sm
          `}>
            <div className="h-full overflow-y-auto modern-scrollbar p-6">
              <div className="animate-fadeIn">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
};

export default MainLayout;
