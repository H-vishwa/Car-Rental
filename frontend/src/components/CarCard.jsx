import { useNavigate } from "react-router";
import { assets } from "../assets/assets";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CarCard = ({ car }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => {
        navigate(`/cars-details/${car._id}`);
        scrollTo(0, 0);
      }}
      className="group overflow-hidden cursor-pointer hover:border-primary/50 transition-all duration-300 pt-0">
      <div className="relative h-48 overflow-hidden">
        <img
          src={car.image}
          alt="Car Image"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {car.isAvaliable && (
          <Badge className="absolute top-4 left-4">Available</Badge>
        )}

        <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm border border-border px-3 py-2 rounded-lg">
          <span className="font-semibold text-primary">
            {currency}{car.pricePerDay}
          </span>
          <span className="text-xs text-muted-foreground">/ day</span>
        </div>
      </div>

      <CardContent className="p-4 sm:p-5 pt-0 sm:pt-0">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-base font-semibold text-foreground">
              {car.brand} {car.model}
            </h3>
            <p className="text-muted-foreground text-xs mt-0.5">
              {car.category} • {car.year}
            </p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-y-2 text-muted-foreground border-t border-border pt-3">
          <div className="flex items-center text-xs">
            <img src={assets.users_icon} alt="Seats" className="h-3.5 mr-2 invert brightness-90" />
            <span>{car.seating_capacity} Seats</span>
          </div>
          <div className="flex items-center text-xs">
            <img src={assets.fuel_icon} alt="Fuel" className="h-3.5 mr-2 invert brightness-90" />
            <span>{car.fuel_type}</span>
          </div>
          <div className="flex items-center text-xs">
            <img src={assets.car_icon} alt="Car" className="h-3.5 mr-2 invert brightness-90" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center text-xs">
            <img src={assets.location_icon} alt="Location" className="h-3.5 mr-2 invert brightness-90" />
            <span>{car.location}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarCard;
