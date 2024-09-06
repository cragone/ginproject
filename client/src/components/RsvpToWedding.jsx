import React from "react";


//will need a handle submit, relay to both the yes and no components. 
//upon clicking one it will handle the submit
//it will bind the yes or the no to the data depending on decision.

const RsvpToWedding = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">RSVP to the Wedding</h1>
        {/* <label>First Name</label> */}
        <input
          type="text"
          placeholder="First Name"
          className="input w-full max-w-xs"
        />
        {/* <label>Last Name</label> */}
        <input
          type="text"
          placeholder="Last Name"
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
              <a>Yes</a>
            </li>
            <li>
              <a>No</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RsvpToWedding;
