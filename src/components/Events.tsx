import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Code, Cpu, Gamepad2, Palette, Database, Zap } from 'lucide-react';
import HolographicEventCard from './HolographicEventCard';

export default function Events() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeFilter, setActiveFilter] = useState('all');

  const events = [
    {
      icon: Code,
      title: 'CodeSprint',
      category: 'coding',
      description: '24-hour hackathon to build innovative solutions for real-world problems.',
      prize: '₹50,000',
      gradient: 'from-cyan-500 to-blue-600',
    },
    {
      icon: Cpu,
      title: 'RoboWars',
      category: 'robotics',
      description: 'Build and battle with robots in an intense arena showdown.',
      prize: '₹40,000',
      gradient: 'from-purple-500 to-pink-600',
    },
    {
      icon: Gamepad2,
      title: 'Gaming Arena',
      category: 'gaming',
      description: 'Compete in popular esports titles like Valorant, BGMI, and FIFA.',
      prize: '₹30,000',
      gradient: 'from-orange-500 to-red-600',
    },
    {
      icon: Palette,
      title: 'UI/UX Challenge',
      category: 'design',
      description: 'Design stunning user experiences for cutting-edge applications.',
      prize: '₹25,000',
      gradient: 'from-green-500 to-teal-600',
    },
    {
      icon: Database,
      title: 'DataQuest',
      category: 'data',
      description: 'Solve complex data science problems and build predictive models.',
      prize: '₹35,000',
      gradient: 'from-blue-500 to-indigo-600',
    },
    {
      icon: Zap,
      title: 'AI Innovation',
      category: 'ai',
      description: 'Create AI-powered solutions that can transform industries.',
      prize: '₹45,000',
      gradient: 'from-yellow-500 to-orange-600',
    },
  ];

  const filters = [
    { id: 'all', label: 'All Events' },
    { id: 'coding', label: 'Coding' },
    { id: 'robotics', label: 'Robotics' },
    { id: 'gaming', label: 'Gaming' },
    { id: 'design', label: 'Design' },
    { id: 'data', label: 'Data Science' },
    { id: 'ai', label: 'AI/ML' },
  ];

  const filteredEvents =
    activeFilter === 'all' ? events : events.filter((event) => event.category === activeFilter);

  return (
    <section id="events" className="relative py-24 overflow-hidden" ref={ref}>
      {/* Background Elements */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-10" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-10" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 glass rounded-full text-sm text-cyan-400">Our Events</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-orbitron mb-6">
            <span className="gradient-text">Compete</span> in Cutting-Edge Events
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Choose from a diverse range of technical competitions designed to challenge your skills and creativity.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          {filters.map((filter, index) => (
            <motion.button
              key={filter.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white glow-blue'
                  : 'glass text-gray-400 hover:text-cyan-400 hover:border-cyan-400'
              }`}
            >
              {filter.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event, index) => (
            <HolographicEventCard
              key={event.title}
              icon={event.icon}
              title={event.title}
              category={event.category}
              description={event.description}
              prize={event.prize}
              gradient={event.gradient}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
