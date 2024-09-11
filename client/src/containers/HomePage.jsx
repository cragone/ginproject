import React, { useEffect, useState } from "react";
import InviteList from "../components/InviteList";
import RsvpToWedding from "../components/RsvpToWedding";

const HomePage = () => {
  const [authCode, setAuthCode] = useState(null);
  const googleClientId = import.meta.env.VITE_APP_CLIENT_ID;
  const googleRedirectUri = import.meta.env.VITE_APP_REDIRECT_URI;
  const [accessToken, setAccessToken] = useState(null);

  // Extract auth code from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) {
      setAuthCode(code);
    }
  }, []);

  // Send auth code to backend for token exchange
  useEffect(() => {
    if (authCode) {
      fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: authCode }),
      })
        .then((response) => response.json())
        .then((data) => {
          setAccessToken(data.accessToken);
        })
        .catch((error) => {
          console.error("Error exchanging auth code:", error);
        });
    }
  }, [authCode]);

  // Parse access token from URL fragment if available
  useEffect(() => {
    const fragment = window.location.hash.substring(1);
    const params = new URLSearchParams(fragment);
    const token = params.get("access_token");

    if (token) {
      setAccessToken(token);
    }
  }, []);

  // Redirect user to Google login if not authenticated
  const handleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${googleRedirectUri}&response_type=code&scope=openid+email+profile`;
  };

  if (!accessToken) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <button onClick={handleLogin} className="px-4 py-2 bg-blue-600 text-white rounded">
          Login With Google
        </button>
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
