import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const useremail = email.toLowerCase()

    const data = await dispatch(login(useremail, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
    }
  };

  const demoLogin = (e) => {
    e.preventDefault();
    dispatch(sessionActions.login("demo@aa.io", "password"))
    closeModal()
  }

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className="mm">
        <ul className="mm">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label className="mm">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mmInput"
          />
        </label>
        <label className="mm">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mmInput"
          />
        </label>
        <button type="submit">Log In</button>
      </form>
      <div>
        <button onClick={demoLogin} type="submit">Demo User</button>
      </div>
    </>
  );
}

export default LoginFormModal;
