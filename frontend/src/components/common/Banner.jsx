import { assets } from "../../assets/assets";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full overflow-hidden my-16">
      {/* Ambient background matching landing page */}
      <div className="absolute inset-0 bg-[#09090b] rounded-3xl" />

      {/* Orange vignette edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_120%,rgba(255,85,0,0.08),transparent)] rounded-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-[#ff5500]/[0.06] to-transparent rounded-l-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-[#ff5500]/[0.06] to-transparent rounded-r-3xl pointer-events-none" />

      {/* Concentric ring decorations */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden rounded-3xl">
        {[320, 480, 640, 800].map((size, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-white/[0.03]"
            style={{ width: size, height: size }}
          />
        ))}
      </div>

      {/* Border */}
      <div className="absolute inset-0 rounded-3xl border border-primary/[0.12] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 px-8 md:px-14 lg:px-20 py-14 md:py-16 max-w-6xl mx-auto">

        {/* Left: Text Block */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex-1 text-left space-y-5 max-w-lg"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Earn With Your Car
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight"
          >
            Do You Own a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
              Luxury Car?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-sm sm:text-base leading-relaxed"
          >
            Monetize your vehicle effortlessly by listing it on CarRental. We handle insurance, driver verification, and secure payments — so you earn passive income, completely stress-free.
          </motion.p>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            viewport={{ once: true }}
            className="flex items-center gap-6 pt-1"
          >
            {[
              { value: "₹50K+", label: "Avg monthly earnings" },
              { value: "2K+", label: "Active listings" },
              { value: "100%", label: "Insured trips" },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col">
                <span className="text-lg font-extrabold text-foreground">{value}</span>
                <span className="text-[10px] text-muted-foreground/70 uppercase tracking-wider font-semibold">{label}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-3 pt-2"
          >
            <Button
              onClick={() => navigate("/owner")}
              className="px-6 py-5 rounded-xl font-bold cursor-pointer shadow-[0_4px_24px_rgba(255,107,0,0.25)] hover:shadow-[0_6px_32px_rgba(255,107,0,0.4)] transition-all duration-300"
            >
              List Your Car
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 ml-1" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Button>
            <Button
              variant="outline"
              className="px-6 py-5 rounded-xl font-semibold cursor-pointer border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.07] text-foreground transition-all duration-300"
            >
              Learn More
            </Button>
          </motion.div>
        </motion.div>

        {/* Right: Floating Car Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          viewport={{ once: true }}
          className="relative flex-shrink-0 flex items-center justify-center"
        >
          {/* Glow beneath car */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-52 h-10 rounded-full bg-primary/20 blur-2xl pointer-events-none" />

          <motion.img
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            src={assets.banner_car_image}
            alt="Luxury Car"
            className="relative z-10 w-64 sm:w-80 lg:w-96 h-auto object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.7)]"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
