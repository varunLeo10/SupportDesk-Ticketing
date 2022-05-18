import React from "react";
import { Link } from "react-router-dom";
function TicketItem({ ticket, formatDate }) {
  // function formatDate(date) {
  //   let HH = 0;
  //   let AM = true;
  //   const formattedDate = [
  //     date.getDate().toString().padStart(2, "0"),
  //     (date.getMonth() + 1).toString().padStart(2, "0"),
  //     date.getFullYear().toString(),
  //   ].join("/");
  //   if (date.getHours() > 12) {
  //     HH = date.getHours() - 12;
  //     AM = false;
  //   } else {
  //     HH = date.getHours();
  //   }
  //   const formattedTime = [
  //     HH.toString().padStart(2, "0"),
  //     date.getMinutes().toString().padStart(2, "0"),
  //   ].join(":");
  //   return `${formattedDate} , ${formattedTime} ${AM ? "AM" : "PM"}`;
  // }
  return (
    <>
      <li
        className="ticket-list-itemm"
        style={{
          borderTopLeftRadius: "1rem",
          borderBottomLeftRadius: "1rem",
        }}
      >
        {formatDate(new Date(ticket.createdAt))}
      </li>
      <li className="ticket-list-itemm">{ticket.product}</li>
      <li className="ticket-list-item">
        <button
          className={`status-btn ${
            ticket.status === "new"
              ? "new"
              : ticket.status === "open"
              ? "open"
              : "close"
          }`}
        >
          {ticket.status[0].toUpperCase()}
          {ticket.status.slice(1)}
        </button>
      </li>
      <li
        className="ticket-list-item"
        style={{
          borderTopRightRadius: "1rem",
          borderBottomRightRadius: "1rem",
        }}
      >
        <Link to={ticket._id} className="link-to-ticket">
          View
        </Link>
      </li>
    </>
  );
}

export default TicketItem;
