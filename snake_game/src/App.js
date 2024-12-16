 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

 const Container = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
  max-width: 600px;
  margin: auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  background-color: #007BFF;
  color: white;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const EmployeeList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
`;

const EmployeeCard = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
`;

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [employees, setEmployees] = useState([]);

  // Track changes in formData
  useEffect(() => {
    console.log('Form data updated:', formData);
  }, [formData]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', formData);
      alert(`Employee Registered: ${JSON.stringify(response.data)}`);
      setFormData({ name: '', email: '' });
      console.log('now wroking');
      
    } catch (error) {
      console.error('Error registering employee:', error);
    }
  };

  
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <Container>
      <h1>Register Employee</h1>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Button type="submit">Register</Button>
      </Form>

      <h2>Employee List</h2>
      <EmployeeList>
        {employees.map((employee) => (
          <EmployeeCard key={employee.id}>
            <h3>{employee.name}</h3>
            <p>{employee.email}</p>
          </EmployeeCard>
        ))}
      </EmployeeList>
    </Container>
  );
};

export default App;
