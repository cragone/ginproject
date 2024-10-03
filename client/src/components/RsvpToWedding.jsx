import React, { useEffect, useState } from "react";
import axios from "axios";


//need to update this so it is not case sensitive.

const RsvpToWedding = ({ userLname }) => {
  const apiRoute = import.meta.env.VITE_APP_API_BASE;
  const [email, setEmail] = useState("");
  const [rsvp, setRsvp] = useState("");
  const token = localStorage.getItem("token");
  const userLastName = userLname
  // const weddingId = localStorage.getItem("wedding_id");


  const handleRsvpSelection = (rsvpSelect) => {
    setRsvp(rsvpSelect)
  }
  console.log(userLname)
  const handleSubmit = async () => {
    const jsonData = {
    email: email,
    rsvp: rsvp === "true"
  };

    console.log(jsonData);

    axios
      .post(`${apiRoute}/rsvp/decided`, jsonData, {
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      })
      .then((response) =>{
        setEmail("");
        setRsvp("");
        console.log(response)
        alert("rsvp made")
        window.location.reload()

      })
      .catch((error) => {
        console.log("RSVP failed:",error)
        alert("rsvp failed")
      })
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
    <div className="flex flex-col items-center bg-neutral p-8 rounded-lg">
      <h1 className="text-3xl font-bold text-primary mb-4">RSVP to {userLastName}'s Wedding</h1>
  
      {/* First Name Input */}
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input input-bordered border-secondary focus:border-accent w-full max-w-xs mb-4"
      />

  
      {/* RSVP Dropdown */}
      <div className="dropdown dropdown-hover mb-4">
        <div tabIndex={0} role="button" className="btn bg-secondary text-primary">
          RSVP
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          <li>
            <a onClick={() => handleRsvpSelection("true")} className="text-primary hover:bg-accent">Yes</a>
          </li>
          <li>
            <a onClick={() => handleRsvpSelection("false")} className="text-primary hover:bg-accent">No</a>
          </li>
        </ul>
      </div>
  
      {/* Submit Button */}
      <button
        className="btn btn-primary bg-primary hover:bg-primary-focus text-white"
        onClick={handleSubmit}
        disabled={email === "" || !rsvp}
      >
        Submit
      </button>
    </div>
  </div>
  
  );
};

export default RsvpToWedding;
