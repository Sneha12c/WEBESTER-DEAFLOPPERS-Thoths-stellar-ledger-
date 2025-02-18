import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../redux/Slice/ChartSlice.js";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HorizontalChart = ({ period, month, year}) => {
  const dispatch = useDispatch();
  const { expense, income, loading, error } = useSelector((state) => state.Chart);
  const [chartData, setChartData] = useState(null);

  // Function to calculate start & end date based on period selection
  const getDateRange = () => {
    let startDate, endDate;

    if (period === "weekly") {
      startDate = new Date(year, month-2 , 1);
      endDate = new Date(year, month-2, 31);
    } else if (period === "monthly") {
      startDate = new Date(year, 1, 1);
      endDate = new Date(year, 12, 0);
    } else {
      startDate = new Date(year-4, 0, 1);
      endDate = new Date(year+4, 11, 31);
    }

    return { startDate: startDate.toISOString(), endDate: endDate.toISOString() };
  };

  useEffect(() => {
    const { startDate, endDate } = getDateRange();
    dispatch(fetchData({ startDate, endDate }));
  }, [dispatch, period, month, year ]);

  useEffect(() => {
    if (!expense || !income) return;

    let labels = [],
      expenseValues = [],
      incomeValues = [];

    if (period === "weekly") {
      labels = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];
    } else if (period === "monthly") {
      labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    } else {
      labels = Array.from({ length: 8 }, (_, i) => `${year - 4 + i}`);
    }

    const getPeriodIndex = (date) => {
      const parsedDate = new Date(date);
      
      if (period === "weekly") {
        return Math.ceil(parsedDate.getDate() / 7); 
      } else if (period === "monthly") {
        return parsedDate.getMonth(); 
      } else {
        return parsedDate.getFullYear()-year+4; 
      }
    };

    labels.forEach((_, index) => {
      const expenseTotal = expense
    .filter((e) => getPeriodIndex(e.date) === index)
    .reduce((sum, e) => sum + e.amount, 0);
    
    const incomeTotal = income
    .filter((i) => getPeriodIndex(i.date) === index)
    .reduce((sum, i) => sum + i.amount, 0);

     expenseValues.push(expenseTotal);
     incomeValues.push(incomeTotal);
    });
    
    setChartData({
      labels,
      datasets: [
        {
          label: "Expense",
          data: expenseValues,
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Income",
          data: incomeValues,
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    });
  }, [expense, income, period, year]);

  const options = {
    indexAxis: "y",
    responsive: true,
    plugins: {
      legend: { position: "right" },
      title: { display: true, text: `Finance Data (${period})` },
    },
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full max-w-[1500px] mx-auto p-4 bg-pink-50">
  <div className="relative w-full h-[300px] sm:h-[500px] md:h-[500px] ">
    {chartData ? (
      <Bar data={chartData} className="text-deep-blue text-md" options={{ 
        ...options, 
        maintainAspectRatio: false, 
        responsive: true
        
      }} />
    ) : (
      <p>Loading chart...</p>
    )}
  </div>
</div>

  );
};

export default HorizontalChart;
