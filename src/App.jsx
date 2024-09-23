// import React from "react";
// import "./App.css";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Seekers from "./pages/Seekers";
// import Layout from "./layout/Layout";
// import LoginPage from "./pages/login-page/LoginPage";
// import ProviderPage from "./pages/ProviderPage";
// import DashboardPage from "./pages/DashboardPage";
// import OnboardingRequestsPage from "./pages/OnboardingRequestsPage";
// import AddNewSeeker from "./pages/AddNewSeeker";
// import ListOfProvider from "./pages/ListOfProvider";
// import ListOfSeeker from "./pages/ListOfSeekers";
// import CertifiedProvider from "./pages/CertifiedProvider";
// import FeaturedProvider from "./pages/FeaturedProvider";
// import AddNewProvider from "./pages/AddNewProvider";
// import CategorySetup from "./pages/CategorySetup";
// import SubCategorySetup from "./pages/SubCategorySetup";
// import PromotionalBanners from "./pages/PromotionalBanners";
// import SubscriptionPackages from "./pages/SubscriptionPackages";
// import Setting from "./pages/Setting";
// import AddCategory from "./pages/AddCategory";
// import AddSubCategory from "./pages/AddSubCategory";
// import Language from "./pages/Language";
// import Notifications from "./pages/Notifications";
// import SeekerProfileReviews from "./pages/SeekerProfileReviews";
// import ListOfSubscribers from "./pages/ListOfSubscribers";
// import NewSubscriptionPlan from "./pages/NewSubscriptionPlan";
// import OnboardingProviderProfile from "./pages/OnboardingProviderProfile";
// import OnboardingProviderReviews from "./pages/OnboardingProviderReviews";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="sign-in" element={<LoginPage />} />
//       </Routes>
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           <Route index element={<DashboardPage />} />
//           <Route path="providers-page" element={<ProviderPage />} />
//           <Route path="list-of-provider" element={<ListOfProvider />} />
//           <Route path="certified-provider" element={<CertifiedProvider />} />
//           <Route path="featured-provider" element={<FeaturedProvider />} />
//           <Route path="add-new-provider" element={<AddNewProvider />} />
//           <Route path="seekers-page" element={<Seekers />} />
//           <Route path="add-new-seeker" element={<AddNewSeeker />} />
//           <Route path="list-of-seeker" element={<ListOfSeeker />} />
// <Route
//   path="seeker-profile-reviews"
//   element={<SeekerProfileReviews />}
// />
// <Route path="category-setup" element={<CategorySetup />} />
// <Route path="sub-category-setup" element={<SubCategorySetup />} />
// <Route path="add-new-category" element={<AddCategory />} />
// <Route path="add-new-sub-category" element={<AddSubCategory />} />
// <Route path="promotional-banners" element={<PromotionalBanners />} />
// <Route
//   path="subscription-packages"
//   element={<SubscriptionPackages />}
// />
// <Route
//   path="new-subscription-plan"
//   element={<NewSubscriptionPlan />}
// />
// <Route path="list-of-subscribers" element={<ListOfSubscribers />} />
// <Route path="settings" element={<Setting />} />
// <Route
//   path="onboarding-requests-page"
//   element={<OnboardingRequestsPage />}
// />
// <Route path="language" element={<Language />} />
// <Route
//   path="onboarding-provider-profile-review"
//   element={<OnboardingProviderReviews />}
// />
// <Route
//   path="onboarding-provider-profile"
//   element={<OnboardingProviderProfile />}
// />

// <Route path="notifications" element={<Notifications />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;

//done and correct
// import React, { useState, useEffect } from "react";
// import "./App.css";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import Seekers from "./pages/Seekers";
// import Layout from "./layout/Layout";
// import LoginPage from "./pages/login-page/LoginPage";
// import ProviderPage from "./pages/ProviderPage";
// import DashboardPage from "./pages/DashboardPage";
// import OnboardingRequestsPage from "./pages/OnboardingRequestsPage";
// import AddNewSeeker from "./pages/AddNewSeeker";
// import ListOfProvider from "./pages/ListOfProvider";
// import ListOfSeeker from "./pages/ListOfSeekers";
// import CertifiedProvider from "./pages/CertifiedProvider";
// import FeaturedProvider from "./pages/FeaturedProvider";
// import AddNewProvider from "./pages/AddNewProvider";
// import CategorySetup from "./pages/CategorySetup";
// import SubCategorySetup from "./pages/SubCategorySetup";
// import PromotionalBanners from "./pages/PromotionalBanners";
// import SubscriptionPackages from "./pages/SubscriptionPackages";
// import Setting from "./pages/Setting";
// import AddCategory from "./pages/AddCategory";
// import AddSubCategory from "./pages/AddSubCategory";
// import Language from "./pages/Language";
// import Notifications from "./pages/Notifications";
// import SeekerProfileReviews from "./pages/SeekerProfileReviews";
// import ListOfSubscribers from "./pages/ListOfSubscribers";
// import NewSubscriptionPlan from "./pages/NewSubscriptionPlan";
// import OnboardingProviderProfile from "./pages/OnboardingProviderProfile";
// import OnboardingProviderReviews from "./pages/OnboardingProviderReviews";

// function App() {
//   // Track whether the user is authenticated
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // Check if user is authenticated when the app loads
//   useEffect(() => {
//     const storedAuth = localStorage.getItem("isAuthenticated");
//     if (storedAuth) {
//       setIsAuthenticated(true);
//     }
//   }, []);

//   // Handle login and save authentication state
//   const handleLogin = () => {
//     setIsAuthenticated(true);
//     localStorage.setItem("isAuthenticated", "true");
//   };

//   // Handle logout and clear authentication state
//   const handleLogout = () => {
//     setIsAuthenticated(false);
//     localStorage.removeItem("isAuthenticated");
//   };

//   // Protected Route Component to restrict access if not authenticated
//   const RequireAuth = ({ children }) => {
//     if (!isAuthenticated) {
//       // Redirect to login page if the user is not authenticated
//       return <Navigate to="/sign-in" />;
//     }
//     return children;
//   };

//   return (
//     <Router>
//       {/* Login page route */}
//       <Routes>
//         <Route path="sign-in" element={<LoginPage onLogin={handleLogin} />} />
//       </Routes>

//       {/* Protected routes */}
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <RequireAuth>
//               <Layout />
//             </RequireAuth>
//           }
//         >
//           <Route index element={<DashboardPage />} />
//           <Route path="providers-page" element={<ProviderPage />} />
//           <Route path="list-of-provider" element={<ListOfProvider />} />
//           <Route path="certified-provider" element={<CertifiedProvider />} />
//           <Route path="featured-provider" element={<FeaturedProvider />} />
//           <Route path="add-new-provider" element={<AddNewProvider />} />
//           <Route path="seekers-page" element={<Seekers />} />
//           <Route path="add-new-seeker" element={<AddNewSeeker />} />
//           <Route path="list-of-seeker" element={<ListOfSeeker />} />
//           <Route
//             path="seeker-profile-reviews"
//             element={<SeekerProfileReviews />}
//           />
//           <Route path="category-setup" element={<CategorySetup />} />
//           <Route path="sub-category-setup" element={<SubCategorySetup />} />
//           <Route path="add-new-category" element={<AddCategory />} />
//           <Route path="add-new-sub-category" element={<AddSubCategory />} />
//           <Route path="promotional-banners" element={<PromotionalBanners />} />
//           <Route
//             path="subscription-packages"
//             element={<SubscriptionPackages />}
//           />
//           <Route
//             path="new-subscription-plan"
//             element={<NewSubscriptionPlan />}
//           />
//           <Route path="list-of-subscribers" element={<ListOfSubscribers />} />
//           <Route path="settings" element={<Setting />} />
//           <Route
//             path="onboarding-requests-page"
//             element={<OnboardingRequestsPage />}
//           />
//           <Route path="language" element={<Language />} />
//           <Route
//             path="onboarding-provider-profile-review"
//             element={<OnboardingProviderReviews />}
//           />
//           <Route
//             path="onboarding-provider-profile"
//             element={<OnboardingProviderProfile />}
//           />

//           <Route path="notifications" element={<Notifications />} />
//           {/* Other protected routes */}
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react"; // Import React hooks for managing state and side effects
import "./App.css"; // Importing custom CSS file for styling
import {
  BrowserRouter as Router, // Alias BrowserRouter to Router for routing setup
  Routes, // Routes component defines all possible routes in the app
  Route, // Route component used to specify path-component mapping
  Navigate, // Used to redirect the user to a different page
} from "react-router-dom"; // Importing necessary components for routing

// Importing all the page components that will be used in routing
import Seekers from "./pages/Seekers";
import Layout from "./layout/Layout";
import LoginPage from "./pages/login-page/LoginPage";
import ProviderPage from "./pages/ProviderPage";
import DashboardPage from "./pages/DashboardPage";
import OnboardingRequestsPage from "./pages/OnboardingRequestsPage";
import AddNewSeeker from "./pages/AddNewSeeker";
import ListOfProvider from "./pages/ListOfProvider";
import ListOfSeeker from "./pages/ListOfSeekers";
import CertifiedProvider from "./pages/CertifiedProvider";
import FeaturedProvider from "./pages/FeaturedProvider";
import AddNewProvider from "./pages/AddNewProvider";
import CategorySetup from "./pages/CategorySetup";
import SubCategorySetup from "./pages/SubCategorySetup";
import PromotionalBanners from "./pages/PromotionalBanners";
import SubscriptionPackages from "./pages/SubscriptionPackages";
import Setting from "./pages/Setting";
import AddCategory from "./pages/AddCategory";
import AddSubCategory from "./pages/AddSubCategory";
import Language from "./pages/Language";
import Notifications from "./pages/Notifications";
import SeekerProfileReviews from "./pages/SeekerProfileReviews";
import ListOfSubscribers from "./pages/ListOfSubscribers";
import NewSubscriptionPlan from "./pages/NewSubscriptionPlan";
import OnboardingProviderProfile from "./pages/OnboardingProviderProfile";
import OnboardingProviderReviews from "./pages/OnboardingProviderReviews";

function App() {
  /**
   * useState hook to manage the user's authentication status.
   * Initially set to `false`, meaning the user is not authenticated.
   * `isAuthenticated`: Boolean state that tracks if the user is logged in.
   * `setIsAuthenticated`: Function to update the authentication status.
   */
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /**
   * useEffect hook to run when the component mounts.
   * It checks if the user was previously authenticated (e.g., if they are logged in).
   * Retrieves the authentication status from localStorage, and if it exists,
   * sets `isAuthenticated` to `true`.
   * The empty dependency array `[]` ensures this effect runs only once when the app loads.
   */
  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth) {
      setIsAuthenticated(true); // Update state if authentication info is found
    }
  }, []); // Dependency array is empty, so this runs only on the initial render

  /**
   * handleLogin function is called when the user successfully logs in.
   * It sets the authentication status to `true` and saves it in localStorage
   * to persist the login state even after page refresh.
   */
  const handleLogin = () => {
    setIsAuthenticated(true); // Update the state to reflect that the user is now authenticated
    localStorage.setItem("isAuthenticated", "true"); // Save authentication state in localStorage
  };

  /**
   * handleLogout function is called when the user logs out.
   * It sets the authentication status to `false` and removes it from localStorage,
   * effectively logging the user out.
   */
  const handleLogout = () => {
    setIsAuthenticated(false); // Update the state to reflect that the user is now logged out
    localStorage.removeItem("isAuthenticated"); // Remove authentication state from localStorage
  };

  /**
   * RequireAuth component is used to protect routes that should only be accessible
   * to authenticated users. If the user is not authenticated, they are redirected
   * to the login page ("/sign-in"). If authenticated, the protected children components
   * are rendered.
   */
  const RequireAuth = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/sign-in" />; // If not authenticated, redirect to the login page
    }
    return children; // If authenticated, render the child components
  };

  return (
    <Router>
      {/* Login page route (no authentication required here) */}
      <Routes>
        <Route path="sign-in" element={<LoginPage onLogin={handleLogin} />} />
      </Routes>

      {/* Protected routes, wrapped inside RequireAuth to prevent access if not authenticated */}
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        >
          {/* Nested routes inside the Layout component */}
          <Route index element={<DashboardPage />} /> {/* Default route */}
          <Route path="providers-page" element={<ProviderPage />} />
          <Route path="list-of-provider" element={<ListOfProvider />} />
          <Route path="certified-provider" element={<CertifiedProvider />} />
          <Route path="featured-provider" element={<FeaturedProvider />} />
          <Route path="add-new-provider" element={<AddNewProvider />} />
          <Route path="seekers-page" element={<Seekers />} />
          <Route path="add-new-seeker" element={<AddNewSeeker />} />
          <Route path="list-of-seeker" element={<ListOfSeeker />} />
          <Route
            path="seeker-profile-reviews"
            element={<SeekerProfileReviews />}
          />
          <Route path="category-setup" element={<CategorySetup />} />
          <Route path="sub-category-setup" element={<SubCategorySetup />} />
          <Route path="add-new-category" element={<AddCategory />} />
          <Route path="add-new-sub-category" element={<AddSubCategory />} />
          <Route path="promotional-banners" element={<PromotionalBanners />} />
          <Route
            path="subscription-packages"
            element={<SubscriptionPackages />}
          />
          <Route
            path="new-subscription-plan"
            element={<NewSubscriptionPlan />}
          />
          <Route path="list-of-subscribers" element={<ListOfSubscribers />} />
          <Route path="settings" element={<Setting />} />
          <Route
            path="onboarding-requests-page"
            element={<OnboardingRequestsPage />}
          />
          <Route path="language" element={<Language />} />
          <Route
            path="onboarding-provider-profile-review"
            element={<OnboardingProviderReviews />}
          />
          <Route
            path="onboarding-provider-profile"
            element={<OnboardingProviderProfile />}
          />
          <Route path="notifications" element={<Notifications />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
