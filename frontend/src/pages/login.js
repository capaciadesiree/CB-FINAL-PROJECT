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
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  background-image: url(${BackgroundImage});
  background-size: cover;
  background-position: center;
`;

const LoginForm = styled.div`
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
  margin: 10px;
`;

const Login = () => {
  return (
    <PageContainer>
      <LeftColumn>
        <LoginForm>
          <LogoPlainContainer>
            <LogoPlain />
          </LogoPlainContainer>
          <Text>
            <h2 style={{ letterSpacing: '0.5px'}}>Welcome back!</h2>
          </Text>
          <FormComponent isLogin={true} />
          <Text>
            <p>Don't have an account? <Link href="/signup">Sign Up</Link></p>
          </Text>
        </LoginForm>
      </LeftColumn>
      
      <RightColumn>
        <Copyright>
          <p>&#169; 2024 All rights reserved. Designed and Developed by Desiree Capacia.</p>
        </Copyright>
      </RightColumn>
    </PageContainer>
  );
};

export default Login;