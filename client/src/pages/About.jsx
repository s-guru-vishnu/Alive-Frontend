import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { BloodDropIcon, HandshakeIcon, HeartIcon, AlertIcon, LockIcon, MobileIcon, LocationIcon, DashboardIcon, TrophyIcon, HospitalIcon, GlobeIcon } from '../components/icons/Icons';
import { motion } from 'framer-motion';
import SolutionCard from '../components/About/SolutionCard';

const About = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const cardHover = {
    whileHover: {
      scale: 1.03,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.2 }
    }
  };

  const featureHover = {
    whileHover: { y: -5, transition: { duration: 0.2 } }
  };

  const buttonHover = {
    whileHover: { scale: 1.05, transition: { duration: 0.2 } },
    whileTap: { scale: 0.95 }
  };

  const MotionLink = motion(Link);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="text-center mb-16 pt-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold text-gray-900 mb-6 tracking-tight">About Us</h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Connecting donors with hospitals to save lives efficiently and effectively
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <SolutionCard title="Our Mission">
            <p className="text-gray-600 mb-4 leading-relaxed text-lg">
              To create a seamless platform that connects blood and organ donors with hospitals in need,
              ensuring timely access to life-saving resources when every second counts.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              We believe that technology can bridge the gap between willing donors and hospitals, making
              the donation process more efficient and accessible.
            </p>
          </SolutionCard>
          <SolutionCard title="Our Vision">
            <p className="text-gray-600 mb-4 leading-relaxed text-lg">
              To become the leading platform for donor-hospital coordination, revolutionizing how blood
              and organ donations are managed and matched.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              We envision a future where no hospital struggles to find donors, and no donor's willingness
              to help goes unmatched.
            </p>
          </SolutionCard>
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <motion.h2
            className="text-4xl font-display font-bold text-center mb-12 text-gray-900"
            {...fadeInUp}
          >
            Our Core Values
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="text-center bg-white p-8 rounded-xl shadow-elegant hover:shadow-classic-lg transition-all duration-300 border border-gray-100"
              {...fadeInUp}
              {...cardHover}
            >
              <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-5 shadow-elegant">
                <HandshakeIcon className="w-12 h-12" fill="#DC2626" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3 text-gray-900">Transparency</h3>
              <p className="text-gray-600 leading-relaxed">
                We believe in open communication and transparent processes between all stakeholders
              </p>
            </motion.div>
            <motion.div
              className="text-center bg-white p-8 rounded-xl shadow-elegant hover:shadow-classic-lg transition-all duration-300 border border-gray-100"
              {...fadeInUp}
              {...cardHover}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-5 shadow-elegant">
                <HeartIcon className="w-12 h-12" fill="#10B981" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3 text-gray-900">Compassion</h3>
              <p className="text-gray-600 leading-relaxed">
                Every life matters. We approach our work with empathy and care for those in need
              </p>
            </motion.div>
            <motion.div
              className="text-center bg-white p-8 rounded-xl shadow-elegant hover:shadow-classic-lg transition-all duration-300 border border-gray-100"
              {...fadeInUp}
              {...cardHover}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-5 shadow-elegant">
                <AlertIcon className="w-12 h-12 rotate-90" fill="#3B82F6" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3 text-gray-900">Efficiency</h3>
              <p className="text-gray-600 leading-relaxed">
                Speed saves lives. We optimize every process to ensure rapid response times
              </p>
            </motion.div>
          </div>
        </div>

        {/* Features */}
        <motion.div
          className="bg-gradient-to-br from-primary-50 to-white rounded-xl p-10 mb-16 border border-primary-100 shadow-elegant"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-8 text-center">Platform Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: BloodDropIcon, color: "#DC2626", title: "Blood Donation", text: "Find urgent blood requirements and connect with hospitals in need" },
              { icon: HospitalIcon, color: "#2563EB", title: "Hospital Network", text: "Verified hospitals can request and manage donation requirements" },
              { icon: AlertIcon, color: "#F59E0B", title: "Quick Matching", text: "Smart algorithm matches donors with hospitals instantly", rotate: false },
              { icon: HeartIcon, color: "#10B981", title: "Safe & Comfortable", text: "Experience a stress-free donation process in verified facilities" },
              { icon: GlobeIcon, color: "#3B82F6", title: "Advanced Network", text: "Smart technology connects hospitals with donors instantly" },
              { icon: HandshakeIcon, color: "#8B5CF6", title: "Community First", text: "Join a growing movement making a difference in the community" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                {...featureHover}
              >
                <div className="mb-4 flex items-center justify-center">
                  <feature.icon className={`w-12 h-12 ${feature.rotate ? 'rotate-90' : ''}`} fill={feature.color} />
                </div>
                <h3 className="font-display font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>



        {/* Achievements */}
        <motion.div
          className="mb-16 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg p-8 shadow-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.01 }}
        >
          <h2 className="text-3xl font-bold text-center mb-8">Our Achievements</h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            {[
              { val: "1000+", label: "Active Donors" },
              { val: "50+", label: "Verified Hospitals" },
              { val: "500+", label: "Lives Saved" },
              { val: "15+", label: "Cities Covered" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.1 }}
              >
                <div className="text-4xl font-bold mb-2">{stat.val}</div>
                <div className="text-primary-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Partnerships */}
        <div className="mb-16">
          <motion.h2
            className="text-3xl font-bold text-center mb-8"
            {...fadeInUp}
          >
            Our Partners
          </motion.h2>
          <div className="grid md:grid-cols-4 gap-6">
            <motion.div
              className="bg-white p-6 rounded-xl shadow-elegant hover:shadow-classic-lg transition-all duration-300 text-center border border-gray-100"
              {...fadeInUp}
              {...cardHover}
            >
              <div className="mb-3 flex items-center justify-center">
                <HospitalIcon className="w-12 h-12" fill="#2563EB" />
              </div>
              <h3 className="font-display font-semibold text-gray-900">Healthcare Networks</h3>
              <p className="text-sm text-gray-600 mt-2">Partnered with major hospital chains</p>
            </motion.div>
            <motion.div
              className="bg-white p-6 rounded-xl shadow-elegant hover:shadow-classic-lg transition-all duration-300 text-center border border-gray-100"
              {...fadeInUp}
              {...cardHover}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="mb-3 flex items-center justify-center">
                <GlobeIcon className="w-12 h-12" fill="#10B981" />
              </div>
              <h3 className="font-display font-semibold text-gray-900">Government Bodies</h3>
              <p className="text-sm text-gray-600 mt-2">Working with health departments</p>
            </motion.div>
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md text-center"
              {...fadeInUp}
              {...cardHover}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-3xl mb-3">💼</div>
              <h3 className="font-semibold">NGOs</h3>
              <p className="text-sm text-gray-600 mt-2">Collaborating with non-profits</p>
            </motion.div>
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md text-center"
              {...fadeInUp}
              {...cardHover}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="text-3xl mb-3">🎓</div>
              <h3 className="font-semibold">Medical Institutions</h3>
              <p className="text-sm text-gray-600 mt-2">Partnerships with medical colleges</p>
            </motion.div>
          </div>
        </div>



        {/* Call to Action */}
        <motion.div
          className="bg-gray-50 rounded-lg p-8 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4">Join Us in Saving Lives</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Whether you're a donor, hospital, or volunteer, there's a place for you in our mission.
            Together, we can make healthcare more accessible and save more lives.
          </p>
          <div className="flex justify-center space-x-4">
            <MotionLink
              to="/register"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-200"
              {...buttonHover}
            >
              Get Started
            </MotionLink>
            <MotionLink
              to="/contact"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
              {...buttonHover}
            >
              Contact Us
            </MotionLink>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default About;


