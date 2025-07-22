import React from "react";
import "./About.css";
import image from "../assets/img.png";

function About() {
  return (
    <div className="main-about-container">
      <div className="about-box">
        <div className="image-box">
          <img src={image} alt="My-Photo" className="image" />
        </div>
        <div className="content-box">
          <h1>Hii,</h1>
          <h3 className="name">
            I'm <span>Aditya Bhardwaj</span>
          </h3>
          <p className="about">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
            eveniet rerum dolorem alias minima atque temporibus, vitae minus
            obcaecati perspiciatis!
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
