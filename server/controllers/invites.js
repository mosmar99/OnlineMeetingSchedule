const Invite = require('../models/invites');
const mongoose = require('mongoose');

// Controller function to create a new invite
async function createInvite(req, res) {
    try {
      // Extract the necessary data from the request body
      const { participantId, timeSlotId, vote } = req.body;

      // const id = new ObjectId(req.params.id);

      // Convert _id string to ObjectId
      const objectParticipantId = new mongoose.Types.ObjectId(participantId);
      const objectTimeSlotId = new mongoose.Types.ObjectId(timeSlotId);
  
      // Create a new invite document
      const newInvite = await Invite.create({
        participant: objectParticipantId,
        timeSlot: objectTimeSlotId,
        vote
      });
  
      // Send a success response with the created invite
      res.status(201).json(newInvite);
    } catch (error) {
      // Handle any errors that may occur during the process
      console.error('Error creating invite:', error);
      res.status(500).json({ message: 'Error creating invite' });
    }
}

// Controller function to get a list of all invites
async function getAllInvites(req, res) {
  try {
    const invites = await Invite.find();
    res.json(invites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching invites' });
  }
}

// Controller function to get a single invite by ID
async function getInviteById(req, res) {
  try {
    const { id } = req.params;
    const invite = await Invite.findById(id);
    if (!invite) {
      return res.status(404).json({ message: 'Invite not found' });
    }
    res.json(invite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching invite' });
  }
}

// Controller function to update an invite by ID
async function updateInvite(req, res) {
  try {
    const { id } = req.params;
    const { userId, voted, notified } = req.body;
    const updatedInvite = await Invite.findByIdAndUpdate(id, { userId, voted, notified }, { new: true });
    if (!updatedInvite) {
      return res.status(404).json({ message: 'Invite not found' });
    }
    res.json(updatedInvite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating invite' });
  }
}

// Controller function to delete an invite by ID
async function deleteInvite(req, res) {
  try {
    const { id } = req.params;
    const deletedInvite = await Invite.findByIdAndRemove(id);
    if (!deletedInvite) {
      return res.status(404).json({ message: 'Invite not found' });
    }
    res.json(deletedInvite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting invite' });
  }
}

module.exports = {
  createInvite,
  getAllInvites,
  getInviteById,
  updateInvite,
  deleteInvite,
};
