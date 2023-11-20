// Input.js
import React, { useState } from 'react';
import {
  StyledForm,
  StyledLabel,
  StyledInput,
  StyledSubmitButton,
} from './InputStyles';

export const Input = () => {
  const [animalName, setAnimalName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://127.0.0.1:8000/api/animals/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: animalName }),
      });
  
      if (response.ok) {
        console.log('Animal submitted successfully!');
        // Optionally, you can reset the form or perform other actions.
        setAnimalName(''); // Clear the input field after successful submission
      } else {
        console.error('Failed to submit animal.');
      }
    } catch (error) {
      console.error('Error submitting animal:', error);
    }
  };
  

  return (
      <StyledForm onSubmit={handleSubmit}>
        <StyledLabel>
          Animal Name
          <StyledInput  type="text"
          name="name"
          value={animalName}
          onChange={(e) => setAnimalName(e.target.value)} />
        </StyledLabel>
        <StyledSubmitButton type="submit" value="Submit" />
      </StyledForm>

  );
};

