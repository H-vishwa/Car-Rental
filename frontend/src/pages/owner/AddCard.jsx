import { useState } from "react";
import Title from "../../components/owner/Title";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "motion/react";

const AddCard = () => {
  const { axios, currency } = useAppContext();

  const [image, setImage] = useState(null);
  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: 0,
    pricePerDay: 0,
    category: "",
    transmission: "",
    fuel_type: "",
    seating_capacity: 0,
    location: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (isLoading) return null;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("carData", JSON.stringify(car));

      const { data } = await axios.post("/api/owner/add-car", formData);
      if (data.success) {
        toast.success(data.message);
        setImage(null);
        setCar({
          brand: "",
          model: "",
          year: 0,
          pricePerDay: 0,
          category: "",
          transmission: "",
          fuel_type: "",
          seating_capacity: 0,
          location: "",
          description: "",
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="px-4 py-10 md:px-10 flex-1 max-w-4xl overflow-y-auto"
    >
      <Title
        title={"Add New Car"}
        subTitle={
          "Fill in details to list a new car for booking, including pricing, availability, and car specifications."
        }
      />

      <form onSubmit={onSubmitHandler} className="flex flex-col gap-6 mt-8">
        {/* Basic Information Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <Card className="border border-border/80 bg-card/60 p-6">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-base font-bold text-foreground">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-6">
            {/* Car Image Upload */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">Car Image</label>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <label htmlFor="car-image" className="cursor-pointer group relative">
                  <div className="h-24 w-40 rounded-xl border border-dashed border-border/80 hover:border-primary/50 bg-card/45 flex items-center justify-center overflow-hidden transition-all duration-300">
                    {image ? (
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Preview"
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-1.5 p-4 text-center">
                        <img src={assets.upload_icon} alt="Upload" className="w-6 h-6 text-muted-foreground invert brightness-75 group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-xs text-muted-foreground/85">Click to upload</span>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    id="car-image"
                    accept="image/*"
                    hidden
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </label>
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">Upload high quality picture</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Supports PNG, JPG or WEBP. Max size 5MB.</p>
                </div>
              </div>
            </div>

            {/* Brand & Model */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">Brand</label>
                <Input
                  type="text"
                  placeholder="e.g. BMW, Mercedes & Audi..."
                  required
                  value={car.brand}
                  onChange={(e) => setCar({ ...car, brand: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">Model</label>
                <Input
                  type="text"
                  placeholder="e.g. X5, S600 & A4..."
                  required
                  value={car.model}
                  onChange={(e) => setCar({ ...car, model: e.target.value })}
                />
              </div>
            </div>

            {/* Year & Daily Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">Year</label>
                <Input
                  type="number"
                  placeholder="e.g. 2025"
                  min="1900"
                  required
                  value={car.year === 0 ? "" : car.year}
                  onChange={(e) => setCar({ ...car, year: Number(e.target.value) })}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">Daily Price ({currency})</label>
                <Input
                  type="number"
                  placeholder="e.g. 100"
                  min="100"
                  required
                  value={car.pricePerDay === 0 ? "" : car.pricePerDay}
                  onChange={(e) => setCar({ ...car, pricePerDay: Number(e.target.value) })}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        </motion.div>

        {/* Specifications & Location Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="border border-border/80 bg-card/60 p-6">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-base font-bold text-foreground">Specifications & Location</CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">Category</label>
                <Select
                  required
                  value={car.category}
                  onValueChange={(val) => setCar({ ...car, category: val })}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sedan">Sedan</SelectItem>
                    <SelectItem value="Hatchback">Hatchback</SelectItem>
                    <SelectItem value="SUV">SUV</SelectItem>
                    <SelectItem value="MPV">MPV</SelectItem>
                    <SelectItem value="Coupe">Coupe</SelectItem>
                    <SelectItem value="Convertible">Convertible</SelectItem>
                    <SelectItem value="Wagon">Wagon</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">Transmission</label>
                <Select
                  required
                  value={car.transmission}
                  onValueChange={(val) => setCar({ ...car, transmission: val })}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select transmission" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Manual">Manual</SelectItem>
                    <SelectItem value="Automatic">Automatic</SelectItem>
                    <SelectItem value="Semi-Automatic">Semi-Automatic</SelectItem>
                    <SelectItem value="Electric">Electric</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">Fuel Type</label>
                <Select
                  required
                  value={car.fuel_type}
                  onValueChange={(val) => setCar({ ...car, fuel_type: val })}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select fuel type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Petrol">Petrol</SelectItem>
                    <SelectItem value="Diesel">Diesel</SelectItem>
                    <SelectItem value="Electric">Electric</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                    <SelectItem value="CNG">CNG</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">Seating Capacity</label>
                <Input
                  type="number"
                  placeholder="e.g. 5"
                  min="2"
                  required
                  value={car.seating_capacity === 0 ? "" : car.seating_capacity}
                  onChange={(e) => setCar({ ...car, seating_capacity: Number(e.target.value) })}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">Location</label>
                <Select
                  required
                  value={car.location}
                  onValueChange={(val) => setCar({ ...car, location: val })}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mumbai">Mumbai</SelectItem>
                    <SelectItem value="Delhi">Delhi</SelectItem>
                    <SelectItem value="Bangalore">Bangalore</SelectItem>
                    <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                    <SelectItem value="Chennai">Chennai</SelectItem>
                    <SelectItem value="Kolkata">Kolkata</SelectItem>
                    <SelectItem value="Ahmedabad">Ahmedabad</SelectItem>
                    <SelectItem value="Pune">Pune</SelectItem>
                    <SelectItem value="Jaipur">Jaipur</SelectItem>
                    <SelectItem value="Lucknow">Lucknow</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        </motion.div>

        {/* Details / Description Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <Card className="border border-border/80 bg-card/60 p-6">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-base font-bold text-foreground">Description</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <textarea
              rows={5}
              placeholder="Describe your car, condition and features here..."
              required
              className="w-full px-4 py-3 border border-border bg-background text-foreground rounded-lg outline-none focus:ring-1 focus:ring-primary/50 text-sm resize-none placeholder:text-muted-foreground/50 transition-all duration-200"
              value={car.description}
              onChange={(e) => setCar({ ...car, description: e.target.value })}>
            </textarea>
          </CardContent>
        </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex justify-end mt-2"
        >
          <Button type="submit" disabled={isLoading} className="px-8 py-5 rounded-lg font-semibold gap-2 cursor-pointer shadow-[0_4px_20px_rgba(255,107,0,0.2)]">
            <img src={assets.tick_icon} alt="Tick" className="w-4 h-4 " />
            {isLoading ? "Listing..." : "List your car"}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default AddCard;
