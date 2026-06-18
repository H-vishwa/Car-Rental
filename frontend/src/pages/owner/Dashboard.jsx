import { useEffect, useState } from "react";
import { assets, dummyDashboardData } from "../../assets/assets";
import Title from "../../components/owner/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";

const Dashboard = () => {
  const { axios, isOwner, currency } = useAppContext();

  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  });

  const dashboardCards = [
    {
      title: "Total Cars",
      value: data.totalCars,
      icon: assets.carIconColored,
    },
    {
      title: "Total Bookings",
      value: data.totalBookings,
      icon: assets.listIconColored,
    },
    {
      title: "Pending Bookings",
      value: data.pendingBookings,
      icon: assets.cautionIconColored,
    },
    {
      title: "Confirmed Bookings",
      value: data.completedBookings,
      icon: assets.listIconColored,
    },
  ];

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/owner/dashboard");
      if (data.success) {
        setData(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isOwner) {
      fetchDashboardData();
    }
  }, [isOwner]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="px-4 py-10 md:px-10 flex-1 w-full overflow-y-auto"
    >
      <Title
        title={"Admin Dashboard"}
        subTitle={
          "Monitor overall platform performance including total cars, bookings, revenue, and recent activities"
        }
      />

      {/* Stats Grid */}
      <div className="grid gap-4 my-8 max-w-5xl sm:grid-cols-2 lg:grid-cols-4">
        {dashboardCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
          >
            <Card className="border border-border/80 bg-card/60 hover:bg-card hover:border-primary/20 hover:shadow-[0_4px_30px_rgba(255,107,0,0.05)] transition-all duration-300 h-full">
              <CardContent className="flex items-center justify-between p-5">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{card.title}</p>
                  <p className="text-2xl font-extrabold text-foreground mt-1.5 tracking-tight">{card.value}</p>
                </div>
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/5 ring-1 ring-primary/20 shadow-[0_4px_12px_rgba(255,107,0,0.1)]">
                  <img src={card.icon} alt="" className="w-5 h-5" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="flex flex-col lg:flex-row items-stretch gap-6 mb-8 w-full max-w-5xl"
      >
        {/* Recent Bookings */}
        <Card className="flex-1 w-full border border-border/80 bg-card/60 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold text-foreground">Recent Bookings</CardTitle>
            <p className="text-xs text-muted-foreground">Latest customer bookings on the platform</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.recentBookings.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">No recent bookings found.</p>
            ) : (
              data.recentBookings.map((booking, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-card/85 transition-all duration-200">
                  <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-lg bg-primary/5 ring-1 ring-primary/20 shrink-0">
                      <img src={assets.listIconColored} alt="List" className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">
                        {booking.car.brand} {booking.car.model}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {booking.createdAt.split("T")[0]}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <p className="text-sm font-bold text-foreground">
                      {currency}{booking.price.toLocaleString()}
                    </p>
                    <Badge
                      className={
                        booking.status === "confirmed"
                          ? "bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20 font-medium"
                          : "bg-orange-500/10 text-orange-400 border border-orange-500/20 hover:bg-orange-500/20 font-medium"
                      }
                    >
                      {booking.status}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Monthly Revenue */}
        <Card className="lg:max-w-xs w-full border border-primary/20 bg-gradient-to-br from-card/80 via-[#221712] to-card/80 shadow-[0_10px_35px_rgba(255,107,0,0.05)] flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-base font-bold text-foreground">Monthly Revenue</CardTitle>
            <p className="text-xs text-muted-foreground">Total revenue generated this month</p>
          </CardHeader>
          <CardContent className="pb-8 flex flex-col justify-center flex-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Total Earnings</p>
            <p className="text-4xl font-extrabold text-primary tracking-tight drop-shadow-[0_2px_10px_rgba(255,107,0,0.2)]">
              {currency}{data.monthlyRevenue.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
