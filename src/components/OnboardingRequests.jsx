import Img from '../Assets/manImg.jpg'
import Img2 from '../Assets/manImg2.jpg'

const OnboardingRequests = () => {
    const onboardingRequests = [
      { name: "Ali Akbar", email: "abc@gmail.com", role: "Mechanic", status: "Not Verified", img: Img },
      { name: "Ali Akbar", email: "abc@gmail.com", role: "Mechanic", status: "Not Verified", img: Img },
      { name: "Ali Akbar", email: "abc@gmail.com", role: "Mechanic", status: "Not Verified", img: Img },
      { name: "Ali Akbar", email: "abc@gmail.com", role: "Mechanic", status: "Not Verified", img: Img },
    ];     
      
        return (
          <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">Onboarding Provider Requests</h3>
              <a href="#" className="text-blue-500 underline">View All</a>
            </div>
            {onboardingRequests.map((requests, idx) => (
              <div key={idx} className="flex items-center justify-between h-18 max-h-18 p-2 border-b-[1px]">
                <div className="flex items-center gap-2">
                  <div className="Image w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
                    <img src={requests.img} className='w-full bg-cover bg-center' alt="profile-image" />
                  </div>
                  <div>
                  <div className="font-bold mb-2">{requests.name}</div>
                  <div className=" flex gap-2 items-center"><div className="text-sm">{requests.email}
                  </div>
                  <div className=" flex items-center w-[5px] h-[5px] rounded-full bg-gray-600"></div>
                  <div className="time text-sm">2 days ago</div>
                  </div>
                  </div>
              </div>
              <div className="flex flex-col items-center justify-between">
                <div className="text-[#E5801A] text-sm mb-2">Not Verified</div>
                  <div className="text-sm">{requests.role}</div>
                </div>
                </div>
                
            ))}
          </div>
        );
      };
    
    export default OnboardingRequests;
    