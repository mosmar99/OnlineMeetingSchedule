const Meeting = require('../models/meetings');
const { invitesByParticipantId } = require('./invites.js'); 
const User = require("../models/users");
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

// Get all meetings with details
async function getMeetingsDetailed(req, res) {
  try {
    let meetings = await Meeting.find({}).sort({ createdAt: -1 });

    for (let i = 0; i < meetings.length; i++) {
      if (meetings[i].organizer)
        meetings[i].organizer = await User.findById(meetings[i].organizer);
    }

    res.status(200).json(meetings);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
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

// Function to get filtered time slots
function getMaybeTimeSlots(invites) {
  const maybeTimeSlots = [];

  for (const invite of invites) {
    if (invite.vote === 'maybe') {
      maybeTimeSlots.push(invite.timeSlot.toString());
    }
  }

  return maybeTimeSlots;
}

// Function to find meetings based on filtered time slots
async function findMeetingsBasedOnTimeSlots(timeSlots) {
  try {
    const matchingMeetings = await Meeting.find({ timeSlots: { $in: timeSlots } });
    return matchingMeetings;
  } catch (error) {
    console.error(error);
    throw new Error('Error finding meetings based on time slots');
  }
}

// Function to find meetings with filtered time slots
async function getPendingMeetings(req, res) {
  try {

    const userId = req.params.userId;

    const invites = await invitesByParticipantId(userId);

    const maybeTimeSlots = getMaybeTimeSlots(invites);

    const matchingMeetings = await findMeetingsBasedOnTimeSlots(maybeTimeSlots);

    res.json(matchingMeetings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error finding meetings with filtered time slots' });
  }
}

module.exports = {
    createMeeting,
    getMeetings,
    getMeetingsDetailed,
    getMeetingById,
    updateMeeting,
    deleteMeeting,
    getPendingMeetings
}