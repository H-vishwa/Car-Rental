import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const MyBookings = () => {
  const { axios, user, currency } = useAppContext();
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get("/api/bookings/user");
      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    user && fetchBookings();
  }, [user]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-16 text-sm max-w-7xl px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48">
      <Title
        title={"My Bookings"}
        subTitle={"View and manage your car bookings"}
        align="left"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="space-y-6"
      >
        {bookings.map((booking, index) => (
          <Card key={booking._id} className="border border-border/80 bg-card/45 hover:bg-card/75 hover:border-primary/20 transition-all duration-300 rounded-2xl mt-10 overflow-hidden shadow-lg">
            <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 items-center">
              {/* Column 1: Car Image + Info */}
              <div className="md:col-span-1 flex flex-col">
                <div className="rounded-xl overflow-hidden border border-border/80 bg-muted shrink-0 shadow-sm">
                  <img
                    src={booking.car.image}
                    alt="car"
                    className="w-full h-auto aspect-video object-cover hover:scale-103 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-base font-bold text-foreground mt-3 tracking-tight">
                  {booking.car.brand} {booking.car.model}
                </h3>
                <p className="text-muted-foreground text-xs mt-1">
                  {booking.car.year} • {booking.car.category} • {booking.car.transmission}
                </p>
              </div>

              {/* Column 2: Booking Details */}
              <div className="md:col-span-2 space-y-4">
                <div className="flex items-center gap-2">
                  <Badge className="bg-secondary/60 text-foreground border border-border/85 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md">
                    Booking #{index + 1}
                  </Badge>
                  <Badge
                    className={
                      booking.status === "confirmed"
                        ? "bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20 font-semibold px-2.5 py-0.5 text-[11px] rounded-full tracking-wide lowercase"
                        : booking.status === "cancelled"
                        ? "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 font-semibold px-2.5 py-0.5 text-[11px] rounded-full tracking-wide lowercase"
                        : "bg-orange-500/10 text-orange-400 border border-orange-500/20 hover:bg-orange-500/20 font-semibold px-2.5 py-0.5 text-[11px] rounded-full tracking-wide lowercase"
                    }>
                    {booking.status}
                  </Badge>
                </div>

                <div className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="none" className="w-4.5 h-4.5 text-orange-400 shrink-0 mt-0.5">
                    <path d="M1 5.66667H13M3.66667 1V2.33333M10.3333 1V2.33333M3.13333 13H10.8667C11.6134 13 11.9868 13 12.272 12.8547C12.5229 12.7269 12.7269 12.5229 12.8547 12.272C13 11.9868 13 11.6134 13 10.8667V4.46667C13 3.71993 13 3.34656 12.8547 3.06135C12.7269 2.81046 12.5229 2.60649 12.272 2.47866C11.9868 2.33333 11.6134 2.33333 10.8667 2.33333H3.13333C2.3866 2.33333 2.01323 2.33333 1.72801 2.47866C1.47713 2.60649 1.27315 2.81046 1.14533 3.06135C1 3.34656 1 3.71993 1 4.46667V10.8667C1 11.6134 1 11.9868 1.14533 12.272C1.27315 12.5229 1.47713 12.7269 1.72801 12.8547C2.01323 13 2.38659 13 3.13333 13Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div>
                    <p className="text-muted-foreground text-[10px] uppercase font-bold tracking-wider">
                      Rental Period
                    </p>
                    <p className="text-foreground mt-0.5 text-sm font-medium">
                      {booking.pickupDate.split("T")[0]} to {booking.returnDate.split("T")[0]}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4.5 h-4.5 text-orange-400 shrink-0 mt-0.5">
                    <path d="M11.8276 6.66732C11.8276 9.99598 8.55185 13.4627 7.45185 14.5333C7.34937 14.6202 7.22463 14.6672 7.09642 14.6672C6.9682 14.6672 6.84346 14.6202 6.74099 14.5333C5.64099 13.4627 2.36523 9.99598 2.36523 6.66732C2.36523 5.25283 2.8637 3.89628 3.75097 2.89608C4.63823 1.89589 5.84163 1.33398 7.09642 1.33398C8.35121 1.33398 9.5546 1.89589 10.4419 2.89608C11.3291 3.89628 11.8276 5.25283 11.8276 6.66732Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7.09646 8.66602C8.07632 8.66602 8.87065 7.77059 8.87065 6.66602C8.87065 5.56145 8.07632 4.66602 7.09646 4.66602C6.1166 4.66602 5.32227 5.56145 5.32227 6.66602C5.32227 7.77059 6.1166 8.66602 7.09646 8.66602Z" stroke="currentColor" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <div>
                    <p className="text-muted-foreground text-[10px] uppercase font-bold tracking-wider">
                      Pick-up Location
                    </p>
                    <p className="text-foreground mt-0.5 text-sm font-medium">
                      {booking.car.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Column 3: Price */}
              <div className="md:col-span-1 flex flex-col justify-center items-start md:items-end h-full">
                <div className="md:text-right">
                  <p className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider">
                    Total Price
                  </p>
                  <h2 className="text-3xl font-extrabold text-primary tracking-tight mt-1">
                    {currency}{booking.price.toLocaleString()}
                  </h2>
                  <p className="text-xs text-muted-foreground/80 mt-1">
                    Booked on {booking.createdAt.split("T")[0]}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default MyBookings;
