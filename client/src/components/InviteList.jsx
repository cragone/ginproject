import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InviteList = () => {
  const apiRoute = "localhost:8080";
  const [attendees, setAttendees] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://${apiRoute}/attendees/displayed`)
      .then((response) => {
        console.log("API Response:", response.data);
        if (Array.isArray(response.data)) {
          setAttendees(response.data);
        } else if (response.data && Array.isArray(response.data.attendees)) {
          setAttendees(response.data.attendees);
        } else {
          setError("Unexpected response format");
        }
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to retrieve attendees list");
      });
  }, []); // Empty dependency array to run only once on mount

  return (
    <div className="overflow-x-auto">
      {error && <p>{error}</p>}
      <table className="table table-xs table-pin-rows table-pin-cols">
        <thead>
          <tr>
            <th></th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>RSVP</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {attendees.map((attendee, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{attendee.f_name}</td>
              <td>{attendee.l_name}</td>
              <td>{attendee.email}</td>
              <td>{attendee.phone_number}</td>
              <td>{attendee.rsvp ? "Yes" : "No"}</td>
              <td>
              <DeleteButton 
              firstName={attendee.f_name}
              lastName={attendee.l_name}
              apiRoute={apiRoute}/>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>RSVP</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default InviteList;


const DeleteButton = ({ firstName, lastName, apiRoute }) => {
  const handleSubmit = async () => {
    const jsonData = {
      f_name: firstName,
      l_name: lastName
    };
    console.log(jsonData);

    axios
      .delete(`http://${apiRoute}/attendees/deleteattendee`, {
        data: jsonData,
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((response) => {
        console.log(response);
        alert("attendee removed from list");
        window.location.reload();
      })
      .catch((error) => {
        console.log("attendee removal failed:", error);
        alert("could not remove attendee");
      });
  };

  return (
    <button
      className="btn btn-glass btn-alert hover:bg-primary"
      onClick={handleSubmit}
    >
      Remove
    </button>
  );
};