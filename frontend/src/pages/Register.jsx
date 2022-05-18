import { FaUser, FaEye } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password1: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [showPass1, setShowPass1] = useState(false);
  const { name, email, password, password1 } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }
    if (isSuccess) {
      toast.success("Registered Successfully");
      navigate("/");
    }
    // eslint-disable-next-line
  }, [user, isLoading, isError, isSuccess, message]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password1) {
      toast.error("Password doesn't match");
      return;
    }
    dispatch(register({ name, email, password }));
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <section className="register">
      <div>
        <div className="reg-head">
          <FaUser /> Register
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Enter Your Name"
            value={name}
            onChange={handleChange}
            required
          />
          <div className="pass-inp">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={handleChange}
              required
            />
            <FaEye onClick={() => setShowPass(!showPass)} />
          </div>
          <div className="pass-inp">
            <input
              type={showPass1 ? "text" : "password"}
              name="password1"
              placeholder="Confirm Your Password"
              value={password1}
              onChange={handleChange}
              required
            />
            <FaEye onClick={() => setShowPass1(!showPass1)} />
          </div>
          <button className="submit-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}

export default Register;
