import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { isEmail } from 'validator';

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
    firstName: '',
    lastName: '',
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

  // form validation
  const validate = () => {
    const errors = {};
    if (!formData.email) errors.email = 'Email is required';
    if (!isEmail(formData.email)) errors.email = 'Invalid email format';
    if (!formData.password) errors.password = 'Password is required';
    if (formData.password.length < 8) errors.password = 'Password must be at least 8 characters';
    if (isSignup) {
      if (!formData.firstName) errors.firstName = 'First Name is required';
      if (!formData.lastName) errors.lastName = 'Last Name is required';
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
    } else {
      // If there are no validation errors, clear the previous errors
      setErrors({});
      try {
        // Determine the API endpoint to send data to, based on whether the user is signing up or logging in
        const endpoint = isSignup ? '/api/signup' : '/api/login';

        // Send the form data to the server using a POST request
        const response = await axios.post(endpoint, formData);
        console.log(response.data);

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
              id="firstName" 
              name="firstName" 
              placeholder='First Name'
              value={formData.firstName} 
              onChange={handleChange} />
            {errors.firstName && <Error>{errors.firstName}</Error>}
          </FormGroup>
          <FormGroup>
            <Input 
              type='text' 
              id='lastName' 
              name='lastName' 
              placeholder='Last Name'
              value={formData.lastName} 
              onChange={handleChange} />
            {errors.lastName && <Error>{errors.lastName}</Error>}
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
        {errors.password && <Error>{errors.password}</Error>}
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