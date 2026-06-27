import { useState, useEffect } from "react";
import Sidebar from "../../components/layout/Sidebar";
import NavbarOwner from "../../components/layout/NavbarOwner";
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
    <div className="flex flex-col min-h-screen bg-[#09090b] relative overflow-hidden isolate text-foreground">
      {/* Background Ripple Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10 flex items-center justify-center">
        <div className="absolute w-[400px] h-[400px] rounded-full border border-white/[0.03]"></div>
        <div className="absolute w-[700px] h-[700px] rounded-full border border-white/[0.02]"></div>
        <div className="absolute w-[1000px] h-[1000px] rounded-full border border-white/[0.01]"></div>
      </div>

      {/* Edge Vignette Gradients */}
      <div className="absolute inset-0 pointer-events-none -z-20">
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-36 bg-gradient-to-r from-[#ff5500]/[0.03] to-transparent"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-36 bg-gradient-to-l from-[#ff5500]/[0.03] to-transparent"></div>
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#ff5500]/[0.02] to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#09090b] to-transparent"></div>
      </div>

      <NavbarOwner isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className="flex flex-1 relative z-10">
        {/* Backdrop for mobile drawer */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
          />
        )}
        <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <div className="flex-1 flex flex-col overflow-hidden h-[calc(100vh-64px)]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
