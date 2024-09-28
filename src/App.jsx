import React, { useState, useEffect } from "react"; // Import React hooks for managing state and side effects
import "./App.css"; // Importing custom CSS file for styling
import {
  BrowserRouter as Router, // Alias BrowserRouter to Router for routing setup
  Routes, // Routes component defines all possible routes in the app
  Route, // Route component used to specify path-component mapping
  Navigate, // Used to redirect the user to a different page
} from "react-router-dom"; // Importing necessary components for routing
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import RequireAuth from "./RequireAuth";

import { useDispatch } from "react-redux";
import { login, logout } from "./store"; // Import Redux actions

// Optional for token expiration handling

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
import Locations from "./pages/Locations";

function App() {
  /**
   * useState hook to manage the user's authentication status.
   * Initially set to `false`, meaning the user is not authenticated.
   * `isAuthenticated`: Boolean state that tracks if the user is logged in.
   * `setIsAuthenticated`: Function to update the authentication status.
   */
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp > currentTime) {
        // Token is valid
        dispatch(login(token));
      } else {
        // Token is expired, logout
        localStorage.removeItem("authToken");
        dispatch(logout());
      }
    }
  }, [dispatch]);

  /**
   * useEffect hook to run when the component mounts.
   * It checks if the user was previously authenticated (e.g., if they are logged in).
   * Retrieves the authentication status from localStorage, and if it exists,
   * sets `isAuthenticated` to `true`.
   * The empty dependency array `[]` ensures this effect runs only once when the app loads.
   */

  /**
   * handleLogin function is called when the user successfully logs in.
   * It sets the authentication status to `true` and saves it in localStorage
   * to persist the login state even after page refresh.
   */
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  /**
   * handleLogout function is called when the user logs out.
   * It sets the authentication status to `false` and removes it from localStorage,
   * effectively logging the user out.
   */
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("authToken");
  };
  /**
   * RequireAuth component is used to protect routes that should only be accessible
   * to authenticated users. If the user is not authenticated, they are redirected
   * to the login page ("/sign-in"). If authenticated, the protected children components
   * are rendered.
   */
  // const RequireAuth = ({ children }) => {
  //   if (!isAuthenticated) {
  //     return <Navigate to="/sign-in" />;
  //   }
  //   return children;
  // };
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="sign-in" element={<LoginPage onLogin={handleLogin} />} />

          <Route
            path="/"
            element={
              <RequireAuth>
                <Layout />
              </RequireAuth>
            }
          >
            <Route index element={<DashboardPage />} />
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
            <Route
              path="promotional-banners"
              element={<PromotionalBanners />}
            />
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
            <Route path="locations" element={<Locations />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
