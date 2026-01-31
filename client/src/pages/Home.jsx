import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { HeroSection } from '../components/hero';
import {
  BloodDropIcon,
  HospitalIcon,
  TargetIcon,
  CheckIcon,
  DashboardIcon,
  BellIcon,
  TrophyIcon,
  AlertIcon,
  HeartIcon,
  StarIcon,
  UserIcon
} from '../components/icons/Icons';
import { AnimatedCard } from '../animations/microInteractions';
import { StaggerContainer } from '../animations/pageTransitions';
import AutoScrollTestimonials from '../components/testimonials/AutoScrollTestimonials';
import DidYouKnowSection from '../components/didYouKnow/DidYouKnowSection';
import benefitDonor from '../assets/benefit-donor.png';
import benefitNetwork from '../assets/benefit-network.png';
import benefitCommunity from '../assets/benefit-community.png';
import SuccessStoryCard from '../components/SuccessStoryCard';

const Home = () => {
  return (
    <Layout>
      {/* Hero Section with 3D Animation */}
      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Features */}
        <StaggerContainer className="grid md:grid-cols-3 gap-8 mb-16">
          <AnimatedCard index={0} className="bg-white p-8 rounded-xl shadow-elegant hover:shadow-classic-lg transition-all duration-300 border border-gray-100">
            <div className="mb-4 flex items-center justify-center">
              <BloodDropIcon className="w-16 h-16" fill="#DC2626" />
            </div>
            <h3 className="text-xl font-display font-semibold mb-3 text-gray-900">Blood Donation</h3>
            <p className="text-gray-600 leading-relaxed">
              Find urgent blood requirements and connect with hospitals in need
            </p>
          </AnimatedCard>
          <AnimatedCard index={1} className="bg-white p-8 rounded-xl shadow-elegant hover:shadow-classic-lg transition-all duration-300 border border-gray-100">
            <div className="mb-4 flex items-center justify-center">
              <HospitalIcon className="w-16 h-16" fill="#2563EB" />
            </div>
            <h3 className="text-xl font-display font-semibold mb-3 text-gray-900">Hospital Network</h3>
            <p className="text-gray-600 leading-relaxed">
              Verified hospitals can request and manage donation requirements
            </p>
          </AnimatedCard>
          <AnimatedCard index={2} className="bg-white p-8 rounded-xl shadow-elegant hover:shadow-classic-lg transition-all duration-300 border border-gray-100">
            <div className="mb-4 flex items-center justify-center">
              <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 3L4 14H11V21L20 10H13V3Z" fill="#F59E0B" />
              </svg>
            </div>
            <h3 className="text-xl font-display font-semibold mb-3 text-gray-900">Quick Matching</h3>
            <p className="text-gray-600 leading-relaxed">
              Smart algorithm matches donors with hospitals instantly
            </p>
          </AnimatedCard>
        </StaggerContainer>

        {/* Stats */}
        <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-600 text-white rounded-xl p-8 sm:p-12 mb-16 shadow-classic-lg">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-center mb-8 sm:mb-10">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            <div>
              <div className="text-3xl font-bold">1000+</div>
              <div className="text-primary-100">Active Donors</div>
            </div>
            <div>
              <div className="text-3xl font-bold">50+</div>
              <div className="text-primary-100">Hospitals</div>
            </div>
            <div>
              <div className="text-3xl font-bold">500+</div>
              <div className="text-primary-100">Requests Fulfilled</div>
            </div>
            <div>
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-primary-100">Support</div>
            </div>
          </div>
        </div>

        {/* How it Works */}
        <div className="mb-20">
          <h2 className="text-4xl font-display font-bold text-center mb-12 text-gray-900">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-5 shadow-elegant">
                <span className="text-3xl font-display font-bold text-primary-700">1</span>
              </div>
              <h4 className="font-display font-semibold mb-2 text-lg text-gray-900">Register</h4>
              <p className="text-sm text-gray-600 leading-relaxed">Sign up as a donor or hospital</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-5 shadow-elegant">
                <span className="text-3xl font-display font-bold text-primary-700">2</span>
              </div>
              <h4 className="font-display font-semibold mb-2 text-lg text-gray-900">Create Request</h4>
              <p className="text-sm text-gray-600 leading-relaxed">Hospitals create urgent requests</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-5 shadow-elegant">
                <span className="text-3xl font-display font-bold text-primary-700">3</span>
              </div>
              <h4 className="font-display font-semibold mb-2 text-lg text-gray-900">Match</h4>
              <p className="text-sm text-gray-600 leading-relaxed">System automatically matches donors</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-5 shadow-elegant">
                <span className="text-3xl font-display font-bold text-primary-700">4</span>
              </div>
              <h4 className="font-display font-semibold mb-2 text-lg text-gray-900">Donate</h4>
              <p className="text-sm text-gray-600 leading-relaxed">Schedule and complete donation</p>
            </div>
          </div>
        </div>

        {/* Our Commitment - Visual Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-display font-bold text-center mb-12 text-gray-900">Our Commitment</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1: Safe Donation */}
            <div className="group rounded-2xl overflow-hidden shadow-elegant hover:shadow-2xl transition-all duration-300 bg-white border border-gray-100">
              <div className="h-64 overflow-hidden relative">
                <img
                  src={benefitDonor}
                  alt="Safe and Comfortable Donation"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-60"></div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-display font-bold mb-3 text-gray-900">Safe & Comfortable</h3>
                <p className="text-gray-600 leading-relaxed">
                  Experience a stress-free donation process in our verified, state-of-the-art medical facilities.
                </p>
              </div>
            </div>

            {/* Card 2: Advanced Technology */}
            <div className="group rounded-2xl overflow-hidden shadow-elegant hover:shadow-2xl transition-all duration-300 bg-white border border-gray-100">
              <div className="h-64 overflow-hidden relative">
                <img
                  src={benefitNetwork}
                  alt="Advanced Network Technology"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-60"></div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-display font-bold mb-3 text-gray-900">Advanced Network</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our smart technology instantly connects hospitals with donors ensuring rapid response times.
                </p>
              </div>
            </div>

            {/* Card 3: Community Impact */}
            <div className="group rounded-2xl overflow-hidden shadow-elegant hover:shadow-2xl transition-all duration-300 bg-white border border-gray-100">
              <div className="h-64 overflow-hidden relative">
                <img
                  src={benefitCommunity}
                  alt="Community Impact"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-60"></div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-display font-bold mb-3 text-gray-900">Community First</h3>
                <p className="text-gray-600 leading-relaxed">
                  Join a growing movement of everyday heroes making a tangible difference in their local community.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials with Auto-Scroll */}
        <div className="mb-20 bg-gradient-to-br from-gray-50 to-white rounded-xl p-10 border border-gray-100">
          <h2 className="text-4xl font-display font-bold text-center mb-12 text-gray-900">What People Say</h2>
          <AutoScrollTestimonials />
        </div>

        {/* Success Stories */}
        <div className="mb-20">
          <h2 className="text-4xl font-display font-bold text-center mb-12 text-gray-900">Success Stories</h2>
          <div className="grid md:grid-cols-2 gap-8 h-full">
            <SuccessStoryCard
              title="500+ Lives Saved"
              description="Through our platform, we've successfully matched over 500 urgent blood donation requests, helping save countless lives across Tamil Nadu."
              stat="500+"
              statLabel="Successful Matches"
              icon={<BloodDropIcon className="w-full h-full p-2" fill="#DC2626" />}
              theme={{
                bgColor: '#FEE2E2', // Red-100
                bgColorLight: '#FEF2F2', // Red-50
                accentColor: '#DC2626', // Red-600
                textColor: '#4C5656',
                textColorHover: '#1F2937'
              }}
            />
            <SuccessStoryCard
              title="Organ Transplant Success"
              description="Our platform has facilitated critical organ transplant matches, connecting donors with hospitals in time-sensitive situations."
              stat="50+"
              statLabel="Organ Matches"
              icon={<HeartIcon className="w-full h-full p-2" fill="#16A34A" />}
              theme={{
                bgColor: '#DCFCE7', // Green-100
                bgColorLight: '#F0FDF4', // Green-50
                accentColor: '#16A34A', // Green-600
                textColor: '#4C5656',
                textColorHover: '#1F2937'
              }}
            />
          </div>
        </div>

        {/* Blood Donation Facts */}
        <DidYouKnowSection />

        {/* FAQ Preview */}
        <div className="mb-20">
          <h2 className="text-4xl font-display font-bold text-center mb-12 text-gray-900">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-7 rounded-xl shadow-elegant hover:shadow-classic-lg transition-all duration-300 border border-gray-100">
              <h3 className="font-display font-semibold mb-3 text-lg text-gray-900">Who can donate blood?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Generally, healthy adults aged 18-65, weighing at least 50kg, and meeting health criteria can donate blood.
              </p>
            </div>
            <div className="bg-white p-7 rounded-xl shadow-elegant hover:shadow-classic-lg transition-all duration-300 border border-gray-100">
              <h3 className="font-display font-semibold mb-3 text-lg text-gray-900">How often can I donate?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Men can donate every 3 months, while women can donate every 4 months (56 days minimum gap).
              </p>
            </div>
            <div className="bg-white p-7 rounded-xl shadow-elegant hover:shadow-classic-lg transition-all duration-300 border border-gray-100">
              <h3 className="font-display font-semibold mb-3 text-lg text-gray-900">Is the donation process safe?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Yes, all hospitals are verified and licensed. The process follows strict medical safety protocols.
              </p>
            </div>
            <div className="bg-white p-7 rounded-xl shadow-elegant hover:shadow-classic-lg transition-all duration-300 border border-gray-100">
              <h3 className="font-display font-semibold mb-3 text-lg text-gray-900">Will I receive a certificate?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Yes! You'll receive a digital donation certificate after each successful donation through our platform.
              </p>
            </div>
          </div>
          <div className="text-center mt-10">
            <Link
              to="/faq"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold text-base transition-colors"
            >
              View All FAQs →
            </Link>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-600 text-white rounded-xl p-14 text-center shadow-classic-lg">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl md:text-2xl mb-10 text-primary-100 font-light">
            Join thousands of donors and hospitals in Tamil Nadu working together to save lives
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-5">
            <Link
              to="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border-2 border-white text-base font-semibold rounded-lg text-white hover:bg-white hover:text-primary-600 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-elegant hover:shadow-xl"
            >
              Become a Donor
            </Link>
            <Link
              to="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border-2 border-transparent text-base font-semibold rounded-lg bg-white text-primary-600 hover:bg-transparent hover:text-white hover:border-white transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-elegant hover:shadow-xl"
            >
              Register Hospital
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;

