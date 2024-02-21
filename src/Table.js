import React, { useState } from 'react';
import './Table.css';

const TableExample = () => {
  const [center, setCenter] = useState('');
  const [limit, setLimit] = useState('');
  const [data, setData] = useState([]);

  const handleSubmit = () => {
    setData([...data, { center, limit }]);
    setCenter('');
    setLimit('');
  };

  return (
    <div>
      <h2>Table Example</h2>
      <div>
        <label>Center: </label>
        <input type="text" value={center} onChange={(e) => setCenter(e.target.value)} />
      </div>
      <div>
        <label>Limit: </label>
        <input type="text" value={limit} onChange={(e) => setLimit(e.target.value)} />
      </div>
      <button onClick={handleSubmit}>Submit</button>
      <br />
      <table border="1">
        <thead>
          <tr>
            <th>Center</th>
            <th>Limit</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.center}</td>
              <td>{item.limit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableExample;
