import { useEffect, useState } from "react";
import Title from "../../components/common/Title";
import CarCard from "../../components/CarCard";
import { useSearchParams } from "react-router";
import { useAppContext } from "../../context/AppContext";
import { toast } from "sonner";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { assets } from "../../assets/assets";

const Cars = () => {
  const [searchParams] = useSearchParams();
  const pickupLocation = searchParams.get("pickupLocation");
  const pickupDate = searchParams.get("pickupDate");
  const returnDate = searchParams.get("returnDate");

  const { cars, axios } = useAppContext();

  const [input, setInput] = useState("");
  const isSearchdata = pickupLocation && pickupDate && returnDate;
  const [filteredCars, setFilteredCars] = useState([]);

  const applyFilter = async () => {
    if (input === "") {
      setFilteredCars(cars);
      return null;
    }
    const filtered = cars.slice().filter((car) => {
      return (
        car.brand.toLowerCase().includes(input.toLowerCase()) ||
        car.model.toLowerCase().includes(input.toLowerCase()) ||
        car.category.toLowerCase().includes(input.toLowerCase()) ||
        car.transmission.toLowerCase().includes(input.toLowerCase())
      );
    });
    setFilteredCars(filtered);
  };

  const searchCarAvailabilty = async () => {
    const { data } = await axios.post("/api/bookings/check-availability", {
      location: pickupLocation,
      pickupDate,
      returnDate,
    });
    if (data.success) {
      setFilteredCars(data.availableCars);
      if (data.availableCars.length === 0) {
        toast("No cars available for your search");
      }
      return null;
    }
  };

  useEffect(() => {
    isSearchdata && searchCarAvailabilty();
  }, []);

  useEffect(() => {
    cars.length > 0 && !isSearchdata && applyFilter();
  }, [input, cars]);

  return (
    <div className="relative overflow-hidden min-h-screen pt-28 pb-16 bg-[#09090b] isolate">
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

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center max-w-7xl mx-auto max-md:px-4">
        <Title
          title={"Available Cars"}
          subTitle={
            "Browse our selection of premium vehicles available for your next adventure"
          }
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative mt-6 max-w-140 w-full">
          <img
            src={assets.search_icon}
            alt="search"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 invert brightness-75 pointer-events-none"
          />
          <Input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Search by make, model or features"
            className="pl-9 pr-10 h-12 rounded-full"
          />
          <img
            src={assets.filter_icon}
            alt="filter"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 invert opacity-75 pointer-events-none"
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-10 px-6 md:px-16 lg:px-24 xl:px-32 reveal-fade">
        <p className="text-muted-foreground xl:px-20 max-w-7xl mx-auto">
          Showing {filteredCars.length} Cars
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto reveal-stagger-container">
          {filteredCars.map((car, index) => (
            <div
              key={index}
              className="reveal-stagger-item"
            >
              <CarCard car={car} />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Cars;
