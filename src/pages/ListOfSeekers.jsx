import React from "react";
import SeekerTable from "../components/SeekerTable";
import { useNavigate } from "react-router-dom";

const ListOfSeekers = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 overflow-x-auto">
      <div className="m-8">
        <h2 className="text-xl md:text-2xl font-poppins font-medium mb-4">
          List of Seekers
        </h2>
        <div className="flex flex-col items-center md:flex-row gap-4 md:gap-8">
          <div className="flex flex-col bg-[#0085FF] text-white px-4 pr-14 py-2 rounded-md w-[180px]">
            <h1 className="font-medium">12,524</h1>
            <p className="text-sm">All Seeker</p>
          </div>
          <div className="flex flex-col bg-[#007C1B] text-white px-4 pr-14 py-2 rounded-md w-[180px]">
            <h1 className="font-medium">12,524</h1>
            <p className="text-sm">Active Seeker</p>
          </div>
          <div className="flex flex-col bg-[#BC0000] text-white px-4 pr-14 py-2 rounded-md w-[180px]">
            <h1 className="font-medium">12,524</h1>
            <p className="text-sm">Inactive Seeker</p>
          </div>
        </div>
        <div className="flex justify-end mt-6 mb-2">
          <button className="flex items-center bg-[#0085FF] text-white px-8 py-2 rounded-md"
          onClick={() => navigate("/add-new-seeker")}>
            <span>Add New</span>
          </button>
        </div>
        <div className="flex flex-row space-x-8 sm:gap-4  font-poppins font-medium text-lg border-b-2">
          <h1 className="border-b-2 border-black w-full text-center sm:text-sm text-base sm:w-auto sm:text-left">
            All
          </h1>
          <h1 className="text-[#707070] w-full text-center sm:text-sm text-base sm:w-auto sm:text-left">
            Active
          </h1>
          <h1 className="text-[#707070] w-full text-center sm:text-sm text-base sm:w-auto sm:text-left">
            Inactive
          </h1>
        </div>

        {/* Table starts here */}
        <SeekerTable />
      </div>
    </div>
  );
};

export default ListOfSeekers;
