import React, { useState } from "react";
import PromoTable from "./PromoTable";
import NewBanner from "./NewBanner";

const PromoBanners = () => {
  const [isNewBannerOpen, setIsNewBannerOpen] = useState(false);

  const handleOpenNewBanner = () => setIsNewBannerOpen(true);
  const handleCloseNewBanner = () => setIsNewBannerOpen(false);

  return (
    <div>
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h1 className="font-poppins font-medium text-xl mb-4 sm:mb-0">
            Promotional Banners
          </h1>
          <button
            className="font-poppins font-medium py-2 px-4 rounded-lg bg-[#0085FF] text-white"
            onClick={handleOpenNewBanner}
          >
            Add New
          </button>
        </div>
        <div className="flex flex-row gap-2 sm:gap-4 mt-6 font-poppins font-medium text-lg border-b-2">
          <h1 className="border-b-2 border-black w-full text-center sm:text-sm text-base sm:w-auto sm:text-left">
            All
          </h1>
          <h1 className="text-[#707070] w-full text-center sm:text-sm text-base sm:w-auto sm:text-left">
            Category Wise
          </h1>
          <h1 className="text-[#707070] w-full text-center sm:text-sm text-base sm:w-auto sm:text-left">
            Service Wise
          </h1>
        </div>
        <PromoTable />
        <div className="flex justify-end mt-6">
          <div className="bg-white flex-col justify-center items-center mr-0 sm:mr-10 inline-block py-4 px-8 rounded-lg text-[#0000009C] gap-2 sm:gap-4">
            <h1>Edit</h1>
            <h1>Delete</h1>
          </div>
        </div>
        <NewBanner isOpen={isNewBannerOpen} onClose={handleCloseNewBanner} />
      </div>
    </div>
  );
};

export default PromoBanners;