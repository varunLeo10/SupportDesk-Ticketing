import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { getTicket, reset, closeTicket } from "../features/tickets/ticketSlice";
function Ticket({ formatDate }) {
  const params = useParams();
  const dispatch = useDispatch();
  const [myTicket, setMyTicket] = useState({});
  useEffect(() => {
    dispatch(getTicket(params.ticketId));
    // eslint-disable-next-line
  }, []);
  const { isError, isSuccess, isLoading, message, ticket } = useSelector(
    (state) => state.ticket
  );
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      setMyTicket(ticket);
    }
    dispatch(reset());
    // eslint-disable-next-line
  }, [isError, isSuccess, message, ticket]);
  return (
    <>
      {isLoading && <Spinner />}
      <BackButton url={"/tickets"} />
      {Object.keys(myTicket).length !== 0 && (
        <main className="ticket-desc">
          <div className="ticket-desc-head">
            <h2>Product: {myTicket.product}</h2>
            <div className="ticket-id-stat">
              <h2>Ticket ID: {myTicket._id}</h2>
              <button
                className={`status-btn ${
                  myTicket.status === "new"
                    ? "new"
                    : myTicket.status === "open"
                    ? "open"
                    : "close"
                } media`}
              >
                {myTicket.status[0].toUpperCase()}
                {myTicket.status.slice(1)}
              </button>
            </div>
            <h3>Date Submitted: {formatDate(new Date(myTicket.createdAt))}</h3>
          </div>
          <div className="description">
            <h4>Description of Issue:</h4>
            <p>{myTicket.description}</p>
          </div>
          {myTicket.status !== "closed" && (
            <button
              className="close-ticket"
              onClick={() => {
                dispatch(closeTicket(myTicket._id));
                toast.success("Ticket has been closed");
              }}
            >
              Close Ticket
            </button>
          )}
        </main>
      )}
    </>
  );
}

export default Ticket;
