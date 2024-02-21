import React, { useState, useEffect } from 'react';
import './Admin.css';

const Admin = () => {
  const [center, setCenter] = useState('');
  const [limit, setLimit] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/get-center-details');
      if (response.ok) {
        const jsonData = await response.json();
        setData(jsonData);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    const newData = { center, limit };

    fetch('http://localhost:3001/submit-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result.message);
        setData([...data, result.data]);
        setCenter('');
        setLimit('');
      })
      .catch((error) => {
        console.error('Error submitting data:', error);
      });
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/delete-center/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const updatedData = data.filter((item) => item.id !== id);
        setData(updatedData);
        console.log(`Center detail with ID ${id} deleted successfully`);
      } else {
        console.error('Failed to delete center detail');
      }
    } catch (error) {
      console.error('Error deleting center detail:', error);
    }
  };

  return (
    <div className='bottle'>
      <div className='inner-box'>
        <div className='heading'>
          <h2>Add Center Here</h2>
        </div>
        <div className='center'>
          <label>Center: </label>
          <input type="text" value={center} onChange={(e) => setCenter(e.target.value)} />
        </div>
        <div className='limit'>
          <label>Limit: </label>
          <input type="text" value={limit} onChange={(e) => setLimit(e.target.value)} />
        </div>
        <button onClick={handleSubmit}>Add</button>
      </div>
      <div className='table-content'>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table border="1">
            <thead>
              <tr>
                <th>ID</th>
                <th>Center</th>
                <th>Limit</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="4">No data available</td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.center}</td>
                    <td>{item.limit}</td>
                    <td>
                      <button onClick={() => handleDelete(item.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Admin;
