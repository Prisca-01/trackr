import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faGoogle } from '@fortawesome/free-brands-svg-icons';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log("Signup form submitted", formData);
    navigate("/dashboard");
  };

  const handleGoogleSignup = () => {
    // Handle Google signup flow
    console.log("Initiating Google signup");
    // You can redirect to Google's authentication page or initiate the OAuth flow here
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">Trackr</h2>
        <p className="text-gray-700 mt-3">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </p>
        <form className="w-full max-w-sm mt-6" onSubmit={handleSubmit}>
          <div className="mb-3 mx-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-1"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              required
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 mx-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 mx-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-center ">
            <button
              className="bg-gray-800 hover:bg-gray-900 text-white font-bold w-80 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Create Account
            </button>
          </div>
        </form>
        <div className="mt-6 flex flex-col">
          <p className="text-gray-400 text-center">Or sign up with</p>
          <button
            className=" hover:bg-gray-400 font-lg py-2 px-4 mt-2 rounded outline outline-1 focus:outline-none focus:shadow-outline"
            onClick={handleGoogleSignup}
          ><FontAwesomeIcon icon={faGoogle} className="text-orange-600 mix-blend-color-burn"/>{" "}
            Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
