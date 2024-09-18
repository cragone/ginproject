import React, { useEffect, useState } from "react";
import axios from "axios";


//need to update this so it is not case sensitive.

const RsvpToWedding = () => {
  const apiRoute = "localhost";
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [rsvp, setRsvp] = useState("");


  const handleRsvpSelection = (rsvpSelect) => {
    setRsvp(rsvpSelect)
  }

  const handleSubmit = async () => {
    const jsonData = {
    f_name: firstName,
    l_name: lastName,
    rsvp: rsvp === "true"
  };

    console.log(jsonData);

    axios
      .post(`http://${apiRoute}:8080/rsvp/decided`, jsonData, {
        "Content-Type": "application/json"
      })
      .then((response) =>{
        setFirstName("");
        setLastName("");
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
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">RSVP to the Wedding</h1>
        {/* <label>First Name</label> */}
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value)
          }}
          className="input w-full max-w-xs"
        />
        {/* <label>Last Name</label> */}
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value)
          }}
          className="input w-full max-w-xs"
        />
        {/* <label>RSVP</label> */}
        <div className="dropdown dropdown-hover">
          <div tabIndex={0} role="button" className="btn m-1">
            RSVP
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            <li>
              <a
              onClick={() => handleRsvpSelection("true")}>Yes</a>
            </li>
            <li>
              <a
              onClick={() => handleRsvpSelection("false")}>No</a>
            </li>
          </ul>
        </div>
        <button
        className="btn btn-glass btn-sm"
        onClick={handleSubmit}
        disabled={
          firstName === "" || lastName === "" || !rsvp
          }>
          submit
        </button>
      </div>
    </div>
  );
};

export default RsvpToWedding;
