const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MeetingSchema = new Schema({
  organizer: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }], 
  title: { type: String, required: true },
  description: { type: String },
  timeSlots: [{ type: Schema.Types.ObjectId, ref: 'TimeSlot' }], 
  invites: [{ type: Schema.Types.ObjectId, ref: 'Invites' }], 
}, {timestamps: true});

module.exports = mongoose.model('Meeting', MeetingSchema);

