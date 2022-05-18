import { Link } from "react-router-dom";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";
function Home() {
  const { isLoading } = useSelector((state) => state.auth);
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <section className="home">
      <div>
        <div className="home-head">
          <h1>What do you need help with?</h1>
          <p>Please choose from an option below</p>
        </div>
        <Link to="/new-ticket" className="home-link link-create">
          <FaQuestionCircle /> Create New Ticket
        </Link>
        <Link to="/tickets" className="home-link link-view">
          <FaTicketAlt /> View My Tickets
        </Link>
      </div>
    </section>
  );
}

export default Home;
