const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MeetingSchema = new Schema({
  organizer: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // User who organized the meeting
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Array of user IDs representing meeting participants
  title: { type: String, required: true },
  description: { type: String },
  timeSlots: [{ type: Schema.Types.ObjectId, ref: 'TimeSlot' }], // Array of TimeSlot IDs representing proposed meeting times
}, {timestamps: true});

module.exports = mongoose.model('Meeting', MeetingSchema);

