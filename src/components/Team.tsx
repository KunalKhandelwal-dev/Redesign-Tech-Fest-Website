import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, memo, useEffect, useState } from "react";
import HolographicTeamCard from "./HolographicTeamCard";
import teamData from "../data/team.json"; // ✅ Import team details from JSON

function Team() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  // Treat small viewports as "in view" because some mobile browsers
  // don't reliably trigger intersection observers for large sections.
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) setIsMobile(true);
  }, []);

  const shouldAnimate = isMobile ? true : isInView;

  // ✅ Load team data (from local JSON)
  useEffect(() => {
    setTeamMembers(teamData);
  }, []);

  return (
    <section
      id="team"
      className="relative py-24 overflow-visible"
      ref={ref}
      aria-label="Team Section"
    >
      {/* Background Glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl opacity-20 will-change-transform" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl opacity-20 will-change-transform" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={shouldAnimate ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 glass rounded-full text-sm text-cyan-400">
              Our Team
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-orbitron mb-6">
            Meet the <span className="gradient-text">Organizing Committee</span>
          </h2>

          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Dedicated individuals working tirelessly to make{" "}
            <span className="text-cyan-400 font-medium">
              YUGANTRAN 2.0 (2025)
            </span>{" "}
            an unforgettable experience.
          </p>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={shouldAnimate ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {teamMembers.map((member, index) => (
            <HolographicTeamCard key={index} {...member} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default memo(Team);
