import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useState, useRef } from 'react';
import { Linkedin, Github, Mail } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

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

  // Motion values for 3D tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring animations for smooth movement
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

    // Normalize mouse position to -0.5 to 0.5
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Smoothly reset rotation to neutral position
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ 
        opacity: 1, 
        scale: isHovered ? 1.02 : 1, 
        y: 0 
      }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        scale: { type: 'spring', stiffness: 300, damping: 20 }
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="relative group perspective-1000"
    >
      {/* Holographic Card Container */}
      <div className="relative holographic-card rounded-xl overflow-hidden">
        {/* Animated neon border */}
        <motion.div 
          className="absolute inset-0 rounded-xl neon-border-animated"
          animate={{
            opacity: isHovered ? 1 : 0.6,
          }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Inner card with frosted glass effect */}
        <motion.div 
          className="relative bg-gray-900/70 backdrop-blur-xl rounded-xl overflow-hidden"
          animate={{
            borderColor: isHovered ? 'rgba(236, 72, 153, 0.6)' : 'rgba(6, 182, 212, 0.4)',
          }}
          transition={{ duration: 0.5 }}
          style={{ borderWidth: '1px', borderStyle: 'solid' }}
        >
          {/* Scan line effect */}
          <div className="scan-line" />
          
          {/* Noise texture overlay */}
          <div className="absolute inset-0 opacity-5 noise-texture" />

          {/* Image section */}
          <div className="relative h-80 overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/10 to-pink-500/20" />
            
            {/* Team member image */}
            <ImageWithFallback
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />

            {/* Holographic shimmer effect */}
            {isHovered && (
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.4), transparent)',
                }}
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />

            {/* Corner tech accents */}
            <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-cyan-400 opacity-60" />
            <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-cyan-400 opacity-60" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-cyan-400 opacity-60" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-cyan-400 opacity-60" />

            {/* Hover overlay with social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gradient-to-t from-black/95 via-cyan-900/60 to-transparent flex items-center justify-center"
            >
              {/* Animated data lines */}
              <div className="absolute top-0 left-0 right-0 p-4 space-y-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ width: 0 }}
                    animate={isHovered ? { width: `${Math.random() * 50 + 50}%` } : { width: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="h-px bg-gradient-to-r from-cyan-400/50 to-transparent"
                  />
                ))}
              </div>

              {/* Social links */}
              <div className="flex gap-4 z-10">
                <motion.a
                  href={linkedin}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isHovered ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                  transition={{ delay: 0.1, type: 'spring' }}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-cyan-500/20 backdrop-blur-sm rounded-lg border border-cyan-400/50 flex items-center justify-center hover:bg-cyan-500 hover:border-cyan-400 transition-all duration-300 shadow-[0_0_15px_rgba(0,212,255,0.3)]"
                >
                  <Linkedin className="w-6 h-6 text-cyan-300" />
                </motion.a>
                <motion.a
                  href={github}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isHovered ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-purple-500/20 backdrop-blur-sm rounded-lg border border-purple-400/50 flex items-center justify-center hover:bg-purple-500 hover:border-purple-400 transition-all duration-300 shadow-[0_0_15px_rgba(176,0,255,0.3)]"
                >
                  <Github className="w-6 h-6 text-purple-300" />
                </motion.a>
                <motion.a
                  href={email}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isHovered ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                  transition={{ delay: 0.3, type: 'spring' }}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-pink-500/20 backdrop-blur-sm rounded-lg border border-pink-400/50 flex items-center justify-center hover:bg-pink-500 hover:border-pink-400 transition-all duration-300 shadow-[0_0_15px_rgba(255,0,255,0.3)]"
                >
                  <Mail className="w-6 h-6 text-pink-300" />
                </motion.a>
              </div>

              {/* Glowing particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 2, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.25,
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Card info section */}
          <div className="relative p-6 bg-gradient-to-b from-gray-900/90 to-black/95">
            {/* Status indicator */}
            <div className="flex items-center gap-2 mb-3">
              <motion.div
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(0,212,255,0.8)]"
              />
              <div className="flex-1 h-px bg-gradient-to-r from-cyan-400/50 via-purple-400/30 to-transparent" />
            </div>

            {/* Name */}
            <h3 className="text-xl font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2 drop-shadow-[0_0_10px_rgba(0,212,255,0.5)]">
              {name}
            </h3>

            {/* Role */}
            <p className="text-cyan-300/80 text-sm mb-4 tracking-wider uppercase">{role}</p>

            {/* Data display bars */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-purple-400 rounded-full" />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '70%' }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-px bg-gradient-to-r from-purple-400/50 to-transparent"
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-pink-400 rounded-full" />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '50%' }}
                  transition={{ duration: 1, delay: 0.7 }}
                  className="h-px bg-gradient-to-r from-pink-400/50 to-transparent"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Outer glow effect on hover */}
        <motion.div
          className="absolute -inset-1 rounded-xl blur-xl pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, #00d4ff, #00ffff, #b000ff, #ff00ff)',
          }}
          animate={isHovered ? {
            opacity: [0.3, 0.6, 0.3],
          } : {
            opacity: 0,
          }}
          transition={{ 
            duration: isHovered ? 2 : 0.5, 
            repeat: isHovered ? Infinity : 0 
          }}
        />
      </div>
    </motion.div>
  );
}
