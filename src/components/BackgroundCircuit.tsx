import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export default function BackgroundCircuit() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    // Generate random particles for the circuit flow effect
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Base dark overlay with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#0d0d15] to-[#0a0a0f]" />

      {/* Animated grid pattern */}
      <div className="absolute inset-0 circuit-grid opacity-20" />

      {/* SVG Circuit Pattern Layer 1 - Main circuits */}
      <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Gradient for glowing effect */}
          <linearGradient id="circuit-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.8">
              <animate attributeName="stop-opacity" values="0.8;0.3;0.8" dur="3s" repeatCount="indefinite" />
            </stop>
            <stop offset="50%" stopColor="#00ffff" stopOpacity="0.6">
              <animate attributeName="stop-opacity" values="0.6;0.2;0.6" dur="3s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#b000ff" stopOpacity="0.4">
              <animate attributeName="stop-opacity" values="0.4;0.1;0.4" dur="3s" repeatCount="indefinite" />
            </stop>
          </linearGradient>

          <linearGradient id="circuit-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00ffff" stopOpacity="0.7">
              <animate attributeName="stop-opacity" values="0.7;0.2;0.7" dur="4s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.5">
              <animate attributeName="stop-opacity" values="0.5;0.15;0.5" dur="4s" repeatCount="indefinite" />
            </stop>
          </linearGradient>

          {/* Glow filter for circuit lines */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Stronger glow for animated particles */}
          <filter id="strong-glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Horizontal circuit lines */}
        <g className="circuit-lines-horizontal">
          <line x1="0" y1="10%" x2="100%" y2="10%" stroke="url(#circuit-gradient-1)" strokeWidth="1" filter="url(#glow)">
            <animate attributeName="stroke-dasharray" values="0,1000;1000,0" dur="8s" repeatCount="indefinite" />
          </line>
          <line x1="0" y1="30%" x2="100%" y2="30%" stroke="url(#circuit-gradient-2)" strokeWidth="1" filter="url(#glow)">
            <animate attributeName="stroke-dasharray" values="0,1000;1000,0" dur="10s" repeatCount="indefinite" />
          </line>
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="url(#circuit-gradient-1)" strokeWidth="1.5" filter="url(#glow)">
            <animate attributeName="stroke-dasharray" values="0,1000;1000,0" dur="12s" repeatCount="indefinite" />
          </line>
          <line x1="0" y1="70%" x2="100%" y2="70%" stroke="url(#circuit-gradient-2)" strokeWidth="1" filter="url(#glow)">
            <animate attributeName="stroke-dasharray" values="0,1000;1000,0" dur="9s" repeatCount="indefinite" />
          </line>
          <line x1="0" y1="90%" x2="100%" y2="90%" stroke="url(#circuit-gradient-1)" strokeWidth="1" filter="url(#glow)">
            <animate attributeName="stroke-dasharray" values="0,1000;1000,0" dur="11s" repeatCount="indefinite" />
          </line>
        </g>

        {/* Vertical circuit lines */}
        <g className="circuit-lines-vertical">
          <line x1="15%" y1="0" x2="15%" y2="100%" stroke="url(#circuit-gradient-2)" strokeWidth="1" filter="url(#glow)">
            <animate attributeName="stroke-dasharray" values="0,1000;1000,0" dur="7s" repeatCount="indefinite" />
          </line>
          <line x1="35%" y1="0" x2="35%" y2="100%" stroke="url(#circuit-gradient-1)" strokeWidth="1" filter="url(#glow)">
            <animate attributeName="stroke-dasharray" values="0,1000;1000,0" dur="9s" repeatCount="indefinite" />
          </line>
          <line x1="55%" y1="0" x2="55%" y2="100%" stroke="url(#circuit-gradient-2)" strokeWidth="1.5" filter="url(#glow)">
            <animate attributeName="stroke-dasharray" values="0,1000;1000,0" dur="10s" repeatCount="indefinite" />
          </line>
          <line x1="75%" y1="0" x2="75%" y2="100%" stroke="url(#circuit-gradient-1)" strokeWidth="1" filter="url(#glow)">
            <animate attributeName="stroke-dasharray" values="0,1000;1000,0" dur="8s" repeatCount="indefinite" />
          </line>
          <line x1="90%" y1="0" x2="90%" y2="100%" stroke="url(#circuit-gradient-2)" strokeWidth="1" filter="url(#glow)">
            <animate attributeName="stroke-dasharray" values="0,1000;1000,0" dur="11s" repeatCount="indefinite" />
          </line>
        </g>

        {/* Circuit nodes/connection points */}
        <g className="circuit-nodes">
          {[
            { x: '15%', y: '10%' }, { x: '35%', y: '30%' }, { x: '55%', y: '50%' },
            { x: '75%', y: '70%' }, { x: '90%', y: '90%' }, { x: '15%', y: '70%' },
            { x: '35%', y: '90%' }, { x: '75%', y: '30%' }, { x: '90%', y: '10%' },
          ].map((node, i) => (
            <circle
              key={i}
              cx={node.x}
              cy={node.y}
              r="3"
              fill="#00d4ff"
              filter="url(#strong-glow)"
            >
              <animate attributeName="opacity" values="0.3;1;0.3" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
              <animate attributeName="r" values="3;5;3" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </g>

        {/* Diagonal connecting circuits */}
        <g className="circuit-connections">
          <path
            d="M 15 10 L 35 30 L 55 50"
            stroke="url(#circuit-gradient-1)"
            strokeWidth="0.5"
            fill="none"
            filter="url(#glow)"
            opacity="0.6"
          >
            <animate attributeName="stroke-dasharray" values="0,200;200,0" dur="6s" repeatCount="indefinite" />
          </path>
          <path
            d="M 75 70 L 55 50 L 35 30"
            stroke="url(#circuit-gradient-2)"
            strokeWidth="0.5"
            fill="none"
            filter="url(#glow)"
            opacity="0.6"
          >
            <animate attributeName="stroke-dasharray" values="0,200;200,0" dur="7s" repeatCount="indefinite" />
          </path>
          <path
            d="M 90 10 L 75 30 L 55 50 L 35 90"
            stroke="url(#circuit-gradient-1)"
            strokeWidth="0.5"
            fill="none"
            filter="url(#glow)"
            opacity="0.6"
          >
            <animate attributeName="stroke-dasharray" values="0,300;300,0" dur="9s" repeatCount="indefinite" />
          </path>
        </g>
      </svg>

      {/* Animated particles flowing through circuits */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_10px_#00ffff]"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              opacity: [0, 1, 1, 0],
              scale: [0, 1.5, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Pulsing energy spots */}
      <div className="absolute inset-0">
        {[
          { top: '20%', left: '25%', delay: 0 },
          { top: '60%', left: '70%', delay: 1 },
          { top: '80%', left: '15%', delay: 2 },
          { top: '40%', left: '85%', delay: 1.5 },
        ].map((spot, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full"
            style={{
              top: spot.top,
              left: spot.left,
              background: 'radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              delay: spot.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Subtle scan line effect */}
      <motion.div
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
        animate={{
          top: ['0%', '100%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Overlay to ensure content readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/50 via-transparent to-[#0a0a0f]/80" />
    </div>
  );
}
