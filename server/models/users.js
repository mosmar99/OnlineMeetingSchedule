const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true }, 
  firstName: { type: String },
  lastName: { type: String }, 
  password: { type: String, required: true }, 
  contacts: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, {timestamps: true});

module.exports = mongoose.model('User', UserSchema);
