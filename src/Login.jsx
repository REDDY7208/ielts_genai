



import React, { useState, useEffect } from 'react';
import { UilAt, UilLockAlt, UilUser, UilPhone } from '@iconscout/react-unicons';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });
  const [forgotPasswordData, setForgotPasswordData] = useState({
    email: '',
    otp: '',
    newPassword: '',
    reEnterPassword: '',
  });

  const navigate = useNavigate();
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleForgotPasswordChange = (e) => {
    const { name, value } = e.target;
    setForgotPasswordData({ ...forgotPasswordData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = isSignUp
      ? 'http://141.136.42.65:8081/register'
      : 'http://141.136.42.65:8081/login';

    const payload = isSignUp
      ? {
          email: formData.email,
          username: formData.fullName,
          password: formData.password,
          phone_number: formData.phoneNumber,
          first_name: formData.firstName,
          last_name: formData.lastName,
        }
      : {
          email: formData.email,
          password: formData.password,
        };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        const { user_id } = data;

        const user = {
          email: formData.email,
          username: formData.fullName,
        };

        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('user_id', user_id);
        localStorage.setItem('isAuthenticated', 'true');

        if (isSignUp) {
          alert('Registered Successfully! Please log in.');
          setRegistrationSuccess(true);
        } else {
          alert('Logged in Successfully!');
          navigate('/home');
        }
      } else if (response.status === 400) {
        const errorData = await response.json();
        if (isSignUp) {
          alert(errorData.message || 'Email or username already exists');
        } else {
          alert(errorData.message || 'Login failed. Please check your credentials.');
        }
      } else if (response.status === 500) {
        if (isSignUp) {
          alert('Registration failed. Please try again later.');
        } else {
          alert('Login failed. Please try again later.');
        }
      } else {
        alert('An unexpected error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error.message);
      alert(isSignUp ? 'Registration Failed' : 'Login Failed');
    }
  };

  useEffect(() => {
    if (registrationSuccess) {
      setIsSignUp(false);
      setFormData({
        email: '',
        password: '',
        fullName: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
      });
      setRegistrationSuccess(false);
    }
  }, [registrationSuccess]);

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = 'http://141.136.42.65:8081/forgot_password';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: forgotPasswordData.email }),
      });

      if (response.ok) {
        alert('OTP sent to your email.');
        setOtpSent(true);
      } else {
        alert('Email not found or failed to send OTP.');
      }
    } catch (error) {
      console.error('Error:', error.message);
      alert('Failed to send OTP.');
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    if (forgotPasswordData.newPassword !== forgotPasswordData.reEnterPassword) {
      alert('New passwords do not match.');
      return;
    }

    const apiUrl = 'http://141.136.42.65:8081/reset_password';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: forgotPasswordData.email,
          otp: forgotPasswordData.otp,
          new_password: forgotPasswordData.newPassword,
        }),
      });

      if (response.ok) {
        alert('Password reset successful.');
        setShowForgotPassword(false);
        setOtpSent(false);
        navigate('/');
      } else {
        alert('OTP verification failed.');
      }
    } catch (error) {
      console.error('Error:', error.message);
      alert('Failed to reset password.');
    }
  };

  return (
    <div className="login-container">
          <div id="stars"></div>
           <div id="stars2"></div>
           <div id="stars3"></div>
           <div className="section">
             <div className="container">
               <div className="row full-height justify-content-center">
                 <div className="col-12 text-center align-self-center py-5">
                   <div className="section pb-5 pt-5 pt-sm-2 text-center">
                     <h6 className="mb-0 pb-3">
                       <span
                        onClick={() => setIsSignUp(false)}
                        className={!isSignUp ? 'active' : ''}
                      >
                        Log In
                      </span>
                      <span
                        onClick={() => setIsSignUp(true)}
                        className={isSignUp ? 'active' : ''}
                      >
                        Sign Up
                      </span>
                    </h6>
                    <div className={`arrow ${isSignUp ? 'arrow-signup' : 'arrow-login'}`}></div>
                    <div className="card-3d-wrap mx-auto">
                      <div className={`card-3d-wrapper ${isSignUp ? 'isSignUp' : ''}`}>
                        {!isSignUp ? (
                          <div className="card-front">
                            <div className="center-wrap">
                              <div className="section text-center">
                                <h4 className="mb-4 pb-3">Log In</h4>
                                <form onSubmit={handleFormSubmit}>
                                  <div className="form-group">
                                    <input
                                      type="email"
                                      name="email"
                                      className="form-style"
                                      placeholder="Email"
                                      value={formData.email}
                                      onChange={handleInputChange}
                                      required
                                    />
                                    <i className="input-icon">
                                      <UilAt />
                                    </i>
                                  </div>
                                  <div className="form-group mt-2">
                                    <input
                                      type="password"
                                      name="password"
                                      className="form-style"
                                      placeholder="Password"
                                      value={formData.password}
                                      onChange={handleInputChange}
                                      required
                                    />
                                    <i className="input-icon">
                                      <UilLockAlt />
                                    </i>
                                  </div>
                                  <button type="submit" className="btn mt-4">
                                    Login
                                  </button>
                                  <div className="mt-3">
                                    <span
                                      className="forgot-password-link"
                                      onClick={() => setShowForgotPassword(true)}
                                    >
                                      Forgot Password?
                                    </span>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="card-back">
                            <div className="center-wrap">
                              <div className="section text-center">
                                <h4 className="mb-3 pb-3">Sign Up</h4>
                                <form onSubmit={handleFormSubmit}>
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      name="fullName"
                                      className="form-style"
                                      placeholder="User name"
                                      value={formData.fullName}
                                      onChange={handleInputChange}
                                      required
                                    />
                                    <i className="input-icon">
                                      <UilUser />
                                    </i>
                                  </div>
                                  <div className="form-group mt-2">
                                    <input
                                      type="text"
                                      name="firstName"
                                      className="form-style"
                                      placeholder="First Name"
                                      value={formData.firstName}
                                      onChange={handleInputChange}
                                      required
                                    />
                                    <i className="input-icon">
                                      <UilUser />
                                    </i>
                                  </div>
                                  <div className="form-group mt-2">
                                    <input
                                      type="text"
                                      name="lastName"
                                      className="form-style"
                                      placeholder="Last Name"
                                      value={formData.lastName}
                                      onChange={handleInputChange}
                                      required
                                    />
                                    <i className="input-icon">
                                      <UilUser />
                                    </i>
                                  </div>
                                  <div className="form-group mt-2">
                                    <input
                                      type="email"
                                      name="email"
                                      className="form-style"
                                      placeholder="Email"
                                      value={formData.email}
                                      onChange={handleInputChange}
                                      required
                                    />
                                    <i className="input-icon">
                                      <UilAt />
                                    </i>
                                  </div>
                                  <div className="form-group mt-2">
                                    <input
                                      type="text"
                                      name="phoneNumber"
                                      className="form-style"
                                      placeholder="Phone Number"
                                      value={formData.phoneNumber}
                                      onChange={handleInputChange}
                                      required
                                    />
                                    <i className="input-icon">
                                      <UilPhone />
                                    </i>
                                  </div>
                                  <div className="form-group mt-2">
                                    <input
                                      type="password"
                                      name="password"
                                      className="form-style"
                                      placeholder="Password"
                                      value={formData.password}
                                      onChange={handleInputChange}
                                      required
                                    />
                                    <i className="input-icon">
                                      <UilLockAlt />
                                    </i>
                                  </div>
                                  <button type="submit" className="btn mt-4">
                                    Sign Up
                                  </button>
                                </form>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    
          {/* Forgot Password Modal */}
          {showForgotPassword && (
            <div className="forgot-password-modal">
              <div className="modal-content">
                {!otpSent ? (
                  <form onSubmit={handleForgotPasswordSubmit}>
                    <h4>Forgot Password</h4>
                    <div className="form-group">
                      <input
                        type="email"
                        name="email"
                        className="form-style"
                        placeholder="Email"
                        value={forgotPasswordData.email}
                        onChange={handleForgotPasswordChange}
                        required
                      />
                    </div>
                    <button type="submit" className="btn mt-4">
                      Send OTP
                    </button>
                    <button
                      type="button"
                      className="btn mt-4"
                      onClick={() => setShowForgotPassword(false)}
                    >
                      Close
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleOtpVerification}>
                    <h4>Verify OTP</h4>
                    <div className="form-group">
                      <input
                        type="text"
                        name="otp"
                        className="form-style"
                        placeholder="Enter OTP"
                        value={forgotPasswordData.otp}
                        onChange={handleForgotPasswordChange}
                        required
                      />
                    </div>
                    <div className="form-group mt-2">
                      <input
                        type="password"
                        name="newPassword"
                        className="form-style"
                        placeholder="New Password"
                        value={forgotPasswordData.newPassword}
                        onChange={handleForgotPasswordChange}
                        required
                      />
                    </div>
                    <div className="form-group mt-2">
                      <input
                        type="password"
                        name="reEnterPassword"
                        className="form-style"
                        placeholder="Re-enter New Password"
                        value={forgotPasswordData.reEnterPassword}
                        onChange={handleForgotPasswordChange}
                        required
                      />
                    </div>
                    <button type="submit" className="btn mt-4">
                      Reset Password
                    </button>
                    <button
                      type="button"
                      className="btn mt-4"
                      onClick={() => setShowForgotPassword(false)}
                    >
                      Close
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
  );
};

export default Login;

