// Output.js
import React, { useState, useEffect } from 'react';
import {
  StyledOutputContainer,
  StyledTitle,
  StyledTable,
  StyledTableHeader,
  StyledTableRow,
  StyledTableData,
  StyledEditIcon,
  StyledDeleteIcon,
} from './OutputStyles';

export const Output = () => {
  const [animals, setAnimals] = useState([]);
  const [editableAnimal, setEditableAnimal] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/animals/');

        if (!response.ok) {
          throw new Error(`Failed to fetch animals. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched data:', data);
        setAnimals(data);
      } catch (error) {
        console.error('Error fetching animals:', error);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = (animal) => {
    setEditableAnimal(animal);
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/animals/${editableAnimal.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: editableAnimal.name }),
      });

      if (response.ok) {
        console.log('Animal updated successfully!');
        setAnimals((prevAnimals) =>
          prevAnimals.map((a) => (a.id === editableAnimal.id ? { ...a, name: editableAnimal.name } : a))
        );
        setEditableAnimal(null);
      } else {
        console.error('Failed to update animal.');
      }
    } catch (error) {
      console.error('Error updating animal:', error);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/animals/${id}/`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Animal deleted successfully!');
        setAnimals((prevAnimals) => prevAnimals.filter((animal) => animal.id !== id));
      } else {
        console.error('Failed to delete animal.');
      }
    } catch (error) {
      console.error('Error deleting animal:', error);
    }
  };

  return (
    <StyledOutputContainer>
      <StyledTitle>Animals</StyledTitle>
      <StyledTable>
        <StyledTableHeader>
          <StyledTableRow>
            <StyledTableData>ID</StyledTableData>
            <StyledTableData>Name</StyledTableData>
            <StyledTableData>Actions</StyledTableData>
          </StyledTableRow>
        </StyledTableHeader>
        <tbody>
          {animals.map((animal) => (
            <StyledTableRow key={animal.id}>
              <StyledTableData>{animal.id}</StyledTableData>
              <StyledTableData>
                {editableAnimal && editableAnimal.id === animal.id ? (
                  <>
                    <input
                      type="text"
                      value={editableAnimal.name}
                      onChange={(e) => setEditableAnimal({ ...editableAnimal, name: e.target.value })}
                    />
                    <button onClick={handleSaveClick}>Save</button>
                  </>
                ) : (
                  animal.name
                )}
              </StyledTableData>
              <StyledTableData>
                {!editableAnimal && (
                  <>
                    <StyledEditIcon onClick={() => handleEditClick(animal)}>&#9998;</StyledEditIcon>
                    <StyledDeleteIcon onClick={() => handleDeleteClick(animal.id)}>&#10060;</StyledDeleteIcon>
                  </>
                )}
              </StyledTableData>
            </StyledTableRow>
          ))}
        </tbody>
      </StyledTable>
    </StyledOutputContainer>
  );
};
