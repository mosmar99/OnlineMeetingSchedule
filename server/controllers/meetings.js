const Meeting = require('../models/meetings');
const User = require("../models/users"); 
const Invite = require("../models/invites")
const TimeSlot = require("../models/timeSlots")
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

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

async function getOrgNames(meetings) {
  try {
      const organizerNames = await Promise.all(meetings.map(async (meeting) => {
      const userId = await User.findById(meeting.organizer);
      return userId ? userId.username : null;
    }));

    return organizerNames.filter(name => name !== null);
  } catch (error) {
    console.error(error);
    throw new Error('Error finding meetings organizer names');
  }
}

async function getOrgTitles(meetings) {
  try {
    const organizerTitles = meetings.map(meeting => meeting.title).filter(title => title !== null);
    return organizerTitles;
  } catch (error) {
    console.error(error);
    throw new Error('Error finding meetings organizer titles');
  }
}

async function getOrgDescriptions(meetings) {
  try {
    const organizerDesc = meetings.map(meeting => meeting.description);
    return organizerDesc;
  } catch (error) {
    console.error(error);
    throw new Error('Error finding meetings organizer titles');
  }
}

async function getOrgParticipants(meetings) {
  try {
    let organizerParticipants = meetings.map(meeting => meeting.participants);

    for (let j = 0; j < organizerParticipants.length; j++) {
      let participants = []

      for (let i = 0; i < organizerParticipants[j].length; i++) {
        participants[i] = (await User.findOne({ "_id": organizerParticipants[j][i] })).username;
      }

      organizerParticipants[j] = participants;
    }

    return organizerParticipants;
  } catch (error) {
    console.error(error);
    throw new Error('Error finding meetings organizer titles');
  }
}

async function getOrgDates(meetings) {
  try {
    const timeRanges = [];

    for (const meeting of meetings) {
      if (meeting.timeSlots && Array.isArray(meeting.timeSlots)) {
        const meetingTimeRanges = await Promise.all(
          meeting.timeSlots.map(async timeslotId => {
            const timeslot = await TimeSlot.findById(timeslotId);
            if (timeslot && timeslot.startTime && timeslot.endTime) {
              const startDate = timeslot.startTime.replace(/"/g, '').split('T')[0];
              const endDate = timeslot.endTime.replace(/"/g, '').split('T')[0];
              return `${startDate} to ${endDate}`;
            }
            return null;
          })
        );

        const filteredMeetingTimeRanges = meetingTimeRanges.filter(timeRange => timeRange !== null);
        if (filteredMeetingTimeRanges.length > 0) {
          timeRanges.push(filteredMeetingTimeRanges);
        }
      }
    }

    return timeRanges;
  } catch (error) {
    console.error(error);
    throw new Error('Error getting time ranges for meetings');
  }
}

async function getOrgTimes(meetings) {
  try {
    const timeRanges = [];

    for (const meeting of meetings) {
      if (meeting.timeSlots && Array.isArray(meeting.timeSlots)) {
        const meetingTimeRanges = await Promise.all(
          meeting.timeSlots.map(async timeslotId => {
            const timeslot = await TimeSlot.findById(timeslotId);
            if (timeslot && timeslot.startTime && timeslot.endTime) {
              const startHourMinute = timeslot.startTime.split('T')[1].substring(0, 5);
              const endHourMinute = timeslot.endTime.split('T')[1].substring(0, 5);
              return `${startHourMinute} to ${endHourMinute}`;
            }
            return null;
          })
        );

        const filteredMeetingTimeRanges = meetingTimeRanges.filter(timeRange => timeRange !== null);
        if (filteredMeetingTimeRanges.length > 0) {
          timeRanges.push(filteredMeetingTimeRanges);
        }
      }
    }

    return timeRanges;
  } catch (error) {
    console.error(error);
    throw new Error('Error getting time ranges for meetings');
  }
}

// Function to find meetings with filtered time slots
async function getPendingMeetings(req, res) {
  try {
    const userId = new ObjectId(req.query.userId);

    const invites = await Invite.find({ participant: userId });

    const maybeTimeSlots = getMaybeTimeSlots(invites);

    const matchingMeetings = await findMeetingsBasedOnTimeSlots(maybeTimeSlots);

    const meeting_ids = matchingMeetings.map(meeting => meeting._id.toString());
    const usernames = await getOrgNames(matchingMeetings);
    const descriptions = await getOrgDescriptions(matchingMeetings);
    const titles = await getOrgTitles(matchingMeetings);
    const dates = await getOrgDates(matchingMeetings);
    const times = await getOrgTimes(matchingMeetings);
    const participants = await getOrgParticipants(matchingMeetings);

    res.json({
      meeting_ids,
      usernames,
      descriptions,
      participants,
      titles,
      dates,
      times
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error finding meetings with filtered time slots' });
  }
}

async function getHostedMeetings(req, res) {
  try {
    const userId = req.query.userId;
    
    const meetings = await Meeting.find({ organizer: new ObjectId(userId) });
    
    const meeting_ids = meetings.map(meeting => meeting._id.toString());
    const usernames = await getOrgNames(meetings);
    const descriptions = await getOrgDescriptions(meetings);
    const titles = await getOrgTitles(meetings);
    const dates = await getOrgDates(meetings);
    const times = await getOrgTimes(meetings);
    const participants = await getOrgParticipants(meetings);

    res.json({
      meeting_ids,
      usernames,
      descriptions,
      participants,
      titles,
      dates,
      times
    });

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
    getPendingMeetings,
    getHostedMeetings,
}