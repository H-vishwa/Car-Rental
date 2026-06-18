import { useState, useEffect } from "react";
import Sidebar from "../../components/owner/Sidebar";
import NavbarOwner from "../../components/owner/NavbarOwner";
import { Outlet } from "react-router";
import { useAppContext } from "../../context/AppContext";

const Layout = () => {
  const { isOwner, navigate } = useAppContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isOwner) {
      navigate("/");
    }
  }, [isOwner]);

  return (
    <div className="flex flex-col min-h-screen">
      <NavbarOwner isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className="flex flex-1 relative">
        {/* Backdrop for mobile drawer */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
          />
        )}
        <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <div className="flex-1 overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
