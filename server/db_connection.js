// db_connect.js

const { Sequelize } = require('sequelize');

// Create Sequelize instance
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root', // Replace with your MySQL username
  password: 'Priya02012005', // Replace with your MySQL password
  database: 'covid_database', // Replace with your database name
});

// Define your models and their associations here
const SlotDetails = sequelize.define('SlotDetails', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dob: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  slot: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slotDate: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
});

// Define associations if needed
// SlotDetails.belongsTo(OtherModel);

// Synchronize models with database
sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });

module.exports = { sequelize, SlotDetails };
