import React, { useState } from "react";
import { Link } from "react-router-dom";

import { signup } from "../auth/helper";
import Base from "../core/Base";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const [toggle, setToggle] = useState(true);

  const { name, phone, email, password, error, success } = values;

  const handleChange = (e) => {
    setValues({ ...values, error: false, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password, phone })
      .then((data) => {
        console.log(data);
        if (data.email === email) {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            phone: "",
            success: true,
            error: "",
          });
        } else {
          setValues({
            ...values,
            error: data,
            success: false,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          {error.email && (
            <div
              className="alert alert-danger alert-dismissible fade show"
              role="alert"
              style={{ display: error ? "" : "none" }}
            >
              <strong>Email: {error.email[0]} </strong>
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
          {error.password && (
            <div
              className="alert alert-danger alert-dismissible fade show"
              role="alert"
              style={{ display: error ? "" : "none" }}
            >
              <strong>Password: {error.password[0]} </strong>
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
          {error.name && (
            <div
              className="alert alert-danger alert-dismissible fade show"
              role="alert"
              style={{ display: error ? "" : "none" }}
            >
              <strong>Name: {error.name[0]} </strong>
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
            <strong>
              New Account created for {email}. Please{" "}
              <Link to="/signin">login</Link> now !
            </strong>
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

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label htmlFor="name" className="text-light">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={name}
                placeholder="Name"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="text-light">
                Phone number
              </label>
              <input
                type="number"
                className="form-control"
                name="phone"
                value={phone}
                placeholder="Phone Number"
                onChange={handleChange}
              />
            </div>

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
                Signup
              </button>
              <div className="text-muted text-center">
                Already have an account? <Link to="/signin">Login</Link> here.
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign up" description="Signup for Sabka Store">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
    </Base>
  );
};

export default Signup;
