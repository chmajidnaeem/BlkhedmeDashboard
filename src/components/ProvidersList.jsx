// src/components/ProvidersList.jsx
const ProvidersList = () => {
    const providers = [
      { name: "Ali Akbar", rating: "★★★★★", role: "Mechanic" },
      { name: "Ali Akbar", rating: "★★★★★", role: "Mechanic" },
      { name: "Ali Akbar", rating: "★★★★★", role: "Mechanic" },
      { name: "Ali Akbar", rating: "★★★★★", role: "Mechanic" },
    ];
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/2">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold">Top Providers</h3>
          <a href="#" className="text-blue-500 underline">View All</a>
        </div>
        {providers.map((provider, idx) => (
          <div key={idx} className="flex items-center justify-between h-18 p-2 border-b-[1px]">
            <div className="flex items-center gap-2">
              <div className="Image w-12 h-12 rounded-full bg-gray-300"></div>
              <div>
              <div className="font-bold mb-1">{provider.name}</div>
              <div className=" flex gap-2 items-center">Rating<div className="text-[#E5801A]">{provider.rating}
              </div>
              </div>
              </div>
          </div>
              <div className="text-sm">{provider.role}</div>
            </div>
            
        ))}
      </div>
    );
  };
  
  export default ProvidersList;
  