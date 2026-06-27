import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Eye, EyeSlash, XIcon, User } from "@phosphor-icons/react";

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

const DEFAULT_AVATAR_URL = "data:image/svg+xml;base64," + btoa(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#81e6d9" /><stop offset="100%" stop-color="#319795" /></linearGradient></defs><rect width="100" height="100" fill="url(#g)" /></svg>`
);

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

const Login = () => {
  const { setShowLogin, axios, setToken, navigate } = useAppContext();

  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(DEFAULT_AVATAR_URL);
  const [selectedGradientStyle, setSelectedGradientStyle] = useState("linear-gradient(135deg, #81e6d9 0%, #319795 100%)");

  const handleSelectGradient = (g) => {
    const svgString = makeGradientSvg(g.start, g.end);
    const base64Svg = "data:image/svg+xml;base64," + btoa(svgString);
    setSelectedAvatar(base64Svg);
    setSelectedGradientStyle(g.style);
  };

  const handleCustomImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size must be less than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedAvatar(reader.result);
        setSelectedGradientStyle("");
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post(`/api/user/${state}`, {
        name,
        email,
        password,
        image: state === "register" ? selectedAvatar : undefined,
      });
      if (data.success) {
        navigate("/");
        setToken(data.token);
        localStorage.setItem("token", data.token);
        setShowLogin(false);
        if (state === "register") {
          toast.success("Account created successfully! Welcome to Car Rental.");
        } else {
          toast.success("Logged in successfully! Welcome back.");
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && setShowLogin(false)}>
      <DialogContent className="sm:max-w-[400px] p-0 border-none bg-transparent shadow-none overflow-hidden" showCloseButton={false}>
        <Card className="border border-border/80 bg-card/95 backdrop-blur-md rounded-2xl shadow-xl w-full">
          <CardHeader className="space-y-1.5 pb-3 relative">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground cursor-pointer focus:outline-none transition-colors p-1 rounded-full hover:bg-muted/40"
              aria-label="Close"
            >
              <XIcon size={16} />
            </button>
            <CardTitle className="text-center text-2xl font-bold tracking-tight text-foreground mt-2">
              <span className="text-primary">Car</span> Rental
            </CardTitle>
            <CardDescription className="text-center text-muted-foreground text-xs px-2">
              {state === "login"
                ? "Enter your credentials below to access your account."
                : "Create an account to start listing or renting luxury cars."}
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-6">
            <form onSubmit={onSubmitHandler} className="flex flex-col gap-3.5">
              {state === "register" && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Name</label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Hari Das"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-muted/30 border-border/85 focus-visible:ring-primary rounded-lg text-foreground placeholder:text-muted-foreground/60"
                  />
                </div>
              )}

              {state === "register" && (
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider text-center">Profile Image</label>
                  
                  {/* Selected Preview */}
                  <div className="flex justify-center mb-1">
                    <div className="relative group/avatar">
                      <img
                        src={selectedAvatar}
                        alt="Profile Preview"
                        className="w-16 h-16 rounded-full object-cover border border-border bg-muted/40 shadow-sm"
                      />
                      {selectedAvatar && selectedAvatar !== DEFAULT_AVATAR_URL && (
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedAvatar(DEFAULT_AVATAR_URL);
                            setSelectedGradientStyle("linear-gradient(135deg, #81e6d9 0%, #319795 100%)");
                          }}
                          className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-full p-0.5 shadow-sm text-xs cursor-pointer"
                        >
                          <XIcon size={12} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Options Grid */}
                  <div className="flex flex-wrap items-center justify-center gap-1.5 pb-1">
                    {GRADIENTS.map((g, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectGradient(g)}
                        style={{ background: g.style }}
                        className={`w-8.5 h-8.5 rounded-full cursor-pointer transition-all duration-200 hover:scale-105 ${
                          selectedGradientStyle === g.style ? "ring-2 ring-primary border-transparent scale-105" : "border border-border/80"
                        }`}
                        title={g.name}
                      />
                    ))}
                    
                    {/* Custom Upload Button */}
                    <label
                      htmlFor="custom-avatar-upload"
                      className={`w-8.5 h-8.5 rounded-full flex items-center justify-center border border-dashed bg-muted/20 hover:bg-muted/40 cursor-pointer transition-all duration-200 hover:scale-105 hover:border-primary/50 text-muted-foreground hover:text-primary transition-colors ${
                        selectedAvatar && selectedAvatar !== DEFAULT_AVATAR_URL && !selectedGradientStyle ? "ring-2 ring-primary border-transparent scale-105" : "border-border/80"
                      }`}
                      title="Upload custom image"
                    >
                      <User size={16} />
                    </label>
                    <input
                      type="file"
                      id="custom-avatar-upload"
                      accept="image/*"
                      className="hidden"
                      onChange={handleCustomImageChange}
                    />
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="hari@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-muted/30 border-border/85 focus-visible:ring-primary rounded-lg text-foreground placeholder:text-muted-foreground/60"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Password</label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-muted/30 border-border/85 focus-visible:ring-primary pr-10 rounded-lg text-foreground placeholder:text-muted-foreground/60"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer focus:outline-none transition-colors"
                  >
                    {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {state === "register" ? (
                <p className="text-xs text-muted-foreground mt-1">
                  Already have an account?{" "}
                  <span
                    onClick={() => {
                      setState("login");
                      setShowPassword(false);
                      setSelectedAvatar(DEFAULT_AVATAR_URL);
                      setSelectedGradientStyle("linear-gradient(135deg, #81e6d9 0%, #319795 100%)");
                    }}
                    className="text-primary font-medium cursor-pointer hover:underline">
                    Login here
                  </span>
                </p>
              ) : (
                <p className="text-xs text-muted-foreground mt-1">
                  New to Car Rental?{" "}
                  <span
                    onClick={() => {
                      setState("register");
                      setShowPassword(false);
                      setSelectedAvatar(DEFAULT_AVATAR_URL);
                      setSelectedGradientStyle("linear-gradient(135deg, #81e6d9 0%, #319795 100%)");
                    }}
                    className="text-primary font-medium cursor-pointer hover:underline">
                    Create an account
                  </span>
                </p>
              )}

              <Button type="submit" className="w-full mt-1.5 cursor-pointer bg-primary hover:bg-primary-dull text-primary-foreground font-semibold rounded-lg py-2.5 transition-all duration-200 shadow-md">
                {state === "register" ? "Create Account" : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
