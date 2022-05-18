import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import { getTickets, reset } from "../features/tickets/ticketSlice";
import TicketItem from "../components/TicketItem";
function Tickets({ formatDate }) {
  const dispatch = useDispatch();
  const [ticketsList, setTicketsList] = useState([]);
  const { isError, isLoading, isSuccess, tickets, message } = useSelector(
    (state) => state.ticket
  );
  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      const [...sortedList] = tickets;
      sortedList.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setTicketsList(sortedList);
    }
    dispatch(reset());
  }, [isError, isSuccess, isLoading, tickets, message, dispatch]);
  return (
    <>
      {isLoading && <Spinner />}
      <BackButton url="/" />
      <h1 className="ticket-head">Tickets</h1>
      <main className="tickets">
        <div className="ticket-list">
          <h3
            className="ticket-list-item ticket-list-head"
            style={{
              borderTopLeftRadius: "1rem",
              borderBottomLeftRadius: "1rem",
            }}
          >
            Date & Time
          </h3>
          <h3 className="ticket-list-item ticket-list-head">Product</h3>
          <h3 className="ticket-list-item ticket-list-head">Status</h3>
          {
            //eslint-disable-next-line
            <h3
              className="ticket-list-item ticket-list-head"
              style={{
                borderTopRightRadius: "1rem",
                borderBottomRightRadius: "1rem",
              }}
            ></h3>
          }
          {ticketsList.map((ticket) => (
            <TicketItem
              key={ticket._id}
              ticket={ticket}
              formatDate={formatDate}
            />
          ))}
        </div>
      </main>
    </>
  );
}

export default Tickets;
