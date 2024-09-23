

import { useState } from "react"; // Importing React state management hook
import { BsEyeSlash, BsEye } from "react-icons/bs"; // Importing both eye icons for password visibility toggle
import { useNavigate } from "react-router-dom"; // Importing navigation hook to redirect user upon successful login

const LoginPage = () => {
  // State variable to store the user's email input
  const [email, setEmail] = useState("");

  // State variable to store the user's password input
  const [password, setPassword] = useState("");

  // State variable to store and display error messages in case of failed login attempts
  const [error, setError] = useState("");

  // State variable to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Hook to navigate the user to another page after successful login
  const navigate = useNavigate();

  // Function to handle the form submission when the user attempts to log in
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page on submit

    try {
      // Sending a POST request to the login API endpoint with email and password
      const response = await fetch(
        "https://apiv2.blkhedme.com/api/admin/login",
        {
          method: "POST", // Specify that we are making a POST request
          headers: {
            "Content-Type": "application/json", // Ensure the request is sent as JSON
          },
          body: JSON.stringify({
            email, // Send the email state variable as part of the request body
            password, // Send the password state variable as part of the request body
          }),
        }
      );

      // Parse the response data from the server into JSON format
      const data = await response.json();
      

      if (response.ok) {
        // If the response status is OK (200), navigate the user to the homepage
        navigate("/"); // You can change "/" to the path you want to redirect the user to
      } else {
        // If the response is not OK, show an error message to the user
        setError("Invalid credentials, please try again.");
      }
    } catch (error) {
      // If there is an error during the request (e.g., network error), catch it and display a message
      console.error("Error during login:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Section */}
      <div className="w-full md:w-1/2 flex flex-col">
        <div className="text-[#2B4DC9] text-3xl font-bold ml-14 mt-10">
          <h1>Blkedme</h1>
        </div>
        <div className="w-full h-screen flex flex-col justify-center items-center relative p-8">
          {/* Login Form */}
          <form onSubmit={handleLogin} className="w-full sm:w-2/3 font-poppins">
            <div className="flex flex-col items-center text-center mb-6">
              <h2 className="text-3xl font-bold mb-3">Sign In</h2>
              <p className="text-[#707070]">Please enter your credentials</p>
            </div>

            {/* Email Input Field */}
            <div className="mb-4">
              <input
                type="email"
                value={email} // Controlled input bound to the email state
                onChange={(e) => setEmail(e.target.value)} // Update state when the user types
                placeholder="Enter email"
                className="w-full p-3 border border-gray-300 rounded-lg"
                required // Ensures the field is filled before submission
              />
            </div>

            {/* Password Input Field */}
            <div className="mb-4 relative">
              <input
                type={showPassword ? "text" : "password"} // Conditionally change input type based on showPassword state
                value={password} // Controlled input bound to the password state
                onChange={(e) => setPassword(e.target.value)} // Update state when the user types
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded-lg"
                required // Ensures the field is filled before submission
              />
              {/* Toggle eye icon */}
              <div
                className="absolute right-4 top-4 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state on icon click
              >
                {showPassword ? (
                  <BsEye className="text-[#707070]" />
                ) : (
                  <BsEyeSlash className="text-[#707070]" />
                )}
              </div>
            </div>

            {/* Error Message */}
            {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}

            {/* Remember Me Checkbox */}
            <div className="mb-6 flex items-center text-[#707070]">
              <input type="radio" id="remember" className="mr-2" />
              <label htmlFor="remember">Remember me</label>
            </div>

            {/* Submit Button */}
            <button
              type="submit" // When clicked, the form is submitted, triggering handleLogin
              className="w-full bg-[#0085FF] text-white py-3 rounded-lg font-semibold"
            >
              Sign In
            </button>
          </form>

          {/* Decorative Circles (for aesthetic purposes) */}
          <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-[#2B4DC9] rounded-full"></div>
          <div className="absolute bottom-4 left-4 w-20 h-20 bg-[#2B4DC9] rounded-full"></div>
          <div className="absolute top-6 right-10 md:right-20 w-20 h-20 bg-[#2B4DC9] rounded-full"></div>
          <div className="absolute top-16 -left-10 w-20 h-20 bg-[#2B4DC9] rounded-full"></div>
          <div className="absolute hidden lg:block top-[50%] left-16 w-10 h-10 bg-[#2B4DC9] rounded-full"></div>
        </div>
      </div>

      {/* Right Section (only visible on larger screens) */}
      <div className="hidden bg-[#2B4DC9] md:flex flex-col justify-center items-center w-1/2">
        {/* Blkedme branding */}
        <h1 className="text-white text-6xl font-bold font-montserrat">
          Blkedme
        </h1>
        <h1 className="text-white text-6xl font-montserrat font-bold opacity-20 -mt-2 transform scale-y-[-1]">
          Blkedme
        </h1>
      </div>
    </div>
  );
};

export default LoginPage;
