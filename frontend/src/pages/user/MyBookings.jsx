import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { assets } from "../../assets/assets";
import Title from "../../components/common/Title";
import { useAppContext } from "../../context/AppContext";
import { toast } from "sonner";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const MyBookings = () => {
  const { axios, user, currency } = useAppContext();
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

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

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-sm max-w-7xl mx-auto px-6 md:px-16 lg:px-24 xl:px-32 relative z-10"
      >
        <Title
          title={"My Bookings"}
          subTitle={"View and manage your car bookings"}
          align="left"
        />

        {bookings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center justify-center py-20 px-6 rounded-3xl border border-border/60 bg-card/25 backdrop-blur-md max-w-xl mx-auto mt-12 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-primary"
              >
                <path
                  d="M19 19H5V8H19M12 2F12M19 3H5C3.89 3 3 3.89 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.89 20.1 3 19 3Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-foreground tracking-tight">No Bookings Yet</h3>
            <p className="text-muted-foreground/80 mt-2 max-w-sm text-sm">
              Explore our premium fleet and find the perfect high-end luxury ride for your next journey.
            </p>
            <Button
              onClick={() => navigate("/cars")}
              className="mt-6 cursor-pointer bg-primary hover:bg-primary-dull text-primary-foreground font-semibold px-6 py-2.5 rounded-full"
            >
              Browse Luxury Cars
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="space-y-6 mt-8"
          >
            {bookings.map((booking, index) => (
              <Card
                key={booking._id}
                className="border border-border/80 bg-card/45 hover:bg-card/75 hover:border-primary/20 transition-all duration-300 rounded-2xl overflow-hidden shadow-lg"
              >
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

                  {/* Column 2: Booking Info Grid */}
                  <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <img
                        src={assets.calendar_icon}
                        alt="calendar"
                        className="w-4.5 h-4.5 invert brightness-75 shrink-0 mt-0.5"
                      />
                      <div>
                        <p className="text-muted-foreground text-[10px] uppercase font-bold tracking-wider">
                          Rental Duration
                        </p>
                        <p className="text-foreground mt-0.5 text-sm font-medium">
                          {booking.pickupDate.split("T")[0]} to {booking.returnDate.split("T")[0]}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div>
                        <p className="text-muted-foreground text-[10px] uppercase font-bold tracking-wider mb-1">
                          Booking Status
                        </p>
                        <Badge
                          className={
                            booking.status === "Approved"
                              ? "bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20 font-semibold px-2.5 py-0.5 text-[11px] rounded-full tracking-wide uppercase"
                              : booking.status === "Rejected"
                              ? "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 font-semibold px-2.5 py-0.5 text-[11px] rounded-full tracking-wide uppercase"
                              : "bg-orange-500/10 text-orange-400 border border-orange-500/20 hover:bg-orange-500/20 font-semibold px-2.5 py-0.5 text-[11px] rounded-full tracking-wide uppercase"
                          }
                        >
                          {booking.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <svg
                        viewBox="0 0 15 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4.5 h-4.5 text-orange-400 shrink-0 mt-0.5"
                      >
                        <path
                          d="M11.8276 6.66732C11.8276 9.99598 8.55185 13.4627 7.45185 14.5333C7.34937 14.6202 7.22463 14.6672 7.09642 14.6672C6.9682 14.6672 6.84346 14.6202 6.74099 14.5333C5.64099 13.4627 2.36523 9.99598 2.36523 6.66732C2.36523 5.25283 2.8637 3.89628 3.75097 2.89608C4.63823 1.89589 5.84163 1.33398 7.09642 1.33398C8.35121 1.33398 9.5546 1.89589 10.4419 2.89608C11.3291 3.89628 11.8276 5.25283 11.8276 6.66732Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7.09646 8.66602C8.07632 8.66602 8.87065 7.77059 8.87065 6.66602C8.87065 5.56145 8.07632 4.66602 7.09646 4.66602C6.1166 4.66602 5.32227 5.56145 5.32227 6.66602C5.32227 7.77059 6.1166 8.66602 7.09646 8.66602Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
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
                        {currency}
                        {booking.price.toLocaleString()}
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
        )}
      </motion.div>
    </div>
  );
};

export default MyBookings;
