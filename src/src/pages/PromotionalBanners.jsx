import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PromoTable from "./PromoTable";
import NewBanner from "./NewBanner";
import { fetchBanners, createBanner } from "../features/promotionalBannerSlice";

const PromoBanners = () => {
  const dispatch = useDispatch();
  const banners = useSelector((state) => state.promotionalBanners.banners);
  const [isNewBannerOpen, setIsNewBannerOpen] = useState(false);

  // Fetch banners when the component mounts
  useEffect(() => {
    dispatch(fetchBanners());
  }, [dispatch]);

  const handleOpenNewBanner = () => setIsNewBannerOpen(true);
  const handleCloseNewBanner = () => setIsNewBannerOpen(false);

  const handleAddBanner = (bannerData) => {
    dispatch(createBanner({ bannerData }));
    setIsNewBannerOpen(false); // Close the modal after submission
  };

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

        <PromoTable banners={banners} />

        <NewBanner
          isOpen={isNewBannerOpen}
          onClose={handleCloseNewBanner}
          onAddBanner={handleAddBanner} // Pass the handleAddBanner function to NewBanner
        />
      </div>
    </div>
  );
};

export default PromoBanners;
