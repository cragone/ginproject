// App.js (or Login.js if you prefer a separate component)
import React from "react";


const handleGoogleLogin = () => {
  // Redirect the user to the Google login route on your Go backend
  window.location.href = "http://localhost:8080/auth/google";
};

return (
  <div className="flex items-center justify-center min-h-screen bg-base-200">
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-center">Login with Google</h2>
        <div className="card-actions justify-center mt-4">
          <button
            className="btn btn-primary w-full"
            onClick={handleGoogleLogin}
          >
            Login with Google
          </button>
        </div>
      </div>
    </div>
  </div>
);


export default handleGoogleLogin;
