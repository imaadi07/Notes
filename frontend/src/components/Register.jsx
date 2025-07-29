import React from "react";
import { useForm } from "react-hook-form";
import "./Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleGoogleRegister = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  const handleRegister = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/register`,
        data,
        { withCredentials: true }
      );
      if (response.status === 201 || response.status === 200) {
        alert("Registration Successful");
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/dashboard");
      }
    } catch (error) {
      alert(
        `Registration Failed: ${error.response?.data?.message || error.message}`
      );
    }
  };

  return (
    <div className="main-register-box">
      <div className="register-box">
        <div className="register-card">
          <div className="right-box">
            <h1 className="register-heading">
              Register <span>.</span>
            </h1>
            <p>Keep everything at one place</p>
          </div>
          <div className="left-box">
            <form
              onSubmit={handleSubmit(handleRegister)}
              noValidate
              className="register-form"
            >
              <div>
                <input
                  className="input-box"
                  type="text"
                  {...register("name", {
                    required: "Name is required",
                  })}
                  placeholder="Name"
                />
                {errors.name && <p>{errors.name.message}</p>}
              </div>
              <div>
                <input
                  className="input-box"
                  type="email"
                  placeholder="E-mail"
                  {...register("email", {
                    required: "Emial is required",
                  })}
                />
                {errors.email && <p>{errors.email.message}</p>}
              </div>
              <div>
                <input
                  className="input-box"
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "Enter the password",
                    minLength: {
                      value: 6,
                      message: "Min. 6 character",
                    },
                    maxLength: {
                      value: 12,
                      message: "Max 12 Character",
                    },
                  })}
                />
                {errors.password && <p>{errors.password.message}</p>}
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="register-btn"
                >
                  {isSubmitting ? "Registering..." : "Register"}
                </button>
              </div>
            </form>
            <button onClick={handleGoogleRegister} className="register-btn">
              Register with Google
            </button>
            <div>
              <p className="login-redirect">
                Already have an account? <a href="/login">Login here</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
