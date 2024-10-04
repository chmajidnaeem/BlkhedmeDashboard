import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import ProfileImg from "../Assets/profileImg.svg";
import IdentityImg from "../Assets/identityImg.svg";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import pdfImg from "../Assets/pdf.svg";
import otherImg1 from "../Assets/others1.svg";
import otherImg2 from "../Assets/others2.svg";
import otherImg3 from "../Assets/others3.svg";
import otherImg4 from "../Assets/others4.svg";
import otherImg5 from "../Assets/others5.svg";
import otherImg6 from "../Assets/others6.svg";
import { fetchProviders, updateProvider } from '../features/providerSlice';

const urlToFile = async (url, fileName) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();

    // Log the MIME type to see what the URL is returning
    const mimeType = blob.type;
    console.log("MIME type of identity card:", mimeType);

    const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
    
    if (!allowedMimeTypes.includes(mimeType)) {
      throw new Error(`Invalid file type: ${mimeType}`);
    }

    return new File([blob], fileName, { type: mimeType });
  } catch (error) {
    console.error("Error converting URL to file:", error);
    throw error;
  }
};

const ProviderPreview = ({ providerData, providerId }) => {

  const [providerInformation, setProviderInformation] = useState(null); // Renamed to providerInformation
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();

  // Fetch provider information when the component mounts
  useEffect(() => {
    const fetchProviderDetails = async () => {
      try {
        const provider = await dispatch(fetchProviders(providerId)).unwrap(); // Assuming fetchProviders returns a single provider's data
        setProviderInformation(provider); // Renamed here
      } catch (error) {
        toast.error("Failed to fetch provider information.");
        console.error("Error fetching provider information:", error);
      }
    };

    fetchProviderDetails();
  }, [dispatch, providerId]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
  
    if (!providerInformation) {
      toast.error("Provider information not loaded yet!");
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append("password", password);
      formData.append("confirm_password", confirmPassword);
  
      // Append other fields fetched from provider information
      formData.append("first_name", providerData.first_name);
      formData.append("last_name", providerData.last_name);
      formData.append("phone", providerData.phone);
      formData.append("email", providerData.email);
      formData.append("area_of_operation", providerData.category.id);
      formData.append("profession", providerData.profession);
      formData.append("identity_card",providerData.identity_card)
  
      // Convert identity_card URL to file and append it
      
      // Dispatch updateProvider action with the updated form data
      await dispatch(updateProvider({ id: providerId, updatedData: formData }));
      
      toast.success("Password updated successfully!");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error("Failed to update provider information.");
      console.error("Error updating provider:", error);
    }
  };
  

  const formattedDate = new Date(providerData.created_at).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  return (
    <div className="p-4 min-h-screen font-poppins">
      <div className=" rounded-lg">

        <div className="pb-2 mb-4 flex flex-col sm:flex-row items-center justify-between">
          <div className="text-center sm:text-start font-poppins">
            <h1 className="text-xl font-bold">Provider Preview</h1>
            <p className="text-[#616161]">
              Requested to join at {formattedDate}
            </p>
          </div>
          <div className="mt-4 text-right">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">
              Edit
            </button>
          </div>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          <div className="lg:col-span-2">
            <div className="bg-gray-50 p-4 border rounded-lg mb-4 shadow-md">
              <h2 className="font-semibold text-lg mb-2 border-b border-black font-inter">
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
                      {`${providerData?.first_name} ${providerData?.last_name}`}
                    </strong>
                  </p>
                  <p>
                    <strong className="font-medium">
                      Contact Phone 2{" "}
                      <div className="w-1 h-1 bg-slate-600 rounded-full inline-block mb-[2px]"></div>{" "}
                    </strong>{" "}
                    <strong className="text-[#616161] text-[12px] ml-1">
                      {providerData?.phone || "N/A"}
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
                      {providerData?.email || "N/A"}
                    </strong>
                  </p>
                  <p>
                    <strong className="font-medium">
                      Subscription Plan{" "}
                      <div className="w-1 h-1 bg-slate-600 rounded-full inline-block mb-[2px]"></div>{" "}
                    </strong>
                    <span className="text-blue-600">
                      Free Membership (15 days Left)
                    </span>
                  </p>
                </div>
              </div>
              {/* Images */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <img
                  src={providerData.image}
                  alt={`${providerData.first_name} ${providerData.last_name}`}
                  className="rounded-lg"
                />
                <img src={providerData.identity_card
                } alt="ID Card" className="rounded-lg" />
              </div>
            </div>


            <div className="bg-gray-50 p-4 border rounded-lg mb-4 shadow-md">
              <h2 className="font-semibold text-lg mb-2 border-b border-black font-inter">
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
                      {providerData.category.title || "N/A"}
                    </strong>
                  </p>
                  <p>
                    <strong className="font-medium">
                      Years of Experience{" "}
                      <div className="w-1 h-1 bg-slate-600 rounded-full inline-block mb-[2px]"></div>{" "}
                    </strong>
                    <strong className="text-[#616161] text-[12px] ml-1">
                      {providerData.years_experience || "N/A"}
                    </strong>
                  </p>
                  <p>
                    <strong className="font-medium">
                      Working Hours{" "}
                      <div className="w-1 h-1 bg-slate-600 rounded-full inline-block mb-[2px]"></div>{" "}
                    </strong>
                    <strong className="text-[#616161] text-[12px] ml-1">
                      {`${providerData.working_hours_from || "00:00"} - ${providerData.working_hours_till || "00:00"}`}
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
                      {providerData?.profession || "N/A"}
                    </strong>
                  </p>
                  <p>
                    <strong className="font-medium">
                      Area of Operation{" "}
                      <div className="w-1 h-1 bg-slate-600 rounded-full inline-block mb-[2px]"></div>{" "}
                    </strong>
                    <strong className="text-[#616161] text-[12px] ml-1">
                      {providerData?.category.title || "N/A"}
                    </strong>
                  </p>
                </div>
              </div>
            </div>


            <div className="p-4">
              <h2 className="font-semibold text-lg mb-2 border-b border-black font-inter">Other Information</h2>
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


          <div className="font-inter">
          {/* the updating password seciton is commented uncomment it if you want allow user to update password */}
            {/* <div className="p-4">
              <h1 className="text-xl font-bold mb-4">Update Provider Password</h1>
              {providerInformation ? (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block mb-1">New Password:</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="p-2 border border-gray-300 rounded w-full"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1">Confirm Password:</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="p-2 border border-gray-300 rounded w-full"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Update Password
                  </button>
                </form>
              ) : (
                <p>Loading provider information...</p>
              )}
            </div> */}
            <div className="bg-gray-50 p-4 border rounded-lg shadow-md">
              <h2 className="font-semibold text-lg mb-4 border-b font-inter border-black">Documents</h2>
              <div className="flex gap-4">
                <div className="text-center">
                  <Link to={providerData.degree || ""} >
                    <img
                      src={pdfImg}
                      alt="Degree"
                      className="rounded-lg mx-auto"
                    />
                  </Link>
                  <p className="mt-2 text-sm text-[#616161]">{`${providerData.degree ? "Degree" : "No Degree"}`}</p>
                </div>
                <div className="text-center">
                  <img
                    src={pdfImg}
                    alt="Certificate"
                    className="rounded-lg mx-auto"
                  />
                  <p className="mt-2 text-sm text-[#616161]">{`${providerData.degree ? "Certificate" : "NO Certificate"}`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderPreview;
