import { assets } from "../../assets/assets";
import { Link } from "react-router";
import { useAppContext } from "../../context/AppContext";

const NavbarOwner = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { user } = useAppContext();
  return (
    <div className="flex items-center justify-between px-6 md:px-10 py-4 text-gray-500 border-b border-borderColor relative transition-all bg-background z-50">
      <div className="flex items-center gap-3">
        {/* Toggle Button for mobile */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="md:hidden p-1 rounded-md hover:bg-card text-foreground cursor-pointer"
        >
          <img
            src={isSidebarOpen ? assets.close_icon : assets.menu_icon}
            alt="Menu Toggle"
            className="w-5 h-5 invert brightness-90"
          />
        </button>
        <Link to="/">
          <img src={assets.logo} alt="logo" className="h-7" />
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <p className="text-sm max-sm:hidden">Welcome, {user?.name || "Owner"}</p>
        <div className="w-[1px] h-4 bg-border max-sm:hidden"></div>
        <Link to="/" className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors duration-200 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4.5 h-4.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          Home
        </Link>
      </div>
    </div>
  );
};

export default NavbarOwner;
