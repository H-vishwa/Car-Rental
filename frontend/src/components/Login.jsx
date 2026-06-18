import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Login = () => {
  const { setShowLogin, axios, setToken, navigate } = useAppContext();

  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post(`/api/user/${state}`, {
        name,
        email,
        password,
      });
      if (data.success) {
        navigate("/");
        setToken(data.token);
        localStorage.setItem("token", data.token);
        setShowLogin(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && setShowLogin(false)}>
      <DialogContent className="sm:max-w-[380px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            <span className="text-primary">User</span>{" "}
            {state === "login" ? "Login" : "Sign Up"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmitHandler} className="flex flex-col gap-4 mt-2">
          {state === "register" && (
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">Name</label>
              <Input
                id="name"
                type="text"
                placeholder="Hari Das"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">Email</label>
            <Input
              id="email"
              type="email"
              placeholder="hari@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">Password</label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {state === "register" ? (
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <span
                onClick={() => setState("login")}
                className="text-primary cursor-pointer hover:underline">
                Click here
              </span>
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Create an account?{" "}
              <span
                onClick={() => setState("register")}
                className="text-primary cursor-pointer hover:underline">
                Click here
              </span>
            </p>
          )}

          <Button type="submit" className="w-full cursor-pointer">
            {state === "register" ? "Create Account" : "Login"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
