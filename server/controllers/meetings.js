const Meeting = require('../models/meetings');
const mongoose = require('mongoose');

async function createMeeting(req, res) {
    const { title, description, startDate, endDate } = req.body;

    try {
        const newMeeting = await Meeting.create({
            title,
            description,
            startDate,
            endDate
        })
        res.status(201).json(newMeeting);
    } catch (error) {
        res.status(400).json(error.message);
    }    
}

async function getMeetings(req, res) {
    // empty {} gets all of documents in collection of meetings
    const meetings = await Meeting.find({}).sort({ createdAt: -1 }); // newest first
    
    // meetings contains all of the meetings documents
    // they are returned as an array within json format back to browser
    res.status(200).json(meetings);
}

async function getMeetingById(req, res) {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ message: 'Meeting not found' });
        return;
    }

    const meeting = await Meeting.findById(id);
    if (!meeting) {
        res.status(404).json({ message: 'Meeting not found' });
        return;
    }
    res.status(200).json(meeting);
}

async function updateMeeting(req, res) {
    const id = req.params.id

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ message: 'Meeting not found' });
        return;
    }

    const meeting = await Meeting.findByIdAndUpdate(id, req.body, { new: true });
    if (!meeting) {
        res.status(404).json({ message: 'Meeting not found' });
        return;
    }

    res.status(200).json(meeting);
}

async function deleteMeeting(req, res) {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ message: 'Meeting not found' });
        return;
    }

    const meeting = await Meeting.findByIdAndRemove(id);
    if (!meeting) {
        res.status(404).json({ message: 'Meeting not found' });
        return;
    }
    res.status(200).json(meeting);
}

module.exports = {
    createMeeting,
    getMeetings,
    getMeetingById,
    updateMeeting,
    deleteMeeting
}