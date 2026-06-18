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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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
        returnDate
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center gap-14 bg-background text-center py-20 relative overflow-hidden">
      <motion.h1
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
        Luxury Cars <span className="text-primary">On Rent</span>
      </motion.h1>

      <motion.form
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row items-start md:items-center justify-between p-5 rounded-2xl md:rounded-xl w-[90%] max-w-sm md:max-w-220 bg-card border border-border shadow-[0_10px_50px_rgba(255,107,0,0.12)] gap-6 md:gap-0">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 md:ml-8 w-full md:w-auto">
          {/* Location */}
          <div className="flex flex-col items-start gap-1.5 w-full md:w-auto">
            <label className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
              Location
            </label>
            <Select required value={pickupLocation} onValueChange={(val) => setPickupLocation(val)}>
              <SelectTrigger className="w-full md:w-[150px] border-0 shadow-none bg-transparent focus:ring-0 h-auto p-0 text-sm font-medium justify-between flex">
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

          <div className="w-[1px] h-10 bg-border hidden md:block"></div>

          {/* Pick-up Date */}
          <div className="flex flex-col items-start gap-1.5 w-full md:w-auto">
            <label className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
              Pick-up Date
            </label>
            <Popover open={isPickupOpen} onOpenChange={setIsPickupOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  id="pickup-date"
                  className="w-full md:w-auto h-auto px-0 py-1 font-medium text-sm justify-start gap-2 cursor-pointer hover:bg-transparent text-left">
                  <CalendarBlank className="h-4.5 w-4.5 text-primary shrink-0" />
                  {pickupDate ? format(new Date(pickupDate), "PPP") : "Select Date"}
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
                  disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="w-[1px] h-10 bg-border hidden md:block"></div>

          {/* Return Date */}
          <div className="flex flex-col items-start gap-1.5 w-full md:w-auto">
            <label className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
              Return Date
            </label>
            <Popover open={isReturnOpen} onOpenChange={setIsReturnOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  id="return-date"
                  className="w-full md:w-auto h-auto px-0 py-1 font-medium text-sm justify-start gap-2 cursor-pointer hover:bg-transparent text-left">
                  <CalendarBlank className="h-4.5 w-4.5 text-primary shrink-0" />
                  {returnDate ? format(new Date(returnDate), "PPP") : "Select Date"}
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
                    const minDate = pickupDate ? new Date(pickupDate) : new Date();
                    return date < new Date(minDate.setHours(0, 0, 0, 0));
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full md:w-auto max-md:mt-2">
          <Button type="submit" className="w-full md:w-auto px-9 py-5 rounded-lg cursor-pointer font-semibold gap-2 shadow-[0_4px_20px_rgba(255,107,0,0.15)]">
            <MagnifyingGlass className="w-4 h-4" />
            Search
          </Button>
        </motion.div>
      </motion.form>

      <div className="relative flex items-center justify-center w-full max-w-4xl mt-6">
        <div className="absolute w-72 h-36 bg-primary/15 rounded-full blur-3xl -z-10"></div>
        <motion.img
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          src={assets.main_car}
          alt="car"
          className="max-h-74 object-contain z-10"
        />
      </div>
    </motion.div>
  );
};

export default Hero;
