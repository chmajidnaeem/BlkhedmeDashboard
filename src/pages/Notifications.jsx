
import gallery from "../Assets/gallery.png";
import NotificationsTable from '../components/NotificationsTable'
import { MdOutlineAttachment } from "react-icons/md";

const Notifications = () => {
  return (
    <div className="overflow-x-auto">
      <div className="">
        <h2 className="text-xl md:text-2xl font-poppins font-medium mb-4">
          Push Notification
        </h2>
        <div className="bg-white p-4 md:p-6 rounded-md shadow-lg w-full font-poppins">
          <form className="flex flex-col md:flex-row space-x-0 md:space-x-8">
            {/* left side */}
            <div className="w-full md:w-1/2">
              <div className="mb-4">
                <label className="block text-base font-medium mb-2">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Enter the Title"
                  className="border border-gray-300 p-4 w-full rounded-lg text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-base font-medium mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Enter Description"
                  className="border border-gray-300 p-4 rounded-lg w-full h-40 text-sm"
                />
              </div>
              <div className="mb-4">
                <div className="flex flex-col gap-2 md:flex-row md:gap-4">
                  <label className="flex items-center ml-2">
                    Resources Type:
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="resourceType" value="service" />
                    <span className="ml-2">Providers</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="resourceType" value="link" />
                    <span className="ml-2">Seekers</span>
                  </label>
                </div>
              </div>
              {/* city and user input */}
              <div className="flex flex-col md:flex-row gap-2 mb-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="City"
                    className="w-full py-2 px-4 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Select User"
                    className="w-full py-2 px-4 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
              </div>
            </div>
            {/* right side */}
            <div className="w-full md:w-1/2">
              <div className="flex flex-col md:flex-row items-center justify-center py-4 md:py-10 gap-4">
                <div className="flex flex-col items-center max-w-xs md:max-w-sm w-[250px] h-[150px] p-4 rounded-xl border-2 border-dashed border-gray-300">
                  <img
                    src={gallery}
                    alt="gallery"
                    className="w-12 h-12 opacity-40"
                  />
                  <h1 className="text-gray-500 font-poppins text-xs mt-2">
                    Upload or Drag Photo
                  </h1>
                </div>

                <div className="flex flex-col justify-center text-center md:text-left text-xs">
                  <h1 className="text-gray-600">
                    Image format - jpg png jpeg gif
                    <br />
                    Image size - maximum 2 MB
                    <br />
                    Image Ratio - 2:1
                  </h1>
                </div>
              </div>

              {/* attachment input */}
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Attach document"
                  // className="p-2 border-2 border-dotted border-gray-300 rounded-lg  text-sm"
                  className="p-2 border-2 border-dotted border-gray-300 rounded-lg w-full md:w-[250px] text-sm"
                />
                <MdOutlineAttachment className="absolute right-4 md:right-60 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
              <p className="text-xs font-poppins text-gray-600 mt-2 mb-4">
                File size - maximum size 2 MB
              </p>

              {/* Buttons */}
              <div className="flex flex-col md:flex-row justify-end items-center gap-4 w-full">
                <button
                  type="button"
                  className="bg-gray-300 px-4 py-2 w-full md:w-auto rounded-lg mb-2 md:mb-0"
                >
                  RESET
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 px-4 py-2 w-full md:w-auto rounded-lg text-white"
                >
                  SEND
                </button>
              </div>
            </div>
          </form>
        </div>
        <NotificationsTable />
      </div>
    </div>
  );
};

export default Notifications;
