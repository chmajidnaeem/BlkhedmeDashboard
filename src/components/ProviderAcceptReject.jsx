import React from "react";
import ProfileImg from "../Assets/profileImg.svg";
import IdentityImg from "../Assets/identityImg.svg";
import pdfImg from "../Assets/pdf.svg";
import otherImg1 from "../Assets/others1.svg";
import otherImg2 from "../Assets/others2.svg";
import otherImg3 from "../Assets/others3.svg";
import otherImg4 from "../Assets/others4.svg";
import otherImg5 from "../Assets/others5.svg";
import otherImg6 from "../Assets/others6.svg";

const ProviderAcceptReject = () => {
  return (
    <div className="p-4 min-h-screen font-poppins">
      <div className=" rounded-lg">
       
        <div className="pb-2 mb-4 flex flex-col sm:flex-row items-center justify-between">
          <div className="text-center sm:text-start">
            <h1 className="text-xl font-bold">Provider Preview</h1>
            <p className="text-[#616161]">
              Requested to join at 20-12-2024 01:30pm
            </p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <button className="bg-[#B80000] text-white text-sm w-[100px] px-4 py-2 rounded-lg">
              Reject
            </button>
            <button className="bg-[#00B607] text-white w-[100px] text-sm px-4 py-2 rounded-lg">
              Approved
            </button>
          </div>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          
          <div className="lg:col-span-2">
            <div className="bg-gray-50 p-4 border rounded-lg mb-4 shadow-md">
              <h2 className="font-semibold text-lg mb-2 font-inter border-b border-black">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="">
                    <strong className=" font-medium">
                      Name{" "}
                      <div className="w-1 h-1 bg-slate-600 rounded-full inline-block mb-[2px]"></div>{" "}
                    </strong>
                    <strong className="text-[#616161] text-[12px] ml-1">
                      John Martin
                    </strong>
                  </p>
                  <p>
                    <strong className="font-medium">
                      Contact Phone 2{" "}
                      <div className="w-1 h-1 bg-slate-600 rounded-full inline-block mb-[2px]"></div>{" "}
                    </strong>{" "}
                    <strong className="text-[#616161] text-[12px] ml-1">
                      +1 9876543210
                    </strong>
                  </p>
                </div>
                <div>
                  <p>
                    <strong className="font-medium">
                      Email{" "}
                      <div className="w-1 h-1 bg-slate-600 rounded-full inline-block mb-[2px]"></div>{" "}
                    </strong>
                    <strong className="text-[#616161] text-[12px] ml-1">
                      johnmartin@gmail.com
                    </strong>
                  </p>
                  <p>
                    <strong className="font-medium">
                      Subscription Plan{" "}
                      <div className="w-1 h-1 bg-slate-600 rounded-full inline-block mb-[2px]"></div>{" "}
                    </strong>
                    <span className="text-[#0085FF]">
                      Free Membership (15 days Left)
                    </span>
                  </p>
                </div>
              </div>
              {/* Images */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <img
                  src={ProfileImg}
                  alt="John Martin"
                  className="rounded-lg"
                />
                <img src={IdentityImg} alt="ID Card" className="rounded-lg" />
              </div>
            </div>

            
            <div className="bg-gray-50 p-4 border rounded-lg mb-4 shadow-md">
              <h2 className="font-semibold font-inter text-lg mb-2 border-b border-black">
                {" "}
                Professional Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                <div>
                  <p>
                    <strong className="font-medium">
                      Profession{" "}
                      <div className="w-1 h-1 bg-slate-600 rounded-full inline-block mb-[2px]"></div>{" "}
                    </strong>
                    <strong className="text-[#616161] text-[12px] ml-1">
                      {" "}
                      John Martin
                    </strong>
                  </p>
                  <p>
                    <strong className="font-medium">
                      Years of Experience{" "}
                      <div className="w-1 h-1 bg-slate-600 rounded-full inline-block mb-[2px]"></div>{" "}
                    </strong>
                    <strong className="text-[#616161] text-[12px] ml-1">
                      {" "}
                      +1 9876543210
                    </strong>
                  </p>
                  <p>
                    <strong className="font-medium">
                      Working Hours{" "}
                      <div className="w-1 h-1 bg-slate-600 rounded-full inline-block mb-[2px]"></div>{" "}
                    </strong>
                    <strong className="text-[#616161] text-[12px] ml-1">
                      {" "}
                      9:00am - 5:30pm
                    </strong>
                  </p>
                </div>
                <div>
                  <p>
                    <strong className="font-medium">
                      Profession{" "}
                      <div className="w-1 h-1 bg-slate-600 rounded-full inline-block mb-[2px]"></div>{" "}
                    </strong>
                    <strong className="text-[#616161] text-[12px] ml-1">
                      {" "}
                      Mechanic
                    </strong>
                  </p>
                  <p>
                    <strong className="font-medium">
                      Area of Operation{" "}
                      <div className="w-1 h-1 bg-slate-600 rounded-full inline-block mb-[2px]"></div>{" "}
                    </strong>
                    <strong className="text-[#616161] text-[12px] ml-1">
                      {" "}
                      Vehicle Mechanic
                    </strong>
                  </p>
                </div>
              </div>
            </div>

            
            <div className="p-4">
              <h2 className="font-semibold font-inter text-lg mb-2 border-b border-black">Other Information</h2>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                <img
                  src={otherImg1}
                  alt="Other info 1"
                  className="rounded-lg"
                />
                <img
                  src={otherImg2}
                  alt="Other info 2"
                  className="rounded-lg"
                />
                <img
                  src={otherImg3}
                  alt="Other info 3"
                  className="rounded-lg"
                />
                <img
                  src={otherImg4}
                  alt="Other info 4"
                  className="rounded-lg"
                />
                <img
                  src={otherImg5}
                  alt="Other info 5"
                  className="rounded-lg"
                />
                <img
                  src={otherImg6}
                  alt="Other info 6"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>

          
          <div>
            <div className="bg-gray-50 p-4 border rounded-lg mb-4 shadow-md">
              <h2 className="font-semibold font-inter text-lg mb-2">Change Password</h2>
              <div>
                <label htmlFor="password" className="text-sm font-medium">New Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                className="border p-2 w-full rounded mb-4 mt-2"
              />
              </div>
              <div>
                <label htmlFor="rePassword" className="text-sm font-medium">Re-Type New Password</label>
              <input
                type="password"
                placeholder="Re-Type New Password"
                className="border p-2 w-full rounded mb-4 mt-2"
              />
              </div>
              <div className="flex justify-end">
              <button className="bg-[#0085FF] text-white px-4 py-2 rounded w-[150px] justify-right">
                Update
              </button>
              </div>
            </div>

          
            <div className="bg-gray-50 p-4 border rounded-lg shadow-md">
              <h2 className="font-semibold font-inter text-lg mb-4 border-b border-black">Documents</h2>
              <div className="flex gap-4">
                <div className="text-center">
                  <img
                    src={pdfImg}
                    alt="Degree"
                    className="rounded-lg mx-auto"
                  />
                  <p className="mt-2 text-sm text-[#616161]">Degree</p>
                </div>
                <div className="text-center">
                  <img
                    src={pdfImg}
                    alt="Certificate"
                    className="rounded-lg mx-auto"
                  />
                  <p className="mt-2 text-sm text-[#616161]">Certificate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderAcceptReject;
