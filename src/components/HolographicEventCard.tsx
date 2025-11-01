import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useState, useRef } from "react";
import { LucideIcon, X } from "lucide-react";

interface HolographicEventCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  prize: string;
  gradient: string;
  index: number;
  details?: string;
}

export default function HolographicEventCard({
  icon: Icon,
  title,
  description,
  prize,
  gradient,
  index,
  details,
}: HolographicEventCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 250,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 250,
    damping: 25,
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
    <>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{
          opacity: 1,
          scale: isHovered ? 1.05 : 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
          delay: index * 0.08,
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
          zIndex: isHovered ? 40 : 10,
        }}
        className="relative group perspective-1000 cursor-pointer"
      >
        {/* Neon Glass Card */}
        <motion.div
          className="relative rounded-2xl overflow-hidden border border-cyan-400/30 bg-gradient-to-b from-gray-900/80 to-black/95 backdrop-blur-xl shadow-[0_0_20px_rgba(0,255,255,0.25)]"
          animate={{
            borderColor: isHovered
              ? "rgba(6,182,212,0.8)"
              : "rgba(6,182,212,0.3)",
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Holographic shimmer border */}
          <motion.div
            className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-500 opacity-30 blur-md"
            animate={{
              opacity: isHovered ? [0.3, 0.6, 0.3] : 0.2,
              backgroundPositionX: isHovered ? ["0%", "200%"] : "0%",
            }}
            transition={{
              duration: 3,
              repeat: isHovered ? Infinity : 0,
              ease: "linear",
            }}
          />

          {/* Header */}
          <div
            className={`relative h-48 bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}
          >
            <motion.div
              className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2),transparent_60%)]"
              animate={{ opacity: isHovered ? 0.6 : 0.3 }}
            />
            <motion.div
              animate={{
                scale: isHovered ? 1.15 : 1,
                rotateY: isHovered ? 360 : 0,
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative z-10"
            >
              <Icon className="w-20 h-20 text-white drop-shadow-[0_0_20px_rgba(0,255,255,0.8)]" />
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-2xl font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-2 drop-shadow-[0_0_10px_rgba(0,212,255,0.5)]">
              {title}
            </h3>
            <p className="text-gray-300 mb-4 text-sm leading-relaxed">
              {description}
            </p>

            <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-black/40 border border-cyan-500/20 mb-4">
              <span className="text-xs text-cyan-400/70 uppercase tracking-wider">
                Prize Pool
              </span>
              <span className="text-lg font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                {prize}
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowModal(true)}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-orbitron text-white shadow-[0_0_20px_rgba(0,212,255,0.5)] hover:shadow-[0_0_35px_rgba(0,212,255,0.9)] transition-all duration-300"
            >
              View Details
            </motion.button>
          </div>
        </motion.div>

        {/* Glow Outline */}
        <motion.div
          className="absolute -inset-[2px] rounded-2xl blur-2xl pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, #00d4ff, #00ffff, #b000ff, #ff00ff)",
          }}
          animate={
            isHovered
              ? { opacity: [0.3, 0.6, 0.3] }
              : { opacity: 0, transition: { duration: 0.5 } }
          }
          transition={{
            duration: isHovered ? 2 : 0.6,
            repeat: isHovered ? Infinity : 0,
          }}
        />
      </motion.div>

      {/* ===== Modal ===== */}
      {showModal && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowModal(false)}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative w-[90%] max-w-lg bg-gradient-to-br from-gray-900/95 to-black/95 border border-cyan-500/40 rounded-2xl p-6 shadow-[0_0_40px_rgba(0,255,255,0.4)]"
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-cyan-400 hover:text-pink-400 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex flex-col items-center text-center mb-4">
              <Icon className="w-16 h-16 text-cyan-400 mb-4" />
              <h2 className="text-3xl font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
                {title}
              </h2>
              <p className="text-gray-300 text-sm">{description}</p>
            </div>

            <motion.div
              className="border-t border-cyan-500/30 pt-4 text-gray-200 text-sm leading-relaxed whitespace-pre-line"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {details ||
                "Stay tuned for more information about this event and how you can participate!"}
            </motion.div>

            <div className="mt-5 p-3 bg-black/40 border border-cyan-500/20 rounded-lg text-center font-orbitron text-cyan-300">
              💰 Prize Pool: {prize}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
