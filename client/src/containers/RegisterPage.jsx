import axios from "axios";
import React, { useState } from "react";

const RegisterPage = () => {
  const apiRoute = "localhost:8080";
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const handleSubmit = async () => {
    const jsonData = {
      user_email: userEmail,
      hashpassword: userPassword,
      user_fname: fname,
      user_lname: lname,
    };
    console.log(jsonData);

    axios
      .post(`http://${apiRoute}/auth/usercreated`, jsonData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setUserEmail("");
        setUserPassword("");
        setFname("");
        setLname("");
        console.log(response);
        alert("you have subcribed!");
        window.location.reload();
      })
      .catch((error) => {
        console.log("failed to subscribe:", error);
        alert("couldn't subscribe");
      });
  };
  return (
<div className="flex items-center justify-center min-h-screen bg-base-100">
      <div className="flex flex-col items-center bg-neutral p-8 shadow-xl rounded-lg">
        {/* Title */}
        <h2 className="text-3xl font-bold text-primary mb-6">Join Us</h2>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          className="input input-bordered border-secondary focus:border-accent w-full max-w-xs mb-4"
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
          className="input input-bordered border-secondary focus:border-accent w-full max-w-xs mb-4"
        />

        {/* First Name Input */}
        <input
          type="text"
          placeholder="First Name"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
          className="input input-bordered border-secondary focus:border-accent w-full max-w-xs mb-4"
        />

        {/* Last Name Input */}
        <input
          type="text"
          placeholder="Last Name"
          value={lname}
          onChange={(e) => setLname(e.target.value)}
          className="input input-bordered border-secondary focus:border-accent w-full max-w-xs mb-4"
        />

        {/* Subscribe Button */}
        <button
          className="btn btn-primary bg-primary hover:bg-primary-focus text-white w-full max-w-xs"
          onClick={handleSubmit}
          disabled={userEmail === "" || userPassword === "" || fname === "" || lname === ""}
        >
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
