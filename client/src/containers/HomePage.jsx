import React, { useEffect, useState } from "react";
import InviteList from "../components/InviteList";
// import axios from "axios";


const HomePage = () => {

  return (
    <div className="flex min-h-screen bg-gray-100">
  <div className="w-1/2 flex flex-col items-center justify-center">
    <h1 className="text-2xl font-bold mb-4">Plan Your Wedding</h1>
    <p>
      Add to the invite List  
    </p>
    <p>
    RSVP Guests
    </p>
    {/* <!-- Add your content for planning the wedding here --> */}
  </div>
  <div className="w-1/2 flex flex-col items-center justify-center">
    <h1 className="text-2xl font-bold mb-4">Your Wedding List</h1>
    <InviteList />
  </div>
</div>
  );
};

export default HomePage;
