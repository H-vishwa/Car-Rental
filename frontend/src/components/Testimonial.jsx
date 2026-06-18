import { assets } from "../assets/assets";
import Title from "./Title";
import { motion } from "motion/react";

const Testimonial = () => {
  const testimonials = [
    {
      name: "Ananya Deshmukh",
      location: "Pune, Maharashtra",
      image: assets.testimonial_image_1,
      rating: 5,
      testimonial:
        "I've rented cars from various companies, but the experience with CarRental was exceptional.",
    },
    {
      name: "Vivaan Kapoor",
      location: "New Delhi, India",
      image: assets.testimonial_image_2,
      testimonial:
        "CarRental made my trip so much easier. The car was delivered right to my door, and the customer service was fantastic!",
    },
    {
      name: "Meera Fernandez",
      location: "Chennai, Tamil Nadu",
      image: assets.testimonial_image_3,
      testimonial:
        "I highly recommend CarRental! Their fleet is amazing, and I always feel like I'm getting the best deal with excellent service.",
    },
  ];

  return (
    <div className="py-24 px-6 md:px-16 lg:px-24 xl:px-44">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}>
        <Title
          title="What Our Customers Say"
          subTitle="Discover why discerning drivers choose CarRental for their premium journeys and luxury road trips."
        />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
        {testimonials.map((testimonial, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.15,
            }}
            viewport={{ once: true, amount: 0.1 }}
            key={index}
            className="bg-card p-6 rounded-xl border border-border shadow-lg hover:border-primary/30 hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <p className="text-foreground font-semibold text-base">{testimonial.name}</p>
                <p className="text-muted-foreground text-xs">{testimonial.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <img key={index} src={assets.star_icon} alt="Star Icon" className="w-3.5 h-3.5" />
                ))}
            </div>
            <p className="text-muted-foreground mt-4 text-sm/relaxed font-normal italic">
              "{testimonial.testimonial}"
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
