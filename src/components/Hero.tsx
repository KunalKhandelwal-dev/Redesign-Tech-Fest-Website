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
      className="relative z-10 min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-transparent"
      style={{ perspective: "1000px" }}
    >
      {/* === BOT + GLOWS === */}
      <motion.div
        className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 z-[5] flex flex-col items-center select-none pointer-events-none opacity-70"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 bg-black/40 blur-[30px] rounded-full z-[0]" />
        <motion.div
          className="absolute w-[720px] h-[720px] rounded-full bg-cyan-400/15 blur-[120px] z-[1]"
          animate={{ opacity: [0.25, 0.45, 0.25], scale: [1, 1.05, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-60px] w-[460px] h-[160px] rounded-full bg-cyan-300/40 blur-[130px] z-[2]"
          animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.05, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[36%] w-[180px] h-[60px] bg-cyan-300/25 blur-[30px] rounded-full z-[3]"
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.img
          src="/images/bot/bot.png"
          alt="AI Bot"
          className="w-[600px] md:w-[780px] opacity-[0.38] mix-blend-soft-light z-[4] backdrop-blur-[1px]"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.38 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#00001a]/90 via-[#00001a]/70 to-transparent pointer-events-none z-[0]" />
      </motion.div>

      {/* === Background Glow & Grid === */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.18),transparent_70%)] blur-2xl animate-pulse-slow"></div>
        <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(rgba(0,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.2)_1px,transparent_1px)] bg-[size:60px_60px] animate-slow-pan"></div>
        <CircuitSparks />
      </div>

      {/* === HERO CONTENT === */}
      <motion.div
        style={{ rotateX, rotateY }}
        className="relative z-20 container mx-auto px-6 text-center"
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

          {/* === GLowing Title === */}
          <motion.h1
            className="font-orbitron text-6xl sm:text-7xl md:text-8xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-text-glow"
            animate={{
              textShadow: [
                "0 0 20px rgba(0,255,255,0.6)",
                "0 0 35px rgba(0,150,255,0.9)",
                "0 0 50px rgba(140,0,255,0.8)",
                "0 0 25px rgba(0,255,255,0.6)",
              ],
            }}
            transition={{
              textShadow: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            YUGANTRAN2.0
          </motion.h1>

          <style>{`
            @keyframes text-glow {
              0%, 100% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
            }
            .animate-text-glow {
              background-size: 300% 300%;
              animation: text-glow 6s ease-in-out infinite;
              filter: drop-shadow(0 0 12px rgba(0,255,255,0.5));
            }
          `}</style>

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
              <span>November 28, 2025</span>
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
