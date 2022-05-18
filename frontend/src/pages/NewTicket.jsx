import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset, createTicket } from "../features/tickets/ticketSlice";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
function NewTicket() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [newTicketdata, setNewTicketData] = useState({
    name: user.name,
    email: user.email,
    product: "iPhone",
    description: "",
  });
  const navigate = useNavigate();
  const { isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.ticket
  );
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success("Ticket successfully created");
      navigate("/tickets");
    }
    dispatch(reset());
    // eslint-disable-next-line
  }, [isError, isSuccess, message]);
  const handleChange = (e) => {
    setNewTicketData({ ...newTicketdata, [e.target.id]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { product, description } = newTicketdata;
    if (description === "") {
      toast.error("Please enter description");
      return;
    }
    dispatch(createTicket({ product, description }));
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <BackButton url="/" />
      <main className="newTicket">
        <section className="newticket-head">
          <h1>Create new ticket</h1>
          <p>Please fill out the form below</p>
        </section>
        <section className="newticket-form">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Customer Name</label>
            <input
              type="text"
              value={newTicketdata.name}
              name="name"
              id="name"
              disabled
            ></input>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={newTicketdata.email}
              name="email"
              id="email"
              disabled
            ></input>
            <label htmlFor="product">Product:</label>
            <select name="product" id="product" onChange={handleChange}>
              <option value="iPhone">iPhone</option>
              <option value="Macbook Pro">Macbook Pro</option>
              <option value="iPad">iPad</option>
              <option value="iWatch">iWatch</option>
            </select>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              placeholder="Enter Product issue"
              value={newTicketdata.description}
              id="description"
              onChange={handleChange}
            ></textarea>
            <button className="submit-btn" type="submit">
              Submit
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

export default NewTicket;
