import { useState } from "react";
import { assets, cityList } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { motion } from "motion/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarBlank, MagnifyingGlass } from "@phosphor-icons/react";

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [isPickupOpen, setIsPickupOpen] = useState(false);
  const [isReturnOpen, setIsReturnOpen] = useState(false);

  const { pickupDate, setPickupDate, returnDate, setReturnDate, navigate } =
    useAppContext();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      "/cars?pickupLocation=" +
        pickupLocation +
        "&pickupDate=" +
        pickupDate +
        "&returnDate=" +
        returnDate,
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0e0e11] via-[#09090b] to-[#09090b] text-center px-4 py-24 relative overflow-hidden isolate">
      {/* Concentric Circles Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-20 overflow-hidden">
        <div className="absolute w-[300px] h-[300px] rounded-full border border-white/[0.07]"></div>
        <div className="absolute w-[480px] h-[480px] rounded-full border border-white/[0.05]"></div>
        <div className="absolute w-[700px] h-[700px] rounded-full border border-white/[0.04]"></div>
        <div className="absolute w-[950px] h-[950px] rounded-full border border-white/[0.03]"></div>
        <div className="absolute w-[1200px] h-[1200px] rounded-full border border-white/[0.02]"></div>
      </div>

      {/* Edge Vignette Gradients */}
      <div className="absolute inset-0 pointer-events-none -z-20">
        {/* Left edge orange glow */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-36 bg-gradient-to-r from-[#ff5500]/[0.08] to-transparent"></div>
        {/* Right edge orange glow */}
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-36 bg-gradient-to-l from-[#ff5500]/[0.08] to-transparent"></div>
        {/* Top edge orange glow */}
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#ff5500]/[0.05] to-transparent"></div>
        {/* Bottom edge shadow */}
        <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#09090b] to-transparent"></div>
      </div>

      {/* Hero Title & Subtitle */}
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-3 mb-6 relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/[0.05] text-primary text-[10px] font-bold uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
          Exclusively Luxury Cars Only
        </motion.div>
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight uppercase font-heading">
          Drive Your Dream
        </motion.h1>
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-sm md:text-base text-muted-foreground/80 leading-relaxed px-4 max-w-xl">
          We rent high-end luxury vehicles and exotic supercars only. Experience
          unparalleled prestige, comfort, and performance. Find your perfect
          ride anytime, anywhere.
        </motion.p>
      </div>

      {/* Centerpiece: Glowing Eclipse & Floating Car */}
      <div className="relative flex items-center justify-center w-full max-w-lg h-60 md:h-76 my-6">
        {/* Outer atmospheric haze */}
        <div
          className="absolute w-[340px] h-[340px] md:w-[440px] md:h-[440px] rounded-full -z-20"
          style={{
            background:
              "radial-gradient(circle, rgba(255,100,0,0.22) 0%, rgba(200,50,0,0.10) 55%, transparent 75%)",
            filter: "blur(28px)",
          }}
        />

        {/* Orbital Ring 1 — forward spin */}
        <div
          className="absolute w-[210px] h-[210px] md:w-[268px] md:h-[268px] rounded-full -z-10 sun-ring"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, transparent 55%, rgba(255,140,30,0.55) 68%, rgba(255,200,80,0.85) 75%, rgba(255,140,30,0.55) 82%, transparent 95%, transparent 100%)",
            WebkitMask:
              "radial-gradient(circle, transparent 85%, black 87%, black 100%)",
            mask: "radial-gradient(circle, transparent 85%, black 87%, black 100%)",
          }}
        />

        {/* Orbital Ring 2 — reverse slower spin, faint */}
        <div
          className="absolute w-[222px] h-[222px] md:w-[284px] md:h-[284px] rounded-full -z-10 sun-ring-reverse"
          style={{
            background:
              "conic-gradient(from 180deg, transparent 0%, transparent 40%, rgba(255,90,0,0.2) 55%, rgba(255,160,40,0.35) 65%, rgba(255,90,0,0.2) 75%, transparent 90%, transparent 100%)",
            WebkitMask:
              "radial-gradient(circle, transparent 86%, black 88%, black 100%)",
            mask: "radial-gradient(circle, transparent 86%, black 88%, black 100%)",
          }}
        />

        {/* Eclipse Sun Sphere */}
        <div
          className="absolute w-[180px] h-[180px] md:w-[230px] md:h-[230px] rounded-full -z-10 overflow-hidden"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, #080000 0%, #120300 18%, #260700 34%, #4a0e00 48%, #7d1c00 60%, #b83200 71%, #e85200 79%, #ff7000 86%, #ff9500 92%, #ffb020 97%, #ffcc40 100%)",
            boxShadow:
              "0 0 60px 10px rgba(255,100,0,0.8), 0 0 120px 20px rgba(255,60,0,0.4), 0 0 200px 30px rgba(200,40,0,0.2), inset 0 0 40px rgba(255,120,0,0.15)",
          }}>
          {/* Rotating corona highlight — simulates shifting light source */}
          <div
            className="absolute inset-0 rounded-full sun-sphere"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0%, transparent 30%, rgba(255,160,40,0.18) 45%, rgba(255,200,80,0.28) 55%, rgba(255,140,20,0.18) 65%, transparent 80%, transparent 100%)",
            }}
          />
        </div>

        {/* Floating Car */}
        <motion.img
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: [0, -10, 0], opacity: 1 }}
          transition={{
            y: {
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
            },
            opacity: { duration: 0.8, delay: 0.5 },
          }}
          src={assets.main_car}
          alt="Luxury Car"
          className="max-h-40 md:max-h-56 object-contain z-10 filter drop-shadow-[0_25px_25px_rgba(0,0,0,0.85)]"
        />

        {/* Shadow under car */}
        <motion.div
          animate={{ scale: [1, 0.85, 1], opacity: [0.6, 0.35, 0.6] }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut",
          }}
          className="absolute bottom-4 w-36 h-2.5 bg-black/90 rounded-full blur-md -z-10"></motion.div>
      </div>

      {/* Pill Call To Action Button (Matches Reference) */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mb-10">
        <button
          type="button"
          onClick={() =>
            document
              .getElementById("search-form")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="bg-white hover:bg-white/90 text-black font-semibold text-sm rounded-full px-8 py-3.5 flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none">
          Book Your Ride ↗
        </button>
      </motion.div>

      {/* Search Form (Glassmorphic) */}
      <motion.form
        id="search-form"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        onSubmit={handleSearch}
        className="w-[92%] max-w-sm md:max-w-4xl p-5 md:py-4 md:px-8 rounded-2xl md:rounded-full backdrop-blur-xl bg-black/35 border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5 md:gap-4 scroll-mt-24">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-5 md:gap-8 w-full">
          {/* Location */}
          <div className="flex flex-col items-start gap-1 w-full md:w-auto min-w-[140px]">
            <label className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
              Location
            </label>
            <Select
              required
              value={pickupLocation}
              onValueChange={(val) => setPickupLocation(val)}>
              <SelectTrigger className="w-full border-0 shadow-none bg-transparent focus:ring-0 h-auto p-0 text-sm font-semibold justify-between flex text-white cursor-pointer hover:text-white/80 transition-colors">
                <SelectValue placeholder="Pickup Location" />
              </SelectTrigger>
              <SelectContent>
                {cityList.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full md:w-[1px] h-[1px] md:h-10 bg-white/[0.08]"></div>

          {/* Pick-up Date */}
          <div className="flex flex-col items-start gap-1 w-full md:w-auto">
            <label className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
              Pick-up Date
            </label>
            <Popover open={isPickupOpen} onOpenChange={setIsPickupOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  id="pickup-date"
                  className="w-full md:w-auto h-auto px-0 py-0.5 font-semibold text-sm justify-start gap-2 cursor-pointer hover:bg-transparent text-left text-white hover:text-white/80 transition-colors">
                  <CalendarBlank className="h-4.5 w-4.5 text-primary shrink-0" />
                  {pickupDate
                    ? format(new Date(pickupDate), "PPP")
                    : "Select Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={pickupDate ? new Date(pickupDate) : undefined}
                  onSelect={(date) => {
                    setPickupDate(date ? date.toISOString().split("T")[0] : "");
                    setIsPickupOpen(false);
                  }}
                  disabled={(date) =>
                    date < new Date(new Date().setHours(0, 0, 0, 0))
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="w-full md:w-[1px] h-[1px] md:h-10 bg-white/[0.08]"></div>

          {/* Return Date */}
          <div className="flex flex-col items-start gap-1 w-full md:w-auto">
            <label className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
              Return Date
            </label>
            <Popover open={isReturnOpen} onOpenChange={setIsReturnOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  id="return-date"
                  className="w-full md:w-auto h-auto px-0 py-0.5 font-semibold text-sm justify-start gap-2 cursor-pointer hover:bg-transparent text-left text-white hover:text-white/80 transition-colors">
                  <CalendarBlank className="h-4.5 w-4.5 text-primary shrink-0" />
                  {returnDate
                    ? format(new Date(returnDate), "PPP")
                    : "Select Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={returnDate ? new Date(returnDate) : undefined}
                  onSelect={(date) => {
                    setReturnDate(date ? date.toISOString().split("T")[0] : "");
                    setIsReturnOpen(false);
                  }}
                  disabled={(date) => {
                    const minDate = pickupDate
                      ? new Date(pickupDate)
                      : new Date();
                    return date < new Date(minDate.setHours(0, 0, 0, 0));
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full md:w-auto">
          <Button
            type="submit"
            className="w-full md:w-auto px-8 py-5 md:py-4 rounded-full cursor-pointer font-bold gap-2 bg-primary hover:bg-primary/95 text-white shadow-lg transition-all duration-200">
            <MagnifyingGlass className="w-4 h-4" />
            Search
          </Button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
};

export default Hero;
