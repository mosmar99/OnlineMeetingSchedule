const TimeSlot = require('../models/timeSlots');
const moment = require('moment');

async function createTimeSlot(req, res) {
  try {
    const { startDate, endDate } = req.body;

    // Validate and parse startDate and endDate
    const startTime = moment(startDate, moment.ISO_8601, true);
    const endTime = moment(endDate, moment.ISO_8601, true);

    // Check if parsing was successful
    if (!startTime.isValid() || !endTime.isValid()) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    // Create the time slot with the parsed values
    const timeSlot = await TimeSlot.create({ startTime, endTime });

    res.status(201).json(timeSlot);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating time slot' });
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

module.exports = {
  createTimeSlot,
  getAllTimeSlots,
  getTimeSlotById,
  updateTimeSlot,
  deleteTimeSlot,
};
