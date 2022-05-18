import { FaArrowAltCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
function BackButton({ url }) {
  return (
    <Link to={url} className="back-btn">
      <FaArrowAltCircleLeft /> Back
    </Link>
  );
}

export default BackButton;
