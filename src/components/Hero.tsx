import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import CircuitSparks from './CircuitSparks';
import { useRef } from 'react';

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const heroRef = useRef<HTMLDivElement>(null);

  // Simplified parallax movement
  const rotateX = useTransform(mouseY, [0, 1], [6, -6]);
  const rotateY = useTransform(mouseX, [0, 1], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    // lightweight: only update every ~30ms
    requestAnimationFrame(() => {
      mouseX.set(x);
      mouseY.set(y);
    });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-black"
      style={{ perspective: '1000px' }}
    >
      {/* Background Effects */}
      <CircuitSparks />

      {/* Energy Gradient (merged background layers) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.08),transparent_70%)] animate-pulse-slow blur-xl"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/30 via-blue-800/20 to-purple-900/30 animate-gradient-move blur-2xl"></div>

      {/* Subtle Grid */}
      <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(rgba(0,255,255,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.25)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Floating Orbs (CSS animation for performance) */}
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className={`absolute rounded-full blur-3xl bg-gradient-to-br from-cyan-400 to-purple-500 opacity-10 orb-move-${i + 1}`}
          style={{
            width: `${140 + i * 40}px`,
            height: `${140 + i * 40}px`,
            top: `${10 + i * 20}%`,
            left: `${i * 25}%`,
          }}
        />
      ))}

      {/* Main Content */}
      <motion.div
        style={{ rotateX, rotateY }}
        className="relative z-10 container mx-auto px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            className="inline-block px-8 py-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 shadow-[0_0_25px_rgba(0,255,255,0.4)] backdrop-blur-md"
            animate={{ opacity: [0.9, 1, 0.9] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <span className="text-cyan-300 font-semibold tracking-wider">
              Annual Tech Fest 2025
            </span>
          </motion.div>

          {/* Title */}
          <h1 className="font-orbitron text-7xl md:text-8xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-[0_0_20px_rgba(0,255,255,0.4)] animate-glow-text">
            YUGANTRAN
          </h1>

          {/* Sub Title */}
          <h2 className="text-4xl md:text-5xl font-orbitron text-cyan-400 tracking-widest opacity-90 animate-pulse-slow">
            2025
          </h2>

          {/* Slogan */}
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Innovate, Compete, and Collaborate for a{' '}
            <span className="text-cyan-400 font-orbitron">Smarter Tomorrow</span>
          </p>

          {/* Event Details */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-gray-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-cyan-400" />
              <span>March 15–17, 2025</span>
            </div>
            <div className="w-1 h-1 bg-cyan-400 rounded-full" />
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-cyan-400" />
              <span>Geeta University, Panipat</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-10">
            <motion.a
              href="#events"
              whileHover={{ scale: 1.1 }}
              className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-orbitron text-white shadow-lg hover:shadow-cyan-400/40 transition-all duration-300"
            >
              Explore Events
            </motion.a>
            <motion.a
              href="#register"
              whileHover={{ scale: 1.1 }}
              className="px-10 py-4 border border-cyan-400/40 rounded-lg font-orbitron text-cyan-300 hover:bg-cyan-400/10 transition-all duration-300"
            >
              Register Now
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
