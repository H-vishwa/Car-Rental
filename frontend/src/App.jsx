import { useEffect, lazy, Suspense } from "react";
import Navbar from "./components/layout/Navbar";
import { Route, Routes, useLocation } from "react-router";
import Footer from "./components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import { useAppContext } from "./context/AppContext";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const Home = lazy(() => import("./pages/user/Home"));
const CarDetails = lazy(() => import("./pages/user/CarDetails"));
const Cars = lazy(() => import("./pages/user/Cars"));
const MyBookings = lazy(() => import("./pages/user/MyBookings"));
const Layout = lazy(() => import("./pages/owner/Layout"));
const Dashboard = lazy(() => import("./pages/owner/Dashboard"));
const AddCard = lazy(() => import("./pages/owner/AddCard"));
const ManageCars = lazy(() => import("./pages/owner/ManageCars"));
const ManageBookings = lazy(() => import("./pages/owner/ManageBookings"));
const Login = lazy(() => import("./pages/auth/Login"));

const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
  </div>
);

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
      <Suspense fallback={null}>
        {showLogin && <Login />}
      </Suspense>
      {!isOwnerPath && <Navbar />}
      <Suspense fallback={<PageLoader />}>
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
      </Suspense>
      {!isOwnerPath && <Footer />}
    </>
  );
};

export default App;
