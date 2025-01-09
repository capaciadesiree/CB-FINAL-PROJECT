import React from 'react';
import styled from 'styled-components';
import { ReactComponent as LogoPlain } from '../assets/logoPlain.svg';
import BackgroundImage from '../assets/signupBG.jpg';
import FormComponent from '../Components/formComponent';

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
  background-color: #f4f4f4;
  font-family: 'Roboto', sans-serif;
`;

const LogoPlainContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;

  svg {
    width: 100%;
  }
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

const Signup = () => {
  return (
    <PageContainer>
      <LeftColumn>
        <SignupForm>
          <LogoPlainContainer>
            <LogoPlain />
          </LogoPlainContainer>
          <Text>
            <p>Create your account today</p>
            <h2 style={{ letterSpacing: '0.2px'}}>Sign up and get the most out of your finances</h2>
          </Text>
          <FormComponent isSignup={true} />
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