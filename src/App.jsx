import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Seekers from './pages/Seekers';
import Layout from './layout/Layout';
import LoginPage from './pages/login-page/LoginPage';
import ProviderPage from './pages/ProviderPage';
import DashboardPage from './pages/DashboardPage';
import OnboardingRequestsPage from './pages/OnboardingRequestsPage';
import AddNewSeeker from './pages/AddNewSeeker';
import ListOfProvider from './pages/ListOfProvider';
import ListOfSeeker from './pages/ListOfSeekers'
import CertifiedProvider from './pages/CertifiedProvider';
import FeaturedProvider from './pages/FeaturedProvider';
import AddNewProvider from './pages/AddNewProvider';
import CategorySetup from './pages/CategorySetup';
import SubCategorySetup from './pages/SubCategorySetup';
import PromotionalBanners from './pages/PromotionalBanners';
import SubscriptionPackages from './pages/SubscriptionPackages';
import Setting from './pages/Setting';
import AddCategory from './pages/AddCategory';
import AddSubCategory from './pages/AddSubCategory'
import Language from './pages/Language';
import Notifications from './pages/Notifications';
import SeekerProfileReviews from './pages/SeekerProfileReviews';
import ListOfSubscribers from './pages/ListOfSubscribers';
import NewSubscriptionPlan from './pages/NewSubscriptionPlan';
import OnboardingProviderProfile from './pages/OnboardingProviderProfile';
import OnboardingProviderReviews from './pages/OnboardingProviderReviews';

function App() {
  return (
    <Router>
      <Routes>
      <Route path='sign-in' element = {<LoginPage />} />
      </Routes>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="providers-page" element={<ProviderPage />} />
          <Route path="list-of-provider" element={<ListOfProvider />} />
          <Route path="certified-provider" element={<CertifiedProvider />} />
          <Route path="featured-provider" element={<FeaturedProvider />} />
          <Route path="add-new-provider" element={<AddNewProvider />} />
          <Route path="seekers-page" element={<Seekers />}/>
          <Route path="add-new-seeker" element={<AddNewSeeker />} />
          <Route path="list-of-seeker" element={<ListOfSeeker />} />
          <Route path="seeker-profile-reviews" element={<SeekerProfileReviews />} />
          <Route path="category-setup" element={<CategorySetup />} />
          <Route path="sub-category-setup" element={<SubCategorySetup />} />
          <Route path="add-new-category" element={<AddCategory />} />
          <Route path="add-new-sub-category" element={<AddSubCategory />} />
          <Route path="promotional-banners" element={<PromotionalBanners />} />
          <Route path="subscription-packages" element={<SubscriptionPackages />} />
          <Route path="new-subscription-plan" element={<NewSubscriptionPlan />} />
          <Route path="list-of-subscribers" element={<ListOfSubscribers />} />
          <Route path="settings" element={<Setting />} />
          <Route path="onboarding-requests-page" element={<OnboardingRequestsPage />} />
          <Route path='language' element = {<Language />} />
          <Route path='onboarding-provider-profile-review' element = {<OnboardingProviderReviews />} />
          <Route path='onboarding-provider-profile' element = {<OnboardingProviderProfile />} />
          
          
          <Route path='notifications' element = {<Notifications />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
