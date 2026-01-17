import React from 'react';
import { motion } from 'framer-motion';
import ResourceItem from '../components/ResourceItem';
import "../styles/Resources.css";

const resourceData = [
  { id: 1, title: 'React Official Docs', url: 'https://react.dev/', description: 'The official documentation for React. The best place to start.' },
  { id: 2, title: 'Arduino Official Website', url: 'https://www.arduino.cc/', description: 'Find tutorials, documentation, and the software for Arduino microcontrollers.' },
  { id: 3, title: 'ROS (Robot Operating System) Wiki', url: 'http://wiki.ros.org/', description: 'The main hub for ROS, a flexible framework for writing robot software.' },
  { id: 4, title: 'Thingiverse', url: 'https://www.thingiverse.com/', description: 'A huge community for discovering and sharing 3D printable models.' }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export default function Resources() {
  return (
    <div className="resources-page">
      <motion.h1
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Resources
      </motion.h1>
      <motion.p
        className="page-subtext"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        A curated list of tutorials, articles, and tools to help you with your robotics projects.
      </motion.p>

      <motion.div
        className="resource-list"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {resourceData.map(item => (
          <motion.div key={item.id} variants={itemVariants}>
            <ResourceItem {...item} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}