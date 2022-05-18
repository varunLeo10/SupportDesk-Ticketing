const Ticket = require("../models/ticketModel");
const Note = require("../models/noteModel");
const asyncHandler = require("express-async-handler");
const getNotes = asyncHandler(async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.ticketId);
    if (ticket.user.toString() === req.user.id) {
      const notes = await Note.find({ ticket: req.params.ticketId });
      res.status(200).json(notes);
    } else {
      res.status(401);
      throw new Error("Unauthorised");
    }
  } catch (error) {
    res.status(401);
    throw new Error("Invalid Ticket id");
  }
});
const createTicketNote = asyncHandler(async (req, res) => {
  let ticket;
  try {
    ticket = await Ticket.findById(req.params.ticketId);
  } catch (error) {
    res.status(400);
    throw new Error("Invalid Ticket id");
  }
  try {
    if (ticket.user.toString() === req.user.id) {
      const notes = await Note.create({
        ticket: req.params.ticketId,
        user: req.user.id,
        note: req.body.text,
      });
      res.status(200).json(notes);
    } else {
      res.status(401);
      throw new Error("Unauthorised");
    }
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400);
      throw new Error(error.message);
    } else {
      res.status(500);
      throw new Error("Couldn't create note");
    }
  }
});
module.exports = {
  getNotes,
  createTicketNote,
};
