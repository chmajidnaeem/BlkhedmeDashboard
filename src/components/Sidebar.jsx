import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import dashboardImg from '../Assets/dashboard.svg';
import categoriesImg from '../Assets/categories.svg';
import languageImg from '../Assets/language.svg';
import notificationImg from '../Assets/notifications.svg';
import onboardingImg from '../Assets/onboarding-requests.svg';
import promotionalImg from '../Assets/promotional-banners.svg';
import providerImg from '../Assets/provider.svg';
import seekerImg from '../Assets/seeker.svg';
import subscriptionImg from '../Assets/subscription.svg';

const Sidebar = () => {
  const location = useLocation();
  const [isProviderOpen, setIsProviderOpen] = useState(false);
  const [isSeekerOpen, setIsSeekerOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  return (
    <div className="bg-[#2B4DC9] text-white h-full p-4">
      <h2 className="text-2xl font-bold mb-6">Blkhedme</h2>
      <nav className="space-y-4">
        <NavItem
          icon={dashboardImg}
          label="Dashboard"
          to="/"
          isActive={location.pathname === '/'}
        />
        <h1 className=" font-Poppins text-lg hover:bg-[#004E89] text-white">
          Provider Management
        </h1>
        <NavItem
          icon={onboardingImg}
          label="Onboarding Requests"
          to="/onboarding-requests-page"
          isActive={location.pathname === '/onboarding-requests-page'}
          notification
        />
        <DropdownNavItem
          icon={providerImg}
          label="Provider"
          isOpen={isProviderOpen}
          setIsOpen={setIsProviderOpen}
          items={[
            { label: 'List of Provider', to: '/list-of-provider' },
            { label: 'Certified Provider', to: '/certified-provider' },
            { label: 'Featured Provider', to: '/featured-provider' },
            { label: 'Add New Provider', to: '/add-new-provider' },
          ]}
          isActive={location.pathname.startsWith('/provider')}
        />
        <h1 className=" font-Poppins text-lg hover:bg-[#004E89] text-white">
          Seeker Management
        </h1>
        <DropdownNavItem
          icon={seekerImg}
          label="Seeker"
          isOpen={isSeekerOpen}
          setIsOpen={setIsSeekerOpen}
          items={[
            { label: 'List of Seeker', to: '/list-of-seeker' },
            { label: 'Add New Seeker', to: '/add-new-seeker' },
          ]}
          isActive={location.pathname.startsWith('/seeker')}
        />
        <DropdownNavItem
          icon={categoriesImg}
          label="Categories"
          isOpen={isCategoriesOpen}
          setIsOpen={setIsCategoriesOpen}
          items={[
            { label: 'Category Setup', to: '/category-setup' },
            { label: 'Sub-Category Setup', to: '/sub-category-setup' },
          ]}
          isActive={location.pathname.startsWith('/categories')}
        />
        <NavItem
          icon={promotionalImg}
          label="Promotional Banners"
          to="/promotional-banners"
          isActive={location.pathname === '/promotional-banners'}
        />
        <NavItem
          icon={subscriptionImg}
          label="Subscription Packages"
          to="/subscription-packages"
          isActive={location.pathname === '/subscription-packages'}
        />
        <NavItem
          icon={notificationImg}
          label="Send Notifications"
          to="/send-notifications"
          isActive={location.pathname === '/send-notifications'}
        />
        <NavItem
          icon={languageImg}
          label="Language Setup"
          to="/language-setup"
          isActive={location.pathname === '/language-setup'}
        />
      </nav>
    </div>
  );
};

const NavItem = ({ icon, label, to, isActive, notification }) => (
  <Link
    to={to}
    className={`flex items-center space-x-2 hover:bg-[#004E89] rounded ${
      isActive ? 'text-[#FF8000]' : ''
    }`}
  >
    <img src={icon} alt={label} className="w-6 h-6" />
    <span>{label}</span>
    {notification && (
      <span className="ml-auto bg-red-500 text-white rounded-full px-2 text-sm">8</span>
    )}
  </Link>
);

const DropdownNavItem = ({ icon, label, isOpen, setIsOpen, items, isActive }) => (
  <div>
    <div
      className={`flex items-center justify-between hover:bg-[#004E89] p-2 rounded cursor-pointer ${
        isActive ? 'text-[#FF8000]' : ''
      }`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-center space-x-2">
        <img src={icon} alt={label} className="w-6 h-6" />
        <span>{label}</span>
      </div>
      <span className={`transform transition-transform ${isOpen ? 'rotate-90' : ''}`}>
        &gt;
      </span>
    </div>
    {isOpen && (
      <div className="ml-6 space-y-2">
        {items.map((item, idx) => (
          <Link
            key={idx}
            to={item.to}
            className={`block hover:bg-[#004E89] rounded ${
              isActive ? 'text-[#FF8000]' : ''
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    )}
  </div>
);

export default Sidebar;
