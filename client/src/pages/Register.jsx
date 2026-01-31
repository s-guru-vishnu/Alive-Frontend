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
    diabetes: 'None',
    highBloodPressure: false,
    // Donation History
    everDonated: false,
    lastDonationDate: '',
    // Consent
    consentGiven: false,
    // ID Proof
    idProof: null,
    // Hospital fields
    hospitalName: '',
    licenseNumber: '',
    hospitalPhone: '',
    hospitalCity: '',
    hospitalState: '',
    hospitalAddress: ''
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
    if (formData.diabetes === 'Uncontrolled') {
      errors.push('Cannot donate if you have uncontrolled diabetes');
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
        response = await register(payload);
      }

      // Login user and redirect to dashboard
      if (response.token && response.user) {
        authLogin(response.user);
        navigate(
          response.user.role === 'donor'
            ? '/donor/dashboard'
            : response.user.role === 'hospital'
              ? '/hospital/dashboard'
              : response.user.role === 'blood-bank'
                ? '/blood-bank/dashboard'
                : '/admin/dashboard'
        );
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
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className={`w-full space-y-8 ${role === 'donor' ? 'max-w-4xl' : 'max-w-2xl'}`}>
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Create your account
            </h2>
          </div>
          <form className="mt-8 space-y-6 bg-white p-6 sm:p-8 rounded-lg shadow-md" onSubmit={handleSubmit}>
            {error && (
              <AlertCard message={error} onClose={() => setError('')} />
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Register as</label>
              <select
                name="role"
                value={role}
                onChange={handleRoleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="donor">Donor</option>
                <option value="hospital">Hospital</option>
                <option value="blood-bank">Blood Bank</option>
              </select>
            </div>

            {/* Hospital/Blood Bank Name */}
            {(role === 'hospital' || role === 'blood-bank') && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="hospitalName" className="block text-sm font-medium text-gray-700 mb-1">
                      {role === 'hospital' ? 'Hospital Name' : 'Blood Bank Name'} *
                    </label>
                    <input
                      id="hospitalName"
                      name="hospitalName"
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      value={formData.licenseNumber}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="hospitalPhone" className="block text-sm font-medium text-gray-700 mb-1">
                      Official Phone *
                    </label>
                    <input
                      id="hospitalPhone"
                      name="hospitalPhone"
                      type="tel"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      value={formData.hospitalCity}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="hospitalState" className="block text-sm font-medium text-gray-700 mb-1">
                      State *
                    </label>
                    <input
                      id="hospitalState"
                      name="hospitalState"
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      value={formData.hospitalState}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="hospitalAddress" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Address *
                    </label>
                    <input
                      id="hospitalAddress"
                      name="hospitalAddress"
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      value={formData.hospitalAddress}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            )}


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password *
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone *
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

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
                    <div>
                      <label htmlFor="diabetes" className="block text-sm font-medium text-gray-700 mb-1">
                        Diabetes
                      </label>
                      <select
                        id="diabetes"
                        name="diabetes"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        value={formData.diabetes}
                        onChange={handleChange}
                      >
                        <option value="None">None</option>
                        <option value="Controlled">Controlled</option>
                        <option value="Uncontrolled">Uncontrolled</option>
                      </select>
                    </div>
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

            {role === 'hospital' && (
              <>
                <div>
                  <label htmlFor="hospitalName" className="block text-sm font-medium text-gray-700 mb-1">
                    Hospital Name *
                  </label>
                  <input
                    id="hospitalName"
                    name="hospitalName"
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    value={formData.licenseNumber}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="hospitalPhone" className="block text-sm font-medium text-gray-700 mb-1">
                    Hospital Phone *
                  </label>
                  <input
                    id="hospitalPhone"
                    name="hospitalPhone"
                    type="tel"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    value={formData.hospitalPhone}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="hospitalCity" className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      id="hospitalCity"
                      name="hospitalCity"
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      value={formData.hospitalState}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="hospitalAddress" className="block text-sm font-medium text-gray-700 mb-1">
                    Address *
                  </label>
                  <input
                    id="hospitalAddress"
                    name="hospitalAddress"
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    value={formData.hospitalAddress}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}


            <div>
              <button
                type="submit"
                disabled={role === 'donor' && (!eligibilityStatus.isEligible || !formData.consentGiven) || loading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${role === 'donor' && (!eligibilityStatus.isEligible || !formData.consentGiven) || loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-primary-600 hover:bg-primary-700'
                  }`}
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
              {role === 'donor' && (!eligibilityStatus.isEligible || !formData.consentGiven) && (
                <p className="text-red-500 text-xs mt-2 text-center">
                  Please ensure you are eligible and have given consent to proceed
                </p>
              )}
            </div>

            <div className="text-center">
              <span className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                  Login here
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;

