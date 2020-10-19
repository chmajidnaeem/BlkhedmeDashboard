import Img from "../Assets/manImg.jpg";

const OnboardingRequests = () => {
  const onboardingRequests = [
    {
      name: "Ali Akbar",
      email: "abc@gmail.com",
      role: "Mechanic",
      status: "Not Verified",
      img: Img,
    },
    {
      name: "Ali Akbar",
      email: "abc@gmail.com",
      role: "Mechanic",
      status: "Not Verified",
      img: Img,
    },
    {
      name: "Ali Akbar",
      email: "abc@gmail.com",
      role: "Mechanic",
      status: "Not Verified",
      img: Img,
    },
    {
      name: "Ali Akbar",
      email: "abc@gmail.com",
      role: "Mechanic",
      status: "Not Verified",
      img: Img,
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-2/3 lg:w-1/2">
      <div className="flex justify-between items-center mb-4 font-poppins">
        <h3 className="font-semibold  text-[#0C0302]">
          Onboarding Provider Requests
        </h3>
        <a href="/" className="text-[#0085FF] underline text-sm">
          View All
        </a>
      </div>
      {onboardingRequests.map((requests, idx) => (
        <div
          key={idx}
          className="flex items-center justify-between h-18 max-h-18 p-2 border-b-[1px] font-inter"
        >
          <div className="flex gap-2">
            <div className="Image w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
              <img
                src={requests.img}
                className="w-full bg-cover bg-center"
                alt="profile-image"
              />
            </div>
            <div>
              <div className="font-medium mb-2">{requests.name}</div>
              <div className=" flex gap-2 items-center text-[#616161]">
                <div className="text-[12px]">{requests.email}</div>
                <div className=" flex items-center w-[5px] h-[5px] rounded-full bg-gray-600"></div>
                <div className="time text-[12px] text-[#616161]">
                  2 days ago
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between">
            <div className="text-[#E5801A] text-[10px] mb-2">Not Verified</div>
            <div className="text-[12px] text-[#616161]">{requests.role}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OnboardingRequests;
