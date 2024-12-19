import React, { useState } from 'react';
import styled from 'styled-components';

const NotepadContainer = styled.div`
  padding: 20px;
  // background-color: ${({ theme }) => theme.containerBackground};
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 10px;
  font-size: 16px;
  border: none;
  background-color: transparent;
`;

const Notepad = ({ theme }) => {
  const [note, setNote] = useState('');

  return (
    <NotepadContainer theme={theme}>
      <h2>Notepad</h2>
      <TextArea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Type your note here..."
      />
    </NotepadContainer>
  );
};

export default Notepad;