import api from "./api";

export const getCars = async () => {
  const { data } = await api.get("/api/user/cars");
  return data;
};

export const checkCarAvailability = async (location, pickupDate, returnDate) => {
  const { data } = await api.post("/api/bookings/check-availability", {
    location,
    pickupDate,
    returnDate,
  });
  return data;
};
