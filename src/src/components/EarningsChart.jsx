import { useEffect, useState } from 'react';
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

import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const EarningsChart = () => {
  const [period, setPeriod] = useState('weekly');
  const [feeEarn, setfeeEarn] = useState([]);
  const [totalEarn, settotalEarn] = useState([]);
  const token  = localStorage.getItem('authToken')
  const dateLabels = ['20 July, 2024', '21 July, 2024', '22 July, 2024', '23 July, 2024', '24 July, 2024', '25 July, 2024', '26 July, 2024'];

  const fetchEarn =  async () =>{
    const url = "https://apiv2.blkhedme.com/api/admin/dashboard/statistics";
    try {
      const res = await axios.get(url,{
        headers : {
          'Accept': 'application/json',
          "Authorization": `Bearer ${token}`,
        }
      })

        setfeeEarn(res.data.data.graph_fee_earning);
        settotalEarn(res.data.data.graph_total_earning);
      console.log(feeEarn);
      

      
    } catch (err) {
      console.log(err.message);
      
    }
  }
  
  const Feeprices = feeEarn.length ? feeEarn.map(item => parseFloat(item.price)) : [430, 60, 70, 100, 120, 130, 500];
  const totalprices = totalEarn.length ? totalEarn.map(item => parseFloat(item.price)) : [430, 60, 70, 100, 120, 130, 500];
  console.log(Feeprices);
  
  // Data for the line chart
  const data = {
    labels: ['', '', '', '', '', '', ''], 
    datasets: [
      {
        label: 'Total Earning ($)',
        data: totalprices,
        borderColor: '#6C0FD7', 
        backgroundColor: function(context) {
          const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, 'rgba(108, 15, 215, 0.5)');
          gradient.addColorStop(1, 'rgba(108, 15, 215, 0)');
          return gradient;
        },
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Fee Earning ($)',
        data: Feeprices,
        borderColor: '#F07D00', 
        backgroundColor: function(context) {
          const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, 'rgba(240, 125, 0, 0.5)');
          gradient.addColorStop(1, 'rgba(240, 125, 0, 0)');
          return gradient;
        },
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Promotion Earning ($)',
        data: [340, 45, 50, 60, 55, 480, 500],
        borderColor: '#0085FF', 
        backgroundColor: function(context) {
          const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, 'rgba(0, 133, 255, 0.5)');
          gradient.addColorStop(1, 'rgba(0, 133, 255, 0)');
          return gradient;
        },
        fill: true,
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
          display: false,  // Hides ticks on x-axis
        },
      },
      y: {
        grid: {
          display: true,
        },
        min: 0, 
        max: 5500, 
        ticks: {
          stepSize: 200, 
        },
      },
    },
    plugins: {
      tooltip: {
        backgroundColor: '#ffffff', // White background
        titleColor: '#000000', // Black title text
        bodyColor: '#000000', // Black body text
        borderColor: '#808080', // No border color (or match background)
        borderWidth: 1, // Remove border
        caretPadding: 10, // Distance between point and tooltip
        caretSize: 6, // Size of the tooltip pointer
        displayColors: false, // Disable color box next to tooltip
        callbacks: {
          label: function(context) {
            const value = context.raw;
            const date = dateLabels[context.dataIndex]; // Use the date from dateLabels array
            return [` $${value}`, `${date}`];
          },
          labelPointStyle: function () {
            return {
              pointStyle: false, // Disable the point (square)
              rotation: 0, // Ensure no visual point is added
            };
          },
        },
        // Adjust the position of the tooltip arrow
        caretSize: 6, // Adjust this value as needed
        caretPadding: 8, // Adjust this value to position the tooltip correctly
        yAlign: 'bottom', // Position tooltip arrow at the bottom
      },
      
      legend: {
        display: false, 
      },
    },
  };


  useEffect(() => {
  fetchEarn()
  }, [])
  

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

      <div className="w-full h-[40vh] md:h-62 lg:h-72"> 
        <Line data={data} options={{...options, responsive:true}} />
      </div>

      {/* Custom Legend with dots */}
      <div className="flex justify-center mt-4 space-x-8 text-[8px] sm:text-[10px] font-poppins">
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
