import { assets } from "../assets/assets";
import { motion } from "motion/react";

const testimonials = [
  {
    name: "Ananya Deshmukh",
    location: "Pune, Maharashtra",
    image: assets.testimonial_image_1,
    rating: 5,
    tag: "Verified Renter",
    testimonial:
      "I've rented from various companies, but the experience with CarRental was truly exceptional. The Porsche was immaculate, and the service felt white-glove from start to finish.",
  },
  {
    name: "Vivaan Kapoor",
    location: "New Delhi, India",
    image: assets.testimonial_image_2,
    rating: 5,
    tag: "Premium Member",
    testimonial:
      "CarRental made my trip so much easier. The car was delivered right to my hotel, and the customer service was absolutely fantastic. Will never go back to standard rentals.",
  },
  {
    name: "Meera Fernandez",
    location: "Chennai, Tamil Nadu",
    image: assets.testimonial_image_3,
    rating: 5,
    tag: "Verified Renter",
    testimonial:
      "I highly recommend CarRental! Their luxury fleet is extraordinary, and I always feel like I'm getting the best deal with unmatched service. The Mercedes was flawless.",
  },
];

const StarRating = ({ count = 5 }) => (
  <div className="flex items-center gap-1">
    {Array(count)
      .fill(0)
      .map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-3.5 h-3.5 text-primary"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
  </div>
);

const QuoteIcon = () => (
  <svg
    viewBox="0 0 32 32"
    fill="currentColor"
    className="w-7 h-7 text-primary/20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M10 8C6.686 8 4 10.686 4 14v10h10V14H7.5C7.5 12.619 8.619 11.5 10 11.5V8zm14 0c-3.314 0-6 2.686-6 6v10h10V14h-6.5c0-1.381 1.119-2.5 2.5-2.5V8z" />
  </svg>
);

const Testimonial = () => {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_80%_70%,rgba(255,85,0,0.03),transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Customer Stories
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            What Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
              Customers Say
            </span>
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto leading-relaxed">
            Discover why discerning drivers choose CarRental for their premium
            journeys and luxury road trips.
          </p>

          {/* Divider line */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/40" />
          </div>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: index * 0.12 }}
              viewport={{ once: true, amount: 0.1 }}
              className="group relative flex flex-col gap-5 p-6 rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.04] hover:border-primary/25 transition-all duration-400 shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_32px_rgba(255,107,0,0.08)] hover:-translate-y-1"
            >
              {/* Top: Quote icon + Stars */}
              <div className="flex items-center justify-between">
                <QuoteIcon />
                <StarRating count={t.rating || 5} />
              </div>

              {/* Testimonial text */}
              <p className="text-muted-foreground text-sm leading-relaxed flex-1 italic">
                &ldquo;{t.testimonial}&rdquo;
              </p>

              {/* Divider */}
              <div className="h-px w-full bg-white/[0.06] group-hover:bg-primary/10 transition-colors duration-300" />

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover border border-white/[0.1] ring-2 ring-primary/10 group-hover:ring-primary/25 transition-all duration-300"
                  />
                  {/* Online dot */}
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-[#09090b]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-foreground font-bold text-sm group-hover:text-primary transition-colors duration-200 truncate">
                    {t.name}
                  </p>
                  <p className="text-muted-foreground text-xs truncate">
                    {t.location}
                  </p>
                </div>
                <span className="shrink-0 text-[9px] font-bold uppercase tracking-wider text-primary/70 bg-primary/10 border border-primary/15 px-2 py-0.5 rounded-full">
                  {t.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom trust line */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 mt-14 text-muted-foreground/60 text-xs font-semibold uppercase tracking-widest"
        >
          {["4.9 / 5 Avg Rating", "2,000+ Happy Customers", "100% Verified Reviews"].map(
            (item, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-primary/50" />
                {item}
              </span>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonial;
