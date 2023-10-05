const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TimeSlotSchema = new Schema({
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
}, {timestamps: true});

module.exports = mongoose.model('TimeSlot', TimeSlotSchema);
