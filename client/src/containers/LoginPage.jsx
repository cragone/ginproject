import React, { useState } from "react";
import InviteList from "../components/InviteList";
import RsvpToWedding from "../components/RsvpToWedding";
import { GoogleLogin } from '@react-oauth/google'; // Import the GoogleLogin component
import axios from 'axios'; // Import axios

const HomePage = () => {
  const [oneTimeCode, setOneTimeCode] = useState(null);
  const apiRoute = "localhost:8080"; // Define your API route here

  const responseMessage = async (response) => {
    console.log("One-time code:", response.code);
    setOneTimeCode(response.code);

    try {
      // Send the one-time code to your Go Gin server
      const res = await axios.post(`http://${apiRoute}/auth/exchangecode`, {
        code: response.code
      });
      console.log("Server response:", res.data);
    } catch (error) {
      console.error("Error sending one-time code to server:", error.response ? error.response.data : error.message);
    }
  };

  const errorMessage = (error) => {
    console.error("Login Failed:", error);
  };

  if (!oneTimeCode) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="justify-items-center">
          <h2>React Google Login</h2>
          <br />
          <br />
          <GoogleLogin
            onSuccess={responseMessage}
            onError={errorMessage}
            flow="auth-code" // Ensure you are using the authorization code flow
          />
        </div>
      </div>
    );
  }

  // Render wedding components only after login
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-1/2 flex flex-col items-center justify-center">
        <RsvpToWedding />
      </div>
      <div className="w-1/2 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Your Wedding List</h1>
        <InviteList />
      </div>
    </div>
  );
};

export default HomePage;