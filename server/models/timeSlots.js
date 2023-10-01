const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TimeSlotSchema = new Schema({
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
}, {timestamps: true});

module.exports = mongoose.model('TimeSlot', TimeSlotSchema);
