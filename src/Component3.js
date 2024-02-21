import React, { useState, useEffect } from 'react';

const CenterList = () => {
  const [centerData, setCenterData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/get-center-details');
      if (response.ok) {
        const jsonData = await response.json();
        setCenterData(jsonData);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h2>Center List</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Center</th>
            <th>Limit</th>
          </tr>
        </thead>
        <tbody>
          {centerData.map((item) => (
            <tr key={item.id}>
              <td>{item.center}</td>
              <td>{item.limit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CenterList;
