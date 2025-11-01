import { motion } from 'motion/react';
import { Instagram, Linkedin, Mail, MapPin, Phone, Sparkles } from 'lucide-react';
import { useMemo } from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // ✅ Memoized arrays (prevents re-creation each render)
  const socialLinks = useMemo(
    () => [
      { icon: Instagram, href: '#', label: 'Instagram' },
      { icon: Linkedin, href: '#', label: 'LinkedIn' },
      { icon: Mail, href: 'mailto:yugantran@geetauniversity.edu.in', label: 'Email' },
    ],
    []
  );

  const quickLinks = useMemo(
    () => [
      { name: 'Home', href: '#home' },
      { name: 'About', href: '#about' },
      { name: 'Events', href: '#events' },
      { name: 'Team', href: '#team' },
      { name: 'Register', href: '#register' },
    ],
    []
  );

  return (
    <footer id="contact" className="relative pt-20 pb-8 overflow-hidden">
      {/* Background Blur Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-600 rounded-full blur-3xl opacity-10 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-10 pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Footer Grid Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-cyan-400" />
              <span className="text-xl font-orbitron gradient-text">YUGANTRAN2.0'25</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-4">
              The premier annual tech fest organized by the School of Computer Science & Engineering at Geeta University.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 glass rounded-full flex items-center justify-center hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-orbitron mb-4 text-cyan-400">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-cyan-400 hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-orbitron mb-4 text-cyan-400">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Geeta University, Panipat,<br />Haryana - 132145
                </span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <span>+91 XXXXX XXXXX</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <a
                  href="mailto:YUGANTRAN2.0@geetauniversity.edu.in"
                  className="hover:text-cyan-400 transition-colors"
                >
                  yugantran@geetauniversity.edu.in
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Event Info */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-orbitron mb-4 text-cyan-400">Event Details</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <span className="block text-sm text-gray-500 mb-1">Dates</span>
                <span className="font-orbitron text-white">November 29, 2025</span>
              </li>
              <li>
                <span className="block text-sm text-gray-500 mb-1">Venue</span>
                <span className="text-white">Geeta University Campus</span>
              </li>
              <li>
                <span className="block text-sm text-gray-500 mb-1">Expected Participants</span>
                <span className="text-white">500+</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Divider Line */}
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent mb-8" />

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500"
        >
          <p>
            © {currentYear} YUGANTRAN2.0. All rights reserved. | School of Computer Science & Engineering, Geeta University
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-cyan-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-cyan-400 transition-colors">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
