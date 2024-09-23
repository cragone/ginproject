import React, { useState, useEffect } from "react";
import axios from "axios";

const InviteList = () => {
  const apiRoute = "localhost:8080";
  const [attendees, setAttendees] = useState([]);
  const [error, setError] = useState("");
  const weddingId = localStorage.getItem("wedding_id");
  const token = localStorage.getItem("token");
  console.log(weddingId);
  console.log(token);

  useEffect(() => {
    if (!weddingId) {
      setError("Wedding ID not found in localStorage");
      return;
    }
    const jsonData = {
      wedding_id: parseInt(weddingId),
    };

    // Send wedding_id as part of the request body
    axios
      .post(`http://${apiRoute}/attendees/displayed`, jsonData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      })
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
  }, [weddingId]); // Add wedding_id as a dependency to re-run if it changes

  return (
    <div className="overflow-x-auto bg-neutral p-4 rounded-lg shadow-md">
      {error && <p className="text-error">{error}</p>}
      <table className="table table-xs text-primary border-accent w-full">
        <thead>
          <tr className="text-left">
            <th className="bg-secondary text-primary"></th>
            <th className="bg-secondary text-primary">First Name</th>
            <th className="bg-secondary text-primary">Last Name</th>
            <th className="hidden sm:table-cell bg-secondary text-primary">
              Email
            </th>
            {/* Hidden on small screens */}
            <th className="hidden sm:table-cell bg-secondary text-primary">
              Phone Number
            </th>
            {/* Hidden on small screens */}
            <th className="bg-secondary text-primary">RSVP</th>
            <th className="bg-secondary text-primary"></th>
          </tr>
        </thead>
        <tbody>
          {attendees.map((attendee, index) => (
            <tr key={index} className="hover:bg-accent">
              <th className="text-secondary">{index + 1}</th>
              <td>{attendee.f_name}</td>
              <td>{attendee.l_name}</td>
              <td className="hidden sm:table-cell">{attendee.email}</td>
              {/* Hidden on small screens */}
              <td className="hidden sm:table-cell">
                {attendee.phone_number}
              </td>
              {/* Hidden on small screens */}
              <td>{attendee.rsvp ? "Yes" : "No"}</td>
              <td>
                <DeleteButton
                  firstName={attendee.f_name}
                  lastName={attendee.l_name}
                  apiRoute={apiRoute}
                />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th className="bg-secondary text-primary"></th>
            <th className="bg-secondary text-primary">First Name</th>
            <th className="bg-secondary text-primary">Last Name</th>
            <th className="hidden sm:table-cell bg-secondary text-primary">
              Email
            </th>
            {/* Hidden on small screens */}
            <th className="hidden sm:table-cell bg-secondary text-primary">
              Phone Number
            </th>
            {/* Hidden on small screens */}
            <th className="bg-secondary text-primary">RSVP</th>
            <th className="bg-secondary text-primary"></th>
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
      l_name: lastName,
    };
    console.log(jsonData);

    axios
      .delete(`http://${apiRoute}/attendees/deleteattendee`, {
        data: jsonData,
        headers: {
          "Content-Type": "application/json",
        },
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
      className="btn btn-glass btn-error hover:bg-error-focus text-white w-full max-w-xs"
      onClick={handleSubmit}
    >
      Remove
    </button>
  );
};
