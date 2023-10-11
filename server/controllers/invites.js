const Invite = require('../models/invites');
const { ObjectId } = require('mongodb');

// Controller function to create a new invite
async function createInvite(req, res) {
    try {
      // Extract the necessary data from the request body
      const { participant, timeSlot, vote } = req.body;

      // Convert _id string to ObjectId
      const participantId = new ObjectId(participant);
      const timeSlotId = new ObjectId(timeSlot);
      
      // Create a new invite document
      const newInvite = await Invite.create({
        participant: participantId,
        timeSlot: timeSlotId,
        vote
      });
  
      // Send a success response with the created invite
      res.status(201).json(newInvite);
    } catch (error) {
      // Handle any errors that may occur during the process
      console.error('Error creating invite:', error.message);
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

// Controller function to get all invites for a participant by their ID
async function invitesByParticipantId(req, res) {
  try {
    // Convert the string to an ObjectId
    const participantId = new ObjectId(req.params.participant);

    // Use Mongoose to find all invites where the participant matches the given ID
    const invites = await Invite.find({ participant: participantId });

    res.json(invites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching invites for the participant' });
  }
}

// Controller function to update an invite by ID
async function updateInvite(req, res) {
  try {
    const { id } = req.params;
    const { userId, vote } = req.body; 
    const updatedInvite = await Invite.findByIdAndUpdate(id, { userId, vote }, { new: true });
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

// Controller function to delete all invites in the database
async function deleteAllInvites(req, res) {
  try {
    // Use Mongoose's deleteMany to remove all invites
    const result = await Invite.deleteMany({});

    // Check the result to determine if any invites were deleted
    if (result.deletedCount === 0) {
      return res.json({ message: 'No invites found to delete' });
    }

    res.json({ message: `${result.deletedCount} invites deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting invites' });
  }
}

module.exports = {
  createInvite,
  getAllInvites,
  getInviteById,
  updateInvite,
  deleteInvite,
  invitesByParticipantId,
  deleteAllInvites,
};
