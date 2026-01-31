import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { UserIcon, HospitalIcon, HeartIcon, StarIcon } from '../icons/Icons';

// Extended dummy testimonials data
const testimonials = [
  {
    id: 1,
    name: 'Karthik Kumar',
    role: 'Regular Donor, Chennai',
    rating: 5,
    text: "ALIVE made it so easy to find hospitals in need. I've donated 5 times this year and the process is seamless every time!",
    icon: UserIcon,
    iconColor: '#DC2626',
    bgColor: 'bg-primary-100',
  },
  {
    id: 2,
    name: 'Dr. Lakshmi Priya',
    role: 'Apollo Hospitals, Chennai',
    rating: 5,
    text: "As a hospital administrator, ALIVE has revolutionized how we source blood donations. Quick matches and reliable donors across Tamil Nadu!",
    icon: HospitalIcon,
    iconColor: '#10B981',
    bgColor: 'bg-green-100',
  },
  {
    id: 3,
    name: 'Divya S',
    role: 'Active Donor, Coimbatore',
    rating: 5,
    text: "Knowing that I'm helping save lives in my city motivates me to donate regularly. The platform is user-friendly and support is amazing!",
    icon: HeartIcon,
    iconColor: '#3B82F6',
    bgColor: 'bg-blue-100',
  },
  {
    id: 4,
    name: 'Rajesh K',
    role: 'Blood Donor, Madurai',
    rating: 5,
    text: "The notification system is fantastic! I get alerts for urgent requests near Meenakshi Amman Temple area and can respond immediately.",
    icon: UserIcon,
    iconColor: '#8B5CF6',
    bgColor: 'bg-purple-100',
  },
  {
    id: 5,
    name: 'Dr. Senthil Nathan',
    role: 'Ganga Hospital, Coimbatore',
    rating: 5,
    text: "We've seen a 40% improvement in finding donors since using ALIVE. The matching algorithm is incredibly accurate for our trauma center.",
    icon: HospitalIcon,
    iconColor: '#F59E0B',
    bgColor: 'bg-yellow-100',
  },
  {
    id: 6,
    name: 'Anand Babu',
    role: 'Regular Donor, Salem',
    rating: 5,
    text: "I love the certificate feature! It's great to have a record of all my donations. The app makes donating feel rewarding.",
    icon: UserIcon,
    iconColor: '#EF4444',
    bgColor: 'bg-red-100',
  },
  {
    id: 7,
    name: 'Dr. Meena Kumari',
    role: 'CMC Vellore',
    rating: 5,
    text: "ALIVE has transformed our emergency blood procurement process. We can now find donors within minutes instead of hours.",
    icon: HospitalIcon,
    iconColor: '#06B6D4',
    bgColor: 'bg-cyan-100',
  },
  {
    id: 8,
    name: 'Shobana R',
    role: 'Active Donor, Trichy',
    rating: 5,
    text: "The dashboard is so intuitive! I can track my donation history, see my impact, and manage appointments all in one place.",
    icon: HeartIcon,
    iconColor: '#EC4899',
    bgColor: 'bg-pink-100',
  },
  {
    id: 9,
    name: 'Vikram S',
    role: 'Blood Donor, Erode',
    rating: 5,
    text: "As someone who travels frequently between Erode and Chennai, I appreciate being able to donate wherever I am.",
    icon: UserIcon,
    iconColor: '#10B981',
    bgColor: 'bg-green-100',
  },
];

/**
 * Auto-scrolling testimonials component
 * Smooth infinite scroll animation
 */
const AutoScrollTestimonials = () => {
  const prefersReducedMotion = useReducedMotion();
  const scrollRef = useRef(null);
  const scrollPositionRef = useRef(0); // Persist scroll position across renders
  const animationFrameRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  useEffect(() => {
    if (prefersReducedMotion) return;

    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollSpeed = 0.6; // pixels per frame (2x speed for faster animation)

    const animate = () => {
      if (!scrollContainer) return;

      // When paused, read and store current position, but don't update
      if (isPaused) {
        scrollPositionRef.current = scrollContainer.scrollLeft;
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      // When resuming, use the stored position (from when it was paused)
      // Otherwise continue incrementing
      scrollPositionRef.current += scrollSpeed;
      const maxScroll = scrollContainer.scrollWidth / 2; // Half because we duplicated

      // Reset to beginning when reaching the end for seamless loop
      if (scrollPositionRef.current >= maxScroll) {
        scrollPositionRef.current = 0;
      }

      scrollContainer.scrollLeft = scrollPositionRef.current;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // On mount or when resuming from pause, sync with actual scroll position
    if (scrollPositionRef.current === 0) {
      scrollPositionRef.current = scrollContainer.scrollLeft || 0;
    } else if (isPaused === false && scrollContainer.scrollLeft !== scrollPositionRef.current) {
      // When resuming, use the stored position
      scrollContainer.scrollLeft = scrollPositionRef.current;
    }

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [prefersReducedMotion, isPaused]);

  if (prefersReducedMotion) {
    return (
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => {
          const IconComponent = testimonial.icon;
          return (
            <div
              key={testimonial.id}
              className="bg-white p-7 rounded-xl shadow-elegant hover:shadow-classic-lg transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 ${testimonial.bgColor} rounded-full flex items-center justify-center mr-4 shadow-elegant`}>
                  <IconComponent className="w-6 h-6" fill={testimonial.iconColor} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="w-4 h-4" fill="#FCD34D" />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">"{testimonial.text}"</p>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div
        ref={scrollRef}
        className="flex gap-6 md:gap-8 overflow-x-hidden scrollbar-hide"
        style={{
          scrollBehavior: 'auto',
        }}
      >
        {duplicatedTestimonials.map((testimonial, index) => {
          const IconComponent = testimonial.icon;
          return (
            <motion.div
              key={`${testimonial.id}-${index}`}
              className="flex-shrink-0 w-[320px] sm:w-[360px] md:w-[400px] bg-white p-6 md:p-7 rounded-xl shadow-elegant hover:shadow-classic-lg transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 ${testimonial.bgColor} rounded-full flex items-center justify-center mr-4 shadow-elegant flex-shrink-0`}>
                  <IconComponent className="w-6 h-6" fill={testimonial.iconColor} />
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-gray-900 truncate">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500 truncate">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="w-4 h-4" fill="#FCD34D" />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">"{testimonial.text}"</p>
            </motion.div>
          );
        })}
      </div>

      {/* Gradient fade on edges - only show on desktop */}
      <div className="hidden md:block absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 via-gray-50/80 to-transparent pointer-events-none z-10"></div>
      <div className="hidden md:block absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 via-gray-50/80 to-transparent pointer-events-none z-10"></div>
    </div>
  );
};

export default AutoScrollTestimonials;
