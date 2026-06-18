import { useState } from "react";
import { assets, ownerMenuLinks } from "../../assets/assets";
import { NavLink, useLocation } from "react-router";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { user, axios, fetchUser } = useAppContext();
  const location = useLocation();
  const [image, setImage] = useState();

  const updateImage = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image);

      const { data } = await axios.post("/api/owner/update-image", formData);
      if (data.success) {
        fetchUser();
        toast.success(data.message);
        setImage("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className={`fixed md:sticky top-[65px] left-0 h-[calc(100vh-65px)] z-40 flex flex-col items-center pt-8 bg-background border-r border-border text-sm transition-transform duration-300 md:translate-x-0 w-60 md:w-64 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="group relative">
        <label htmlFor="image">
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : user?.image ||
                  "https://toppng.com/uploads/preview/donna-picarro-dummy-avatar-115633298255iautrofxa.png"
            }
            alt="Dummy User"
            className="h-11 w-11 rounded-full mx-auto object-cover"
          />
          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
            className=""
          />

          <div className="hidden absolute top-0 left-0 bottom-0 right-0 bg-black/10 rounded-full group-hover:flex items-center justify-center cursor-pointer">
            <img src={assets.edit_icon} alt="" className="" />
          </div>
        </label>
      </div>
      {image && (
        <button
          onClick={updateImage}
          className="absolute top-0 right-0 flex p-2 gap-1 bg-primary/10 text-primary cursor-pointer">
          Save <img src={assets.check_icon} width={13} alt="check icon" />
        </button>
      )}
      <p className="mt-2 text-base font-medium text-foreground">{user?.name}</p>

      <div className="w-full px-6 flex flex-col gap-1.5 mt-8">
        {ownerMenuLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            onClick={() => setIsSidebarOpen(false)}
            className={`relative flex items-center gap-3 w-full py-3 px-4 rounded-lg transition-all duration-200 ${
              link.path === location.pathname
                ? "bg-primary/10 text-primary font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-card/40"
            }`}>
            <img
              src={
                link.path === location.pathname ? link.coloredIcon : link.icon
              }
              alt={link.name}
              className="w-4 h-4 shrink-0"
            />
            <span className="whitespace-nowrap">{link.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
