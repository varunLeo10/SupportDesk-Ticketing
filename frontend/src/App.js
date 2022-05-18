import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import NewTicket from "./pages/NewTicket";
import PrivateRoute from "./components/PrivateRoute";
import Tickets from "./pages/Tickets";
import Ticket from "./pages/Ticket";
function App() {
  function formatDate(date) {
    let HH = 0;
    let AM = true;
    const formattedDate = [
      date.getDate().toString().padStart(2, "0"),
      (date.getMonth() + 1).toString().padStart(2, "0"),
      date.getFullYear().toString(),
    ].join("/");
    if (date.getHours() > 12) {
      HH = date.getHours() - 12;
      AM = false;
    } else {
      HH = date.getHours();
    }
    const formattedTime = [
      HH.toString().padStart(2, "0"),
      date.getMinutes().toString().padStart(2, "0"),
    ].join(":");
    return `${formattedDate} , ${formattedTime} ${AM ? "AM" : "PM"}`;
  }
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/new-ticket" element={<PrivateRoute />}>
              <Route path="/new-ticket" element={<NewTicket />} />
            </Route>
              <Route path="/tickets" element={<PrivateRoute />}>
                <Route path="/tickets" element={<Tickets formatDate={formatDate} />} />
              </Route>
              <Route path="/tickets/:ticketId" element={<PrivateRoute />}>
                <Route path="/tickets/:ticketId" element={<Ticket formatDate={formatDate}/>} />
              </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
