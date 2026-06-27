import { assets } from "../../assets/assets";
import { motion } from "motion/react";

const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full relative overflow-hidden mt-40 border-t border-white/[0.04] bg-gradient-to-t from-[#ff6b00]/[0.05] via-transparent to-transparent pt-28 pb-12 px-6 md:px-16 lg:px-24 xl:px-32 flex flex-col items-center"
    >
      {/* Massive Brand Watermark */}
      <div className="absolute bottom-20 left-0 right-0 text-center pointer-events-none select-none z-0">
        <span className="text-[14vw] font-black text-white/[0.030] tracking-tighter leading-none uppercase font-heading select-none">
          CAR RENTAL
        </span>
      </div>

      {/* Top Banner Content */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0 relative z-10 mb-8">
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold hidden md:block">
          Best Rates Guaranteed
        </span>
        <h2 className="text-4xl md:text-6xl font-black text-center text-primary leading-tight tracking-tight max-w-3xl font-heading uppercase">
          Rent The Premium Car<br />Your Journey Deserves
        </h2>
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold hidden md:block">
          Flexible Cancellations
        </span>
      </div>

      {/* Central Search Anchor Button */}
      <div className="mb-20 relative z-10">
        <button
          type="button"
          onClick={() =>
            document
              .getElementById("search-form")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="px-6 py-2.5 rounded-full border border-white/20 hover:border-primary hover:text-primary transition-all duration-300 text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer bg-black/40 backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
          Book Your Ride
        </button>
      </div>

      {/* Footer Content Columns Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 pb-16 border-b border-white/[0.06] relative z-10 text-sm">
        {/* Brand Col */}
        <div className="flex flex-col gap-4">
          <motion.img
            whileHover={{ scale: 1.02 }}
            src={assets.logo}
            alt="logo"
            className="h-8 w-auto self-start"
          />
          <p className="text-muted-foreground leading-relaxed max-w-72">
            Premium car rental service with a wide selection of luxury and
            everyday vehicles for all your driving needs.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-bold uppercase tracking-wider text-[11px] mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2.5 text-muted-foreground">
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Browse Cars
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                List Your Car
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                About Us
              </a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-white font-bold uppercase tracking-wider text-[11px] mb-4">
            Resources
          </h3>
          <ul className="space-y-2.5 text-muted-foreground">
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Insurance
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-bold uppercase tracking-wider text-[11px] mb-4">
            Contact
          </h3>
          <ul className="space-y-2.5 text-muted-foreground leading-relaxed">
            <li>27 Marine Drive</li>
            <li>Mumbai, Maharashtra 400020</li>
            <li>+91 98765 43210</li>
            <li>car@example.in</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Row */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0 pt-8 relative z-10 text-[11px] text-muted-foreground uppercase font-semibold tracking-wider">
        <div>
          © {new Date().getFullYear()} CarRental. All rights reserved.
        </div>

        {/* Floating Social Pill */}
        <div className="flex items-center gap-5 bg-white/[0.02] border border-white/[0.06] backdrop-blur-md px-6 py-2.5 rounded-full shadow-md">
          {/* Instagram */}
          <a href="#" className="hover:text-primary transition-colors">
            <img
              src={assets.instagram_logo}
              alt="Instagram"
              className="w-4 h-4 invert opacity-60 hover:opacity-100 transition-all duration-200"
            />
          </a>
          {/* Facebook */}
          <a href="#" className="hover:text-primary transition-colors">
            <img
              src={assets.facebook_logo}
              alt="Facebook"
              className="w-4 h-4 invert opacity-60 hover:opacity-100 transition-all duration-200"
            />
          </a>
          {/* Twitter */}
          <a href="#" className="hover:text-primary transition-colors">
            <img
              src={assets.twitter_logo}
              alt="Twitter"
              className="w-4 h-4 invert opacity-60 hover:opacity-100 transition-all duration-200"
            />
          </a>
          {/* Gmail */}
          <a href="#" className="hover:text-primary transition-colors">
            <img
              src={assets.gmail_logo}
              alt="Gmail"
              className="w-4 h-4 invert opacity-60 hover:opacity-100 transition-all duration-200"
            />
          </a>
        </div>

        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-primary transition-colors">
            Terms
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            Cookies
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default Footer;
