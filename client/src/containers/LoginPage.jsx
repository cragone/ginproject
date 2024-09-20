import React from 'react';

const LoginPage = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-base-100">
            {/* Title Section */}
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-primary">Plan Your Wedding the Simple Way</h1>
                <p className="text-lg text-secondary mt-2">With ease and elegance</p>
            </div>

            {/* Login Card */}
            <div className="card w-96 bg-neutral shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-center text-primary">Login</h2>

                    {/* Login Form */}
                    <form>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-primary">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="input input-bordered border-secondary focus:border-accent"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-primary">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="input input-bordered border-secondary focus:border-accent"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="form-control mt-6 flex justify-between">
                            <a href="/HomePage" className="btn btn-primary bg-primary hover:bg-primary-focus border-none">Login</a>
                            <a href="/Register" className="btn btn-outline text-primary border-primary hover:bg-accent">
                                Register here
                            </a>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
