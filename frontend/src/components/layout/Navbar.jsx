import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { assets, menuLinks } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import { toast } from "sonner";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { User, XIcon } from "@phosphor-icons/react";

const GRADIENTS = [
  {
    name: "Lavender Blue",
    style: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
    start: "#e0c3fc",
    end: "#8ec5fc",
  },
  {
    name: "Deep Slate",
    style: "linear-gradient(135deg, #2b5876 0%, #4e4376 100%)",
    start: "#2b5876",
    end: "#4e4376",
  },
  {
    name: "Neon Cyan",
    style: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    start: "#4facfe",
    end: "#00f2fe",
  },
  {
    name: "Charcoal Dark",
    style: "linear-gradient(135deg, #434343 0%, #000000 100%)",
    start: "#434343",
    end: "#000000",
  },
  {
    name: "Vibrant Violet",
    style: "linear-gradient(135deg, #7000ff 0%, #ff007b 100%)",
    start: "#7000ff",
    end: "#ff007b",
  },
  {
    name: "Teal Mint",
    style: "linear-gradient(135deg, #81e6d9 0%, #319795 100%)",
    start: "#81e6d9",
    end: "#319795",
  },
  {
    name: "Emerald Green",
    style: "linear-gradient(135deg, #85e3b3 0%, #1c7c54 100%)",
    start: "#85e3b3",
    end: "#1c7c54",
  },
  {
    name: "Yellow Green",
    style: "linear-gradient(135deg, #fef08a 0%, #bbf7d0 100%)",
    start: "#fef08a",
    end: "#bbf7d0",
  },
  {
    name: "Mango Orange",
    style: "linear-gradient(135deg, #ffe259 0%, #ffa751 100%)",
    start: "#ffe259",
    end: "#ffa751",
  },
  {
    name: "Rose Coral",
    style: "linear-gradient(135deg, #f857a6 0%, #ff5858 100%)",
    start: "#f857a6",
    end: "#ff5858",
  },
  {
    name: "Magenta Purple",
    style: "linear-gradient(135deg, #ff007b 0%, #9900ff 100%)",
    start: "#ff007b",
    end: "#9900ff",
  },
];

const MONOGRAM_COLORS = [
  "#ff6b00",
  "#2563eb",
  "#16a34a",
  "#dc2626",
  "#7c3aed",
  "#db2777",
  "linear-gradient(135deg, #7000ff 0%, #ff007b 100%)",
  "linear-gradient(135deg, #81e6d9 0%, #319795 100%)",
  "linear-gradient(135deg, #ffe259 0%, #ffa751 100%)",
];

const DEFAULT_AVATAR_URL =
  "data:image/svg+xml;base64," +
  btoa(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#81e6d9" /><stop offset="100%" stop-color="#319795" /></linearGradient></defs><rect width="100" height="100" fill="url(#g)" /></svg>`,
  );

const Navbar = () => {
  const { setShowLogin, user, logout, axios, isOwner, setIsOwner, fetchUser } =
    useAppContext();
  const location = useLocation();
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);

  // Avatar & Profile Edit States
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [profilePassword, setProfilePassword] = useState("");
  const [tab, setTab] = useState("gradient");
  const [selectedType, setSelectedType] = useState("gradient");
  const [selectedValue, setSelectedValue] = useState(GRADIENTS[5]); // Default Teal Mint
  const [monogramText, setMonogramText] = useState("");
  const [monogramBg, setMonogramBg] = useState("#ff6b00");
  const [customFile, setCustomFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const makeGradientSvg = (start, end) => {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${start}" />
          <stop offset="100%" stop-color="${end}" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill="url(#g)" />
    </svg>`;
  };

  const makeMonogramSvg = (bg, text) => {
    let fillStyle = bg;
    let gradientDefs = "";
    if (bg.startsWith("linear-gradient")) {
      const matches = bg.match(/#[0-9a-fA-F]{6}/g);
      if (matches && matches.length >= 2) {
        gradientDefs = `<defs>
          <linearGradient id="mg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${matches[0]}" />
            <stop offset="100%" stop-color="${matches[1]}" />
          </linearGradient>
        </defs>`;
        fillStyle = "url(#mg)";
      }
    }

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      ${gradientDefs}
      <rect width="100" height="100" fill="${fillStyle}" />
      <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-weight="bold" font-size="38" fill="#ffffff">${text}</text>
    </svg>`;
  };

  const handleSaveProfile = async () => {
    if (!profileName.trim() || !profileEmail.trim()) {
      toast.error("Name and Email are required");
      return;
    }

    setIsUploading(true);
    try {
      let imageVal = user?.image || "";

      if (tab === "gradient") {
        if (selectedValue) {
          const svgString = makeGradientSvg(
            selectedValue.start,
            selectedValue.end,
          );
          imageVal = "data:image/svg+xml;base64," + btoa(svgString);
        }
      } else if (tab === "monogram") {
        const text =
          monogramText.trim() ||
          profileName.substring(0, 2).toUpperCase() ||
          "CR";
        const svgString = makeMonogramSvg(monogramBg, text);
        imageVal = "data:image/svg+xml;base64," + btoa(svgString);
      } else if (tab === "custom") {
        if (customFile) {
          imageVal = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(customFile);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (err) => reject(err);
          });
        }
      }

      const payload = {
        name: profileName,
        email: profileEmail,
        image: imageVal,
      };

      if (profilePassword.trim()) {
        if (profilePassword.length < 8) {
          toast.error("Password must be at least 8 characters long");
          setIsUploading(false);
          return;
        }
        payload.password = profilePassword;
      }

      const { data } = await axios.post("/api/user/update-profile", payload);
      if (data.success) {
        fetchUser();
        toast.success(data.message);
        setIsAvatarModalOpen(false);
        setCustomFile(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 transition-all duration-300 fixed top-0 left-0 right-0 z-50 ${
        isScrolled
          ? "bg-[#09090b]/85 border-b border-white/[0.06] backdrop-blur-md shadow-md"
          : "bg-transparent border-b border-transparent"
      }`}>
      <Link to="/">
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={assets.logo}
          alt="Logo"
          className="h-8"
        />
      </Link>

      {/* Desktop Links */}
      <div className="hidden sm:flex items-center gap-8">
        {menuLinks.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className={`hover:text-primary transition-colors text-sm ${
              location.pathname === link.path
                ? "text-primary font-semibold"
                : "text-muted-foreground"
            }`}>
            {link.name}
          </Link>
        ))}

        <div className="flex items-center gap-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="focus:outline-none cursor-pointer block rounded-full">
                  <img
                    src={user.image || DEFAULT_AVATAR_URL}
                    alt="User Avatar"
                    className="h-9 w-9 rounded-full object-cover border border-border/80 shadow-sm hover:ring-2 hover:ring-primary/50 transition-all duration-200"
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-52 bg-card border border-border shadow-xl rounded-xl p-1 text-foreground">
                <div className="px-3 py-2 text-xs text-muted-foreground border-b border-border mb-1">
                  Logged in as{" "}
                  <p className="font-semibold text-foreground truncate mt-0.5">
                    {user.name}
                  </p>
                </div>

                {isOwner ? (
                  <DropdownMenuItem
                    onClick={() => navigate("/owner")}
                    className="cursor-pointer flex items-center gap-2 text-sm rounded-lg hover:bg-muted focus:bg-muted font-medium">
                    Dashboard
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem
                    onClick={changeRole}
                    className="cursor-pointer flex items-center gap-2 text-sm rounded-lg hover:bg-muted focus:bg-muted font-medium">
                    List Cars
                  </DropdownMenuItem>
                )}

                <DropdownMenuItem
                  onClick={() => {
                    setProfileName(user?.name || "");
                    setProfileEmail(user?.email || "");
                    setProfilePassword("");
                    setMonogramText(
                      user?.name?.substring(0, 2).toUpperCase() || "CR",
                    );
                    setIsAvatarModalOpen(true);
                  }}
                  className="cursor-pointer flex items-center gap-2 text-sm rounded-lg hover:bg-muted focus:bg-muted font-medium my-1">
                  Edit Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem
                  onClick={logout}
                  className="cursor-pointer flex items-center gap-2 mt-1 text-sm text-destructive hover:bg-destructive/10 focus:bg-destructive/10 rounded-lg">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={() => setShowLogin(true)}
              className="cursor-pointer px-6">
              Login
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className="sm:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Menu"
              className="cursor-pointer">
              <img
                src={assets.menu_icon}
                alt="menu"
                className="invert w-5 h-5"
              />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="flex flex-col justify-between h-full p-6 bg-[#09090b]/95 border-l border-white/[0.08] text-foreground w-[340px] sm:w-[400px]">
            {/* Drawer Header (Pantera style company label) */}
            <div className="flex items-center justify-between pb-6 border-b border-white/[0.08] pr-8">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-5 h-5 text-primary"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-1.1 0-2 .9-2 2v7c0 .6.4 1 1 1h2m10 0a3 3 0 11-6 0m6 0a3 3 0 116 0M7 17a3 3 0 11-6 0"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-bold text-foreground tracking-tight">
                    Car Rental
                  </span>
                  <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                    Luxury Fleets
                  </span>
                </div>
              </div>
            </div>

            {/* Middle Links (Pantera style items) */}
            <div className="flex flex-col gap-1.5 flex-1 mt-6">
              {menuLinks.map((link, index) => {
                let icon = (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-4.5 h-4.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                );
                if (link.path === "/") {
                  icon = (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-4.5 h-4.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  );
                } else if (link.path === "/cars") {
                  icon = (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-4.5 h-4.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-1.1 0-2 .9-2 2v7c0 .6.4 1 1 1h2" />
                      <circle cx="7" cy="17" r="3" />
                      <circle cx="17" cy="17" r="3" />
                    </svg>
                  );
                }

                const isActive = location.pathname === link.path;

                return (
                  <SheetClose asChild key={index}>
                    <Link
                      to={link.path}
                      className={`flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? "bg-primary/10 text-primary font-bold shadow-sm"
                          : "text-muted-foreground hover:text-foreground hover:bg-white/[0.02]"
                      }`}>
                      <span
                        className={
                          isActive ? "text-primary" : "text-muted-foreground/75"
                        }>
                        {icon}
                      </span>
                      <span className="text-sm font-semibold">{link.name}</span>
                    </Link>
                  </SheetClose>
                );
              })}
            </div>

            {/* Bottom Section (Joe Turner profile card match) */}
            {user ? (
              <div className="flex flex-col gap-4 border-t border-white/[0.08] pt-6 mt-auto">
                <button
                  onClick={() => {
                    setProfileName(user?.name || "");
                    setProfileEmail(user?.email || "");
                    setProfilePassword("");
                    setMonogramText(
                      user?.name?.substring(0, 2).toUpperCase() || "CR",
                    );
                    setIsAvatarModalOpen(true);
                  }}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.05] transition-all duration-200 text-left w-full cursor-pointer group">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={user.image || DEFAULT_AVATAR_URL}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover border border-white/[0.08] shrink-0"
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors truncate">
                        {user.name}
                      </span>
                      <span className="text-[10.5px] text-muted-foreground truncate">
                        {user.email}
                      </span>
                    </div>
                  </div>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>

                <div className="space-y-1.5 px-1">
                  <div className="flex justify-between items-center text-[10.5px] font-bold text-muted-foreground uppercase tracking-wider">
                    <span>Profile Status</span>
                    <span className="text-primary">100%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden border border-white/[0.04]">
                    <div className="h-full w-full bg-primary rounded-full transition-all duration-500"></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-1">
                  {isOwner ? (
                    <SheetClose asChild>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => navigate("/owner")}
                        className="cursor-pointer text-xs h-9 font-semibold rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] text-foreground">
                        Dashboard
                      </Button>
                    </SheetClose>
                  ) : (
                    <SheetClose asChild>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={changeRole}
                        className="cursor-pointer text-xs h-9 font-semibold rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] text-foreground">
                        List Cars
                      </Button>
                    </SheetClose>
                  )}

                  <SheetClose asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={logout}
                      className="cursor-pointer text-xs h-9 font-semibold rounded-xl border-destructive/20 hover:bg-destructive/10 text-destructive">
                      Logout
                    </Button>
                  </SheetClose>
                </div>
              </div>
            ) : (
              <div className="border-t border-white/[0.08] pt-6 mt-auto">
                <SheetClose asChild>
                  <Button
                    onClick={() => setShowLogin(true)}
                    className="w-full cursor-pointer h-10 font-bold uppercase tracking-wider rounded-xl bg-primary hover:bg-primary-dull text-primary-foreground shadow-lg">
                    Login
                  </Button>
                </SheetClose>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>

      {/* Edit Profile Dialog Modal */}
      <Dialog open={isAvatarModalOpen} onOpenChange={setIsAvatarModalOpen}>
        <DialogContent
          className="sm:max-w-[780px] w-[95%] p-0 border-none bg-transparent shadow-none overflow-hidden"
          showCloseButton={false}>
          <Card className="border border-border/80 bg-card/95 backdrop-blur-md rounded-2xl shadow-xl w-full">
            <CardHeader className="space-y-1 pb-3 relative">
              <button
                onClick={() => setIsAvatarModalOpen(false)}
                className="absolute right-4 top-4 text-muted-foreground hover:text-foreground cursor-pointer focus:outline-none transition-colors p-1 rounded-full hover:bg-muted/40"
                aria-label="Close">
                <XIcon size={16} />
              </button>
              <CardTitle className="text-xl font-bold tracking-tight text-foreground mt-1">
                Edit Profile
              </CardTitle>
            </CardHeader>
            <CardContent
              className="pb-6 max-h-[85vh] overflow-y-auto"
              data-lenis-prevent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
                {/* Left Column: Form Fields */}
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Name
                    </label>
                    <Input
                      required
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      placeholder="Your Name"
                      className="bg-muted/30 border-border/80 focus-visible:ring-primary h-10 rounded-lg text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Email
                    </label>
                    <Input
                      required
                      type="email"
                      value={profileEmail}
                      onChange={(e) => setProfileEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="bg-muted/30 border-border/80 focus-visible:ring-primary h-10 rounded-lg text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      New Password
                    </label>
                    <Input
                      type="password"
                      value={profilePassword}
                      onChange={(e) => setProfilePassword(e.target.value)}
                      placeholder="Leave blank to keep current"
                      className="bg-muted/30 border-border/80 focus-visible:ring-primary h-10 rounded-lg text-sm"
                    />
                  </div>
                </div>

                {/* Right Column: Avatar Creator */}
                <div className="space-y-4">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                    Profile Picture / Avatar
                  </label>

                  {/* Custom Tabs */}
                  <div className="grid grid-cols-3 bg-muted/40 p-1 rounded-xl text-center">
                    <button
                      type="button"
                      onClick={() => setTab("gradient")}
                      className={`py-1.5 text-xs font-semibold rounded-lg cursor-pointer transition-all ${
                        tab === "gradient"
                          ? "bg-background text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}>
                      Gradient
                    </button>
                    <button
                      type="button"
                      onClick={() => setTab("monogram")}
                      className={`py-1.5 text-xs font-semibold rounded-lg cursor-pointer transition-all ${
                        tab === "monogram"
                          ? "bg-background text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}>
                      Monogram
                    </button>
                    <button
                      type="button"
                      onClick={() => setTab("custom")}
                      className={`py-1.5 text-xs font-semibold rounded-lg cursor-pointer transition-all ${
                        tab === "custom"
                          ? "bg-background text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}>
                      Custom File
                    </button>
                  </div>

                  {/* Tab Contents */}
                  {tab === "gradient" && (
                    <div className="grid grid-cols-4 gap-3 justify-items-center py-1">
                      {GRADIENTS.map((g, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setSelectedType("gradient");
                            setSelectedValue(g);
                          }}
                          style={{ background: g.style }}
                          className={`w-11 h-11 rounded-full cursor-pointer transition-all duration-200 hover:scale-105 ${
                            selectedType === "gradient" &&
                            selectedValue?.style === g.style
                              ? "ring-2 ring-primary ring-offset-2 ring-offset-card scale-105"
                              : "border border-border/80"
                          }`}
                          title={g.name}
                        />
                      ))}
                    </div>
                  )}

                  {tab === "monogram" && (
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-4 justify-center bg-muted/20 p-3 rounded-xl border border-border/40">
                        <div
                          style={{ background: monogramBg }}
                          className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-inner uppercase">
                          {monogramText || "U"}
                        </div>

                        <div className="flex flex-col gap-1 flex-1">
                          <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                            Initials
                          </label>
                          <Input
                            maxLength={2}
                            value={monogramText}
                            onChange={(e) =>
                              setMonogramText(e.target.value.toUpperCase())
                            }
                            placeholder="U"
                            className="bg-muted/30 border-border/80 focus-visible:ring-primary h-8 rounded-lg text-xs"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                          Background Color
                        </label>
                        <div className="flex flex-wrap gap-1.5 justify-center py-1">
                          {MONOGRAM_COLORS.map((color, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setMonogramBg(color)}
                              style={{ background: color }}
                              className={`w-7 h-7 rounded-full cursor-pointer transition-all duration-200 hover:scale-105 ${
                                monogramBg === color
                                  ? "ring-2 ring-primary ring-offset-1 ring-offset-card"
                                  : "border border-border/80"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {tab === "custom" && (
                    <div className="flex flex-col items-center gap-3">
                      <label
                        htmlFor="navbar-custom-upload"
                        className="w-full border border-dashed border-border/80 hover:border-primary/50 bg-muted/10 hover:bg-muted/20 rounded-xl py-6 px-3 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all duration-200">
                        {customFile ? (
                          <div className="flex flex-col items-center gap-1.5">
                            <img
                              src={URL.createObjectURL(customFile)}
                              alt="Custom Preview"
                              className="w-14 h-14 rounded-full object-cover border border-border shadow-sm"
                            />
                            <span className="text-xs text-muted-foreground font-medium truncate max-w-[200px]">
                              {customFile.name}
                            </span>
                          </div>
                        ) : (
                          <>
                            <User size={24} className="text-muted-foreground" />
                            <span className="text-xs font-semibold text-muted-foreground">
                              Select file from computer
                            </span>
                            <span className="text-[10px] text-muted-foreground/60">
                              Supports PNG, JPG, GIF up to 2MB
                            </span>
                          </>
                        )}
                      </label>
                      <input
                        type="file"
                        id="navbar-custom-upload"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files[0]) {
                            setCustomFile(e.target.files[0]);
                            setSelectedType("custom");
                          }
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Bottom Actions Span */}
                <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-border/60 col-span-1 md:col-span-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsAvatarModalOpen(false)}
                    className="cursor-pointer"
                    disabled={isUploading}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveProfile}
                    className="cursor-pointer bg-primary hover:bg-primary-dull text-primary-foreground font-semibold px-6"
                    disabled={isUploading}>
                    {isUploading ? "Saving..." : "Save"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default Navbar;
