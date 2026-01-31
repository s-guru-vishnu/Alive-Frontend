import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

// Blood donation facts data
const facts = [
  {
    value: '1 Unit',
    description: 'Can save up to 3 lives',
  },
  {
    value: '56 Days',
    description: 'Minimum gap between donations',
  },
  {
    value: '15 Min',
    description: 'Average donation time',
  },
  {
    value: 'Every 2s',
    description: 'Someone needs blood',
  },
  {
    value: '38%',
    description: 'Of population can donate',
  },
  {
    value: '4.5M',
    description: 'Patients need blood annually',
  },
  {
    value: '48 Hours',
    description: 'Blood can be stored',
  },
  {
    value: '10 Pints',
    description: 'Average adult has in body',
  },
];

/**
 * Did You Know Section with Slide Up Animation
 * data comes from down to up then fade out
 */
const DidYouKnowSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const [displayedFacts, setDisplayedFacts] = useState(facts.slice(0, 4));
  // We use a simple counter to force re-render/animate even if facts loop back (though with random shuffle it's fine)
  const [keyIndex, setKeyIndex] = useState(0);

  // Single consistent variant for "down to up"
  const slideUpVariant = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  };

  // Change facts periodically
  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      // Shuffle facts array and pick 4
      const shuffled = [...facts].sort(() => Math.random() - 0.5);
      setDisplayedFacts(shuffled.slice(0, 4));
      setKeyIndex(prev => prev + 1);
    }, 4000); // Change every 4 seconds for better flow

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <div className="mb-20 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-10 border border-red-100">
        <h2 className="text-4xl font-display font-bold text-center mb-12 text-gray-900">Did You Know?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedFacts.map((fact) => (
            <div key={fact.value} className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">{fact.value}</div>
              <p className="text-gray-700">{fact.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-20 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-10 border border-red-100 overflow-hidden">
      <h2 className="text-4xl font-display font-bold text-center mb-12 text-gray-900">Did You Know?</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence mode="wait">
          {displayedFacts.map((fact, index) => (
            <motion.div
              key={`${fact.value}-${keyIndex}`} // Key change triggers the animation
              variants={slideUpVariant}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: index * 0.1, // Stagger effect
              }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-red-600 mb-2">
                {fact.value}
              </div>
              <p className="text-gray-700">
                {fact.description}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DidYouKnowSection;
