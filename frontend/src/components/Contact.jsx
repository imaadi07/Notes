import React from "react";
import "./Contact.css";
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";

function Contact() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="main-contact-container">
      <div className="contact-box">
        <div className="left-contact-box">
          <div className="inner-left-box">
            <h2 className="contact-heading">Contact Me</h2>
            <div className="social-icons">
              <a
                href="https://www.linkedin.com/in/yourprofile"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin className="icon" />
              </a>
              <a
                href="https://www.instagram.com/yourprofile"
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram className="icon" />
              </a>
              <a
                href="https://github.com/yourprofile"
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub className="icon" />
              </a>
            </div>
          </div>
        </div>
        <div className="right-contact-box">
          <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                type="text"
                {...register("name", {
                  required: "Name is Required",
                })}
                className="input"
                placeholder="Enter Name"
              />
            </div>
            <div>
              <input
                type="email"
                className="input"
                {...register("email", {
                  required: "Email is required",
                })}
                placeholder="Enter Email"
              />
            </div>
            <div>
              <textarea
                rows={6}
                cols={38}
                className="text-area"
                {...register("message", { required: "Enter you message" })}
                placeholder="Enter your Message"
              ></textarea>
            </div>
            <div>
              <button type="submit" className="send-btn">
                Send Me
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
