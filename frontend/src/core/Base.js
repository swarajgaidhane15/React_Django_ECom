import React from "react";
import Menu from "./Menu";

const Base = ({
  title = "My title",
  description = "My Description",
  className = "bg-dark text-white p-4",
  children,
}) => {
  return (
    <div>
      <Menu />
      <div className="container-fluid">
        <div className="jumbotron bg-dark text-white text-center">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <footer className="footer bg-dark mt-auto pu-3">
        <div className="container-fluid bg-success text-white py-3 text-center">
          <h4>For any question, reach me on Instagram</h4>
          <button className="btn btn-warning btn-lg">Contact Us</button>
          <div className="container">
            <span className="text-warning">
              An Amazing Store using React and Django !!
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Base;
