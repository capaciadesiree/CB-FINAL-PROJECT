import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { eventBus } from '../utils/eventBus';

const FormContainer = styled.form`
  width: 100%;
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

const TxnForm = ({ title, buttonText, placeholder }) => {
  const [description, setDescription] = useState('');
  const [typeOf, setTypeOf] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const resetForm = () => {
    setDescription('');
    setTypeOf('');
    setDate('');
    setAmount('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      type: title.includes('income') ? 'income' : 'expense', // Set type based on form title
      typeOf,
      description,
      date,
      amount
    };

    try {
      const baseUrl = `${process.env.REACT_APP_API_URL}`;
      const endpoint = formData.type === 'income' ? '/api/add-income' : '/api/add-expense';
      
      const response = await axios.post(`${baseUrl}${endpoint}`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      
      eventBus.emit('newEvent', true)
      setSnackbar({
        open: true,
        message: 'Transaction successfully added!',
        severity: 'success'
      });
      resetForm(); // Clear the form after successful submission
    } catch (error) {
      console.error('Error adding transaction:', error);
      setSnackbar({
        open: true,
        message: 'Error adding transaction. Please try again.',
        severity: 'error'
      });
    }
  };

  return (
    <>
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
          maxLength={20}
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
      </FormContainer>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default TxnForm;
