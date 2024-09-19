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
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center">
      <input
          type="email"
          placeholder="Email"
          value={userEmail}
          onChange={(e) => {
            setUserEmail(e.target.value)
          }}
          className="input w-full max-w-xs"
        />
        <input
          type="password"
          placeholder="Password"
          value={userPassword}
          onChange={(e) => {
            setUserPassword(e.target.value)
          }}
          className="input w-full max-w-xs"
        />
        <input
          type="text"
          placeholder="First Name"
          value={fname}
          onChange={(e) => {
            setFname(e.target.value)
          }}
          className="input w-full max-w-xs"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lname}
          onChange={(e) => {
            setLname(e.target.value)
          }}
          className="input w-full max-w-xs"
        />
        <button
          className="btn btn-glass btn-alert hover:bg-primary"
          onClick={handleSubmit}
          disabled={
            userEmail === "" || userPassword === "" || fname === "" || lname === ""
          }>
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
