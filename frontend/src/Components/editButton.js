import React from 'react';
import styled from 'styled-components';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const Button = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.textColor};
  cursor: pointer;
  margin-left: 8px;
  font-size: 18px;

  &:hover {
    color: #3498db;
  }
`;

const EditButton = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <EditOutlinedIcon />
    </Button>
  );
};

export default EditButton;