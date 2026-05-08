import React, { useState } from 'react';
import styled from 'styled-components';

const NotepadContainer = styled.div`
  height: 100%; // Fill wrapper
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 18px;
  color: ${({ theme }) => theme.textColor};
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  flex-grow: 1;
  padding: 10px;
  font-size: 16px;
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.textColor};
  resize: none; // Disable manual resize handle
  box-sizing: border-box;
`;

const Notepad = ({ theme }) => {
  const [note, setNote] = useState('');

  return (
    <NotepadContainer theme={theme}>
      <Title>Notepad</Title>
      <TextArea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Type your note here..."
      />
    </NotepadContainer>
  );
};

export default Notepad;