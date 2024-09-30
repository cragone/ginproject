import React, { useState } from "react";
import InviteList from "../components/InviteList";
import RsvpToWedding from "../components/RsvpToWedding";
import axios from 'axios'; // Import axios

const HomePage = () => {
  const apiRoute = import.meta.env.VITE_APP_API_BASE; // Define your API route here
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const rsvp = false
  const weddingId = localStorage.getItem("wedding_id")
  const token = localStorage.getItem("token")
  const userLname = localStorage.getItem("user_lname")
  console.log(userLname)


  const handleSubmit = async () => {
    const jsonData = {
      f_name: firstName,
      l_name: lastName,
      email: email,
      phone_number: phoneNumber,
      rsvp: rsvp,
      wedding_id: parseInt(weddingId) 
    }
    axios
      .post(`${apiRoute}/attendees/newattendee`, jsonData, {
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      })
      .then((response) => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhoneNumber("");
        console.log(response)
        alert("new attendee added")
        window.location.reload(); //reloads page on success
        })
      .catch((error) => {
        console.log("failed to add attendee:", error)
        alert("couldn't add attendee")
      })

  }

  // Render wedding components only after login
  return (
<div className="flex flex-col min-h-screen bg-base-100">
  <div className="w-full bg-primary text-white p-4 text-center">
  <h1 className="text-4xl font-bold">The {userLname}'s Wedding</h1>   
  </div>
  {/* Main Content Area */}
  <div className="flex flex-col md:flex-row flex-1">
    {/* RSVP Section */}
    <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-neutral p-4 md:p-8 rounded-lg md:rounded-l-lg shadow-md">
      {/* <h1 className="text-3xl font-bold text-primary mb-4">RSVP to the Wedding</h1> */}
      <RsvpToWedding />
    </div>

    {/* Wedding List Section */}
    <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-neutral p-4 md:p-8 rounded-lg md:rounded-r-lg shadow-md">
      <h1 className="text-3xl font-bold text-primary mb-4">Your Wedding List</h1>
      <InviteList />
    </div>
  </div>

  {/* Add New Invites Section */}
  <div className="flex flex-col items-center justify-center mt-4 mb-4 p-6 bg-base-100">
    <h1 className="text-2xl font-bold text-primary mb-4">Add New Invites</h1>

    {/* First Name Input */}
    <input
      type="text"
      placeholder="First Name"
      className="input input-bordered border-secondary focus:border-accent w-full max-w-xs mb-4"
      value={firstName}
      onChange={(e) => setFirstName(e.target.value)}
    />

    {/* Last Name Input */}
    <input
      type="text"
      placeholder="Last Name"
      className="input input-bordered border-secondary focus:border-accent w-full max-w-xs mb-4"
      value={lastName}
      onChange={(e) => setLastName(e.target.value)}
    />

    {/* Email Input */}
    <input
      type="text"
      placeholder="Email"
      className="input input-bordered border-secondary focus:border-accent w-full max-w-xs mb-4"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />

    {/* Phone Number Input */}
    <input
      type="text"
      placeholder="Phone Number"
      className="input input-bordered border-secondary focus:border-accent w-full max-w-xs mb-4"
      value={phoneNumber}
      onChange={(e) => setPhoneNumber(e.target.value)}
    />

    {/* Submit Button */}
    <button
      className="btn btn-primary bg-primary hover:bg-primary-focus text-white"
      onClick={handleSubmit}
      disabled={firstName === "" || lastName === "" || email === "" || phoneNumber === ""}
    >
      Submit
    </button>
  </div>
</div>


  );
};

export default HomePage;