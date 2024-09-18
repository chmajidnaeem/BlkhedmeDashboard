import React from 'react'
import ProviderPreview from '../components/ProviderPreview'
import Review from '../components/Review'

const OnboardingProviderProfile = () => {
  return (
    <div>
      <ProviderPreview />
      <div>
      <div className="flex space-x-4 border-b font-poppins">
        <button className="font-semibold text-black">Reviews <span>(04)</span></button>
        <button className="font-semibold text-gray-500">Reports</button>
      </div>
      <div className="reviews">
        <Review />
      </div>
      </div>
    </div>
  )
}
export default OnboardingProviderProfile