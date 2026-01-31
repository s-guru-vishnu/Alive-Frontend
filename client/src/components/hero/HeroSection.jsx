import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import heroImage from '../../assets/hero-image.png';
import { AnimatedButton } from '../../animations/microInteractions';
import { fadeIn } from '../../animations/variants';

/**
 * Hero Section Component
 * Full viewport hero with real image
 */
const HeroSection = () => {
  const prefersReducedMotion = useReducedMotion();

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        ease: [0, 0, 0.2, 1],
        staggerChildren: prefersReducedMotion ? 0 : 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.5,
        ease: [0, 0, 0.2, 1],
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-gray-900 mb-6 tracking-tight leading-tight"
            >
              Saving Lives Starts With You
            </motion.h1>
            
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed"
            >
              Connecting donors and hospitals in real time
            </motion.p>
            
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <AnimatedButton
                as={Link}
                to="/register?role=donor"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-semibold rounded-lg text-white bg-primary-600 hover:bg-primary-700 shadow-elegant hover:shadow-classic-lg transition-all duration-200"
              >
                Become a Donor
              </AnimatedButton>
              
              <AnimatedButton
                as={Link}
                to="/register?role=hospital"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border-2 border-primary-600 text-base font-semibold rounded-lg text-primary-600 bg-white hover:bg-primary-50 transition-all duration-200"
              >
                Request Blood
              </AnimatedButton>
            </motion.div>
          </motion.div>

          {/* Right Side - Real Image */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative w-full flex justify-center lg:justify-end"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
               <img 
                 src={heroImage} 
                 alt="Community of happy blood donors" 
                 className="w-full h-auto object-cover max-h-[600px] rounded-2xl"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none rounded-2xl"></div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default HeroSection;
