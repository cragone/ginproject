import React from 'react';
import LoginComponent from '../components/LoginButton';







const LoginPage = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="w-full flex flex-col items-center justify-center">
                Congratulations, Welcome to the Wedding Report!
                <LoginComponent />
            </div>
        </div>
    )
}


export default LoginPage;