import React from 'react';
import styled from 'styled-components';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const Button = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.textColor};
  cursor: pointer;
  font-size: 18px;

  &:hover {
    color: #e74c3c;
  }
`;

const DeleteButton = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <DeleteOutlineOutlinedIcon />
    </Button>
  );
};

export default DeleteButton;