import { useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import { Route, Routes, useLocation } from "react-router";
import Home from "./pages/user/Home";
import CarDetails from "./pages/user/CarDetails";
import Cars from "./pages/user/Cars";
import MyBookings from "./pages/user/MyBookings";
import Footer from "./components/layout/Footer";
import Layout from "./pages/owner/Layout";
import Dashboard from "./pages/owner/Dashboard";
import AddCard from "./pages/owner/AddCard";
import ManageCars from "./pages/owner/ManageCars";
import ManageBookings from "./pages/owner/ManageBookings";
import Login from "./pages/auth/Login";
import { Toaster } from "@/components/ui/sonner";
import { useAppContext } from "./context/AppContext";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const { showLogin } = useAppContext();
  const location = useLocation();
  const isOwnerPath = location.pathname.startsWith("/owner");

  // Global Lenis Smooth Scroll
  useEffect(() => {
    if (isOwnerPath) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, [isOwnerPath]);

  // Global GSAP Scroll Reveal Engine
  useEffect(() => {
    if (isOwnerPath) return;

    const ctx = gsap.context(() => {
      // 1. Reveal Up scroll trigger
      gsap.utils.toArray(".reveal-up").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // 2. Reveal Fade scroll trigger
      gsap.utils.toArray(".reveal-fade").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // 3. Staggered Container reveal
      gsap.utils.toArray(".reveal-stagger-container").forEach((container) => {
        const items = container.querySelectorAll(".reveal-stagger-item");
        if (items.length > 0) {
          gsap.fromTo(
            items,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.12,
              ease: "power2.out",
              scrollTrigger: {
                trigger: container,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      });
    });

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, [location.pathname, isOwnerPath]);

  return (
    <>
      <Toaster richColors />
      {showLogin && <Login />}
      {!isOwnerPath && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars-details/:id" element={<CarDetails />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/owner" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-car" element={<AddCard />} />
          <Route path="manage-cars" element={<ManageCars />} />
          <Route path="manage-bookings" element={<ManageBookings />} />
        </Route>
      </Routes>
      {!isOwnerPath && <Footer />}
    </>
  );
};

export default App;
