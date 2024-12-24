import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
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
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ description, type, date, amount });
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormTitle>{title}</FormTitle>
      <Input
        type="text"
        placeholder={placeholder}
        value={type}
        onChange={(e) => setType(e.target.value)}
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
    </FormContainer>
  );
};

export default TxnForm;