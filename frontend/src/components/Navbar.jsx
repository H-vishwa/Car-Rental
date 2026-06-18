import { Link, useLocation, useNavigate } from "react-router-dom";
import { assets, menuLinks } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const { setShowLogin, user, logout, axios, isOwner, setIsOwner } =
    useAppContext();
  const location = useLocation();
  const navigate = useNavigate();

  const changeRole = async () => {
    try {
      const { data } = await axios.post("api/owner/change-role");
      if (data.success) {
        setIsOwner(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-border transition-all sticky top-0 z-50 bg-background/80 backdrop-blur-md">
      <Link to="/">
        <motion.img whileHover={{ scale: 1.05 }} src={assets.logo} alt="Logo" className="h-8" />
      </Link>

      {/* Desktop Links */}
      <div className="hidden sm:flex items-center gap-8">
        {menuLinks.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className={`hover:text-primary transition-colors text-sm ${
              location.pathname === link.path ? "text-primary font-semibold" : "text-muted-foreground"
            }`}>
            {link.name}
          </Link>
        ))}



        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            onClick={() => (isOwner ? navigate("/owner") : changeRole())}
            className="cursor-pointer text-sm">
            {isOwner ? "Dashboard" : "List Cars"}
          </Button>

          <Button
            onClick={() => { user ? logout() : setShowLogin(true); }}
            className="cursor-pointer px-6">
            {user ? "Logout" : "Login"}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className="sm:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Menu" className="cursor-pointer">
              <img src={assets.menu_icon} alt="menu" className="invert w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="flex flex-col gap-6 p-6">
            <SheetHeader className="p-0 border-b border-border pb-4">
              <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-6 mt-4">
              {menuLinks.map((link, index) => (
                <SheetClose asChild key={index}>
                  <Link
                    to={link.path}
                    className={`hover:text-primary transition-colors text-base ${
                      location.pathname === link.path ? "text-primary font-semibold" : "text-muted-foreground"
                    }`}>
                    {link.name}
                  </Link>
                </SheetClose>
              ))}
              <div className="flex flex-col gap-3 border-t border-border pt-6">
                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    onClick={() => (isOwner ? navigate("/owner") : changeRole())}
                    className="justify-start cursor-pointer">
                    {isOwner ? "Dashboard" : "List Cars"}
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button
                    onClick={() => { user ? logout() : setShowLogin(true); }}
                    className="w-full cursor-pointer">
                    {user ? "Logout" : "Login"}
                  </Button>
                </SheetClose>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.div>
  );
};

export default Navbar;
