import React, { useEffect } from 'react';
import ProviderPreview from '../components/ProviderPreview';
import { useDispatch, useSelector } from 'react-redux';
import Review from '../components/Review';
import { fetchProvider } from '../features/providerViewSlice';
import { useLocation } from 'react-router-dom'; // Import useLocation

const OnboardingProviderProfile = () => {
  const dispatch = useDispatch();
  const location = useLocation(); // Initialize useLocation
  const { providerData, loading, error } = useSelector((state) => state.provider);
  
  // Get the provider ID from the URL query parameter
  const queryParams = new URLSearchParams(location.search);
  const providerId = queryParams.get('id');

  useEffect(() => {
    if (providerId) {
      dispatch(fetchProvider(providerId)); // Fetch provider with the ID from URL
    }
  }, [dispatch, providerId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const provider = Array.isArray(providerData) && providerData.length > 0 ? providerData[0] : null;

  return (
    <div>
      {provider && <ProviderPreview providerData={provider} providerId={providerId} />} {/* Pass providerId as prop */}
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
  );
};

export default OnboardingProviderProfile;
