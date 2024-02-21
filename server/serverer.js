const express = require('express');
const bodyParser = require('body-parser');
const { sequelize, CenterDetails } = require('./db_connect'); // Assuming db_connect.js contains Sequelize setup for CenterDetails
const { SlotDetails } = require('./db_connection'); // Assuming db_connection.js contains Sequelize setup for SlotDetails

const app = express();
const port = 3001;

app.use(bodyParser.json());

// Middleware to allow CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace with your frontend URL
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Endpoint to handle form submission for center details
app.post('/submit-data', async (req, res) => {
  const { center, limit } = req.body;

  try {
    // Insert data into the CenterDetails table using Sequelize
    const newCenterDetail = await CenterDetails.create({ center, limit });

    // Send success response
    res.status(200).json({ message: 'Center details inserted successfully', data: newCenterDetail });
  } catch (error) {
    // Handle errors
    console.error('Error inserting center details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to handle data deletion
app.delete('/delete-data/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Find the record with the specified ID and delete it
    const deletedCenterDetail = await CenterDetails.destroy({ where: { id } });

    if (deletedCenterDetail === 0) {
      // If no record was deleted (ID not found), return a 404 response
      res.status(404).json({ error: 'Data not found' });
    } else {
      // Send success response
      res.status(200).json({ message: 'Data deleted successfully' });
    }
  } catch (error) {
    // Handle errors
    console.error('Error deleting data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to handle form submission for slot details
app.post('/submit-slot-details', async (req, res) => {
  const { name, gender, dob, slot, slotDate } = req.body;

  try {
    // Insert data into the SlotDetails table using Sequelize
    const newSlotDetail = await SlotDetails.create({ name, gender, dob, slot, slotDate });

    // Send success response
    res.status(200).json({ message: 'Slot details inserted successfully', data: newSlotDetail });
  } catch (error) {
    // Handle errors
    console.error('Error inserting slot details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
