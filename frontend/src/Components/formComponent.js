import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { isEmail } from 'validator';

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  border: none;
  color: #333333;
  border-radius: 5px;
`;

const Error = styled.div`
  color: red;
  font-size: 0.9em;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #4BBFBE;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #4BA0BF;
  }
`;

const InlineFormGroup = styled.div`
  display: flex;
  gap: 15px;

  ${FormGroup} {
    flex: 1;
  }
`;

const FormComponent = ({ isSignup }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const allowedDomains = [
    'gmail.com', 
    'yahoo.com', 
    'outlook.com', 
    'hotmail.com'
  ];

  // form validation
  const validate = () => {
    const errors = {};

    // email validation
    // Check if email is entered
    if (!formData.email) {
      errors.email = 'Email is required';
    } else {
      const emailParts = formData.email.split('@');
      
      // Ensure email has a valid format
      if (emailParts.length !== 2 || !emailParts[1].includes('.')) {
        errors.email = 'Invalid email format';
      } else {
        const emailDomain = emailParts[1];
        
        // Allow only public emails or company emails (must contain a dot)
        if (!allowedDomains.includes(emailDomain) && !emailDomain.includes('.')) {
          errors.email = 'Only common email providers or company emails are allowed';
        }
      }
    }

    // password validation
    if (!formData.password) {
      errors.password = ['Password is required'];
    } else {
      const passwordErrors = [];
      if (formData.password.length < 8) passwordErrors.push('Password must be at least 8 characters');
      if (!/[A-Z]/.test(formData.password)) passwordErrors.push('Password must contain at least one uppercase letter');
      if (!/[a-z]/.test(formData.password)) passwordErrors.push('Password must contain at least one lowercase letter');
      if (!/[0-9]/.test(formData.password)) passwordErrors.push('Password must contain at least one number');
      if (!/^[A-Za-z0-9!@#$%&*_+]*$/.test(formData.password)) passwordErrors.push('Password contains invalid special characters. Only !@#$%&*_+ are allowed');
      if (/\s/.test(formData.password)) passwordErrors.push('Password cannot contain spaces');
      
      if (passwordErrors.length > 0) {
        errors.password = passwordErrors;
      }
    }

    // signup validation: all input required
    if (isSignup) {
      if (!formData.first_name) errors.first_name = 'First Name is required';
      if (!formData.last_name) errors.last_name = 'Last Name is required';
      if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords must match';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    // Prevent the default form submission behavior (like page reload)
    e.preventDefault();

    // Call the `validate` function to check the form inputs and store any validation errors
    const validationErrors = validate();

    // If there are validation errors, set them in the state to display to the user
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Stop form submission if there are errors
    } else {
      // If there are no validation errors, clear the previous errors
      setErrors({});
      try {
        // Determine the API endpoint to send data to, based on whether the user is signing up or logging in
        const endpoint = isSignup 
        ? `${process.env.REACT_APP_API_URL}/api/signup` 
        : `${process.env.REACT_APP_API_URL}/api/login`;

        // dev enpoints
        // const endpoint = isSignup ? 'http://localhost:4000/api/signup' : 'http://localhost:4000/api/login';

        // Send the form data to the server using a POST request
        const response = await axios.post(endpoint, formData, {
        withCredentials: true,
      });

        // Navigate the user to the appropriate page after a successful submission:
        // - If signing up, redirect to the login page
        // - If logging in, redirect to the dashboard page
        if (isSignup) {
          navigate('/login');
        } else {
          navigate('/dashboard');
        }
      } catch (error) {
         // If an error occurs during the request
        if (error.response && error.response.data.message) {
          // If the server sends an error message, set it in the `errors` state to display to the user
          setErrors({ form: error.response.data.message});
        } else {
          // If no specific error message is provided, log the error for debugging
          console.error('Error submitting the form', error);
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Display form-level errors */}
      {errors.form && <Error>{errors.form}</Error>}
      {isSignup && (
        <InlineFormGroup>
          <FormGroup>
            <Input 
              type="text" 
              id="first_name" 
              name="first_name" 
              placeholder='First Name'
              value={formData.first_name} 
              onChange={handleChange} />
            {errors.first_name && <Error>{errors.first_name}</Error>}
          </FormGroup>
          <FormGroup>
            <Input 
              type='text' 
              id='last_name' 
              name='last_name' 
              placeholder='Last Name'
              value={formData.last_name} 
              onChange={handleChange} />
            {errors.last_name && <Error>{errors.last_name}</Error>}
          </FormGroup>
        </InlineFormGroup>
      )}
      <FormGroup>
        <Input 
          type='email' 
          id='email' 
          name='email' 
          placeholder='Email'
          value={formData.email} 
          onChange={handleChange} />
        {errors.email && <Error>{errors.email}</Error>}
      </FormGroup>
      <FormGroup>
        <Input 
          type='password' 
          id='password' 
          name='password' 
          placeholder='Enter your Password'
          value={formData.password} 
          onChange={handleChange} />
        {Array.isArray(errors.password) && (
          <Error>
            <ul>
              {errors.password.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </Error> 
        )}
      </FormGroup>
      {isSignup && (
        <FormGroup>
          <Input 
            type='password' 
            id='confirmPassword' 
            name='confirmPassword' 
            placeholder='Confirm Password'
            value={formData.confirmPassword} 
            onChange={handleChange} />
          {errors.confirmPassword && <Error>{errors.confirmPassword}</Error>}
        </FormGroup>
      )}
      <Button type="submit">{isSignup ? 'Sign Up' : 'Log In'}</Button>
    </form>
  );
};

export default FormComponent;