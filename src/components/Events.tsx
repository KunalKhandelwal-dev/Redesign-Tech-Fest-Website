import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState, useMemo, useEffect } from "react";
import {
  Code,
  Box,
  Gamepad2,
  Cpu,
  Rocket,
  Palette,
  Brain,
  Terminal,
  Lightbulb,
} from "lucide-react";
import HolographicEventCard from "./HolographicEventCard";

export default function Events() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeFilter, setActiveFilter] = useState("all");
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Detect mobile devices to bypass intersection issues
  useEffect(() => {
    if (window.innerWidth < 768) setIsMobile(true);
  }, []);

  const shouldAnimate = isMobile ? true : isInView;

  // ✅ Events List
  const events = useMemo(
    () => [
      {
        icon: Gamepad2,
        title: "BGMI",
        category: "gaming",
        description:
          "Compete in the ultimate battleground to prove your gaming skills.",
        prize: "₹5000",
        gradient: "from-pink-500 to-pink-600",
      },
      {
        icon: Gamepad2,
        title: "BGMI(Solo)",
        category: "gaming",
        description:
          "Compete in the ultimate battleground to prove your gaming skills.",
        prize: "Cash Prize",
        gradient: "from-pink-500 to-pink-600",
      },
      {
        icon: Gamepad2,
        title: "Free Fire",
        category: "gaming",
        description:
          "Compete for glory in this intense Free Fire tournament.",
        prize: "₹3000",
        gradient: "from-indigo-500 to-blue-600",
      },
      {
        icon: Gamepad2,
        title: "Free Fire(Solo)",
        category: "gaming",
        description:
          "Compete for glory in this intense Free Fire tournament.",
        prize: "Cash Prize",
        gradient: "from-indigo-500 to-blue-600",
      },
      {
        icon: Box,
        title: "Tech Treasure",
        category: "quiz",
        description:
        "Solve technical puzzles and clues to discover the hidden treasure.",
        prize: "₹3000",
        gradient: "from-blue-500 to-red-600",
      },
      {
        icon: Terminal,
        title: "Code Relay",
        category: "coding",
        description:
        "Solve coding challenges and algorithms in this competitive event.",
        prize: "₹3000",
        gradient: "from-orange-500 to-cyan-600",
      },
      {
        icon: Brain,
        title: "Tech Quiz",
        category: "quiz",
        description:
        "Challenge your technical knowledge in a battle of wits and logic.",
        prize: "₹2500",
        gradient: "from-amber-500 to-teal-600",
      },
      {
        icon: Cpu,
        title: "Tech Show",
        category: "innovation",
        description:
        "Showcase your latest tech projects, prototypes, or research ideas.",
        prize: "₹2000",
        gradient: "from-pink-500 to-pink-600",
      },
      {
        icon: Gamepad2,
        title: "Tekken 7",
        category: "gaming",
        description:
          "Show your fighting skills in an electrifying Tekken 7 tournament.",
        prize: "₹2000",
        gradient: "from-violet-500 to-red-600",
      },
      {
        icon: Code,
        title: "Debug It",
        category: "coding",
        description: "Find and fix programming errors faster than anyone else.",
        prize: "₹1500",
        gradient: "from-cyan-500 to-sky-600",
      },
      {
        icon: Lightbulb,
        title: "Project Exhibition",
        category: "innovation",
        description:
          "Display your academic or innovative projects for recognition.",
        prize: "₹1500",
        gradient: "from-amber-500 to-orange-600",
      },
      {
        icon: Palette,
        title: "Poster Making",
        category: "design",
        description:
        "Create innovative and creative posters on technology or social themes.",
        prize: "₹1000",
        gradient: "from-indigo-500 to-purple-600",
      },
      {
        icon: Rocket,
        title: "Startup Bid",
        category: "entrepreneurship",
        description:
        "Pitch your startup idea and win support from investors and mentors.",
        prize: "Cash Prize",
        gradient: "from-green-500 to-emerald-600",
      },
    ],
    []
  );

  // ✅ Filter Buttons
  const filters = useMemo(
    () => [
      { id: "all", label: "All Events" },
      { id: "coding", label: "Coding" },
      { id: "quiz", label: "Tech Quiz & Treasure" },
      { id: "gaming", label: "Gaming" },
      { id: "design", label: "Design" },
      { id: "innovation", label: "Innovation & Exhibition" },
      { id: "entrepreneurship", label: "Startup & Business" },
    ],
    []
  );

  const filteredEvents =
    activeFilter === "all"
      ? events
      : events.filter((event) => event.category === activeFilter);

  return (
    <section
      id="events"
      ref={ref}
      className="relative py-24 overflow-visible scroll-mt-16"
    >
      {/* Background Light Effects */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-blue-600 rounded-full blur-3xl opacity-10 pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-600 rounded-full blur-3xl opacity-10 pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="px-4 py-2 glass rounded-full text-sm text-cyan-400 inline-block mb-4">
            Our Events
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-orbitron mb-6">
            <span className="gradient-text">Compete</span> in Cutting-Edge Events
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Choose from a diverse range of technical competitions designed to
            challenge your skills and creativity.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          {filters.map((filter, index) => (
            <motion.button
              key={filter.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${activeFilter === filter.id
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white glow-blue"
                  : "glass text-gray-400 hover:text-cyan-400 hover:border-cyan-400"
                }`}
            >
              {filter.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Events Grid */}
        <motion.div
          initial="hidden"
          animate={shouldAnimate ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.title}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4 }}
            >
              <HolographicEventCard
                icon={event.icon}
                title={event.title}
                category={event.category}
                description={event.description}
                prize={event.prize}
                gradient={event.gradient}
                index={index}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
