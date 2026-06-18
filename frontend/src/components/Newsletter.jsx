import { motion } from "motion/react";

const Newsletter = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className="flex flex-col items-center justify-center text-center space-y-2 max-md:px-4 my-10 mb-40">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="md:text-4xl text-2xl font-extrabold tracking-tight text-white">
        Never Miss a Deal!
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="md:text-base text-muted-foreground pb-8 max-w-lg">
        Subscribe to get the latest offers, new arrivals, and exclusive discounts.
      </motion.p>
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex items-center justify-between max-w-xl w-full md:h-13 h-12 bg-card rounded-lg border border-border focus-within:border-primary/50 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
        <input
          className="h-full bg-transparent border-0 outline-none w-full px-5 text-foreground placeholder:text-muted-foreground/50 text-sm"
          type="email"
          placeholder="Enter your email id"
          required
        />
        <button
          type="submit"
          className="md:px-10 px-6 h-full text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer rounded-r-lg font-semibold text-sm shadow-[0_4px_20px_rgba(255,107,0,0.2)]">
          Subscribe
        </button>
      </motion.form>
    </motion.div>
  );
};

export default Newsletter;
