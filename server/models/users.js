const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Define the schema for the Users collection
const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  contacts: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Referencing other User documents as contacts
}, {timestamps: true});

// Create a model for the Users collection
module.exports = mongoose.model('User', userSchema);
