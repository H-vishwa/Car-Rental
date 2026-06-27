import { useEffect, useState } from "react";
import Title from "../../components/owner/Title";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

const ManageCars = () => {
  const { isOwner, axios, currency } = useAppContext();
  const [cars, setCars] = useState([]);

  const fetchOwnerCars = async () => {
    try {
      const { data } = await axios.get("/api/owner/cars");
      if (data.success) {
        setCars(data.cars);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const toggleAvailability = async (carId) => {
    try {
      const { data } = await axios.post("/api/owner/toggle-car", { carId });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerCars();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const removeCar = async (carId) => {
    try {
      const confirm = window.confirm("Are you sure you want to remove this car?");
      if (!confirm) return null;

      const { data } = await axios.post("/api/owner/delete-car", { carId });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerCars();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    isOwner && fetchOwnerCars();
  }, [isOwner]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="px-4 py-10 md:px-10 w-full overflow-y-auto flex-1"
    >
      <Title
        title={"Manage Cars"}
        subTitle={
          "View all listed cars, update their details, or remove them from the booking platform"
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 max-w-5xl">
        {cars.map((car, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="group border border-border/80 bg-card/40 hover:bg-card/75 hover:border-primary/30 rounded-2xl overflow-hidden transition-all duration-300 shadow-md hover:shadow-xl flex flex-col"
          >
            {/* Image Section */}
            <div className="relative aspect-video w-full overflow-hidden bg-muted">
              <img
                src={car.image}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Availability Badge */}
              <div className="absolute top-3 right-3 z-10">
                <Badge
                  className={
                    car.isAvaliable
                      ? "bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20 px-2.5 py-0.5 font-semibold text-xs tracking-wide"
                      : "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 px-2.5 py-0.5 font-semibold text-xs tracking-wide"
                  }
                >
                  {car.isAvaliable ? "Available" : "Unavailable"}
                </Badge>
              </div>

              {/* Category tag */}
              <div className="absolute bottom-3 left-3 z-10">
                <span className="bg-background/80 backdrop-blur-md border border-border/80 text-foreground px-2 py-0.5 rounded-md text-xs font-medium uppercase tracking-wider">
                  {car.category}
                </span>
              </div>
            </div>

            {/* Info Section */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg text-foreground tracking-tight group-hover:text-primary transition-colors duration-200">
                  {car.brand} {car.model}
                </h3>

                {/* Specifications List */}
                <div className="flex flex-wrap gap-2 mt-3 text-xs text-muted-foreground">
                  <span className="bg-secondary/40 border border-border/50 px-2 py-1 rounded-md">
                    {car.seating_capacity} seats
                  </span>
                  <span className="bg-secondary/40 border border-border/50 px-2 py-1 rounded-md">
                    {car.transmission}
                  </span>
                  <span className="bg-secondary/40 border border-border/50 px-2 py-1 rounded-md">
                    {car.fuel_type}
                  </span>
                  <span className="bg-secondary/40 border border-border/50 px-2 py-1 rounded-md">
                    {car.location}
                  </span>
                </div>
              </div>

              {/* Price & Actions */}
              <div className="flex items-center justify-between border-t border-border/60 pt-4 mt-5">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Daily Rate</p>
                  <p className="text-xl font-extrabold text-primary tracking-tight mt-0.5">
                    {currency}{car.pricePerDay}
                    <span className="text-xs font-normal text-muted-foreground">/day</span>
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => toggleAvailability(car._id)}
                    className="cursor-pointer h-9 w-9 border border-border hover:border-primary/30 hover:bg-primary/5 hover:text-primary transition-all duration-200 animate-duration-150"
                    title={car.isAvaliable ? "Mark as Unavailable" : "Mark as Available"}
                  >
                    <img
                      src={car.isAvaliable ? assets.eye_close_icon : assets.eye_icon}
                      alt="Toggle Availability"
                      className="w-10 h-10 text-primary opacity-80 hover:opacity-100"
                    />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => removeCar(car._id)}
                    className="cursor-pointer h-9 w-9 border border-border hover:border-destructive/30 hover:bg-destructive/10 hover:text-destructive transition-all duration-200 animate-duration-150"
                    title="Remove Car"
                  >
                    <img
                      src={assets.delete_icon}
                      alt="Delete Listing"
                      className="w-10 h-10 invert opacity-80 hover:opacity-100"
                    />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ManageCars;
