import { useState } from "react"; 
import OnboardTable from "../components/OnboardTable";

const OnboardingRequestPage = () => {
  const [activeTab, setActiveTab] = useState("onboarding");

  return (
    <div>
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h1 className="font-poppins font-medium text-xl mb-4 sm:mb-0">
            Provider Onboarding Request
          </h1>
        </div>
        <div className="flex flex-row gap-2 sm:gap-4 mt-6 font-poppins font-medium text-lg sm:text-sm border-b-2">
          <h1
            className={`border-b-2 ${
              activeTab === "onboarding"
                ? "border-black text-black"
                : "text-[#707070]"
            } w-full text-center sm:w-auto sm:text-left cursor-pointer`}
            onClick={() => setActiveTab("onboarding")}
          >
            Onboarding Request
          </h1>
          <h1
            className={`border-b-2 ${
              activeTab === "denied"
                ? "border-black text-black"
                : "text-[#707070]"
            } w-full text-center sm:w-auto sm:text-left cursor-pointer`}
            onClick={() => setActiveTab("denied")}
          >
            Denied Request
          </h1>
        </div>
        <OnboardTable activeTab={activeTab} />
      </div>
    </div>
  );
};

export default OnboardingRequestPage;



// import React from 'react'
// import ProviderPreview from '../components/ProviderPreview'
// import Review from '../components/Review'

// const OnboardingRequestsPage = () => {
//   return (
//     <div>
//       <ProviderPreview />
//       <div>
//       <div className="flex space-x-4 border-b">
//         <button className="font-semibold text-black">Reviews <span>(04)</span></button>
//         <button className="font-semibold text-gray-500">Reports</button>
//       </div>
//       <div className="reviews">
//         <Review />
//       </div>
//       </div>
//     </div>
//   )
// }

// export default OnboardingRequestsPage