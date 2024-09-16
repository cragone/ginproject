import React, { useState } from "react";
import InviteList from "../components/InviteList";
import RsvpToWedding from "../components/RsvpToWedding";
import { GoogleLogin } from '@react-oauth/google'; // Import the GoogleLogin component
import axios from 'axios'; // Import axios

const HomePage = () => {
  const apiRoute = "localhost:8080"; // Define your API route here

 

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