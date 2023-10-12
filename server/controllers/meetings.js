const Meeting = require('../models/meetings');
const User = require("../models/users"); 
const Invite = require("../models/invites")
const TimeSlot = require("../models/timeSlots")
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

function formatDate(startTime, endTime) {
  const startDate = startTime.replace(/"/g, '').split('T')[0];
  const endDate = endTime.replace(/"/g, '').split('T')[0];
  return `${startDate} to ${endDate}`;
}

function formatTime(startTime, endTime) {
  const startHourMinute = startTime.split('T')[1].substring(0, 5);
  const endHourMinute = endTime.split('T')[1].substring(0, 5);
  return `${startHourMinute} to ${endHourMinute}`;
}

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

async function getMeetingByIdDetailed(req, res) {
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

    let response = {
      _id: meeting._id,
      title: meeting.title,
      description: meeting.description,
      organizer: await User.findOne({ _id: meeting.organizer }),
      participants: await Promise.all(meeting.participants.map(async (participant) => (await User.findOne({ _id: participant })))),
      timeSlots: await Promise.all(meeting.timeSlots.map(async (timeSlot) => {
        const timeslot = await TimeSlot.findOne({ _id: timeSlot });
        const votes = await Invite.find({ timeSlot: timeSlot, vote: "yes"});

        return { 
          date: formatDate(timeslot.startTime, timeslot.endTime), 
          time: formatTime(timeslot.startTime, timeslot.endTime),
          votes: votes.length,
          usersVoted: [...new Set(votes.map(vote => vote.participant))],
          _id: timeslot._id
        }
      })),
    }

    res.status(200).json(response);
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

async function deleteAllMeetings(req, res) {
  try {
    await Meeting.deleteMany({});
    res.status(200).json({ message: 'All meetings deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting meetings' });
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

async function getNames(meetings) {
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

async function getTitles(meetings) {
  try {
    const organizerTitles = meetings.map(meeting => meeting.title).filter(title => title !== null);
    return organizerTitles;
  } catch (error) {
    console.error(error);
    throw new Error('Error finding meetings organizer titles');
  }
}

async function getDescriptions(meetings) {
  try {
    const organizerDesc = meetings.map(meeting => meeting.description);
    return organizerDesc;
  } catch (error) {
    console.error(error);
    throw new Error('Error finding meetings organizer titles');
  }
}

async function getParticipants(meetings) {
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

async function getDates(meetings) {
  try {
    const timeRanges = [];

    for (const meeting of meetings) {
      if (meeting.timeSlots && Array.isArray(meeting.timeSlots)) {
        const meetingTimeRanges = await Promise.all(
          meeting.timeSlots.map(async timeslotId => {
            const timeslot = await TimeSlot.findById(timeslotId);
            if (timeslot && timeslot.startTime && timeslot.endTime) {
              return formatDate(timeslot.startTime, timeslot.endTime)
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

async function getDateTimes(meetings) {
  try {
    const timeRanges = [];

    for (const meeting of meetings) {
      if (meeting.timeSlots && Array.isArray(meeting.timeSlots)) {
        const meetingTimeRanges = await Promise.all(
          meeting.timeSlots.map(async timeslotId => {
            const timeslot = await TimeSlot.findById(timeslotId);
            return [timeslot.startTime, timeslot.endTime];
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

async function getTimes(meetings) {
  try {
    const timeRanges = [];

    for (const meeting of meetings) {
      if (meeting.timeSlots && Array.isArray(meeting.timeSlots)) {
        const meetingTimeRanges = await Promise.all(
          meeting.timeSlots.map(async timeslotId => {
            const timeslot = await TimeSlot.findById(timeslotId);
            if (timeslot && timeslot.startTime && timeslot.endTime) {
              return formatTime(timeslot.startTime, timeslot.endTime)
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
    const usernames = await getNames(matchingMeetings);
    const descriptions = await getDescriptions(matchingMeetings);
    const titles = await getTitles(matchingMeetings);
    const dates = await getDates(matchingMeetings);
    const times = await getTimes(matchingMeetings);
    const participants = await getParticipants(matchingMeetings);

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
    const usernames = await getNames(meetings);
    const descriptions = await getDescriptions(meetings);
    const titles = await getTitles(meetings);
    const dates = await getDates(meetings);
    const times = await getTimes(meetings);
    const participants = await getParticipants(meetings);

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

async function getUpcomingMeetings(req, res) {
  try {

    const upcomingMeetings = []; 
    const meetings = await Meeting.find();

    for (const meeting of meetings) {
      count = 0;
      for (const invite of [... new Set(meeting.invites)]) {
        const inviteObj = await Invite.findById(invite);
        if (inviteObj && inviteObj.vote === 'yes') {
          count++;
        }
      }
      
      if (count >= meeting.participants.length && count !== 0) {
        upcomingMeetings.push(meeting);
      }
    }
    
    const userId = req.query.userId;
    for ( const meeting of upcomingMeetings) {
      if (!(meeting.participants.includes(userId) || meeting.organizer.toString() === userId.toString())) {
          upcomingMeetings.splice(upcomingMeetings.indexOf(meeting), 1);
        }
    }

    const meeting_ids = upcomingMeetings.map(meeting => meeting._id.toString());
    const descriptions = await getDescriptions(upcomingMeetings);
    const usernames = await getNames(upcomingMeetings);
    const titles = await getTitles(upcomingMeetings);
    const dates = await getDates(upcomingMeetings);
    const times = await getTimes(upcomingMeetings);
    const participants = await getParticipants(upcomingMeetings);

    const dateTimes = await getDateTimes(upcomingMeetings)

    res.json({
      meeting_ids,
      descriptions,
      usernames,
      participants,
      titles,
      dates,
      startTime: dateTimes.map(dateTime => dateTime[0][0]),
      endTime: dateTimes.map(dateTime => dateTime[0][1]),
      times
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error finding meetings with filtered time slots' });
  }
}

async function voteOnTimeSlot(req, res) {
  try {
    const { meeting_id, userId, timeSlotId } = req.body.params;

    const recieved_meeting = await Meeting.findById(meeting_id);

    for (const invite of recieved_meeting.invites) {
      const inviteObj = await Invite.findOne({ _id: invite });
      
      if (inviteObj.participant.toString() === userId.toString() && inviteObj.timeSlot.toString() === timeSlotId.toString()) {
        // add vote to timeslot condition
        inviteObj.vote = 'yes';
      }
      else if (inviteObj.participant.toString() === userId.toString() && inviteObj.timeSlot.toString() !== timeSlotId.toString()) {
        // other timeslots should equal no
        inviteObj.vote = 'no';
      }

      inviteObj.save();
    }

    res.status(200).json({ message: 'Vote updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating votes' });
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
    getUpcomingMeetings,
    voteOnTimeSlot,
    getMeetingByIdDetailed,
    deleteAllMeetings,
}