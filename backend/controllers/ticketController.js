const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");
const getTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find({ user: req.user._id }).select(
    "-user -__v"
  );
  res.status(200).json(tickets);
});
const getTicket = asyncHandler(async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (ticket.user.toString() === req.user.id) {
      res.status(200).json({
        _id: ticket._id,
        product: ticket.product,
        description: ticket.description,
        createdAt: ticket.createdAt,
        updatedAt: ticket.updatedAt,
        status: ticket.status,
      });
    } else {
      res.status(401);
      throw new Error("Unauthorised");
    }
  } catch (error) {
    res.status(400);
    throw new Error("Invalid Ticket");
  }
});
const deleteTicket = asyncHandler(async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (ticket.user.toString() === req.user.id) {
      await ticket.remove();
      res.status(200).json({ success: true });
    } else {
      res.status(401);
      throw new Error("Unauthorised");
    }
  } catch (error) {
    res.status(400);
    throw new Error("Invalid Ticket");
  }
});
const updateTicket = asyncHandler(async (req, res) => {
  let ticket;
  try {
    ticket = await Ticket.findById(req.params.id);
  } catch (error) {
    res.status(400);
    throw new Error("Invalid ticket");
  }
  try {
    if (ticket.user.toString() === req.user.id) {
      const updatedTicket = await Ticket.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json({
        _id: updatedTicket.id,
        product: updatedTicket.product,
        description: updatedTicket.description,
        createdAt: ticket.createdAt,
        updatedAt: ticket.updatedAt,
        status: updatedTicket.status,
      });
    } else {
      res.status(401);
      throw new Error("Unauthorised");
    }
  } catch (error) {
    res.status(404);
    throw new Error("Couldn't update Ticket");
  }
});
const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;
  if (!product || !description) {
    res.status(400);
    throw new Error("Please add both product and description");
  }
  try {
    const ticket = await Ticket.create({
      product,
      description,
      user: req.user._id,
      status: "new",
    });
    res.status(201).json({
      _id: ticket._id,
      product: ticket.product,
      description: ticket.description,
      status: ticket.status,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      products_available: ["iPhone", "Macbook Pro", "iPad", "iWatch"],
    });
  }
});
module.exports = {
  getTickets,
  getTicket,
  createTicket,
  deleteTicket,
  updateTicket,
};
