import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, memo } from "react";
import HolographicTeamCard from "./HolographicTeamCard";

function Team() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const teamMembers = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Faculty Coordinator",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      linkedin: "#",
      github: "#",
      email: "#",
    },
    {
      name: "Priya Sharma",
      role: "Event Head",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      linkedin: "#",
      github: "#",
      email: "#",
    },
    {
      name: "Arjun Patel",
      role: "Technical Lead",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      linkedin: "#",
      github: "#",
      email: "#",
    },
    {
      name: "Sneha Reddy",
      role: "Marketing Head",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      linkedin: "#",
      github: "#",
      email: "#",
    },
    {
      name: "Vikram Singh",
      role: "Operations Lead",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      linkedin: "#",
      github: "#",
      email: "#",
    },
    {
      name: "Ananya Verma",
      role: "Design Head",
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
      linkedin: "#",
      github: "#",
      email: "#",
    },
  ];

  return (
    <section
      id="team"
      className="relative py-24 overflow-visible"
      ref={ref}
      aria-label="Team Section"
    >
      {/* Subtle Background Glows (GPU-friendly gradients) */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl opacity-20 will-change-transform" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl opacity-20 will-change-transform" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
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
            <span className="text-cyan-400 font-medium">YUGANTRAN2.0 2025</span> an unforgettable experience.
          </p>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {teamMembers.map((member, index) => (
            <HolographicTeamCard
              key={index}
              {...member}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default memo(Team);
