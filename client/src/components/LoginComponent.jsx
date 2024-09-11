import React, {useState, useEffect} from 'react';








const LoginComponent = () => {
 
  const [authCode, setAuthCode] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const googleClientId = import.meta.env.VITE_APP_CLIENT_ID;
  const googleRedirectUri = import.meta.env.VITE_APP_REDIRECT_URI


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    setAuthCode(code);
  }, []);

  useEffect(() => {
    if (authCode) {
      // Send auth code to backend to verify and exchange for access token
      fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: authCode }),
      })
        .then(response => response.json())
        .then(data => {
          setAccessToken(data.accessToken);
        });
    }
  }, [authCode]);

  const handleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${googleRedirectUri}&response_type=code&scope=openid+email+profile`;
  };

  return (
    <div className="grid h-screen place-items-center">
      {accessToken ? (
        <div>
          <p>Authenticated successfully!</p>
          <p>Access Token: {accessToken}</p>
        </div>
      ) : (
        <button onClick={handleLogin}>Login with Google</button>
      )}
    </div>
  );
};



export default LoginComponent;