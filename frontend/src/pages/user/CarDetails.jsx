import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { assets } from "../../assets/assets";
import Loader from "../../components/common/Loader";
import { useAppContext } from "../../context/AppContext";
import { toast } from "sonner";
import { motion } from "motion/react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarBlank } from "@phosphor-icons/react";

const CarDetails = () => {
  const { id } = useParams();
  const { axios, cars, pickupDate, setPickupDate, returnDate, setReturnDate } =
    useAppContext();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [isPickupOpen, setIsPickupOpen] = useState(false);
  const [isReturnOpen, setIsReturnOpen] = useState(false);
  const currency = import.meta.env.VITE_CURRENCY;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/bookings/create", {
        car: id,
        pickupDate,
        returnDate,
      });

      if (data.success) {
        toast.success("Booking created successfully");
        navigate("/my-bookings");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    setCar(cars.find((car) => car._id === id));
  }, [cars, id]);

  return car ? (
    <div className="relative overflow-hidden min-h-screen pt-28 pb-16 bg-[#09090b] isolate text-foreground">
      {/* Background Ripple Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10 flex items-center justify-center">
        <div className="absolute w-[400px] h-[400px] rounded-full border border-white/[0.04]"></div>
        <div className="absolute w-[700px] h-[700px] rounded-full border border-white/[0.03]"></div>
        <div className="absolute w-[1000px] h-[1000px] rounded-full border border-white/[0.02]"></div>
      </div>

      {/* Edge Vignette Gradients */}
      <div className="absolute inset-0 pointer-events-none -z-20">
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-36 bg-gradient-to-r from-[#ff5500]/[0.05] to-transparent"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-36 bg-gradient-to-l from-[#ff5500]/[0.05] to-transparent"></div>
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#ff5500]/[0.03] to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#09090b] to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 xl:px-32 relative z-10">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 cursor-pointer">
        <img
          src={assets.arrow_icon}
          alt="Arrow"
          className="rotate-180 opacity-75 invert"
        />
        Back to all Cars
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 pb-20">
        {/* Left: Car Image & Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2 space-y-8">
          <motion.img
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            src={car.image}
            alt="Car"
            className="w-full h-auto md:max-h-100 object-cover rounded-xl shadow-md border border-border"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">
              {car.brand} {car.model}
            </h1>
            <p className="text-muted-foreground text-lg">
              {car.category} • {car.year}
            </p>
          </motion.div>

          <hr className="border-border my-6" />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: assets.users_icon, text: `${car.seating_capacity} Seats` },
              { icon: assets.fuel_icon, text: car.fuel_type },
              { icon: assets.car_icon, text: car.transmission },
              { icon: assets.location_icon, text: car.location },
            ].map(({ icon, text }) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                key={text}
                className="flex flex-col items-center bg-card border border-border p-4 rounded-lg text-muted-foreground text-sm">
                <img src={icon} alt="Icon" className="h-5 mb-2 invert brightness-90" />
                {text}
              </motion.div>
            ))}
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">Description</h2>
            <p className="text-muted-foreground leading-relaxed">{car.description}</p>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">Features</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "360 Camera",
                "Bluetooth",
                "GPS",
                "Heated Seats",
                "Rear View Mirror",
              ].map((item) => (
                <li key={item} className="flex items-center text-muted-foreground text-sm">
                  <img src={assets.check_icon} className="h-4 mr-2 " alt="" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Right: Booking Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="bg-card border border-border shadow-xl h-max sticky top-24 rounded-2xl p-6 space-y-6">
          <p className="flex items-center justify-between text-2xl font-semibold">
            <span className="font-bold text-primary">
              {currency}{car.pricePerDay}
            </span>
            <span className="text-base text-muted-foreground font-normal">per day</span>
          </p>

          <hr className="border-border" />

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
              Pick-up Date
            </label>
            <Popover open={isPickupOpen} onOpenChange={setIsPickupOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  id="pickup-date"
                  className="w-full justify-start text-left font-normal cursor-pointer">
                  <CalendarBlank className="mr-2 h-4 w-4" />
                  {pickupDate ? format(new Date(pickupDate), "PPP") : "Select date"}
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

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
              Return Date
            </label>
            <Popover open={isReturnOpen} onOpenChange={setIsReturnOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  id="return-date"
                  className="w-full justify-start text-left font-normal cursor-pointer">
                  <CalendarBlank className="mr-2 h-4 w-4" />
                  {returnDate ? format(new Date(returnDate), "PPP") : "Select date"}
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

          <Button type="submit" className="w-full cursor-pointer">
            Book Now
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            No credit card required to reserve.
          </p>
        </motion.form>
      </div>
    </div>
  </div>
) : (
  <Loader />
);
};

export default CarDetails;
