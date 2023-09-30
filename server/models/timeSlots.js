const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the TimeSlots collection
const timeSlotSchema = new Schema({
    startDate: { type: String, required: true },
    length: { type: Number, required: true },
  }, {timestamps: true});

// Create a model for the timeSlot collection
module.exports = mongoose.model('timeSlot', timeSlotSchema);