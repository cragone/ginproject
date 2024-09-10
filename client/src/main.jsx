import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'

// Ensure this environment variable is defined in your .env file and correctly prefixed with VITE_
const googleClientId = import.meta.env.VITE_APP_CLIENT_ID;

if (!googleClientId) {
  console.error('Google Client ID is not defined. Please check your .env file.');
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId={googleClientId}>
        <App />
    </GoogleOAuthProvider>
)

