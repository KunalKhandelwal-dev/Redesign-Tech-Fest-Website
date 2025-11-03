import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useState, useRef } from "react";
import { LucideIcon, X, Info } from "lucide-react";

interface HolographicEventCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  prize: string;
  gradient: string;
  index: number;
  details?: string;
  teamSize?: string;
  onSelectEvent?: (eventName: string) => void;
}

export default function HolographicEventCard({
  icon: Icon,
  title,
  description,
  prize,
  gradient,
  index,
  details,
  teamSize,
  onSelectEvent,
}: HolographicEventCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);
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

  // ✅ Event-specific details and team sizes
  const eventData: Record<
    string,
    { details: string; teamSize: string; fee?: string }
  > = {
    "Debug It": {
      details:
        "Participants will be provided buggy code snippets. Identify and fix errors to make the program run correctly within the shortest time.",
      teamSize: "Individual Participation",
      fee: "₹100",
    },
    "Tech Treasure": {
      details:
        "A treasure hunt of logic and tech clues! Solve puzzles and follow hints that lead to the treasure.",
      teamSize: "2–4 Members",
      fee: "₹100",
    },
    BGMI: {
      details:
        "Battle it out in the ultimate BGMI competition. Squad up and survive till the end to win prizes!",
      teamSize: "Squad (4 Players)",
      fee: "₹100 per team",
    },
    "Tech Show": {
      details:
        "Showcase your innovative technology, hardware prototypes, or research models.",
      teamSize: "1–3 Members",
      fee: "₹100",
    },
    "Startup Bid": {
      details:
        "Pitch your startup ideas to potential investors and mentors.",
      teamSize: "2–5 Members",
      fee: "₹100",
    },
    "Poster Making": {
      details:
        "Design creative posters that communicate ideas on technology or social causes.",
      teamSize: "Individual / Duo",
      fee: "₹100",
    },
    "Tech Quiz": {
      details:
        "Test your technical and general knowledge in this fast-paced quiz.",
      teamSize: "2–3 Members",
      fee: "₹100",
    },
    "Tekken 7": {
      details:
        "Prove your combat mastery in the ultimate Tekken 7 face-off.",
      teamSize: "Individual",
      fee: "₹100",
    },
    "Code Relay": {
      details:
        "Compete in timed programming challenges and algorithmic problems.",
      teamSize: "1–2 Members",
      fee: "₹100",
    },
    "Project Exhibition": {
      details:
        "Showcase your academic, mini, or major projects with innovation.",
      teamSize: "1–3 Members",
      fee: "₹100",
    },
  };

  const eventDetail = eventData[title] || {
    details:
      "This event challenges participants to showcase their creativity, teamwork, and innovation.",
    teamSize: "1–4 Members",
    fee: "₹100",
  };

  return (
    <>
      {/* === Event Card === */}
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{
          opacity: 1,
          scale: isHovered ? 1.04 : 1,
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
        onClick={() => setShowModal(true)}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          zIndex: isHovered ? 40 : 10,
        }}
        className="relative group cursor-pointer perspective-1000"
      >
        <motion.div className="relative rounded-2xl overflow-hidden border border-cyan-400/30 bg-gradient-to-b from-gray-950 to-black/90 backdrop-blur-lg shadow-lg hover:shadow-[0_0_25px_rgba(0,255,255,0.4)] transition-all duration-500">
          <div
            className={`relative h-44 bg-gradient-to-br ${gradient} flex items-center justify-center`}
          >
            <Icon className="w-16 h-16 text-white drop-shadow-[0_0_15px_rgba(0,255,255,0.7)]" />

            {/* ✨ Hover Hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.4 }}
              className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/70 border border-cyan-400/50 text-cyan-300 text-xs sm:text-sm font-orbitron tracking-wide shadow-[0_0_10px_rgba(0,255,255,0.7)] animate-pulse-glow pointer-events-none select-none"
            >
              <Info className="w-4 h-4 text-cyan-300" />
              <span className="text-[0.7rem] sm:text-xs font-semibold">
                Click to view details
              </span>
            </motion.div>
          </div>

          <div className="p-6 space-y-4">
            <h3 className="text-xl font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              {title}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed min-h-[60px]">
              {description}
            </p>

            <div className="flex items-center justify-between bg-black/40 border border-cyan-500/20 px-4 py-3 rounded-md mt-3">
              <span className="text-xs text-cyan-400/70 uppercase tracking-wider">
                Prize Pool
              </span>
              <span className="text-lg font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                {prize}
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* === Modal Popup (simplified, no double popup) === */}
      {showModal && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowModal(false)}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.85, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            className="relative w-[90%] max-w-lg bg-gradient-to-br from-gray-950 to-black border border-cyan-500/40 rounded-2xl p-6 shadow-[0_0_40px_rgba(0,255,255,0.4)]"
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
              <p className="text-gray-300 text-sm px-2">{description}</p>
            </div>

            <div className="border-t border-cyan-500/30 pt-4 text-gray-200 text-sm leading-relaxed whitespace-pre-line px-2 space-y-3">
              <p className="text-cyan-300 font-orbitron">
                👥 Team Size: {eventDetail.teamSize}
              </p>
              <p className="text-cyan-300 font-orbitron">
                💸 Registration Fee: {eventDetail.fee}
              </p>
              <p className="text-cyan-300 font-orbitron">
                🏆 Prize Pool: {prize}
              </p>
              <p className="text-gray-200 mt-2">{eventDetail.details}</p>
            </div>

            {/* ✅ Register button only scrolls to form now */}
            <motion.button
              onClick={() => {
                window.dispatchEvent(
                  new CustomEvent("eventSelected", { detail: title })
                );
                onSelectEvent?.(title);
                setShowModal(false);

                // ✅ Toast
                // const toast = document.createElement("div");
                // toast.textContent = `✅ ${title} selected!`;
                // Object.assign(toast.style, {
                //   position: "fixed",
                //   bottom: "40px",
                //   left: "50%",
                //   transform: "translateX(-50%)",
                //   background: "linear-gradient(to right, #00ffffaa, #007bffaa)",
                //   color: "white",
                //   padding: "12px 24px",
                //   borderRadius: "12px",
                //   fontFamily: "Orbitron, sans-serif",
                //   boxShadow: "0 0 20px rgba(0,255,255,0.6)",
                //   zIndex: "9999",
                //   fontSize: "14px",
                //   transition: "opacity 0.6s ease",
                // });
                // document.body.appendChild(toast);
                // setTimeout(() => (toast.style.opacity = "0"), 2000);
                // setTimeout(() => toast.remove(), 2600);

                // ✅ Smooth scroll to register form
                const form = document.getElementById("register");
                if (form)
                  form.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-orbitron rounded-lg shadow-lg"
            >
              Register for this Event
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
