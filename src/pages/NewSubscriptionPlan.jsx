import React from "react";

const NewSubscriptionPlan = () => {
  return (
    <div className="min-h-screen bg-gray-100 overflow-x-auto">
      <div className="m-4 md:m-8">
        <h2 className="text-lg md:text-2xl font-poppins font-medium">
          Create Subscription Package
        </h2>
        <p className="text-sm md:text-base">
          Create Subscriptions Packages for Subscription Business Model
        </p>
      </div>
      <div className="m-4 md:m-8 bg-white p-4 font-poppins">
        {/* Package Information inputs section */}
        <div className="bg-white p-4 border rounded-md">
          <div className="border-b border-[#707070] mb-4">
            <h1 className="text-lg md:text-xl">Package Information</h1>
            <p className="text-xs md:text-sm text-[#616161] mb-2">
              Give Subscriptions Package Information
            </p>
          </div>
          <div className="mt-4 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-8">
            {/* Package Title */}
            <div className="flex-1">
              <h1 className="mb-2 text-sm md:text-base">Package Title</h1>
              <input
                type="text"
                placeholder="Enter the Title"
                className="w-full py-2 px-4 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            {/* Package Price */}
            <div className="flex-1">
              <h1 className="mb-2 text-sm md:text-base">Package Price ($)</h1>
              <input
                type="text"
                placeholder="Enter Price"
                className="w-full py-2 px-4 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            {/* Package Validity Days */}
            <div className="flex-1">
              <h1 className="mb-2 text-sm md:text-base">
                Package Validity Days
              </h1>
              <input
                type="text"
                placeholder="30 days"
                className="w-full py-2 px-4 border border-gray-300 rounded-lg text-sm"
              />
            </div>
          </div>
          <div className="mt-4">
            <h1 className="mb-2 text-sm md:text-base">Package Description</h1>
            <textarea
              placeholder="Enter Description"
              className="w-full py-2 px-4 border border-gray-300 rounded-lg text-sm h-28 md:h-32"
            />
          </div>
        </div>
        {/* Package Information checkbox section */}
        <div className="bg-white p-4 border rounded-md mt-4">
          <div className="border-b border-[#707070] mb-4">
            <h1 className="text-lg md:text-xl">Package Information</h1>
            <p className="text-xs md:text-sm text-[#616161] mb-2">
              Give Subscriptions Package Information
            </p>
          </div>
          <div className="grid grid-cols-2 md:flex md:space-x-8 gap-4">
            {/* Mobile App checkbox */}
            <div className="flex items-center space-x-2">
              <input type="checkbox" className="h-4 w-4 rounded" />
              <h1 className="text-sm">Mobile App</h1>
            </div>
            {/* Chat checkbox */}
            <div className="flex items-center space-x-2">
              <input type="checkbox" className="h-4 w-4 rounded" />
              <h1 className="text-sm">Chat</h1>
            </div>
            {/* Reviews checkbox */}
            <div className="flex items-center space-x-2">
              <input type="checkbox" className="h-4 w-4 rounded" />
              <h1 className="text-sm">Reviews</h1>
            </div>
            {/* Schedule Service checkbox */}
            <div className="flex items-center space-x-2">
              <input type="checkbox" className="h-4 w-4 rounded" />
              <h1 className="text-sm">Schedule Service</h1>
            </div>
            {/* Service Request checkbox */}
            <div className="flex items-center space-x-2">
              <input type="checkbox" className="h-4 w-4 rounded" />
              <h1 className="text-sm">Service Request</h1>
            </div>
            {/* Advertisement checkbox */}
            <div className="flex items-center space-x-2">
              <input type="checkbox" className="h-4 w-4 rounded" />
              <h1 className="text-sm">Advertisement</h1>
            </div>
          </div>
        </div>
        {/* Set limit section */}
        <div className="bg-white p-4 border rounded-md mt-4">
          <div className="border-b border-[#707070] mb-4">
            <h1 className="text-lg md:text-xl">Set limit</h1>
            <p className="text-xs md:text-sm text-[#616161] mb-2">
              Set maximum booking request received & service provide limit for
              this package
            </p>
          </div>
          {/* cards section */}
          <div className="flex flex-col md:flex-row space-x-4 ">
            {/* Card 1 of radio buttons section */}
            <div className="bg-[#F2F2F2] p-2 rounded-md mb-4 md:mb-0">
              <label className="ml-2 mb-2 text-sm md:text-base">
                Maximum Booking Request Limit
              </label>
              <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-8">
                <label className="flex items-center">
                  <input type="radio" name="bookingLimit" />
                  <span className="ml-2 text-sm">Unlimited Default</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="bookingLimit" />
                  <span className="ml-2 text-sm">Use Limit</span>
                </label>
                <input
                  type="text"
                  placeholder="EX: 100"
                  className="mt-2 md:mt-0 py-2 px-4 border border-gray-300 rounded-lg text-sm w-full md:w-auto"
                />
              </div>
            </div>
            {/* Card 2 of radio buttons section */}
            <div className="bg-[#F2F2F2] p-2 rounded-md item">
              <label className="ml-2 mb-2 text-sm md:text-base">
                Maximum Service Limit
              </label>
              <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-8">
                <label className="flex items-center">
                  <input type="radio" name="serviceLimit" />
                  <span className="ml-2 text-sm">Unlimited Default</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="serviceLimit" />
                  <span className="ml-2 text-sm">Use Limit</span>
                </label>
              </div>
            </div>
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