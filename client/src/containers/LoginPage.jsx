import axios from "axios";
import React, { useState } from "react";

const LoginPage = () => {
  const apiRoute = "localhost:8080";
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission
    const jsonData = {
      UserEmail: userEmail,
      UserPassword: userPassword, // Ensure this matches the expected key in your backend
    };
    console.log(jsonData);

    try {
      const response = await axios.post(`http://${apiRoute}/auth/loggedin`, jsonData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setUserEmail("");
      setUserPassword("");
      console.log(response.data); // Log user information to the console
      alert("You have logged in");
    } catch (error) {
      console.log("Incorrect password or username", error);
      alert("Incorrect password or username");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-base-100">
      {/* Title Section */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-primary">
          Plan Your Wedding the Simple Way
        </h1>
        <p className="text-lg text-secondary mt-2">With ease and elegance</p>
      </div>

      {/* Login Card */}
      <div className="card w-96 bg-neutral shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center text-primary">Login</h2>

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-primary">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="input input-bordered border-secondary focus:border-accent w-full max-w-xs mb-4"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-primary">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                className="input input-bordered border-secondary focus:border-accent w-full max-w-xs mb-4"
              />
            </div>

            {/* Buttons */}
            <div className="form-control mt-6 flex justify-between">
              <button
                type="submit"
                className="btn btn-primary bg-primary hover:bg-primary-focus text-white w-full max-w-xs"
                disabled={userEmail === "" || userPassword === ""}
              >
                Login
              </button>
              <a
                href="/Register"
                className="btn btn-outline text-primary border-primary hover:bg-accent"
              >
                Register here
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
