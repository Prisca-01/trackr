import PropTypes from "prop-types";

// import { useState } from 'react';

// const TaskList = ({ activities }) => {
//   const [selectedActivity, setSelectedActivity] = useState(null);

//   const handleViewDetails = (activity) => {
//     setSelectedActivity(activity);
//   };

//   return (
//     <div className="mt-8">
//       <h2 className="text-xl font-bold mb-4">Tasks</h2>
//       {activities.length > 0 ? (
//         <ul>
//           {activities.map((activity, index) => (
//             <li key={index} className="mb-4 p-4 bg-white rounded shadow-md">
//               <div className="flex justify-between items-center">
//                 <div>
//                   <h3 className="text-lg font-semibold">{activity.name}</h3>
//                   <p className="text-gray-700">{activity.description}</p>
//                 </div>
//                 <button
//                   onClick={() => handleViewDetails(activity)}
//                   className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
//                 >
//                   View Details
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No tasks added yet.</p>
//       )}

//       {selectedActivity && (
//         <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
//           <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
//             <h2 className="text-2xl font-bold mb-4">Activity Details</h2>
//             <p><strong>Name:</strong> {selectedActivity.name}</p>
//             <p><strong>Type:</strong> {selectedActivity.type}</p>
//             <p><strong>Value:</strong> {selectedActivity.value}</p>
//             <p><strong>Max Time:</strong> {selectedActivity.time}</p>
//             <p><strong>Duration:</strong> {selectedActivity.duration}</p>
//             <p><strong>Start Date:</strong> {selectedActivity.startDate}</p>
//             <p><strong>End Date:</strong> {selectedActivity.endDate}</p>
//             <p><strong>Description:</strong> {selectedActivity.description}</p>
//             <button
//               onClick={() => setSelectedActivity(null)}
//               className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// TaskList.propTypes = {
//   activities: PropTypes.arrayOf(PropTypes.object).isRequired,
// }
// export default TaskList;


import { Link } from "react-router-dom";

const TaskList = ({activities, title}) => {
    
    return ( 
        <div className="blog-list">
            <h2>{title}</h2>
            {activities.map((activity) => (
                <div className="activity-preview" key={activity.id}>
                    <Link to={`/activities/${activity.id}`}>
                    <h2>{activity.activityname}</h2>
                    <p> {activity.type}</p>
                    <p>{activity.description}</p>
                    </Link>
                    {/* <button onClick={() => handleDelete(activity.id)}>Delete blog</button> */}
                </div>
            ))}
        </div>
     );
}

TaskList.propTypes = {
  activities: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired
}
 
export default TaskList;