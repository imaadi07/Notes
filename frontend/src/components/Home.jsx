import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="main-home-box">
      <div className="home-box">
        <div className="heading-box">
          <h1 className="heading">
            WELCOME <span>.</span>
          </h1>
        </div>
        <div onClick={() => navigate("/register")} className="btn-box">
          <p>Get Started</p>
          <FaArrowRight
            style={{
              fontSize: "20px",
              color: "white",
              position: "relative",
              top: "1px",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
