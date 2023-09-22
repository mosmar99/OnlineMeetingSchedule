const { meetings, Meeting } = require("../models/meetings");

function addMeeting(req, res) {
    console.log(req);
}

function listMeetings(req, res) {
    res.send(meetings);
}

module.exports = {
    listMeetings,
    addMeeting
}
