import React, { useCallback } from "react";
import auth from "../../api/Auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import Nav from "../Nav";

const Register = ({ history }) => {
  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await createUserWithEmailAndPassword(auth, email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  return (
    <div className="page-container">
      <div className="content-wrap">
        <Nav />
        <div className="login">
          <h1 className="logTitle">Sign up</h1>
          <form onSubmit={handleSignUp} className="logForm">
            <label className="email">
              <input name="email" type="email" placeholder="Email" />
            </label>
            <label className="email">
              <input name="password" type="password" placeholder="Password" />
            </label>
            <button type="submit" className="feature__btn">
              Sign Up
            </button>
          </form>
          <div className="link">
            <Link to="/login">Back to Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Register);
