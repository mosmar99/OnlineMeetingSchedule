const { meetings, Meeting } = require("../models/meetings");

function addMeeting(req, res) {
    let { title, description, place, startDate, endDate } = req.body;
    let meeting = new Meeting(title, description, place, new Date(startDate), new Date(endDate));

    meetings.push(meeting);

    res.send(meeting);
}

function listMeetings(req, res) {
    res.send(meetings);
}

module.exports = {
    listMeetings,
    addMeeting
}
