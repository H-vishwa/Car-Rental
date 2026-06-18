import { useEffect, useState } from "react";
import Title from "../../components/owner/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "motion/react";

const ManageBookings = () => {
  const { currency, axios, isOwner } = useAppContext();
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get("/api/bookings/owner");
      data.success ? setBookings(data.bookings) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeBookingStatus = async (bookingId, status) => {
    try {
      const { data } = await axios.post("/api/bookings/change-status", { bookingId, status });
      if (data.success) {
        toast.success(data.message);
        fetchBookings();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isOwner) {
      fetchBookings();
    }
  }, [isOwner]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="px-4 py-10 md:px-10 w-full overflow-y-auto flex-1"
    >
      <Title
        title={"Manage Bookings"}
        subTitle={
          "Track all customer bookings, approve or cancel requests, and manage booking statuses"
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 max-w-5xl">
        {bookings.map((booking, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="group border border-border/80 bg-card/40 hover:bg-card/75 hover:border-primary/20 rounded-2xl p-5 flex flex-col justify-between gap-5 transition-all duration-300 shadow-md hover:shadow-xl"
          >
            {/* Header Block: Car details */}
            <div className="flex gap-4">
              <div className="h-16 w-24 rounded-xl overflow-hidden bg-muted shrink-0 border border-border/80">
                <img
                  src={booking.car.image}
                  alt={`${booking.car.brand} ${booking.car.model}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base text-foreground tracking-tight line-clamp-1">
                  {booking.car.brand} {booking.car.model}
                </h3>

                {/* Date range */}
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground mt-1.5">
                  <span className="shrink-0 bg-secondary/35 border border-border/40 px-2 py-0.5 rounded-md">
                    {booking.pickupDate.split("T")[0]}
                  </span>
                  <span className="text-muted-foreground/50">to</span>
                  <span className="shrink-0 bg-secondary/35 border border-border/40 px-2 py-0.5 rounded-md">
                    {booking.returnDate.split("T")[0]}
                  </span>
                </div>
              </div>
            </div>

            {/* Price & Details Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-border/40 pt-4 gap-4">
              <div className="flex items-center justify-between sm:justify-start gap-6">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Total Price</p>
                  <p className="text-lg font-extrabold text-foreground tracking-tight mt-0.5">
                    {currency}{booking.price.toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Payment</p>
                  <span className="inline-block bg-secondary/40 border border-border/60 text-muted-foreground px-2.5 py-0.5 rounded-md text-[11px] font-medium uppercase tracking-wider mt-1">
                    Offline
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:items-end gap-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold sm:text-right">Status</p>
                {booking.status === "pending" ? (
                  <Select
                    value={booking.status}
                    onValueChange={(val) => changeBookingStatus(booking._id, val)}>
                    <SelectTrigger className="w-full sm:w-28 h-8 text-xs bg-background/50 border-border hover:bg-background/85 transition-colors cursor-pointer rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Badge
                    className={
                      booking.status === "confirmed"
                        ? "bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20 font-medium px-2.5 py-0.5 text-[10px] uppercase tracking-wide self-start sm:self-auto"
                        : "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 font-medium px-2.5 py-0.5 text-[10px] uppercase tracking-wide self-start sm:self-auto"
                    }>
                    {booking.status}
                  </Badge>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ManageBookings;
