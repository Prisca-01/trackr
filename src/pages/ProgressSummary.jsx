import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectTaskById,
  selectDailyEntriesByTask,
  selectWeeklyProgress,
  selectMonthlyProgress,
} from "../utils/reducers";
import { Chart, CategoryScale, LinearScale, BarElement } from "chart.js";
import { Bar } from "react-chartjs-2";

Chart.register(CategoryScale, LinearScale, BarElement);

const ProgressSummary = () => {
  const { taskId } = useParams();
  const task = useSelector((state) => selectTaskById(state, taskId));
  const dailyEntries = useSelector((state) =>
    selectDailyEntriesByTask(state, taskId)
  );
  const weeklyTotal = useSelector((state) =>
    selectWeeklyProgress(state, taskId)
  );
  const monthlyTotal = useSelector((state) =>
    selectMonthlyProgress(state, taskId)
  );
  // Calculate insights based on dailyEntries
  const totalValue = dailyEntries.reduce(
    (sum, entry) => sum + (parseFloat(entry.value) || 0),
    0
  );
  const totalHours =
    task.type === "time" || task.type === "duration" ? totalValue : 0; // Hours only apply to "time" and "duration"

  const averageValuePerDay = (totalValue / (dailyEntries.length || 1)).toFixed(
    1
  );

  // const averageValuePerDay =
  //   task.type === "time" || task.type === "duration"
  //     ? (totalHours / dailyEntries.length).toFixed(1)
  //     : null;

  const activeDays = [...new Set(dailyEntries.map((entry) => entry.date))]
    .length; // Unique active days
  const longestStreak = calculateLongestStreak(dailyEntries);

  function calculateLongestStreak(entries) {
    let streak = 0,
      maxStreak = 0;
    for (let i = 0; i < entries.length; i++) {
      if (entries[i].value > 0) streak++;
      else streak = 0;
      maxStreak = Math.max(streak, maxStreak);
    }
    return maxStreak;
  }

  // Data for the bar chart (omit chart for checkmark task type)
  const data =
    task.type === "checkmark"
      ? null
      : {
          labels: dailyEntries.map((entry) => entry.date),
          datasets: [
            {
              label:
                task.type === "time" || task.type === "duration"
                  ? "Hours Logged"
                  : "Values Tracked",
              data: dailyEntries.map((entry) => entry.value),
              backgroundColor: "rgba(54, 162, 235, 0.6)",
            },
          ],
        };

  const options = {
    scales: {
      x: {
        type: "category", // x-axis uses category scale
      },
      y: {
        type: "linear", // y-axis uses linear scale
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="container mx-auto py-6 mt-20">
      <h1 className="text-3xl font-bold text-center mb-6">
        Trackr: {task.name} Progress
      </h1>
      <p className="text-lg text-gray-400 text-center mt-2">{`Track your progress for ${task.name}`}</p>

      {/* Insights Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {task.type === "time" || task.type === "duration" ? (
          <>
            <div className="bg-white shadow-lg p-4 rounded-lg text-center">
              <h2 className="text-2xl font-bold">
                {averageValuePerDay} hours/day
              </h2>
              <p className="text-gray-600">Average Hours Per Day</p>
            </div>
            <div className="bg-white shadow-lg p-4 rounded-lg text-center">
              <h2 className="text-2xl font-bold">{totalHours} hours</h2>
              <p className="text-gray-600">Total Hours Logged</p>
            </div>
          </>
        ) : (
          <div className="bg-white shadow-lg p-4 rounded-lg text-center">
            <h2 className="text-2xl font-bold">{totalValue}</h2>
            <p className="text-gray-600">Total Value Tracked</p>
          </div>
        )}
        <div className="bg-white shadow-lg p-4 rounded-lg text-center">
          <h2 className="text-2xl font-bold">{activeDays} days</h2>
          <p className="text-gray-600">Active Days</p>
        </div>
        <div className="bg-white shadow-lg p-4 rounded-lg text-center">
          <h2 className="text-2xl font-bold">{longestStreak}</h2>
          <p className="text-gray-600">Longest Streak</p>
        </div>

        <div className="bg-white shadow-lg p-4 rounded-lg text-center">
          <h2 className="text-2xl font-bold">
            {weeklyTotal} {task.type === "other" ? "total" : "hours"}
          </h2>
          <p className="text-gray-600">Total This Week</p>
        </div>

        <div className="bg-white shadow-lg p-4 rounded-lg text-center">
          <h2 className="text-2xl font-bold">
            {monthlyTotal} {task.type === "other" ? "total" : "hours"}
          </h2>
          <p className="text-gray-600">Total This Month</p>
        </div>
      </div>

      {/* Chart Section */}
      {task.type !== "checkmark" && (
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Active Hours Breakdown</h3>
          <Bar data={data} options={options} />
        </div>
      )}

      {/* Comments/Insights */}
      <section className="bg-blue-600 text-white p-6 rounded-lg mt-10">
        <h2 className="text-xl font-semibold">Insights</h2>
        <ul className="list-disc list-inside mt-4 space-y-2">
          <li>
            {task.type !== "other"
              ? `You were most consistent on ${
                  dailyEntries
                    .map((entry) => entry.date)
                    .indexOf(
                      Math.max(...dailyEntries.map((entry) => entry.value))
                    ) === 2
                    ? "Wednesday"
                    : "other days"
                }.`
              : "Keep up the good work on your other tasks!"}
          </li>
          <li>Try shorter, more frequent sessions for better progress.</li>
        </ul>
      </section>
    </div>
  );
};

export default ProgressSummary;
