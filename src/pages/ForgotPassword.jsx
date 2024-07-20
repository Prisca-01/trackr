// import Header from '../components/Header';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sending an email (for demo purposes)
    console.log('Sending password reset email to:', email);
    // Show a message or UI indicating that the email has been sent
    setEmailSent(true);
  };

  return (
    <div>
      {/* <Header /> */}
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Forgot Password?</h2>
      {!emailSent ? (
        <form className="w-full max-w-sm mt-6" onSubmit={handleSubmit}>
          <div className="mb-4 mx-8">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-gray-800 hover:bg-gray-900 text-white font-bold w-80 py-2 px-4 mt-6 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Reset Password
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center">
          <p className="text-gray-700 mb-4">An email has been sent to {email}. Please check your inbox.</p>
          <Link to="/login" className="text-blue-500 hover:underline">
            Return to Log In
          </Link>
        </div>
      )}
    </div>
    </div>
  );
};

export default ForgotPassword;
