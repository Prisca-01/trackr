import { useState } from "react";
import {
  format,
  addDays,
  startOfWeek,
  addWeeks,
  subWeeks,
  isSameDay,
} from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useSwipeable } from "react-swipeable";
import PropTypes from "prop-types";

const TaskCalendar = ({ todos = {}, setSelectedDate }) => {
  const [currentWeek, setCurrentWeek] = useState(
    startOfWeek(new Date(), { weekStartsOn: 0 })
  );
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState(today); // Define selectedDate state

  const handlers = useSwipeable({
    onSwipedLeft: () => setCurrentWeek((prev) => addWeeks(prev, 1)),
    onSwipedRight: () => setCurrentWeek((prev) => subWeeks(prev, 1)),
  });

  const daysOfWeek = Array.from({ length: 7 }, (_, i) =>
    addDays(currentWeek, i)
  );

  const handlePreviousWeek = () => {
    setCurrentWeek(subWeeks(currentWeek, 1));
  };

  const handleNextWeek = () => {
    setCurrentWeek(addWeeks(currentWeek, 1));
  };

  const getTasksForDay = (date) => {
    const dateString = format(date, "yyyy-MM-dd");
    console.log(`Fetching tasks for date: ${dateString}`); // Log the date being processed
    console.log(`Todos object:`, todos); // Log the todos object
    return todos[dateString] || [];
  };

  const handleDateClick = (day) => {
    const formattedDate = format(day, "yyyy-MM-dd");
    setSelectedDate(formattedDate); // Call setSelectedDate to pass the selected date to parent component
    setSelectedDay(day); // Update selectedDate state in TaskCalendar component
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-8">
        <button onClick={handlePreviousWeek} className="p-2">
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <h2 className="text-2xl font-semibold">
          {selectedDay
            ? format(selectedDay, "MMMM yyyy")
            : format(currentWeek, "MMMM yyyy")}
        </h2>
        <button onClick={handleNextWeek} className="p-2">
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
      <div {...handlers} className="grid grid-cols-7 gap-4">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className={`text-center cursor-pointer p-2 rounded mx-auto shadow-xl ${
              isSameDay(day, today)
                ? "bg-gray-800 text-white"
                : "" || isSameDay(day, selectedDay)
                ? " bg-gray-400"
                : ""
            }`}
            onClick={() => handleDateClick(day)}
          >
            <div className="text-sm font-semibold">{format(day, "EEE")}</div>
            <div className="text-lg">{format(day, "dd")}</div>
            {/* <div
              className={`text-lg rounded-full w-8 h-8 flex items-center justify-center mx-auto ${
                isSameDay(day, today)
                  ? "bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto"
                  : ""
              } ${
                isSameDay(day, selectedDay) ? "border border-blue-500" : ""
              }`}
            >
              {format(day, "dd")}
            </div> */}
            <div>
              {getTasksForDay(day).map((task) => (
                <div key={task.id} className="text-lg">
                  {task.task}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

TaskCalendar.propTypes = {
  todos: PropTypes.object.isRequired,
  setSelectedDate: PropTypes.func.isRequired,
};

export default TaskCalendar;
