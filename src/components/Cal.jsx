import { useState, useEffect, useMemo } from "react";
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

const TaskCalendar = ({ setSelectedDate, filterTasksByDate }) => {
  const today = useMemo(() => new Date(), []);
  const [currentWeek, setCurrentWeek] = useState(
    startOfWeek(today, { weekStartsOn: 0 })
  );
  const [selectedDay, setSelectedDay] = useState(today);

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

  const handleDateClick = (day) => {
    setSelectedDay(day);
    const formattedDate = format(day, "yyyy-MM-dd");
    setSelectedDate(formattedDate);
    filterTasksByDate(formattedDate);
  };

  useEffect(() => {
    // When the current week changes, make sure the selected day is still in view
    if (
      !isSameDay(selectedDay, today) &&
      (selectedDay < currentWeek || selectedDay > addDays(currentWeek, 6))
    ) {
      setSelectedDay(today);
      const formattedDate = format(today, "yyyy-MM-dd");
      setSelectedDate(formattedDate);
      filterTasksByDate(formattedDate);
    }
  }, [
    currentWeek,
    selectedDay,
    today,
    setSelectedDate,
    filterTasksByDate,
  ]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4 md:mb-8">
        <button onClick={handlePreviousWeek} className="p-2">
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <h2 className="text-xl md:text-2xl font-semibold">
          {format(currentWeek, "MMMM yyyy")}
        </h2>
        <button onClick={handleNextWeek} className="p-2">
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
      <div {...handlers} className="grid grid-cols-7  md:gap-4">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className={`text-center cursor-pointer p-2 rounded mx-auto shadow-md
              ${isSameDay(day, today) ? "bg-gray-800 text-white" : ""}
              ${isSameDay(day, selectedDay) ? "bg-gray-400" : ""}
              ${day.getDay() === 0 ? "col-start-1" : ""}
              ${day.getDay() === 6 ? "col-end-8" : ""}
            `}
            onClick={() => handleDateClick(day)}
          >
            <div className="text-xs md:text-sm font-semibold">
              {format(day, "EEE")}
            </div>
            <div className="text-sm md:text-lg">{format(day, "dd")}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

TaskCalendar.propTypes = {
  setSelectedDate: PropTypes.func.isRequired,
  filterTasksByDate: PropTypes.func.isRequired,
};

export default TaskCalendar;
