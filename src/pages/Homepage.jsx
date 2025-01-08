import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Welcome to Trackr</h1>
        <p className="text-lg text-gray-700 mb-8 text-center">Your ultimate productivity tool to track tasks, monitor progress, and boost your efficiency.</p>
        <Link to="/signup">
          <button className="px-6 py-3 bg-gray-800 text-white text-md rounded-md hover:bg-gray-900 focus:outline-none w-80">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
