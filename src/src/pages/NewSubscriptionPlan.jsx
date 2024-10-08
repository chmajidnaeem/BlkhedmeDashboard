import React from "react";

const NewSubscriptionPlan = () => {
  return (
    <div className="min-h-screen bg-gray-100 overflow-x-auto">
      <div className="m-4 md:m-8">
        <h2 className="text-lg md:text-2xl font-poppins font-medium">
        create provider subscription

        </h2>
        <p className="text-sm md:text-base">
          Create Subscriptions Packages for Subscription Business Model
        </p>
      </div>
      <div className="m-4 md:m-8 bg-white p-4 font-poppins">
        {/* Package Information inputs section */}
        <div className="bg-white p-4 border rounded-md">
          <div className="border-b border-[#707070] mb-4">
            <h1 className="text-lg md:text-xl">subscription detail
            </h1>
            <p className="text-xs md:text-sm text-[#616161] mb-2">
              Give Subscriptions Package Information
            </p>
          </div>
          <div className="mt-4 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-8">
            {/* Package Title */}
            <div className="flex-1">
              <h1 className="mb-2 text-sm md:text-base">select provider 
              </h1>
              <input
                type="number"
                placeholder="Enter the ID"
                className="w-full py-2 px-4 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            {/* Package Price */}
            <div className="flex-1">
              <h1 className="mb-2 text-sm md:text-base"> Days</h1>
              <input
                type="text"
                placeholder=" Enter The Days"
                className="w-full py-2 px-4 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            {/* Package Validity Days */}
            <div className="flex-1">
              <h1 className="mb-2 text-sm md:text-base">
                Enter the Type
              </h1>
              <input
                type="type"
                placeholder="Type"
                className="w-full py-2 px-4 border border-gray-300 rounded-lg text-sm"
              />
            </div>
          </div>
          <div className="flex-1">
              <h1 className="mb-2 text-sm md:text-base">
                Enter the price
              </h1>
              <input
                type="number"
                placeholder="Price"
                className="w-full py-2 px-4 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            </div>
      
        {/* Buttons */}
        <div className="flex flex-col md:flex-row justify-end items-center gap-4 w-full mt-6">
          <button
            type="button"
            className="bg-gray-300 px-8 py-2 w-full md:w-auto rounded-md mb-2 md:mb-0"
          >
            RESET
          </button>
          <button
            type="submit"
            className="bg-blue-500 px-8 py-2 w-full md:w-auto rounded-md text-white"
          >
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewSubscriptionPlan;