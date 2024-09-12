import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const EarningsChart = () => {
  const [period, setPeriod] = useState('weekly');

  // Data for the line chart
  const data = {
    labels: ['', '', '', '', '', '', ''], 
    datasets: [
      {
        label: 'Total Earning ($)',
        data: [300, 500, 400, 600, 750, 850, 900],
        borderColor: '#6C0FD7', 
        backgroundColor: '#6C0FD7',
        fill: false,
        tension: 0.4,
      },
      {
        label: 'Fee Earning ($)',
        data: [430, 60, 70, 100, 120, 130, 500],
        borderColor: '#F07D00', 
        backgroundColor: '#F07D00',
        fill: false,
        tension: 0.4,
      },
      {
        label: 'Promotion Earning ($)',
        data: [ 340, 45, 50, 60, 55,480,500],
        borderColor: '#0085FF', 
        backgroundColor: '#0085FF',
        fill: false,
        tension: 0.4,
      },
    ],
  };

  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false, 
        },
        ticks: {
          display: false, 
        },
      },
      y: {
        grid: {
          display: true,
        },
        min: 0, 
        max: 1000, 
        ticks: {
          stepSize: 200, 
        },
      },
    },
    plugins: {
      legend: {
        display: false, 
      },
      
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg mb-4 w-full font-poppins shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold">Earnings</h3>
        <select
          className="border p-2 rounded"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <div className="w-full h-52"> 
        <Line data={data} options={options} />
      </div>

      {/* Custom Legend with dots */}
      <div className="flex justify-center mt-4 space-x-8 text-sm font-poppins">
        <div className="flex items-center">
          <span className="w-3 h-3 bg-[#6C0FD7] inline-block rounded-full mr-2"></span>
          <span>Total Earning</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 bg-[#F07D00] inline-block rounded-full mr-2"></span>
          <span>Fee Earning</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 bg-[#0085FF] inline-block rounded-full mr-2"></span>
          <span>Promotion Earning</span>
        </div>
      </div>
    </div>
  );
};

export default EarningsChart;
