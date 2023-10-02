const Meeting = require('../models/meetings');
const mongoose = require('mongoose');

// Create a new meeting
async function createMeeting(req, res) {
    const { organizer, participants, title, description, timeSlots, invites } = req.body;
  
    try {
      const newMeeting = await Meeting.create({
        organizer,
        participants,
        title,
        description,
        timeSlots,
        invites
      });
  
      res.status(201).json(newMeeting);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}


// Get all meetings
async function getMeetings(req, res) {
    try {
      const meetings = await Meeting.find({}).sort({ createdAt: -1 });
  
      res.status(200).json(meetings);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
}
  

// Get a meeting by ID
async function getMeetingById(req, res) {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: 'Meeting not found' });
    return;
  }

  try {
    const meeting = await Meeting.findById(id);

    if (!meeting) {
      res.status(404).json({ message: 'Meeting not found' });
      return;
    }

    res.status(200).json(meeting);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Update a meeting by ID
async function updateMeeting(req, res) {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: 'Meeting not found' });
    return;
  }

  try {
    const updatedMeeting = await Meeting.findByIdAndUpdate(id, req.body, {
      new: true
    });

    if (!updatedMeeting) {
      res.status(404).json({ message: 'Meeting not found' });
      return;
    }

    res.status(200).json(updatedMeeting);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Delete a meeting by ID
async function deleteMeeting(req, res) {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: 'Meeting not found' });
    return;
  }

  try {
    const deletedMeeting = await Meeting.findByIdAndRemove(id);

    if (!deletedMeeting) {
      res.status(404).json({ message: 'Meeting not found' });
      return;
    }

    res.status(200).json(deletedMeeting);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
    createMeeting,
    getMeetings,
    getMeetingById,
    updateMeeting,
    deleteMeeting
}