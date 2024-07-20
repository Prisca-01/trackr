
const DailyEntry = () => {
  return (
    <div className="max-w-lg mx-auto my-8 p-4 bg-white shadow-md rounded-lg">
      <form action="" method="POST">
        <h1 className="text-2xl font-bold text-center mb-4">Daily Entry</h1>
        
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Coding</h2>
          <label htmlFor="date" className="block text-gray-700 mb-2">Date</label>
          <input type="date" id="date" name="date" className="w-full p-2 border border-gray-300 rounded-md" />
        </div>
        
        <div className="mb-4">
          <label htmlFor="value" className="block text-gray-700 mb-2">Value</label>
          <input type="text" id="value" name="value" className="w-full p-2 border border-gray-300 rounded-md" />
        </div>
        
        <div className="mb-4">
          <label htmlFor="break" className="block text-gray-700 mb-2">Break Day?</label>
          <select name="break" id="break" className="w-full p-2 border border-gray-300 rounded-md" defaultValue="select">
            <option value="select" disabled>Select Option</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        
        <div className="flex justify-center">
          <input
            type="submit"
            value="Submit"
            className="bg-blue-500 text-white p-2 rounded-md cursor-pointer hover:bg-blue-600 transition-colors duration-300"
          />
        </div>
      </form>
    </div>
  );
}

export default DailyEntry;
