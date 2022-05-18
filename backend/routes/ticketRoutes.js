const express = require("express");
const router = express.Router();
const noteRouter = require("./noteRoutes");
const protect = require("../middleware/authMiddleware");
router.use("/:ticketId/notes", noteRouter);
const {
  getTickets,
  getTicket,
  createTicket,
  deleteTicket,
  updateTicket,
} = require("../controllers/ticketController");
router.route("/").get(protect, getTickets).post(protect, createTicket);
router
  .route("/:id")
  .get(protect, getTicket)
  .delete(protect, deleteTicket)
  .put(protect, updateTicket);
module.exports = router;
