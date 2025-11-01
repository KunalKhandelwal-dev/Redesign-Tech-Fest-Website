import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useState, useRef } from "react";
import { Linkedin, Github, Mail } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HolographicTeamCardProps {
  name: string;
  role: string;
  image: string;
  linkedin: string;
  github: string;
  email: string;
  index: number;
}

export default function HolographicTeamCard({
  name,
  role,
  image,
  linkedin,
  github,
  email,
  index,
}: HolographicTeamCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isHovered) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / (rect.width / 2));
    mouseY.set((e.clientY - centerY) / (rect.height / 2));
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.8, y: 40 }}
      animate={{
        opacity: 1,
        scale: isHovered ? 1.03 : 1,
        y: 0,
      }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative group perspective-1000 z-30"
    >
      {/* Outer holographic frame */}
      <div className="relative rounded-xl overflow-hidden holographic-card shadow-[0_0_20px_rgba(0,255,255,0.2)]">
        {/* Animated neon border */}
        <motion.div
          className="absolute inset-0 rounded-xl neon-border-animated pointer-events-none"
          animate={{ opacity: isHovered ? 1 : 0.6 }}
          transition={{ duration: 0.4 }}
        />

        {/* Frosted glass body */}
        <motion.div
          className="relative bg-gray-900/70 backdrop-blur-xl rounded-xl overflow-hidden border border-cyan-400/30"
          animate={{
            borderColor: isHovered
              ? "rgba(236, 72, 153, 0.5)"
              : "rgba(6, 182, 212, 0.4)",
          }}
          transition={{ duration: 0.4 }}
        >
          {/* Image Section */}
          <div className="relative h-80 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/10 to-pink-500/20" />
            <ImageWithFallback
              src={image}
              alt={name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {isHovered && (
              <motion.div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(0,255,255,0.3), transparent)",
                }}
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

            {/* Corner tech accents */}
            {["t-l", "t-r", "b-l", "b-r"].map((pos) => (
              <div
                key={pos}
                className={`absolute w-6 h-6 border-cyan-400 opacity-60 ${
                  pos === "t-l"
                    ? "top-3 left-3 border-l-2 border-t-2"
                    : pos === "t-r"
                    ? "top-3 right-3 border-r-2 border-t-2"
                    : pos === "b-l"
                    ? "bottom-3 left-3 border-l-2 border-b-2"
                    : "bottom-3 right-3 border-r-2 border-b-2"
                }`}
              />
            ))}

            {/* Hover Overlay with Socials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gradient-to-t from-black/95 via-cyan-900/50 to-transparent flex items-center justify-center"
            >
              {/* Social Icons */}
              <div className="flex gap-5 z-10">
                {[
                  { Icon: Linkedin, color: "cyan", link: linkedin },
                  { Icon: Github, color: "purple", link: github },
                  { Icon: Mail, color: "pink", link: email },
                ].map(({ Icon, color, link }, i) => (
                  <motion.a
                    key={i}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={
                      isHovered
                        ? { scale: 1, rotate: 0 }
                        : { scale: 0, rotate: -180 }
                    }
                    transition={{ delay: 0.1 * i, type: "spring" }}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-12 h-12 bg-${color}-500/20 backdrop-blur-sm rounded-lg border border-${color}-400/50 flex items-center justify-center hover:bg-${color}-500 hover:border-${color}-400 transition-all duration-300 shadow-[0_0_15px_rgba(0,212,255,0.3)]`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Info Section */}
          <div className="relative p-6 bg-gradient-to-b from-gray-900/90 to-black/95">
            <div className="flex items-center gap-2 mb-3">
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(0,212,255,0.8)]"
              />
              <div className="flex-1 h-px bg-gradient-to-r from-cyan-400/50 via-purple-400/30 to-transparent" />
            </div>

            <h3 className="text-xl font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-1 drop-shadow-[0_0_10px_rgba(0,212,255,0.5)]">
              {name}
            </h3>
            <p className="text-cyan-300/80 text-xs tracking-widest uppercase mb-4">
              {role}
            </p>

            {/* Subtle data lines */}
            <div className="space-y-2">
              {[70, 50].map((w, i) => (
                <motion.div
                  key={i}
                  initial={{ width: 0 }}
                  animate={{ width: `${w}%` }}
                  transition={{ duration: 0.8, delay: 0.4 + i * 0.2 }}
                  className={`h-px bg-gradient-to-r ${
                    i === 0
                      ? "from-purple-400/50 to-transparent"
                      : "from-pink-400/50 to-transparent"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Outer Glow on Hover */}
        <motion.div
          className="absolute -inset-1 rounded-xl blur-xl pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, #00d4ff, #00ffff, #b000ff, #ff00ff)",
          }}
          animate={
            isHovered
              ? { opacity: [0.2, 0.6, 0.2] }
              : { opacity: 0, transition: { duration: 0.4 } }
          }
          transition={{
            duration: isHovered ? 2 : 0.5,
            repeat: isHovered ? Infinity : 0,
          }}
        />
      </div>
    </motion.div>
  );
}
