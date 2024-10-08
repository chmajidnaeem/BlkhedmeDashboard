import React from 'react'
import ProfileImg from "../Assets/profileImg.svg";
import Review from '../components/Review';

const SeekerProfileReviews = () => {
  return (
    <div className="p-4 min-h-screen font-poppins">
    <div className=" rounded-lg">
     
      <div className="pb-2 mb-4 flex items-center justify-between">
        <div className="text-center sm:text-start">
          <h1 className="text-xl font-bold">Provider Preview</h1>
        </div>
        <div className="mt-4 text-right">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">
            Edit
          </button>
        </div>
      </div>

      
      
        
        <div className="lg:col-span-2">
          <div className="bg-gray-50 p-4 border rounded-lg mb-4 shadow-md">
            <h2 className="font-bold text-lg mb-2 border-b border-black">
              Personal Information
            </h2>
            <div className='flex items-center gap-4'>
            <div className="">
              <img
                src={ProfileImg}
                alt="John Martin"
                className="rounded-lg"
              />
            </div>
            <div className=" flex flex-col gap-4 text-sm">
              <div className='flex flex-col gap-4'>
                <p className="">
                  <strong className=" font-semibold">
                    Name{" "}
                    <div className="w-1 h-1 bg-slate-600 rounded-full inline-block mb-[2px]"></div>{" "}
                  </strong>
                  <strong className="text-[#616161] text-[12px] ml-1">
                    John Martin
                  </strong>
                </p>
                <p>
                  <strong className="font-semibold">
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
                  <strong>
                    Email{" "}
                    <div className="w-1 h-1 bg-slate-600 rounded-full inline-block mb-[2px]"></div>{" "}
                  </strong>
                  <strong className="text-[#616161] text-[12px] ml-1">
                    johnmartin@gmail.com
                  </strong>
                </p>
              </div>
            </div>
            
            </div>
          </div>
    </div>
    <div className="mt-6 bg-gray-50 shadow-md p-4 rounded-lg">
          <h1 className="border-b-[1.4px] border-black pb-1 font-bold text-lg">Password</h1>
          <div className="w-full">
            <form action="#" className="space-y-4 p-4 w-full text-sm">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col w-full">
                  <label htmlFor="password" className="mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter Password"
                    className="border p-2 rounded-md w-full"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="confirmPassword" className="mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    className="border p-2 rounded-md w-full"
                  />
                </div>
              </div>
            </form>
            <div className='flex justify-end'>
            <button className="bg-blue-600 text-white  px-6 py-2 rounded-lg">
            Update
          </button>
          </div>
          </div>
          
        </div>
        <div className="flex space-x-4 border-b mt-6">
        <button className="font-semibold text-black">Reviews <span>(04)</span></button>
        <button className="font-semibold text-gray-500">Reports</button>
      </div>

        <div className="reviews">
        <Review />
      </div>
  </div>
  </div>
  )
}

export default SeekerProfileReviews