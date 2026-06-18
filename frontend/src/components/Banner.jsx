import { assets } from "../assets/assets";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

const Banner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 mt-16 py-12 md:py-8 bg-gradient-to-r from-card via-[#221712] to-card max-w-6xl mx-3 md:mx-auto rounded-2xl overflow-hidden border border-primary/20 shadow-[0px_0px_50px_rgba(255,107,0,0.1)]"
    >
      <div className="text-left flex-1 md:pr-8">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
          Do You Own a <span className="text-primary">Luxury Car</span>?
        </h2>
        <p className="mt-3 text-muted-foreground text-sm/relaxed max-w-lg">
          Monetize your vehicle effortlessly by listing it on CarRental. We take care of insurance, driver verification and secure payments — so you can earn passive income, stress-free.
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 w-fit"
        >
          <Button className="px-6 py-5 rounded-lg font-semibold cursor-pointer shadow-[0_4px_20px_rgba(255,107,0,0.2)]">
            List your Car
          </Button>
        </motion.div>
      </div>
      <motion.img
        initial={{ opacity: 0, x: 50, scale: 0.9 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        src={assets.banner_car_image}
        alt="BMW"
        className="max-h-52 w-auto object-contain mt-8 md:mt-0 drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
      />
    </motion.div>
  );
};

export default Banner;

