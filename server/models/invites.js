const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the Invites collection
const inviteSchema = new Schema({
    userId: { type: Number, required: true },
    voted: { type: Schema.Types.ObjectId, ref: 'TimeSlot' },
    notified: { type: Boolean, default: false },
  }, {timestamps: true});
  

module.exports = mongoose.model('Invite', inviteSchema)
