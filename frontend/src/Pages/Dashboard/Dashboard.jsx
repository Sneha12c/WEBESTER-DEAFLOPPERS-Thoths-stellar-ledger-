import React, { useState } from 'react';
import HorizontalChart from '../../component/charthorizontal.jsx';

const Dashboard = () => {
  const [period, setPeriod] = useState('monthly');
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(2024);
  const Month = ["January" , "Febuary" , "March" , "April" , "May" , "June" , "July" ,"August" , "September" ,
    "October" , "November" , "December"
  ]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  p-6">
      <div className=" shadow-lg rounded-xl p-6 w-full h-full">
        <h1 className="text-3xl font-bold text-center mb-6 ">
          📊 Expense & Income Dashboard
        </h1>

        {/* Selection Controls */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
          <div>
            <label className="block font-medium mb-1">Select Time Period</label>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full text-deep-blue md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          {period === "weekly" && (
        <div className="flex gap-2">
          <select
            className="p-2 border rounded-md  text-deep-blue"
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
          >
            {[...Array(12).keys()].map((m) => (
              <option key={m + 1} value={m + 1}>
                 {Month[m-1]}
              </option>
            ))}
          </select>

          <input
            className="p-2 border rounded-md  text-deep-blue"
            type="number"
            min="100"
            max="9999"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            placeholder="Year"
          />
        </div>
      )}

        {period === "monthly" && (
        <div className="flex gap-2">
          <input
            className="p-2 border rounded-md  text-deep-blue"
            type="number"
            min="100"
            max="9999"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            placeholder="Year"
          />
        </div>
        )}

        {period === "yearly" && (
        <input
          className="p-2 border rounded-md  text-deep-blue"
          type="number"
          min="100"
          max="9999"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          placeholder="Year"
        />
        )}
          
        </div>

        <div className="bg-sky w-full p-1 rounded-lg shadow-md h-full">
          <HorizontalChart period={period} month={month} year={year} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
