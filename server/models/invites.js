const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the Invites collection
const inviteSchema = new Schema({
    participant: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Participant who cast the vote
    timeSlot: { type: Schema.Types.ObjectId, ref: 'TimeSlot', required: true }, // TimeSlot being voted on
    vote: { type: String, enum: ['yes', 'no', 'maybe'], required: true }, // Vote options
  }, {timestamps: true});
  

module.exports = mongoose.model('Invite', inviteSchema)
