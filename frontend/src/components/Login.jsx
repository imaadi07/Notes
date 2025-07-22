import React from "react";
import { useForm } from "react-hook-form";
import "./Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleGoogleRegister = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  const handleLogin = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/login", data, {
        withCredentials: true,
      });
      if (response.status === 200) {
        alert(`Welcome ${response.data.name}`);
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/dashboard");
      }
    } catch (error) {
      alert(`Login Failed: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="main-register-box">
      <div className="register-box">
        <div className="register-card">
          <div className="right-box">
            <h1 className="register-heading">
              Login <span>.</span>
            </h1>
            <p>Keep everything at one place</p>
          </div>
          <div className="left-box">
            <form
              onSubmit={handleSubmit(handleLogin)}
              noValidate
              className="register-form"
            >
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
                  {isSubmitting ? "LogingIn..." : "Login"}
                </button>
              </div>
            </form>
            <button onClick={handleGoogleRegister} className="register-btn">
              Login with Google
            </button>
            <div>
              <p className="login-redirect">
                Have no account? <a href="/register">Register here</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
