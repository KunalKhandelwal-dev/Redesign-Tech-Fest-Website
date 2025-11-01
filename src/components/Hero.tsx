import { motion, useMotionValue, useTransform } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { useRef } from "react";
import CircuitSparks from "./CircuitSparks";

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const heroRef = useRef<HTMLDivElement>(null);

  const rotateX = useTransform(mouseY, [0, 1], [6, -6]);
  const rotateY = useTransform(mouseX, [0, 1], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
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
      className="relative z-30 min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-transparent"
      style={{ perspective: "1000px" }}
    >
      {/* === Background Glow Layer === */}
      <div className="absolute inset-0 -z-[1] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.15),transparent_70%)] blur-2xl animate-pulse-slow"></div>
        <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(rgba(0,255,255,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.25)_1px,transparent_1px)] bg-[size:60px_60px] animate-slow-pan"></div>
        <CircuitSparks />
      </div>

      {/* === Portal Animation (Faster & Always Visible) === */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.9 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        <motion.div
          className="absolute inset-0 w-[600px] h-[600px] rounded-full border border-cyan-400/40 blur-sm"
          style={{ transformStyle: "preserve-3d", rotateX: "60deg" }}
          animate={{ rotateZ: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-0 w-[700px] h-[700px] rounded-full border border-blue-500/30 blur-md"
          style={{ transformStyle: "preserve-3d", rotateX: "60deg", rotateY: "30deg" }}
          animate={{ rotateZ: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-28 h-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/50 blur-3xl shadow-[0_0_60px_rgba(0,255,255,0.8)]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* === Hero Text and Buttons === */}
      <motion.div
        style={{ rotateX, rotateY }}
        className="relative z-10 container mx-auto px-6 text-center"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <motion.div className="space-y-8">
          <motion.div
            className="inline-block px-8 py-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 shadow-[0_0_25px_rgba(0,255,255,0.4)] backdrop-blur-md"
            animate={{ opacity: [0.9, 1, 0.9] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="text-cyan-300 font-semibold tracking-wider">
              Annual Tech Fest 2025
            </span>
          </motion.div>

          <motion.h1
            className="font-orbitron text-6xl sm:text-7xl md:text-8xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"
            animate={{
              textShadow: [
                "0 0 25px rgba(0,255,255,0.8)",
                "0 0 50px rgba(0,150,255,1)",
                "0 0 25px rgba(0,255,255,0.8)",
              ],
            }}
            transition={{
              textShadow: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            YUGANTRAN2.0
          </motion.h1>

          <motion.h2
            className="text-4xl md:text-5xl font-orbitron text-cyan-400 tracking-widest opacity-90"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.9, 1, 0.9],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            2025
          </motion.h2>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Innovate, Compete, and Collaborate for a{" "}
            <span className="text-cyan-400 font-orbitron">Smarter Tomorrow</span>
          </p>

          <div className="flex flex-wrap justify-center items-center gap-6 text-gray-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-cyan-400" />
              <span>November 29, 2025</span>
            </div>
            <div className="w-1 h-1 bg-cyan-400 rounded-full" />
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-cyan-400" />
              <span>Geeta University, Panipat</span>
            </div>
          </div>

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
