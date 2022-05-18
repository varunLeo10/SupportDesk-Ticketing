import { FaSignInAlt, FaEye } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(false);
  const { email, password } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, isSuccess, message, isLoading } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }
    if (isSuccess) {
      toast.success("Logged in Successfully");
      navigate("/");
    }
    // eslint-disable-next-line
  }, [isError, isSuccess, message]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <section className="register">
      <div>
        <div className="reg-head">
          <FaSignInAlt /> Login
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
          <button className="submit-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
