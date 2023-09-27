function Meeting(title, description, startDate, endDate) {
    this.title = title;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
}

var meetings = [
    new Meeting(
        "Team meeting", 
        "Meet for a discussion on current progress, future plans and responsibility.",
        new Date("2023-09-25T15:00:00"),
        new Date("2023-09-25T16:00:00")
    )
];

module.exports = {
    Meeting,
    meetings
}