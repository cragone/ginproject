import React, { useEffect, useState } from "react";
import axios from "axios";



const TestHomePage = () => {
    const userLname = localStorage.getItem("user_lname");
    const [attendeeEmail, setAttendeeEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const apiRoute = import.meta.env.VITE_APP_API_BASE;

    const handleSubmit = async () => {
        const jsonData = {
            email: attendeeEmail,
            phone_number: phoneNumber,
        }
        axios.post(`${apiRoute}/attendees/updatenumber`, jsonData, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                setAttendeeEmail("");
                setPhoneNumber("");
                console.log(response);
                alert("updated phone number");
            })
            .catch((error) => {
                console.log(error);
                alert("phone number invalid");
                console.log(jsonData)
            })
    }
    return (
        <div className="flex flex-col min-h-screen bg-base-100">
            <div className="w-full bg-primary text-white p-4 text-center">
                <h1 className="text-4xl font-bold">The {userLname}'s Wedding</h1>
            </div>
            <div role="tablist" className="tabs tabs-lifted">
                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Tab 1" />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">

                </div>

                <input
                    type="radio"
                    name="my_tabs_2"
                    role="tab"
                    className="tab"
                    aria-label="Tab 2"
                     />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                    <input
                        type="email"
                        placeholder="yourname@example.com"
                        aria-label="Attendee Email"
                        onChange={(e) => setAttendeeEmail(e.target.value)}
                        value={attendeeEmail}
                    />

                    <input
                        type="text"
                        placeholder="5123456789"
                        aria-label="Attendee Phone Number"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        value={phoneNumber}
                    />

                    <button
                        className="btn btn-primary bg-primary hover:bg-primary-focus text-white w-full max-w-xs"
                        onClick={handleSubmit}
                        disabled={!attendeeEmail || !phoneNumber}
                    >
                        Submit
                    </button>
                </div>

                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Tab 3" />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                    Tab content 3
                </div>
            </div>
        </div>
    )
}

export default TestHomePage;