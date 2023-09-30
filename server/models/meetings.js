const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the Meetings collection
const meetingSchema = new Schema({
  userId: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String },
  timeSlots: [{ type: Schema.Types.ObjectId, ref: 'TimeSlot' }],
  invites: [{ type: Schema.Types.ObjectId, ref: 'Invite' }],
}, {timestamps: true});

// Create a model for the Meetings collection
module.exports = mongoose.model('Meeting', meetingSchema);
