import axios from "axios";
import { useState, useEffect } from "react";
const StatsCards = () => {
  // Inside a React component or function
  const token = localStorage.getItem('authToken');
  const [data, setData] = useState([])
   const fetchGraph =  async ()=>{
    const url = "https://apiv2.blkhedme.com/api/admin/dashboard/statistics"
    try {
      const res = await axios.get(url,{
        headers : {
          'Accept': 'application/json',
          "Authorization": `Bearer ${token}`,
        }
      })
      setData(res.data)
      console.log(res.data);
      
    } catch (error) {
      console.log(error.message);
      
    }
   }
    const stats = [
      { amount: "$" + data.data?.total_earnings || '$12,524.00', label: "Total Earning", color: "bg-[#6C0FD7]" },
      { amount: "$12,524.00", label: "Fee Earning", color: "bg-[#F07D00]" },
      { amount: "$12,524.00", label: "Earning from Promotions", color: "bg-[#0085FF]" },
      { amount:  data.data?.total_providers || "12,524", label: "Providers", color: "bg-[#44D400]" },
      { amount:  data.data?.total_seekers ||  "12,524", label: "Seekers", color: "bg-[#A500C0]" },
    ];


    useEffect(() => {
      fetchGraph()
    }, [])
    
  
    return (
      // <div className="grid items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pb-4">
      <div className="flex gap-4 flex-wrap md:flex-nowrap items-center justify-center mt-4 pb-4 font-poppins">
        {stats.map((stat, idx) => (
          <div key={idx} className={`py-4 px-2 rounded-lg text-white w-[180px] ${stat.color}`}>
            <div className="text-lg font-bold">{stat.amount}</div>
            <div className="text-[12px]">{stat.label}</div>
          </div>
        ))}
      </div>
    );
  };
  
  export default StatsCards;
  