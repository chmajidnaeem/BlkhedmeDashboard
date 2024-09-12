import { BsEyeSlash } from "react-icons/bs";

const LoginPage = () => {
    return (
      <div className="flex h-screen overflow-hidden">
        {/* Left Section */}
        <div className="w-full md:w-1/2 flex flex-col">
        <div className="text-[#2B4DC9] text-3xl font-bold ml-14 mt-10">
          <h1>Blkedme</h1>
        </div>
        <div className="w-full h-screen flex flex-col justify-center items-center relative p-8">
        
          <form className="w-full sm:w-2/3 font-poppins">
            <div className="flex flex-col items-center text-center mb-6">
            <h2 className="text-3xl font-bold  mb-3">Sign In</h2>
            <p className="text-[#707070]">Please enter your credentials</p>
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Enter email"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4 relative">
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <BsEyeSlash className="text-[#707070] absolute right-4 top-4"/>
            </div>
            <div className="mb-6 flex items-center text-[#707070]">
              <input type="radio" id="remember" className="mr-2" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <button
              type="submit"
              className="w-full bg-[#0085FF] text-white py-3 rounded-lg font-semibold"
            >
              sign in
            </button>
          </form>
  
          {/* Decorative Circles */}
          
            <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-[#2B4DC9] rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-20 h-20 bg-[#2B4DC9] rounded-full"></div>
            <div className="absolute top-6 right-10 md:right-20 w-20 h-20 bg-[#2B4DC9] rounded-full"></div>
            <div className="absolute top-16 -left-10 w-20 h-20 bg-[#2B4DC9] rounded-full"></div>
            <div className="absolute hidden lg:block top-[50%] left-16 w-10 h-10 bg-[#2B4DC9] rounded-full"></div>
         
        </div>
        </div>
        
  
        {/* Right Section */}
        <div className="hidden bg-[#2B4DC9] md:flex flex-col justify-center items-center w-1/2">
          <h1 className="text-white text-6xl font-bold font-montserrat">Blkedme</h1>
          <h1
          className="text-white text-6xl font-montserrat font-bold opacity-20 -mt-2 transform scale-y-[-1]"
        >
          Blkedme
        </h1>
        </div>
      </div>
    );
  };
  
  export default LoginPage;
  