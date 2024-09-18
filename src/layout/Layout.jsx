import { Outlet } from "react-router-dom";
import Sidebar from '../components/Sidebar'
import Header from '../components/Topbar'

const Layout = () => {
  return (
    <div className="flex flex-col md:flex-row bg-[#F5F5F5]">
    {/* Sidebar */}
    <div className="md:w-1/5 w-full  bg-[#2B4DC9]">
      <Sidebar />
    </div>

    {/* Main Content */}
    <div className="flex-1 flex flex-col md:ml-1/5">
      {/* Header */}
      <div className="md:ml-1/5 bg-[#ffffff] shadow-md">
        <Header />
      </div>

      {/* Outlet */}
      <main className="overflow-y-auto md:p-4 min-h-screen bg-[#F5F5F5] w-full">
        <Outlet />
      </main>
    </div>
  </div>
  );
};

export default Layout;
