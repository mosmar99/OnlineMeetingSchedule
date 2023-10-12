const TimeSlot = require('../models/timeSlots');
const moment = require('moment');

async function createTimeSlot(req, res) {
  try {
    // Extract startTime and endTime from the request object
    const { startTime, endTime } = req.body;

    // Validate startTime and endTime
    if (!startTime || !endTime) {
      return res.status(400).json({ message: 'Missing startTime or endTime' });
    }

    // Create a new time slot using startTime and endTime
    const newTimeSlot = await TimeSlot.create({
      startTime,
      endTime,
    });

    // Send a success response
    res.status(201).json(newTimeSlot);
  } catch (error) {
    // Handle any errors that may occur during the process
    console.error('Error creating time slot:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Controller function to get a list of all time slots
async function getAllTimeSlots(req, res) {
  try {
    const timeSlots = await TimeSlot.find();
    res.json(timeSlots);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching time slots' });
  }
}

// Controller function to get a single time slot by ID
async function getTimeSlotById(req, res) {
  try {
    const { id } = req.params;
    const timeSlot = await TimeSlot.findById(id);
    if (!timeSlot) {
      return res.status(404).json({ message: 'Time slot not found' });
    }
    res.json(timeSlot);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching time slot' });
  }
}

// Controller function to update a time slot by ID
async function updateTimeSlot(req, res) {
  try {
    const { id } = req.params;
    const { startDate, length } = req.body;
    const updatedTimeSlot = await TimeSlot.findByIdAndUpdate(id, { startDate, length }, { new: true });
    if (!updatedTimeSlot) {
      return res.status(404).json({ message: 'Time slot not found' });
    }
    res.json(updatedTimeSlot);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating time slot' });
  }
}

// Controller function to delete a time slot by ID
async function deleteTimeSlot(req, res) {
  try {
    const { id } = req.params;
    const deletedTimeSlot = await TimeSlot.findByIdAndRemove(id);
    if (!deletedTimeSlot) {
      return res.status(404).json({ message: 'Time slot not found' });
    }
    res.json(deletedTimeSlot);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting time slot' });
  }
}

async function deleteAllTimeSlots(req, res) {
  try {
    await TimeSlot.deleteMany({});
    res.json({ message: 'All time slots removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error removing time slots' });
  }
}

module.exports = {
  createTimeSlot,
  getAllTimeSlots,
  getTimeSlotById,
  updateTimeSlot,
  deleteTimeSlot,
  deleteAllTimeSlots,
};
