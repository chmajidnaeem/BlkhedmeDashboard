

import { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom"; // Renamed Link import
import activedashboardImg from "../Assets/activedashboard.svg";
import inactivedashboardImg from "../Assets/inactivedashboardImg.svg";
import activecategoriesImg from "../Assets/activecategoriesImg.svg";
import inactivecategoriesImg from "../Assets/inactivecategories.svg";
import activelanguageImg from "../Assets/activelanguage.svg";
import inactivelanguageImg from "../Assets/inactivelanguage.svg";
import activenotificationImg from "../Assets/activenotificationImg.svg";
import inactivenotificationImg from "../Assets/inactivenotifications.svg";
import activeonboardingImg from "../Assets/activeonboardingImg.svg";
import inactiveonboardingImg from "../Assets/inactiveonboarding-requests.svg";
import activepromotionalImg from "../Assets/activepromotionalImg.svg";
import inactivepromotionalImg from "../Assets/inactivepromotional-banners.svg";
import activeproviderImg from "../Assets/activeproviderImg.svg";
import inactiveproviderImg from "../Assets/inactiveprovider.svg";
import inactiveseekerImg from "../Assets/inactiveseeker.svg";
import activeseekerImg from "../Assets/activeseekerImg.svg";
import inactivesubscriptionImg from "../Assets/inactivesubscription.svg";
import activesubscriptionImg from "../Assets/activesubscriptionImg.svg";
import { MdKeyboardArrowRight, MdMenu, MdClose } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import activelocationImg from "../Assets/activelocationImg.svg";
import inactivelocationImg from "../Assets/inactivelocationImg.svg";

const Sidebar = () => {
  const location = useLocation();
  const [isProviderOpen, setIsProviderOpen] = useState(false);
  const [isSeekerOpen, setIsSeekerOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Mobile NavigationBar */}
      <div className="md:hidden bg-[#2B4DC9] p-4 flex h-12  justify-between items-center">
        <button onClick={toggleSidebar}>
          {isSidebarOpen ? (
            <MdClose className="text-white h-8 w-8" />
          ) : (
            <MdMenu className="text-white h-8 w-8" />
          )}
        </button>
        <h1 className="font-Montserrat font-semibold text-2xl text-white">
          Blkhedme
        </h1>
      </div>

      {/* Sidebar for small screens */}
      <div
        className={`fixed top-0 left-0 w-2/3 sm:w-1/2 px-2 md:hidden h-full bg-[#2B4DC9] transform transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ zIndex: 100 }}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleSidebar}>
            <MdClose className="text-white h-8 w-8" />
          </button>
        </div>
        <nav className="space-y-4">
          <NavItem
            activeIcon={activedashboardImg}
            inactiveIcon={inactivedashboardImg}
            label="Dashboard"
            to="/"
            isActive={location.pathname === "/"}
            location={location}
          />
          <h1 className="font-Poppins text-lg hover:bg-[#004E89] text-white">
            Provider Management
          </h1>
          <NavItem
            activeIcon={activeonboardingImg}
            inactiveIcon={inactiveonboardingImg}
            label="Onboarding Requests"
            to="/onboarding-requests-page"
            isActive={location.pathname === "/onboarding-requests-page"}
            notification
            location={location}
          />
          <DropdownNavItem
            activeIcon={activeproviderImg}
            inactiveIcon={inactiveproviderImg}
            label="Provider"
            isOpen={isProviderOpen}
            setIsOpen={setIsProviderOpen}
            items={[
              { label: "List of Provider", to: "/list-of-provider" },
              { label: "Certified Provider", to: "/certified-provider" },
              { label: "Featured Provider", to: "/featured-provider" },
              { label: "Add New Provider", to: "/add-new-provider" },
            ]}
            isActive={location.pathname.startsWith("/list-of-provider")}
            to="/list-of-provider"
          />
          <h1 className="font-Poppins text-lg hover:bg-[#004E89] text-white">
            Seeker Management
          </h1>
          <DropdownNavItem
            activeIcon={activeseekerImg}
            inactiveIcon={inactiveseekerImg}
            label="Seeker"
            isOpen={isSeekerOpen}
            setIsOpen={setIsSeekerOpen}
            items={[
              { label: "List of Seeker", to: "/list-of-seeker" },
              { label: "Add New Seeker", to: "/add-new-seeker" },
            ]}
            isActive={location.pathname.startsWith("/list-of-seeker")}
            to="/list-of-seeker"
          />
          <DropdownNavItem
            activeIcon={activecategoriesImg}
            inactiveIcon={inactivecategoriesImg}
            label="Categories"
            isOpen={isCategoriesOpen}
            setIsOpen={setIsCategoriesOpen}
            items={[
              { label: "Category Setup", to: "/category-setup" },
              { label: "Sub-Category Setup", to: "/sub-category-setup" },
            ]}
            isActive={location.pathname.startsWith("/category-setup")}
            to="/category-setup"
          />
          <NavItem
            activeIcon={activepromotionalImg}
            inactiveIcon={inactivepromotionalImg}
            label="Promotional Banners"
            to="/promotional-banners"
            isActive={location.pathname === "/promotional-banners"}
            location={location}
          />
          <DropdownNavItem
            activeIcon={activesubscriptionImg}
            inactiveIcon={inactivesubscriptionImg}
            label="Subscription Packages"
            isOpen={isSubscriptionOpen}
            setIsOpen={setIsSubscriptionOpen}
            items={[
              { label: "List Of Subscribers", to: "/list-of-subscribers" },
            ]}
            isActive={location.pathname.startsWith("/subscription-packages")}
            to="/subscription-packages"
          />
          <NavItem
            activeIcon={activenotificationImg}
            inactiveIcon={inactivenotificationImg}
            label="Send Notifications"
            to="/notifications"
            isActive={location.pathname === "/notifications"}
            location={location}
          />
          {/* Locations page */}
          <NavItem
            activeIcon={activelocationImg}
            inactiveIcon={inactivelocationImg}
            label="Locations"
            to="/locations"
            isActive={location.pathname === "/locations"}
            location={location}
          />

          <NavItem
            activeIcon={activelanguageImg}
            inactiveIcon={inactivelanguageImg}
            label="Language Setup"
            to="/language"
            isActive={location.pathname === "/language"}
            location={location}
          />
        </nav>
      </div>

      {/* Large Screen Sidebar */}
      <div className="hidden md:block bg-[#2B4DC9] text-white h-full p-4 ">
        <div>
          <h1 className="font-Montserrat font-semibold text-2xl text-white mb-4">
            Blkhedme
          </h1>
        </div>
        <nav className="space-y-3">
          <NavItem
            activeIcon={activedashboardImg}
            inactiveIcon={inactivedashboardImg}
            label="Dashboard"
            to="/"
            isActive={location.pathname === "/"}
            location={location}
          />
          <h1 className="font-Poppins text-lg hover:bg-[#004E89] text-white">
            Provider Management
          </h1>
          <NavItem
            activeIcon={activeonboardingImg}
            inactiveIcon={inactiveonboardingImg}
            label="Onboarding Requests"
            to="/onboarding-requests-page"
            isActive={location.pathname === "/onboarding-requests-page"}
            notification
            location={location}
          />
          <DropdownNavItem
            activeIcon={activeproviderImg}
            inactiveIcon={inactiveproviderImg}
            label="Provider"
            isOpen={isProviderOpen}
            setIsOpen={setIsProviderOpen}
            items={[
              { label: "List of Provider", to: "/list-of-provider" },
              { label: "Certified Provider", to: "/certified-provider" },
              { label: "Featured Provider", to: "/featured-provider" },
              { label: "Add New Provider", to: "/add-new-provider" },
            ]}
            isActive={location.pathname.startsWith("/list-of-provider")}
            to="/list-of-provider"
          />
          <h1 className="font-Poppins text-lg hover:bg-[#004E89] text-white">
            Seeker Management
          </h1>
          <DropdownNavItem
            activeIcon={activeseekerImg}
            inactiveIcon={inactiveseekerImg}
            label="Seeker"
            isOpen={isSeekerOpen}
            setIsOpen={setIsSeekerOpen}
            items={[
              { label: "List of Seeker", to: "/list-of-seeker" },
              { label: "Add New Seeker", to: "/add-new-seeker" },
            ]}
            isActive={location.pathname.startsWith("/list-of-seeker")}
            to="/list-of-seeker"
          />
          <DropdownNavItem
            activeIcon={activecategoriesImg}
            inactiveIcon={inactivecategoriesImg}
            label="Categories"
            isOpen={isCategoriesOpen}
            setIsOpen={setIsCategoriesOpen}
            items={[
              { label: "Category Setup", to: "/category-setup" },
              { label: "Sub-Category Setup", to: "/sub-category-setup" },
            ]}
            isActive={location.pathname.startsWith("/category-setup")}
            to="/category-setup"
          />
          <NavItem
            activeIcon={activepromotionalImg}
            inactiveIcon={inactivepromotionalImg}
            label="Promotional Banners"
            to="/promotional-banners"
            isActive={location.pathname === "/promotional-banners"}
            location={location}
          />
          <DropdownNavItem
            activeIcon={activesubscriptionImg}
            inactiveIcon={inactivesubscriptionImg}
            label="Subscription Packages"
            isOpen={isSubscriptionOpen}
            setIsOpen={setIsSubscriptionOpen}
            items={[
              { label: "List Of Subscribers", to: "/list-of-subscribers" },
            ]}
            isActive={location.pathname.startsWith("/subscription-packages")}
            to="/subscription-packages"
          />
          <NavItem
            activeIcon={activenotificationImg}
            inactiveIcon={inactivenotificationImg}
            label="Send Notifications"
            to="/notifications"
            isActive={location.pathname === "/notifications"}
            location={location}
          />
          {/* locations page */}
          <NavItem
            activeIcon={activelocationImg}
            inactiveIcon={inactivelocationImg}
            label="Locations"
            to="/locations"
            isActive={location.pathname === "/locations"}
            location={location}
          />
          <NavItem
            activeIcon={activelanguageImg}
            inactiveIcon={inactivelanguageImg}
            label="Language Setup"
            to="/language"
            isActive={location.pathname === "/language"}
            location={location}
          />
        </nav>
      </div>
    </>
  );
};

const NavItem = ({
  activeIcon,
  inactiveIcon,
  label,
  to,
  isActive,
  notification,
  location,
}) => (
  <RouterLink
    to={to}
    className={`flex items-center space-x-2 hover:bg-[#004E89] rounded ${
      isActive ? "fill-[#FF8000] text-[#FF8000] stroke-[#FF8000]" : "text-white"
    }`}
  >
    <span>
      <img
        src={isActive ? activeIcon : inactiveIcon}
        alt={label}
        className="w-6 h-6"
      />
    </span>
    <span>{label}</span>
    {notification && (
      <span className="ml-auto bg-red-500 text-white rounded-full px-2 text-sm">
        8
      </span>
    )}
  </RouterLink>
);

const DropdownNavItem = ({
  activeIcon,
  inactiveIcon,
  label,
  isOpen,
  setIsOpen,
  items,
  isActive,
  to,
}) => {
  const location = useLocation();

  return (
    <div>
      <RouterLink
        to={to}
        className={`flex items-center justify-between rounded cursor-pointer ${
          isActive ? "text-[#FF8000]" : "text-white"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-2">
          <img
            src={isActive ? activeIcon : inactiveIcon}
            alt={label}
            className="w-6 h-6"
          />
          <span>{label}</span>
        </div>
        {isOpen ? (
          <IoIosArrowDown className="text-[#FF8000]" />
        ) : (
          <MdKeyboardArrowRight
            className={`text-white ${isActive ? "text-[#FF8000]" : ""}`}
          />
        )}
      </RouterLink>
      {isOpen && (
        <div className="ml-6 space-y-1">
          {items.map((item, idx) => (
            <RouterLink
              key={idx}
              to={item.to}
              className={`block rounded ${
                location.pathname === item.to ? "text-[#FF8000]" : "text-white"
              }`}
            >
              {item.label}
            </RouterLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
