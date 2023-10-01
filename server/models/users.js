const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // User's email address
  firstName: { type: String }, // User's first name
  lastName: { type: String }, // User's last name
  contacts: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Array of user IDs representing contacts
  meetings: [{ type: Schema.Types.ObjectId, ref: 'Meeting' }], // Array of meeting IDs
}, {timestamps: true});

module.exports = mongoose.model('User', UserSchema);
