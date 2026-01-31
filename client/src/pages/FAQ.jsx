import React from 'react';
import Layout from '../components/Layout';

const FAQ = () => {
  const faqs = [
    {
      question: 'How do I register as a donor?',
      answer: 'Click on Register, select "Donor" as your role, fill in your details including blood group and location, and verify your email with the OTP sent to you.'
    },
    {
      question: 'How do hospitals create blood/organ requests?',
      answer: 'Hospitals need to register, get verified by admin, and then can create requests through their dashboard. Emergency requests are prioritized.'
    },
    {
      question: 'What is an emergency request?',
      answer: 'Emergency requests are urgent cases that need immediate attention. They are highlighted prominently and matched with donors faster.'
    },
    {
      question: 'How does the matching system work?',
      answer: 'The system automatically matches requests with donors based on blood group compatibility and location proximity.'
    },
    {
      question: 'Can I chat with hospitals/donors?',
      answer: 'Yes, donors and hospitals can communicate through the real-time chat feature available in their dashboards.'
    },
    {
      question: 'How do I get a donation certificate?',
      answer: 'After completing a donation appointment, hospitals can generate a certificate which will be available in your Certificates section.'
    },
    {
      question: 'What documents do I need to upload?',
      answer: 'Donors can upload ID proof, and hospitals need to upload verification documents for admin approval.'
    },
    {
      question: 'How do I update my location?',
      answer: 'You can update your location coordinates in your profile settings. This helps in finding nearby matches.'
    }
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Frequently Asked Questions</h1>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {faq.question}
              </h3>
              <p className="text-gray-600">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;

