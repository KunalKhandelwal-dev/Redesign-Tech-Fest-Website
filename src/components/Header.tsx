import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sparkles } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Events', href: '#events' },
    { name: 'Team', href: '#team' },
    { name: 'Register', href: '#register' },
    { name: 'Contact', href: '#contact' },
    { name: 'Rules', href: '/docs/rules.pdf', download: true }, // PDF download link
  ];

  // 🧩 Smooth scroll with offset for fixed header
  const handleSmoothScroll = (id: string) => {
    // If it's a hash link, scroll smoothly
    if (id.startsWith('#')) {
      const target = document.querySelector(id);
      if (target) {
        const headerOffset = 80; // height of your fixed header
        const elementPosition = target.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    } else {
      // For normal links (like PDF), just follow the link
      window.location.href = id;
    }
  };

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-lg transition-all duration-300 ${
        isScrolled ? 'glass shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a
            href="#home"
            className="flex items-center gap-2 font-orbitron group"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Sparkles className="w-6 h-6 text-cyan-400 group-hover:rotate-180 transition-transform duration-500" />
            <div>
              <span className="text-xl tracking-wider gradient-text">YUGANTRAN2.0</span>
              <span className="text-cyan-400 ml-1">'25</span>
            </div>
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) =>
              item.download ? (
                <motion.a
                  key={item.name}
                  href={item.href}
                  download
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative group text-gray-300 hover:text-cyan-400 transition-colors duration-300"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300" />
                </motion.a>
              ) : (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative group text-gray-300 hover:text-cyan-400 transition-colors duration-300"
                  onClick={e => {
                    if (item.href.startsWith('#')) {
                      e.preventDefault();
                      handleSmoothScroll(item.href);
                    }
                  }}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300" />
                </motion.a>
              )
            )}
          </div>

          {/* CTA Button (Desktop) */}
          <motion.a
            href="#register"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-orbitron hover:glow-cyan transition-all duration-300"
          >
            Register Now
          </motion.a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-cyan-400"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass border-t border-cyan-500/20"
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              {navItems.map((item) =>
                item.download ? (
                  <motion.a
  key={item.name}
  href={item.href}
  download
  whileHover={{ x: 8 }}
  transition={{ duration: 0.2 }}
  className="block w-full text-center py-2 text-gray-300 hover:text-cyan-400 transition-colors duration-300"
  onClick={() => setIsMobileMenuOpen(false)}
>
  {item.name}
</motion.a>
                ) : (
                  <motion.button
                    key={item.name}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setTimeout(() => handleSmoothScroll(item.href), 400); // wait for close animation
                    }}
                    whileHover={{ x: 8 }}
                    transition={{ duration: 0.2 }}
                    className="block w-full text-left py-2 text-gray-300 hover:text-cyan-400 transition-colors duration-300"
                  >
                    {item.name}
                  </motion.button>
                )
              )}
              <motion.button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setTimeout(() => handleSmoothScroll('#register'), 400);
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="block w-full py-3 text-center bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-orbitron text-white"
              >
                Register Now
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}