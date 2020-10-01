import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

import { signin, authenticate, isAuthenticated } from "../auth/helper";
import Base from "../core/Base";

const Signup = () => {
  const [values, setValues] = useState({
    email: "clint@gmail.com",
    password: "123456",
    error: "",
    success: false,
  });

  const [toggle, setToggle] = useState(true);

  const { email, password, error, success } = values;

  const handleChange = (e) => {
    setValues({ ...values, error: false, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: false });
    signin({ email, password }).then((data) => {
      console.log(data);
      if (data.token) {
        let session_token = data.token;
        authenticate(session_token, () => {
          console.log("Token Added");
          setValues({
            ...values,
            success: true,
          });
        });
      }
      if (data.error) {
        setValues({
          ...values,
          success: false,
          error: data.error,
        });
      }
    });
  };

  const performRedirect = () => {
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          {error && (
            <div
              className="alert alert-danger alert-dismissible fade show"
              role="alert"
              style={{ display: error ? "" : "none" }}
            >
              <strong> {error} </strong>
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
            style={{ display: success ? "" : "none" }}
          >
            <strong>Login successfull :) Redirecting...</strong>
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const myStyle = {
    position: "absolute",
    color: "#555",
    fontSize: "20px",
    marginTop: "8px",
    right: "10px",
    cursor: "pointer",
  };

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label htmlFor="email" className="text-light">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={email}
                placeholder="Email"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="text-light">
                Password
              </label>
              <div className="input-group">
                <input
                  type={toggle ? "password" : "text"}
                  className="form-control"
                  name="password"
                  value={password}
                  placeholder="Password"
                  onChange={handleChange}
                />
                <div className="input-group-append" style={myStyle}>
                  <i
                    className="fa fa-eye"
                    style={{ display: toggle ? "" : "none" }}
                    aria-hidden="true"
                    onClick={() => setToggle(!toggle)}
                  ></i>
                  <i
                    className="fa fa-eye-slash"
                    style={{ display: toggle ? "none" : "" }}
                    aria-hidden="true"
                    onClick={() => setToggle(!toggle)}
                  ></i>
                </div>
              </div>
            </div>
            <div className="mb-3 text-center">
              <button className="btn btn-success" onClick={handleSubmit}>
                Login
              </button>
              <div className="text-muted text-center mt-2">
                Don't have an account? <Link to="/signup">Signup</Link> here.
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign in" description="Signin at Sabka Store">
      {performRedirect()}
      {successMessage()}
      {errorMessage()}
      {signInForm()}
    </Base>
  );
};

export default Signup;
