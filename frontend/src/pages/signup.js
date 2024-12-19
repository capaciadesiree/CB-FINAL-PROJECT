import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { isEmail } from 'validator';
import Logo from '../assets/logo.svg';
import BackgroundImage from '../assets/signupBG.jpg';

// Styled components for styling the form
const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
  background-color: #f4f4f4;
  font-family: 'Roboto', sans-serif;
`;

const LeftColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #224056;
`;

const RightColumn = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${BackgroundImage});
  background-size: cover;
  background-position: center;
`;

const SignupForm = styled.div`
  padding: 20px;
  align-items: center;
  text-align: center;
  width: 60%;
  max-width: 500px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  color: #333333;
  border-radius: 5px;
`;

const Error = styled.div`
  color: red;
  font-size: 0.9em;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #4BBFBE;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #4BA0BF;
  }
`;

const Text = styled.p`
  color: white;
`;

const Link = styled.a`
  color: #4BBFBE;
  text-decoration: none;
  font-weight: bold;

  &:hover {
  color: #4BA0BF;
  }
`;

const Copyright = styled.p`
  color: white;
  font-weight: normal;
  font-size: 12px;
  position: absolute;
  bottom: -20px;
  right: 10px;
`;

const InlineFormGroup = styled.div`
  display: flex;
  gap: 10px;

  ${FormGroup} {
    flex: 1;
  }
`;

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form data
  const validate = () => {
    const errors = {};
    if (!formData.firstName) errors.firstName = 'First Name is required';
    if (!formData.lastName) errors.lastName = 'Last Name is required';
    if (!isEmail(formData.email)) errors.email = 'Invalid email format';
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.password) errors.password = 'Password is required';
    if (formData.password.length < 8) errors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords must match';
    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      // Submit form data to the server
      try {
        const response = await axios.post('/api/signup', formData);
        console.log(response.data);
        // Redirect to login page upon successful signup
        navigate('/login');
      } catch (error) {
        console.error('Error submitting the form', error);
      }
    }
  };

  return (
    <PageContainer>
      <LeftColumn>
        <SignupForm>
          <img src={Logo} alt='Logo' width="200" height="70" />
          <h2 style={{ letterSpacing: '0.5px'}}>Sign up and get the most out of your finances</h2>
          <Text><p>Create your account today</p></Text>
          <form onSubmit={handleSubmit}>
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

            <Button type="submit">Sign Up</Button>
          </form>
          <Text>
          <p>Already have an account? <Link href="/login">Log In</Link></p>
          </Text>
        </SignupForm>
      </LeftColumn>
      <RightColumn>
        <Copyright>
          <p>&#169; 2024 All rights reserved. Designed and Developed by Desiree Capacia.</p>
        </Copyright>
      </RightColumn>
    </PageContainer>
  );
};

export default Signup;
