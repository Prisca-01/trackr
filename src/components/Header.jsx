import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCircle } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };



  return (
    <header className="bg-gray-800 p-4 text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Trackr</h1>

        <div>
          <FontAwesomeIcon
            icon={faBars}
            className="text-xl cursor-pointer"
            onClick={toggleSidebar}
          />
          <Link to="/" className="mt-4 ml-4">
            <FontAwesomeIcon icon={faCircle} />
          </Link>
        </div>
      </div>

      {/* Sidebar */}
      <nav
        className={` ${
          isSidebarOpen ? "block" : "hidden"
        } absolute top-0 left-0 h-full bg-gray-800 overflow-auto transition-all duration-300 ease-in-out z-10`}
      >
        <Link
          to="/"
          className="px-4 py-2 text-white block hover:bg-gray-700 rounded"
        >
          Home
        </Link>
        <Link
          to="/dashboard"
          className="px-4 py-2 text-white block hover:bg-gray-700 rounded"
        >
          Dashboard
        </Link>
        <Link
          to="/"
          className="px-4 py-2 text-white block hover:bg-gray-700 rounded"
        >
          Daily Progress
        </Link>
        <Link
          to="/"
          className="px-4 py-2 text-white block hover:bg-gray-700 rounded"
        >
          Weekly Progress
        </Link>
        <Link
          to="/"
          className="px-4 py-2 text-white block hover:bg-gray-700 rounded"
        >
          Monthly Progress
        </Link>
        <Link
          to="/"
          className="px-4 py-2 text-white block hover:bg-gray-700 rounded"
        >
          Overall Progress
        </Link>
        <Link
          to="/"
          className="px-4 py-2 text-white block hover:bg-gray-700 rounded"
        >
          Custom Progress
        </Link>
        <Link
          to="/"
          className="px-4 py-2 text-white block hover:bg-gray-700 rounded"
        >
          Badges
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