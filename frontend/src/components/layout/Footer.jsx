import { assets } from "../../assets/assets";
import { motion } from "motion/react";

const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-zinc-400 mt-60 text-sm px-6 md:px-16 lg:px-24 xl:px-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-wrap justify-between items-start gap-8 pb-6 border-borderColor border-b">
        <div>
          <motion.img
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            src={assets.logo}
            alt="logo"
            className="h-8 md:h-9"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-80 mt-3 text-zinc-400">
            Premium car rental service with a wide selection of luxury and
            everyday vehicles for all your driving needs.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center gap-3 mt-6">
            {/* Instagram */}
            <a href="#" className="hover:text-primary transition-colors">
              <img
                src={assets.instagram_logo}
                alt="Instagram"
                className="w-5 h-5 invert brightness-75 hover:brightness-100 transition-all"
              />
            </a>
            {/* Facebook */}
            <a href="#" className="hover:text-primary transition-colors">
              <img
                src={assets.facebook_logo}
                alt="Facebook"
                className="w-5 h-5 invert brightness-75 hover:brightness-100 transition-all"
              />
            </a>
            {/* Twitter */}
            <a href="#" className="hover:text-primary transition-colors">
              <img
                src={assets.twitter_logo}
                alt="Twitter"
                className="w-5 h-5 invert brightness-75 hover:brightness-100 transition-all"
              />
            </a>
            {/* G-mail */}
            <a href="#" className="hover:text-primary transition-colors">
              <img src={assets.gmail_logo} alt="Gmail" className="w-5 h-5 invert brightness-75 hover:brightness-100 transition-all" />
            </a>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-between w-1/2 gap-8">
          <div>
            <h2 className="text-base font-semibold text-zinc-100 uppercase">
              Quick Links
            </h2>
            <ul className="mt-3 flex flex-col gap-1.5">
              <li>
                <a href="#" className="hover:text-primary transition-colors">Home</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">Browse Cars</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">List Your Car</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">About Us</a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-semibold text-zinc-100 uppercase">
              Resources
            </h2>
            <ul className="mt-3 flex flex-col gap-1.5">
              <li>
                <a href="#" className="hover:text-primary transition-colors">Help Center</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">Insurance</a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-semibold text-zinc-100 uppercase">
              Contact
            </h2>
            <ul className="mt-3 flex flex-col gap-1.5 text-zinc-400">
              <li>27 Marine Drive</li>
              <li>Mumbai, Maharashtra 400020</li>
              <li>+91 98765 43210</li>
              <li>car@example.in</li>
            </ul>
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex flex-col md:flex-row gap-2 items-center justify-between py-5">
        <p>© {new Date().getFullYear()} CarRental. All rights reserved.</p>
        <ul className="flex items-center gap-4">
          <li>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
          </li>
          <li>
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
          </li>
          <li>
            <a href="#" className="hover:text-primary transition-colors">Cookies</a>
          </li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default Footer;
