import React, { useState } from "react";
import InviteList from "../components/InviteList";
import RsvpToWedding from "../components/RsvpToWedding";
import axios from 'axios'; // Import axios

const HomePage = () => {
  const apiRoute = "localhost:8080"; // Define your API route here
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const rsvp = false
  
  const handleSubmit = async () => {
    const jsonData = {
      f_name: firstName,
      l_name: lastName,
      email: email,
      phone_number: phoneNumber,
      rsvp: rsvp 
    }
    axios
      .post(`http://${apiRoute}/attendees/newattendee`, jsonData, {
        "Content-Type": "application/json"
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
    <div className="flex flex-col min-h-screen bg-gray-100">
      
        
      <div className="flex flex-1">
      {/* <h1 className="text-xl font-bold mb-2">The Simple Wedding</h1> */}
        <div className="w-1/2 flex flex-col items-center justify-center">
          <RsvpToWedding />
        </div>
        <div className="w-1/2 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Your Wedding List</h1>
          <InviteList />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-auto mb-4">
        <h1 className="text-xl font-bold mb-2">Add New Invites</h1>
        
        <input 
          type="text"
          placeholder="First Name"
          className="p-2 border border-gray-300 rounded"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value)
          }}
        />
        <input 
          type="text"
          placeholder="Last Name"
          className="p-2 border border-gray-300 rounded"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value)
          }}
        />
        <input 
          type="text"
          placeholder="Email"
          className="p-2 border border-gray-300 rounded"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        />
        <input 
          type="text"
          placeholder="Phone Number"
          className="p-2 border border-gray-300 rounded"
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value)
          }}
        />
        <button
        className="btn btn-glass btn-sm"
        onClick={handleSubmit}
        disabled={
          firstName === "" || lastName === "" || email === "" || phoneNumber === "" 
        }>
          Submit
        </button>
      </div>
    </div>
  );
};

export default HomePage;