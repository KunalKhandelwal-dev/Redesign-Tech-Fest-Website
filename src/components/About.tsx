import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useMemo } from "react";
import { Cpu, Lightbulb, Users, Trophy } from "lucide-react";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Memoized static data
  const features = useMemo(
    () => [
      {
        icon: Cpu,
        title: "Innovation Hub",
        description:
          "Explore cutting-edge technologies and groundbreaking ideas that shape the future of tech.",
      },
      {
        icon: Lightbulb,
        title: "Creative Challenges",
        description:
          "Participate in exciting hackathons, coding competitions, and problem-solving challenges.",
      },
      {
        icon: Users,
        title: "Collaboration",
        description:
          "Connect with like-minded innovators, industry experts, and tech enthusiasts from across the nation.",
      },
      {
        icon: Trophy,
        title: "Win Big",
        description:
          "Compete for amazing prizes, internships, and recognition in various technical competitions.",
      },
    ],
    []
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.15, duration: 0.6, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 overflow-visible bg-transparent"
    >
      {/* Optimized Background Effects */}
      <div className="absolute top-1/4 -left-20 w-60 h-60 bg-purple-600 rounded-full blur-2xl opacity-20 will-change-transform" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-cyan-600 rounded-full blur-2xl opacity-20 will-change-transform" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 glass rounded-full text-sm text-cyan-400">
              About YUGANTRAN2.0
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-orbitron mb-6">
            Where <span className="gradient-text">Innovation</span> Meets
            Excellence
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            YUGANTRAN2.0 2025 is the premier annual tech fest organized by the
            School of Computer Science & Engineering at Geeta University. Join
            us for innovation, competition, and collaboration that
            will push the boundaries of technology and creativity.
          </p>
          {/* Download Brochure Button */}
          <div className="flex justify-center mt-8">
            <motion.a
              href="/docs/Brochure.pdf"
              download
              whileHover={{ scale: 1.1 }}
              className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-orbitron text-white shadow-lg hover:shadow-cyan-400/40 transition-all duration-300"
            >
              Event Brochure
            </motion.a>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="group glass p-6 rounded-xl hover:border-cyan-400 transition-all duration-300"
            >
              <div className="mb-4">
                <feature.icon className="w-12 h-12 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-orbitron mb-3 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="glass rounded-2xl p-8 md:p-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Participants", value: "500+" },
              { label: "Events", value: "10+" },
              { label: "Prize Pool", value: "Cash 🏆" },
              { label: "Sponsors", value: "5+" },
            ].map((stat, index) => (
              <motion.div key={index} variants={itemVariants} className="text-center">
                <div className="text-3xl md:text-4xl lg:text-5xl font-orbitron gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
