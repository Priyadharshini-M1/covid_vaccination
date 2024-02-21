// slotDetailsController.js

const { SlotDetails } = require('./db_connect'); // Import your Sequelize model

// Controller function to handle form submission
async function submitSlotDetails(req, res) {
  const { name, gender, dob, slot, slotDate } = req.body;

  try {
    // Insert data into the slot_details table using Sequelize
    const newSlotDetail = await SlotDetails.create({ name, gender, dob, slot, slotDate });

    // Send success response
    res.status(200).json({ message: 'Slot details submitted successfully', data: newSlotDetail });
  } catch (error) {
    // Handle errors
    console.error('Error submitting slot details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = { submitSlotDetails };