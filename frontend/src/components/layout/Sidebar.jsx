import { useState } from "react";
import { assets, ownerMenuLinks } from "../../assets/assets";
import { NavLink, useLocation } from "react-router";
import { useAppContext } from "../../context/AppContext";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, XIcon } from "@phosphor-icons/react";

const GRADIENTS = [
  { name: "Lavender Blue", style: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)", start: "#e0c3fc", end: "#8ec5fc" },
  { name: "Deep Slate", style: "linear-gradient(135deg, #2b5876 0%, #4e4376 100%)", start: "#2b5876", end: "#4e4376" },
  { name: "Neon Cyan", style: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", start: "#4facfe", end: "#00f2fe" },
  { name: "Charcoal Dark", style: "linear-gradient(135deg, #434343 0%, #000000 100%)", start: "#434343", end: "#000000" },
  { name: "Vibrant Violet", style: "linear-gradient(135deg, #7000ff 0%, #ff007b 100%)", start: "#7000ff", end: "#ff007b" },
  { name: "Teal Mint", style: "linear-gradient(135deg, #81e6d9 0%, #319795 100%)", start: "#81e6d9", end: "#319795" },
  { name: "Emerald Green", style: "linear-gradient(135deg, #85e3b3 0%, #1c7c54 100%)", start: "#85e3b3", end: "#1c7c54" },
  { name: "Yellow Green", style: "linear-gradient(135deg, #fef08a 0%, #bbf7d0 100%)", start: "#fef08a", end: "#bbf7d0" },
  { name: "Mango Orange", style: "linear-gradient(135deg, #ffe259 0%, #ffa751 100%)", start: "#ffe259", end: "#ffa751" },
  { name: "Rose Coral", style: "linear-gradient(135deg, #f857a6 0%, #ff5858 100%)", start: "#f857a6", end: "#ff5858" },
  { name: "Magenta Purple", style: "linear-gradient(135deg, #ff007b 0%, #9900ff 100%)", start: "#ff007b", end: "#9900ff" },
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

const DEFAULT_AVATAR_URL = "data:image/svg+xml;base64," + btoa(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#81e6d9" /><stop offset="100%" stop-color="#319795" /></linearGradient></defs><rect width="100" height="100" fill="url(#g)" /></svg>`
);

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { user, axios, fetchUser } = useAppContext();
  const location = useLocation();

  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [tab, setTab] = useState("gradient");
  const [selectedType, setSelectedType] = useState("gradient");
  const [selectedValue, setSelectedValue] = useState(GRADIENTS[5]); // Default Teal Mint
  const [monogramText, setMonogramText] = useState("");
  const [monogramBg, setMonogramBg] = useState("#ff6b00");
  const [customFile, setCustomFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

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

  const handleSaveAvatar = async () => {
    setIsUploading(true);
    try {
      let fileToUpload;

      if (tab === "gradient") {
        if (!selectedValue) {
          toast.error("Please select a gradient");
          setIsUploading(false);
          return;
        }
        const svgString = makeGradientSvg(selectedValue.start, selectedValue.end);
        const blob = new Blob([svgString], { type: "image/svg+xml" });
        fileToUpload = new File([blob], "avatar.svg", { type: "image/svg+xml" });
      } else if (tab === "monogram") {
        const text = monogramText.trim() || user?.name?.substring(0, 2).toUpperCase() || "CR";
        const svgString = makeMonogramSvg(monogramBg, text);
        const blob = new Blob([svgString], { type: "image/svg+xml" });
        fileToUpload = new File([blob], "monogram.svg", { type: "image/svg+xml" });
      } else if (tab === "custom") {
        if (!customFile) {
          toast.error("Please select an image file");
          setIsUploading(false);
          return;
        }
        fileToUpload = customFile;
      }

      const formData = new FormData();
      formData.append("image", fileToUpload);

      const { data } = await axios.post("/api/owner/update-image", formData);
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
    <div
      className={`fixed md:sticky top-[65px] left-0 h-[calc(100vh-65px)] z-40 flex flex-col items-center pt-8 bg-background border-r border-border text-sm transition-transform duration-300 md:translate-x-0 w-60 md:w-64 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="group relative">
        <button
          onClick={() => {
            setMonogramText(user?.name?.substring(0, 2).toUpperCase() || "CR");
            setIsAvatarModalOpen(true);
          }}
          className="relative focus:outline-none cursor-pointer block rounded-full"
        >
          <img
            src={
              user?.image ||
              DEFAULT_AVATAR_URL
            }
            alt="User Avatar"
            className="h-11 w-11 rounded-full mx-auto object-cover border border-border/80 shadow-sm"
          />
          <div className="hidden absolute top-0 left-0 bottom-0 right-0 bg-black/40 rounded-full group-hover:flex items-center justify-center transition-all duration-200">
            <img src={assets.edit_icon} alt="Edit" className="w-4 h-4 invert" />
          </div>
        </button>
      </div>
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

      {/* Change Avatar Dialog */}
      <Dialog open={isAvatarModalOpen} onOpenChange={(open) => !open && !isUploading && setIsAvatarModalOpen(false)}>
        <DialogContent className="sm:max-w-[440px] p-0 border-none bg-transparent shadow-none overflow-hidden" showCloseButton={false}>
          <Card className="border border-border bg-card/95 backdrop-blur-md rounded-2xl shadow-xl w-full">
            <CardHeader className="space-y-1 pb-3 relative">
              <button
                onClick={() => !isUploading && setIsAvatarModalOpen(false)}
                className="absolute right-4 top-4 text-muted-foreground hover:text-foreground cursor-pointer focus:outline-none transition-colors p-1 rounded-full hover:bg-muted/40"
                aria-label="Close"
              >
                <XIcon size={16} />
              </button>
              <CardTitle className="text-xl font-bold tracking-tight text-foreground mt-1">
                Change Avatar
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-6">
              {/* Custom Tabs */}
              <div className="grid grid-cols-3 bg-muted/40 p-1 rounded-xl text-center mb-6">
                <button
                  type="button"
                  onClick={() => setTab("gradient")}
                  className={`py-1.5 text-xs font-semibold rounded-lg cursor-pointer transition-all ${
                    tab === "gradient" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Gradient Avatar
                </button>
                <button
                  type="button"
                  onClick={() => setTab("monogram")}
                  className={`py-1.5 text-xs font-semibold rounded-lg cursor-pointer transition-all ${
                    tab === "monogram" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Monogram
                </button>
                <button
                  type="button"
                  onClick={() => setTab("custom")}
                  className={`py-1.5 text-xs font-semibold rounded-lg cursor-pointer transition-all ${
                    tab === "custom" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Custom Image
                </button>
              </div>

              {/* Tab Contents */}
              {tab === "gradient" && (
                <div className="grid grid-cols-4 gap-4 justify-items-center py-2">
                  {GRADIENTS.map((g, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setSelectedType("gradient");
                        setSelectedValue(g);
                      }}
                      style={{ background: g.style }}
                      className={`w-14 h-14 rounded-full cursor-pointer transition-all duration-200 hover:scale-105 ${
                        selectedType === "gradient" && selectedValue?.style === g.style
                          ? "ring-2 ring-primary ring-offset-2 ring-offset-card scale-105"
                          : "border border-border/80"
                      }`}
                      title={g.name}
                    />
                  ))}
                </div>
              )}

              {tab === "monogram" && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-6 justify-center bg-muted/20 p-4 rounded-xl border border-border/40">
                    <div
                      style={{ background: monogramBg }}
                      className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-inner uppercase"
                    >
                      {monogramText || "U"}
                    </div>
                    
                    <div className="flex flex-col gap-1.5 flex-1">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Initials</label>
                      <Input
                        maxLength={2}
                        value={monogramText}
                        onChange={(e) => setMonogramText(e.target.value.toUpperCase())}
                        placeholder="U"
                        className="bg-muted/30 border-border/80 focus-visible:ring-primary h-9 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Background Color</label>
                    <div className="flex flex-wrap gap-2 justify-center py-1">
                      {MONOGRAM_COLORS.map((color, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setMonogramBg(color)}
                          style={{ background: color }}
                          className={`w-8 h-8 rounded-full cursor-pointer transition-all duration-200 hover:scale-105 ${
                            monogramBg === color ? "ring-2 ring-primary ring-offset-1 ring-offset-card" : "border border-border/80"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {tab === "custom" && (
                <div className="flex flex-col items-center gap-4">
                  <label
                    htmlFor="sidebar-custom-upload"
                    className="w-full border border-dashed border-border/80 hover:border-primary/50 bg-muted/10 hover:bg-muted/20 rounded-2xl py-8 px-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-200"
                  >
                    {customFile ? (
                      <div className="flex flex-col items-center gap-2">
                        <img
                          src={URL.createObjectURL(customFile)}
                          alt="Custom Preview"
                          className="w-16 h-16 rounded-full object-cover border border-border shadow-sm"
                        />
                        <span className="text-xs text-muted-foreground font-medium truncate max-w-[200px]">{customFile.name}</span>
                      </div>
                    ) : (
                      <>
                        <User size={28} className="text-muted-foreground" />
                        <span className="text-xs font-semibold text-muted-foreground">Select file from computer</span>
                        <span className="text-[10px] text-muted-foreground/60">Supports PNG, JPG, GIF up to 2MB</span>
                      </>
                    )}
                  </label>
                  <input
                    type="file"
                    id="sidebar-custom-upload"
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

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border/60">
                <Button
                  variant="outline"
                  onClick={() => setIsAvatarModalOpen(false)}
                  className="cursor-pointer"
                  disabled={isUploading}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveAvatar}
                  className="cursor-pointer bg-primary hover:bg-primary-dull text-primary-foreground font-semibold px-6"
                  disabled={isUploading}
                >
                  {isUploading ? "Saving..." : "Save"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Sidebar;
