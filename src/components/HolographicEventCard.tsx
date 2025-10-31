import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useState, useRef } from 'react';
import { LucideIcon, X } from 'lucide-react';

interface HolographicEventCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  prize: string;
  gradient: string;
  index: number;
  details: string; // Add detailed info
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

  // Motion values for 3D tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth tilt animation
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isHovered) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <>
      {/* ====== Event Card ====== */}
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{
          opacity: 1,
          scale: isHovered ? 1.02 : 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
          delay: index * 0.1,
          scale: { type: 'spring', stiffness: 300, damping: 20 },
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative group perspective-1000"
      >
        <div className="relative holographic-card rounded-xl overflow-hidden">
          {/* Animated neon border */}
          <motion.div
            className="absolute inset-0 rounded-xl neon-border-animated"
            animate={{ opacity: isHovered ? 1 : 0.6 }}
            transition={{ duration: 0.5 }}
          />

          {/* Inner card */}
          <motion.div
            className="relative bg-gray-900/70 backdrop-blur-xl rounded-xl overflow-hidden"
            animate={{
              borderColor: isHovered
                ? 'rgba(236, 72, 153, 0.6)'
                : 'rgba(6, 182, 212, 0.4)',
            }}
            transition={{ duration: 0.5 }}
            style={{ borderWidth: '1px', borderStyle: 'solid' }}
          >
            {/* Header */}
            <div
              className={`relative h-40 bg-gradient-to-br ${gradient} p-6 flex items-center justify-center overflow-hidden`}
            >
              {/* Gradient shimmer */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-transparent to-purple-500/20"
                animate={{
                  opacity: isHovered ? [0.3, 0.6, 0.3] : 0.3,
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Icon */}
              <motion.div
                animate={{
                  scale: isHovered ? 1.2 : 1,
                  rotateY: isHovered ? 360 : 0,
                }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="relative z-10"
              >
                <Icon className="w-20 h-20 text-white drop-shadow-[0_0_15px_rgba(0,255,255,0.8)]" />
              </motion.div>
            </div>

            {/* Card content */}
            <div className="relative p-6 bg-gradient-to-b from-gray-900/80 to-gray-900/90">
              <h3 className="text-2xl font-orbitron mb-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_10px_rgba(0,212,255,0.5)]">
                {title}
              </h3>
              <p className="text-gray-300 mb-4 leading-relaxed text-sm">
                {description}
              </p>

              <div className="flex items-center justify-between py-3 px-4 rounded-lg bg-black/40 border border-cyan-500/20 mb-4">
                <span className="text-xs text-cyan-400/70 uppercase tracking-wider">
                  Prize Pool
                </span>
                <span className="text-lg font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                  {prize}
                </span>
              </div>

              {/* Hover Overlay */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  y: isHovered ? 0 : 20,
                }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/90 to-transparent p-6 flex flex-col justify-end"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowModal(true)}
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-orbitron text-white shadow-[0_0_20px_rgba(0,212,255,0.5)] hover:shadow-[0_0_30px_rgba(0,212,255,0.8)] transition-all duration-300"
                >
                  View Details
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ====== Modal ====== */}
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
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="relative w-[90%] max-w-lg bg-gray-900/95 border border-cyan-500/40 rounded-2xl p-6 shadow-[0_0_40px_rgba(0,255,255,0.4)]"
          >
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-cyan-400 hover:text-pink-400 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Icon and Title */}
            <div className="flex flex-col items-center text-center">
              <Icon className="w-16 h-16 text-cyan-400 mb-4" />
              <h2 className="text-3xl font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
                {title}
              </h2>
              <p className="text-gray-300 text-sm mb-4">{description}</p>
            </div>

            {/* Details Section */}
            <div className="border-t border-cyan-500/30 pt-4 text-gray-200 text-sm leading-relaxed">
              {details}
            </div>

            {/* Prize Info */}
            <div className="mt-4 p-3 bg-black/40 border border-cyan-500/20 rounded-lg text-center font-orbitron text-cyan-300">
              💰 Prize Pool: {prize}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
