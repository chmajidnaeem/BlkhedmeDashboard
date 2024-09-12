import { Outlet } from "react-router-dom";
import Sidebar from '../components/Sidebar'
import Header from '../components/Topbar'

const Layout = () => {
  return (
    <div className="flex">
      <div className="w-1/5 h-auto bg-[#2B4DC9]">
        <Sidebar />
      </div>
      <div className="flex-1 ml-1/4">
        
          <Header />
        <div className="overflow-y-auto p-4 min-h-screen bg-[#F5F5F5]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
