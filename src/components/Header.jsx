import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCircle } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  
  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-800 text-white z-10 p-4">
      <div className="flex justify-between items-center md:mx-20">
        <Link to="/"><h1 className="text-xl font-bold">Trackr</h1></Link>
        <div className="hidden md:flex space-x-14">
          <Link to="/" className={`hover:text-gray-400 ${isActive('/') ? 'text-gray-400' : ''}`}>Home</Link>
          <Link to="/dashboard" className={`hover:text-gray-400 ${isActive('/dashboard') ? 'text-gray-400' : ''}`}>Dashboard</Link>
          
          <Link to="/badges" className={`hover:text-gray-400 ${isActive('/badges') ? 'text-gray-400' : ''}`}>Badges</Link>
          <Link to="/profile" className="ml-4">
            <FontAwesomeIcon icon={faCircle} className="text-xl" />
          </Link>
        </div>
        <div className="md:hidden">
          <FontAwesomeIcon
            icon={faBars}
            className="text-xl cursor-pointer"
            onClick={toggleSidebar}
          />
        </div>
      </div>

      {/* Sidebar for Mobile */}
      <nav
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:hidden absolute top-0 left-0 h-full w-full bg-gray-800 overflow-auto transition-all duration-300 ease-in-out z-10`}
      >
        <div className="p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Trackr</h1>
          <FontAwesomeIcon
            icon={faBars}
            className="text-xl cursor-pointer"
            onClick={toggleSidebar}
          />
        </div>
        <Link to="/" className={`px-4 py-2 text-white block hover:bg-gray-700 ${isActive('/') ? 'bg-gray-700' : ''}`}>
          Home
        </Link>
        <Link to="/dashboard" className={`px-4 py-2 text-white block hover:bg-gray-700 ${isActive('/dashboard') ? 'bg-gray-700' : ''}`}>
          Dashboard
        </Link>
        
        <Link to="/badges" className={`px-4 py-2 text-white block hover:bg-gray-700 ${isActive('/badges') ? 'bg-gray-700' : ''}`}>
          Badges
        </Link>
        <Link to="/profile" className={`px-4 py-2 text-white block hover:bg-gray-700 ${isActive('/profile') ? 'bg-gray-700' : ''}`}>
          Profile
        </Link>
      </nav>
    </header>
  );
};

export default Header;




// import { useState } from "react";

// import "./navbar.css";
// import { Link, NavLink } from "react-router-dom";

//  const Header = () => {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <nav>
//       <Link to="/" className="title">
//         Website
//       </Link>
//       <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
//         <span></span>
//         <span></span>
//         <span></span>
//       </div>
//       <ul className={menuOpen ? "open" : ""}>
//         <li>
//           <NavLink to="/about">About</NavLink>
//         </li>
//         <li>
//           <NavLink to="/services">Services</NavLink>
//         </li>
//         <li>
//           <NavLink to="/contact">Contact</NavLink>
//         </li>
//       </ul>
//     </nav>
//   );
// };
// export default Header;