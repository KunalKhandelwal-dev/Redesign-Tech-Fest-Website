import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Cpu, Lightbulb, Users, Trophy } from 'lucide-react';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const features = [
    {
      icon: Cpu,
      title: 'Innovation Hub',
      description: 'Explore cutting-edge technologies and groundbreaking ideas that shape the future of tech.',
    },
    {
      icon: Lightbulb,
      title: 'Creative Challenges',
      description: 'Participate in exciting hackathons, coding competitions, and problem-solving challenges.',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Connect with like-minded innovators, industry experts, and tech enthusiasts from across the nation.',
    },
    {
      icon: Trophy,
      title: 'Win Big',
      description: 'Compete for amazing prizes, internships, and recognition in various technical competitions.',
    },
  ];

  return (
    <section id="about" className="relative py-24 overflow-hidden" ref={ref}>
      {/* Background Elements */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-purple-600 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-600 rounded-full blur-3xl opacity-20" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 glass rounded-full text-sm text-cyan-400">About YUGANTRAN</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-orbitron mb-6">
            Where <span className="gradient-text">Innovation</span> Meets Excellence
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            YUGANTRAN 2025 is the premier annual tech fest organized by the School of Computer Science & Engineering
            at Geeta University. Join us for three days of innovation, competition, and collaboration that will push
            the boundaries of technology and creativity.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group glass p-6 rounded-xl hover:border-cyan-400 transition-all duration-300"
            >
              <div className="mb-4">
                <feature.icon className="w-12 h-12 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-orbitron mb-3 text-white">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass rounded-2xl p-8 md:p-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Participants', value: '1000+' },
              { label: 'Events', value: '25+' },
              { label: 'Prize Pool', value: '₹5L+' },
              { label: 'Sponsors', value: '15+' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="text-center"
              >
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
