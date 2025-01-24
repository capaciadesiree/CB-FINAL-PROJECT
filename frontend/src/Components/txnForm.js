import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const FormContainer = styled.form`
  width: 100%;
  // height: 50vh;
  max-width: 600px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.componentBackground};
`;

const FormTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  color: ${({ theme }) => theme.textColor};
`;

const Input = styled.input`
  width: 95%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  color: #111111;
  background-color: #E8EDEE;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.borderColor};
    border-color: ${({ theme }) => theme.borderColor};
  }
`;

const Button = styled.button`
  background-color:  #4BBFBE;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  align-self: flex-start;

  &:hover {
    background-color: #4BA0BF;
  }
`;

const ConfirmationMessage = styled.div` 
  margin-top: 10px; 
  color: green; 
`;

const TxnForm = ({ title, buttonText, placeholder }) => {
  const [description, setDescription] = useState('');
  const [typeOf, setTypeOf] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [confirmationMessage, setconfirmationMessage] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted');

    const formData = {
      type: title.includes('income') ? 'income' : 'expense', // Set type based on form title
      typeOf,
      description,
      date,
      amount
    };
    // Debug log
    console.log('Submitting data:', formData); // Debug form data

    try {
      const baseUrl = 'http://localhost:4000/api';
      const endpoint = formData.type === 'income' ? '/add-income' : '/add-expense';
      // Debug log
      console.log('Submitting to:', `${baseUrl}${endpoint}`, 'with data:', formData);
      
      const response = await axios.post(`${baseUrl}${endpoint}`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      console.log('Transaction added:', response.data);
      setconfirmationMessage('Transaction successfully added!');
    } catch (error) {
      console.error('Error adding transaction:', error);
      setconfirmationMessage('Error adding transaction. Please try again.');
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormTitle>{title}</FormTitle>
      <Input
        type="text"
        placeholder={placeholder}
        value={typeOf}
        onChange={(e) => setTypeOf(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <Input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <Button type="submit">{buttonText}</Button>
      {confirmationMessage && 
        <ConfirmationMessage> {confirmationMessage} </ConfirmationMessage>
      }
    </FormContainer>
  );
};

export default TxnForm;