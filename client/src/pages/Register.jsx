import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import AlertCard from '../components/ui/AlertCard';

const Register = () => {
  const [role, setRole] = useState('donor');
  const [currentStep, setCurrentStep] = useState(1);
  const [eligibilityStatus, setEligibilityStatus] = useState({ isEligible: null, errors: [] });
  const [formData, setFormData] = useState({
    // Personal Information
    name: '',
    email: '',
    password: '',
    phone: '',
    dob: '',
    gender: '',
    // Physical Eligibility
    age: '',
    weight: '',
    bloodGroup: '',
    hemoglobin: '',
    // Location
    city: '',
    state: '',
    address: '',
    availability: 'Available',
    // Health Conditions
    feverInLast7Days: false,
    majorSurgeryInLast6Months: false,
    tattooOrPiercingInLast6Months: false,
    currentlyOnAntibiotics: false,
    pregnantOrBreastfeeding: false,
    // Medical History
    hiv: false,
    hepatitisBOrC: false,
    heartDisease: false,
    diabetes: false,
    highBloodPressure: false,
    // Donation History
    everDonated: false,
    lastDonationDate: '',
    // Consent
    consentGiven: false,
    // ID Proof
    idProof: null,
    // Hospital/Blood Bank fields
    hospitalName: '',
    licenseNumber: '',
    hospitalPhone: '',
    hospitalCity: '',
    hospitalState: '',
    hospitalAddress: '',
    // Document Uploads
    licenseFile: null,
    idProofFile: null
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  // Calculate age from DOB
  useEffect(() => {
    if (formData.dob) {
      const today = new Date();
      const birthDate = new Date(formData.dob);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      setFormData(prev => ({ ...prev, age: age.toString() }));
    }
  }, [formData.dob]);

  // Real-time eligibility validation
  useEffect(() => {
    if (role === 'donor') {
      validateEligibility();
    }
  }, [formData, role]);

  const validateEligibility = () => {
    const errors = [];
    let isEligible = true;

    // Age validation
    const age = parseInt(formData.age);
    if (!age || age < 18 || age > 65) {
      errors.push('Age must be between 18 and 65 years');
      isEligible = false;
    }

    // Weight validation
    const weight = parseFloat(formData.weight);
    if (!weight || weight < 50) {
      errors.push('Weight must be at least 50kg');
      isEligible = false;
    }

    // Hemoglobin validation (Optional)
    const hemoglobin = formData.hemoglobin ? parseFloat(formData.hemoglobin) : null;
    if (formData.hemoglobin && (!hemoglobin || hemoglobin < 12.5)) {
      errors.push('Hemoglobin level must be at least 12.5 g/dL');
      isEligible = false;
    }

    // Health conditions
    if (formData.feverInLast7Days) {
      errors.push('Cannot donate if you had fever, cold, or infection in the last 7 days');
      isEligible = false;
    }
    if (formData.majorSurgeryInLast6Months) {
      errors.push('Cannot donate if you had major surgery in the last 6 months');
      isEligible = false;
    }
    if (formData.tattooOrPiercingInLast6Months) {
      errors.push('Cannot donate if you got a tattoo or piercing in the last 6 months');
      isEligible = false;
    }
    if (formData.currentlyOnAntibiotics) {
      errors.push('Cannot donate if you are currently on antibiotics');
      isEligible = false;
    }
    if (formData.pregnantOrBreastfeeding) {
      errors.push('Cannot donate if you are pregnant or breastfeeding');
      isEligible = false;
    }

    // Medical history
    if (formData.hiv) {
      errors.push('Cannot donate if you have HIV');
      isEligible = false;
    }
    if (formData.hepatitisBOrC) {
      errors.push('Cannot donate if you have Hepatitis B or C');
      isEligible = false;
    }
    if (formData.heartDisease) {
      errors.push('Cannot donate if you have heart disease');
      isEligible = false;
    }
    if (formData.diabetes) {
      errors.push('Cannot donate if you have diabetes');
      isEligible = false;
    }
    if (formData.highBloodPressure) {
      errors.push('Cannot donate if you have high blood pressure');
      isEligible = false;
    }

    // Donation gap validation
    if (formData.everDonated && formData.lastDonationDate) {
      const lastDonation = new Date(formData.lastDonationDate);
      const today = new Date();
      const monthsDiff = (today.getFullYear() - lastDonation.getFullYear()) * 12 +
        (today.getMonth() - lastDonation.getMonth());
      if (monthsDiff < 3) {
        errors.push('Minimum 3 months gap required since last donation');
        isEligible = false;
      }
    }

    setEligibilityStatus({ isEligible, errors });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('File size must be less than 5MB');
        return;
      }
      setFormData(prev => ({
        ...prev,
        [fieldName]: file
      }));
    }
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setCurrentStep(1);
    setEligibilityStatus({ isEligible: null, errors: [] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        role
      };

      if (role === 'donor') {
        // Validate eligibility before submitting
        if (!eligibilityStatus.isEligible) {
          setError('Please fix all eligibility issues before submitting');
          return;
        }

        if (!formData.consentGiven) {
          setError('You must confirm that the information provided is true and correct');
          return;
        }

        payload.donorData = {
          dob: formData.dob,
          age: parseInt(formData.age),
          gender: formData.gender,
          weight: parseFloat(formData.weight),
          bloodGroup: formData.bloodGroup,
          hemoglobin: formData.hemoglobin ? parseFloat(formData.hemoglobin) : undefined,
          location: {
            city: formData.city,
            state: formData.state,
            address: formData.address
          },
          availability: formData.availability,
          healthConditions: {
            feverInLast7Days: formData.feverInLast7Days,
            majorSurgeryInLast6Months: formData.majorSurgeryInLast6Months,
            tattooOrPiercingInLast6Months: formData.tattooOrPiercingInLast6Months,
            currentlyOnAntibiotics: formData.currentlyOnAntibiotics,
            pregnantOrBreastfeeding: formData.pregnantOrBreastfeeding
          },
          medicalHistory: {
            hiv: formData.hiv,
            hepatitisBOrC: formData.hepatitisBOrC,
            heartDisease: formData.heartDisease,
            diabetes: formData.diabetes,
            highBloodPressure: formData.highBloodPressure
          },
          previousDonationInfo: {
            everDonated: formData.everDonated,
            lastDonationDate: formData.everDonated && formData.lastDonationDate ? formData.lastDonationDate : null
          },
          consentGiven: formData.consentGiven
        };
      } else if (role === 'hospital') {
        payload.hospitalData = {
          hospitalName: formData.hospitalName,
          licenseNumber: formData.licenseNumber,
          location: {
            city: formData.hospitalCity,
            state: formData.hospitalState,
            address: formData.hospitalAddress
          },
          contact: {
            phone: formData.hospitalPhone
          }
        };
      } else if (role === 'blood-bank') {
        payload.bloodBankData = {
          bloodBankName: formData.hospitalName,
          licenseNumber: formData.licenseNumber,
          location: {
            city: formData.hospitalCity,
            state: formData.hospitalState,
            address: formData.hospitalAddress
          },
          contact: {
            phone: formData.hospitalPhone
          }
        };
      }

      // Handle file upload for ID proof (donor only)
      let response;
      if (role === 'donor' && formData.idProof) {
        // Use FormData for file upload
        const formDataToSend = new FormData();
        formDataToSend.append('name', payload.name);
        formDataToSend.append('email', payload.email);
        formDataToSend.append('password', payload.password);
        formDataToSend.append('phone', payload.phone);
        formDataToSend.append('role', role);
        formDataToSend.append('donorData', JSON.stringify(payload.donorData));
        formDataToSend.append('idProof', formData.idProof);

        // Use axios directly for multipart/form-data
        const api = (await import('../services/api')).default;
        try {
          const axiosResponse = await api.post('/auth/register', formDataToSend, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          response = axiosResponse.data;
        } catch (apiError) {
          throw apiError;
        }
      } else {
        // Prepare FormData for Hospital/Blood Bank/Generic
        const formDataToSend = new FormData();
        const api = (await import('../services/api')).default;

        formDataToSend.append('name', payload.name);
        formDataToSend.append('email', payload.email);
        formDataToSend.append('password', payload.password);
        formDataToSend.append('phone', payload.phone);
        formDataToSend.append('role', role);

        if (role === 'hospital' && payload.hospitalData) {
          formDataToSend.append('hospitalData', JSON.stringify(payload.hospitalData));
          if (formData.licenseFile) formDataToSend.append('license', formData.licenseFile);
          if (formData.idProofFile) formDataToSend.append('idProof', formData.idProofFile);
        } else if (role === 'blood-bank' && payload.bloodBankData) {
          formDataToSend.append('bloodBankData', JSON.stringify(payload.bloodBankData));
          if (formData.licenseFile) formDataToSend.append('license', formData.licenseFile);
          if (formData.idProofFile) formDataToSend.append('idProof', formData.idProofFile);
        }

        try {
          const axiosResponse = await api.post('/auth/register', formDataToSend, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          response = axiosResponse.data;
        } catch (apiError) {
          throw apiError;
        }
      }

      // Login user and redirect to dashboard
      if (response.token && response.user) {
        authLogin(response.user);

        let path = '/';
        const { role, profile } = response.user;
        const verificationStatus = profile?.verificationStatus || 'pending';

        if (role === 'hospital' || role === 'blood-bank') {
          if (verificationStatus === 'approved') {
            path = role === 'hospital' ? '/hospital/dashboard' : '/blood-bank/dashboard';
          } else {
            path = '/verification-pending';
          }
        } else if (role === 'donor') {
          path = '/donor/dashboard';
        } else if (role === 'admin') {
          path = '/admin/dashboard';
        }

        navigate(path);
      }
    } catch (err) {
      console.error('Registration error:', err);
      console.error('Error response:', err.response);

      let errorMessage = 'Registration failed. Please try again.';

      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }

      // If it's a validation error, show more details
      if (err.response?.data?.errors) {
        const validationErrors = Array.isArray(err.response.data.errors)
          ? err.response.data.errors.join(', ')
          : Object.values(err.response.data.errors).flat().join(', ');
        errorMessage = `${errorMessage}: ${validationErrors}`;
      }

      // If eligibility check failed
      if (err.response?.data?.isEligible === false) {
        setEligibilityStatus({
          isEligible: false,
          errors: err.response.data.errors || []
        });
      }

      // Network error
      if (err.code === 'ERR_NETWORK' || err.message === 'Network Error') {
        errorMessage = 'Cannot connect to server. Please make sure the server is running.';
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-red-50 to-gray-50">
        <div className="w-full space-y-8 max-w-4xl transition-all duration-300">
          <div className="text-center">
            <h2 className="text-4xl font-display font-bold text-gray-900 tracking-tight">
              Join Heart2Heal
            </h2>
            <p className="mt-2 text-lg text-gray-600">
              Create your account to start saving lives
            </p>
          </div>

          <div className="bg-white py-10 px-6 shadow-elegant rounded-2xl sm:px-12 border border-gray-100/50">
            <form className="space-y-8" onSubmit={handleSubmit}>
              {error && (
                <AlertCard message={error} onClose={() => setError('')} />
              )}

              <div className="bg-gray-50/50 p-6 rounded-xl border border-gray-200/60">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Register As
                </label>
                <select
                  name="role"
                  value={role}
                  onChange={handleRoleChange}
                  className="block w-full pl-4 pr-10 py-3 text-lg border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 rounded-lg shadow-sm transition-all hover:border-gray-400"
                >
                  <option value="donor">Donor</option>
                  <option value="hospital">Hospital</option>
                  <option value="blood-bank">Blood Bank</option>
                </select>
              </div>

              {/* Common Account Details (Visible for all roles) */}
              {/* Common Account Details (Visible for all roles) */}
              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-xl font-display font-semibold text-gray-900 mb-6">
                  Account Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="block w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 placeholder-black"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="block w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 placeholder-black"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password *
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      minLength={8}
                      pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                      title="Minimum 8 characters, at least one letter, one number and one special character"
                      className="block w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 placeholder-black"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <p className="text-xs text-black mt-2 font-medium">Min 8 chars, 1 special character</p>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      pattern="[0-9]{10,13}"
                      title="Phone number must be between 10 to 13 digits"
                      className="block w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 placeholder-black"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Organization Details (Hospital or Blood Bank) */}
              {(role === 'hospital' || role === 'blood-bank') && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="pt-4 border-t border-gray-100">
                    <h3 className="text-xl font-display font-semibold text-gray-900 mb-6">
                      {role === 'hospital' ? 'Hospital Details' : 'Blood Bank Details'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label htmlFor="hospitalName" className="block text-sm font-medium text-gray-700 mb-1">
                          {role === 'hospital' ? 'Hospital Name' : 'Blood Bank Name'} *
                        </label>
                        <input
                          id="hospitalName"
                          name="hospitalName"
                          type="text"
                          required
                          className="block w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 placeholder-black"
                          value={formData.hospitalName}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700 mb-1">
                          License Number *
                        </label>
                        <input
                          id="licenseNumber"
                          name="licenseNumber"
                          type="text"
                          required
                          className="block w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 placeholder-black"
                          value={formData.licenseNumber}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="hospitalPhone" className="block text-sm font-medium text-gray-700 mb-1">
                          Official Phone *
                        </label>
                        <input
                          id="hospitalPhone"
                          name="hospitalPhone"
                          type="tel"
                          required
                          pattern="[0-9]{10,13}"
                          title="Phone number must be between 10 to 13 digits"
                          className="block w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 placeholder-black"
                          value={formData.hospitalPhone}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="hospitalCity" className="block text-sm font-medium text-gray-700 mb-1">
                          City *
                        </label>
                        <input
                          id="hospitalCity"
                          name="hospitalCity"
                          type="text"
                          required
                          className="block w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 placeholder-black"
                          value={formData.hospitalCity}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="hospitalState" className="block text-sm font-medium text-gray-700 mb-1">
                          State *
                        </label>
                        <input
                          id="hospitalState"
                          name="hospitalState"
                          type="text"
                          required
                          className="block w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 placeholder-black"
                          value={formData.hospitalState}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label htmlFor="hospitalAddress" className="block text-sm font-medium text-gray-700 mb-1">
                          Address *
                        </label>
                        <input
                          id="hospitalAddress"
                          name="hospitalAddress"
                          type="text"
                          required
                          className="block w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 placeholder-black"
                          value={formData.hospitalAddress}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Verification Documents */}
                  <div className="pt-4 border-t border-gray-100">
                    <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
                      Verification Documents
                    </h3>
                    <p className="text-sm text-gray-500 mb-6 ml-11">
                      Please upload clear copies of the following documents. These are required for verifying your organization status.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-1">
                      <div className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-200 text-center group cursor-pointer ${formData.licenseFile ? 'border-green-500 bg-green-50/20' : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'}`}>
                        <input
                          type="file"
                          accept=".pdf, .jpg, .jpeg, .png"
                          onChange={(e) => handleFileChange(e, 'licenseFile')}
                          required
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className="flex flex-col items-center justify-center pointer-events-none">
                          {formData.licenseFile ? (
                            <>
                              <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-3">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                              </div>
                              <p className="text-sm font-bold text-green-800 truncate w-full px-2">{formData.licenseFile.name}</p>
                              <p className="text-xs text-green-600 mt-1">Ready for upload</p>
                            </>
                          ) : (
                            <>
                              <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 group-hover:bg-primary-50 group-hover:text-primary-500 transition-colors flex items-center justify-center mb-3">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                              </div>
                              <p className="text-sm font-bold text-gray-700 group-hover:text-primary-600 transition-colors">Organization License</p>
                              <p className="text-xs text-gray-500 mt-1">PDF, JPG or PNG (Max 5MB)</p>
                            </>
                          )}
                        </div>
                      </div>

                      <div className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-200 text-center group cursor-pointer ${formData.idProofFile ? 'border-green-500 bg-green-50/20' : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'}`}>
                        <input
                          type="file"
                          accept=".pdf, .jpg, .jpeg, .png"
                          onChange={(e) => handleFileChange(e, 'idProofFile')}
                          required
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className="flex flex-col items-center justify-center pointer-events-none">
                          {formData.idProofFile ? (
                            <>
                              <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-3">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                              </div>
                              <p className="text-sm font-bold text-green-800 truncate w-full px-2">{formData.idProofFile.name}</p>
                              <p className="text-xs text-green-600 mt-1">Ready for upload</p>
                            </>
                          ) : (
                            <>
                              <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 group-hover:bg-primary-50 group-hover:text-primary-500 transition-colors flex items-center justify-center mb-3">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0c0 .884-.5 2-2 2h4c-1.5 0-2-1.116-2-2z"></path></svg>
                              </div>
                              <p className="text-sm font-bold text-gray-700 group-hover:text-primary-600 transition-colors">Admin Gov ID</p>
                              <p className="text-xs text-gray-500 mt-1">Aadhaar, PAN, License</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}


              {/* Donor Fields (Only visible if role is donor) */}
              {role === 'donor' && (
                <>
                  {/* Eligibility Status Display */}
                  {eligibilityStatus.isEligible !== null && (
                    <div className="mb-4">
                      <AlertCard
                        type={eligibilityStatus.isEligible ? 'success' : 'error'}
                        message={
                          <div>
                            <strong>{eligibilityStatus.isEligible ? 'Eligible to Donate' : 'Not Eligible to Donate'}</strong>
                            {eligibilityStatus.errors.length > 0 && (
                              <ul className="list-disc list-inside mt-1 ml-2 text-sm">
                                {eligibilityStatus.errors.map((error, index) => (
                                  <li key={index}>{error}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        }
                        onClose={() => setEligibilityStatus(prev => ({ ...prev, isEligible: null }))}
                      />
                    </div>
                  )}

                  {/* Personal Information Section */}
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
                          Date of Birth * (Age: {formData.age || 'Auto-calculated'})
                        </label>
                        <input
                          id="dob"
                          name="dob"
                          type="date"
                          required
                          max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 ${fieldErrors.dob ? 'border-red-500' : 'border-gray-300'}`}
                          value={formData.dob}
                          onChange={handleChange}
                        />
                        {fieldErrors.dob && <p className="text-red-500 text-xs mt-1">{fieldErrors.dob}</p>}
                      </div>
                      <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                          Gender *
                        </label>
                        <select
                          id="gender"
                          name="gender"
                          required
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 ${fieldErrors.gender ? 'border-red-500' : 'border-gray-300'}`}
                          value={formData.gender}
                          onChange={handleChange}
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                        {fieldErrors.gender && <p className="text-red-500 text-xs mt-1">{fieldErrors.gender}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Physical Eligibility Section */}
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Physical Eligibility</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                          Weight (kg) * (Minimum: 50kg)
                        </label>
                        <input
                          id="weight"
                          name="weight"
                          type="number"
                          required
                          min={50}
                          step="0.1"
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 ${fieldErrors.weight ? 'border-red-500' : 'border-gray-300'}`}
                          value={formData.weight}
                          onChange={handleChange}
                        />
                        {fieldErrors.weight && <p className="text-red-500 text-xs mt-1">{fieldErrors.weight}</p>}
                      </div>
                      <div>
                        <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 mb-1">
                          Blood Group *
                        </label>
                        <select
                          id="bloodGroup"
                          name="bloodGroup"
                          required
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 ${fieldErrors.bloodGroup ? 'border-red-500' : 'border-gray-300'}`}
                          value={formData.bloodGroup}
                          onChange={handleChange}
                        >
                          <option value="">Select Blood Group</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                        </select>
                        {fieldErrors.bloodGroup && <p className="text-red-500 text-xs mt-1">{fieldErrors.bloodGroup}</p>}
                      </div>
                      <div>
                        <label htmlFor="hemoglobin" className="block text-sm font-medium text-gray-700 mb-1">
                          Hemoglobin Level (g/dL) (Optional)
                        </label>
                        <input
                          id="hemoglobin"
                          name="hemoglobin"
                          type="number"
                          min={12.5}
                          step="0.1"
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 ${fieldErrors.hemoglobin ? 'border-red-500' : 'border-gray-300'}`}
                          value={formData.hemoglobin}
                          onChange={handleChange}
                        />
                        {fieldErrors.hemoglobin && <p className="text-red-500 text-xs mt-1">{fieldErrors.hemoglobin}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Location Section */}
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                          City *
                        </label>
                        <input
                          id="city"
                          name="city"
                          type="text"
                          required
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 ${fieldErrors.city ? 'border-red-500' : 'border-gray-300'}`}
                          value={formData.city}
                          onChange={handleChange}
                        />
                        {fieldErrors.city && <p className="text-red-500 text-xs mt-1">{fieldErrors.city}</p>}
                      </div>
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                          State *
                        </label>
                        <input
                          id="state"
                          name="state"
                          type="text"
                          required
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 ${fieldErrors.state ? 'border-red-500' : 'border-gray-300'}`}
                          value={formData.state}
                          onChange={handleChange}
                        />
                        {fieldErrors.state && <p className="text-red-500 text-xs mt-1">{fieldErrors.state}</p>}
                      </div>
                    </div>
                    <div className="mt-4">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <input
                        id="address"
                        name="address"
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Health Conditions Section */}
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Conditions (Last 7 days / 6 months)</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="feverInLast7Days"
                          checked={formData.feverInLast7Days}
                          onChange={handleChange}
                          className="mr-2 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">Fever, cold, or infection in last 7 days</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="majorSurgeryInLast6Months"
                          checked={formData.majorSurgeryInLast6Months}
                          onChange={handleChange}
                          className="mr-2 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">Major surgery in last 6 months</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="tattooOrPiercingInLast6Months"
                          checked={formData.tattooOrPiercingInLast6Months}
                          onChange={handleChange}
                          className="mr-2 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">Tattoo or piercing in last 6 months</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="currentlyOnAntibiotics"
                          checked={formData.currentlyOnAntibiotics}
                          onChange={handleChange}
                          className="mr-2 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">Currently on antibiotics</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="pregnantOrBreastfeeding"
                          checked={formData.pregnantOrBreastfeeding}
                          onChange={handleChange}
                          className="mr-2 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">Pregnant / breastfeeding (if applicable)</span>
                      </label>
                    </div>
                  </div>

                  {/* Medical History Section */}
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical History</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="hiv"
                          checked={formData.hiv}
                          onChange={handleChange}
                          className="mr-2 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">HIV</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="hepatitisBOrC"
                          checked={formData.hepatitisBOrC}
                          onChange={handleChange}
                          className="mr-2 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">Hepatitis B or C</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="heartDisease"
                          checked={formData.heartDisease}
                          onChange={handleChange}
                          className="mr-2 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">Heart disease</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="diabetes"
                          checked={formData.diabetes}
                          onChange={handleChange}
                          className="mr-2 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">Diabetes</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="highBloodPressure"
                          checked={formData.highBloodPressure}
                          onChange={handleChange}
                          className="mr-2 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">High blood pressure</span>
                      </label>
                    </div>
                  </div>

                  {/* Donation History Section */}
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Donation History</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="everDonated"
                          checked={formData.everDonated}
                          onChange={handleChange}
                          className="mr-2 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">Ever donated blood before</span>
                      </label>
                      {formData.everDonated && (
                        <div>
                          <label htmlFor="lastDonationDate" className="block text-sm font-medium text-gray-700 mb-1">
                            Last Donation Date * (Minimum 3 months gap required)
                          </label>
                          <input
                            id="lastDonationDate"
                            name="lastDonationDate"
                            type="date"
                            required={formData.everDonated}
                            max={new Date().toISOString().split('T')[0]}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 ${fieldErrors.lastDonationDate ? 'border-red-500' : 'border-gray-300'}`}
                            value={formData.lastDonationDate}
                            onChange={handleChange}
                          />
                          {fieldErrors.lastDonationDate && <p className="text-red-500 text-xs mt-1">{fieldErrors.lastDonationDate}</p>}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Document Verification Section */}
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Verification</h3>
                    <div>
                      <label htmlFor="idProof" className="block text-sm font-medium text-gray-700 mb-1">
                        Upload ID Proof * (Aadhaar / College ID / Driving License)
                      </label>
                      <p className="text-xs text-gray-500 mb-2">
                        Accepted formats: PDF, JPG, PNG (Max size: 5MB)
                      </p>
                      <input
                        id="idProof"
                        name="idProof"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        required
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            // Validate file type
                            const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
                            if (!allowedTypes.includes(file.type)) {
                              setFieldErrors(prev => ({
                                ...prev,
                                idProof: 'Only PDF, JPG, and PNG files are allowed'
                              }));
                              e.target.value = '';
                              return;
                            }

                            // Validate file size (5MB)
                            if (file.size > 5 * 1024 * 1024) {
                              setFieldErrors(prev => ({
                                ...prev,
                                idProof: 'File size must be less than 5MB'
                              }));
                              e.target.value = '';
                              return;
                            }

                            // Clear error if valid
                            setFieldErrors(prev => {
                              const newErrors = { ...prev };
                              delete newErrors.idProof;
                              return newErrors;
                            });

                            setFormData(prev => ({ ...prev, idProof: file }));
                          }
                        }}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 ${fieldErrors.idProof ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {fieldErrors.idProof && (
                        <p className="text-red-500 text-xs mt-1">{fieldErrors.idProof}</p>
                      )}
                      {formData.idProof && (
                        <p className="text-green-600 text-xs mt-1">
                          ✓ Selected: {formData.idProof.name} ({(formData.idProof.size / 1024).toFixed(2)} KB)
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Consent Section */}
                  <div className="border-t border-gray-200 pt-4">
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        name="consentGiven"
                        checked={formData.consentGiven}
                        onChange={handleChange}
                        required
                        className="mt-1 mr-2 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">
                        I confirm that the above information is true and correct *
                      </span>
                    </label>
                    {!formData.consentGiven && fieldErrors.consentGiven && (
                      <p className="text-red-500 text-xs mt-1">{fieldErrors.consentGiven}</p>
                    )}
                  </div>
                </>
              )}




              <div className="pt-6 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={role === 'donor' && (!eligibilityStatus.isEligible || !formData.consentGiven) || loading}
                  className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-base font-bold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 transform hover:-translate-y-0.5 ${role === 'donor' && (!eligibilityStatus.isEligible || !formData.consentGiven) || loading
                    ? 'bg-gray-400 cursor-not-allowed shadow-none transform-none'
                    : 'bg-primary-600 hover:bg-primary-700 hover:shadow-xl'
                    }`}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Account...
                    </span>
                  ) : (
                    'Create Account'
                  )}
                </button>
                {role === 'donor' && (!eligibilityStatus.isEligible || !formData.consentGiven) && (
                  <p className="text-red-500 text-sm mt-3 text-center bg-red-50 py-2 rounded-lg border border-red-100">
                    ⚠️ Please ensure you are eligible and have given consent to proceed
                  </p>
                )}
              </div>

              <div className="text-center mt-6">
                <span className="text-sm text-gray-500">
                  Already have an account?{' '}
                  <Link to="/login" className="font-bold text-primary-600 hover:text-primary-700 hover:underline transition-all">
                    Sign in to your account
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;

