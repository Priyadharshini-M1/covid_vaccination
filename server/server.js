const express = require('express');
const bodyParser = require('body-parser');
const { sequelize, CenterDetails } = require('./db_connect');

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.post('/submit-data', async (req, res) => {
  const { center, limit } = req.body;

  try {
    const newCenterDetail = await CenterDetails.create({ center, limit });

    res.status(200).json({ message: 'Center details inserted successfully', data: newCenterDetail });
  } catch (error) {
    console.error('Error inserting center details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/get-center-details', async (req, res) => {
  try {
    const centerDetails = await CenterDetails.findAll();

    res.status(200).json(centerDetails);
  } catch (error) {
    console.error('Error fetching center details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/delete-center/:id', async (req, res) => {
  const centerId = req.params.id;

  try {
    const deletedCenter = await CenterDetails.destroy({ where: { id: centerId } });

    if (deletedCenter === 1) {
      res.status(200).json({ message: 'Center detail deleted successfully' });
    } else {
      res.status(404).json({ error: 'Center detail not found' });
    }
  } catch (error) {
    console.error('Error deleting center detail:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
