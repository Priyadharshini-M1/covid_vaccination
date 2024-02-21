import React, { useState, useEffect } from 'react';
import './Regform.css';

function Regform() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [slot, setSlot] = useState('');
  const [slotDate, setSlotDate] = useState('');
  const [submittedData, setSubmittedData] = useState(null);
  const [slotDetails, setSlotDetails] = useState([]);

  useEffect(() => {
    fetchSlotDetails();
  }, []);

  const fetchSlotDetails = async () => {
    try {
      const response = await fetch('http://localhost:3001/get-center-details');
      if (response.ok) {
        const data = await response.json();
        setSlotDetails(data);
      } else {
        console.error('Failed to fetch slot details');
      }
    } catch (error) {
      console.error('Error fetching slot details:', error);
    }
  };

  const handleSubmit = async () => {
    const data = {
      center: name,
      limit: gender // Just for demonstration, you may need to adjust this based on your requirements
    };

    try {
      const response = await fetch('http://localhost:3001/submit-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData); // Handle success response
        setSubmittedData(data); // Update submittedData with the entered data
        fetchSlotDetails(); // Fetch updated slot details after submitting
      } else {
        console.error('Error submitting data:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div className='container'>
      <div className='form-container'>
        <div className='form'>
          <h1>Book Your Slot Here!</h1>
          <div className='items'>
            <label htmlFor="name">Name</label>
            <input type="text" placeholder="Type your name" value={name} onChange={(e) => setName(e.target.value)} />
            <br />
            <div className='gender'>
              <label htmlFor="gender">Gender</label>
              <br />
              <input type="radio" id="male" name="gender" value="male" checked={gender === 'male'} onChange={() => setGender('male')} />
              <label htmlFor="male">Male</label>
              <br />
              <input type="radio" id="female" name="gender" value="female" checked={gender === 'female'} onChange={() => setGender('female')} />
              <label htmlFor="female">Female</label>
              <br />
              <input type="radio" id="other" name="gender" value="other" checked={gender === 'other'} onChange={() => setGender('other')} />
              <label htmlFor="other">Other</label>
            </div>
            <br />
            <label htmlFor="dob">Date Of Birth</label>
            <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
            <br />
            <label htmlFor="slot">Slot</label>
            <input type="text" placeholder="Enter slot" value={slot} onChange={(e) => setSlot(e.target.value)} />
            <br />
            <label htmlFor="slotDate">Slot Date</label>
            <input type='date' value={slotDate} onChange={(e) => setSlotDate(e.target.value)} />
            <br />
            <button className='btn' onClick={handleSubmit}>Book Slot</button>
          </div>
        </div>
        {submittedData && (
          <div className='submit-data'>
            <h2>Submitted Data:</h2>
            <p>Name: {submittedData.center}</p>
            <p>Gender: {submittedData.limit}</p>
            {/* Add more submitted data fields as needed */}
          </div>
        )}
      </div>
      <div className='slot-details'>
        <h2>Slot Details:</h2>
        <table>
          <thead>
            <tr>
              <th>Center</th>
              <th>Limit</th>
              {/* Add more table headers if needed */}
            </tr>
          </thead>
          <tbody>
            {slotDetails.map((slotItem, index) => (
              <tr key={index}>
                <td>{slotItem.center}</td>
                <td>{slotItem.limit}</td>
                {/* Add more table data cells if needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Regform;
