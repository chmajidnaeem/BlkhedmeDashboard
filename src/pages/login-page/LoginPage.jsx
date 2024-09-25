import { useState } from "react"; // Importing React state management hook
import { BsEyeSlash, BsEye } from "react-icons/bs"; // Importing both eye icons for password visibility toggle
import { useNavigate } from "react-router-dom"; // Importing navigation hook to redirect user upon successful login

const LoginPage = () => {
  // State variable to store the user's email input
  const [email, setEmail] = useState(localStorage.getItem("email") || ""); // Check if email exists in localStorage
  const [password, setPassword] = useState(""); // Store the user's password input
  const [error, setError] = useState(""); // Store error messages
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [loading, setLoading] = useState(false); // Loading state for async requests
  const [rememberMe, setRememberMe] = useState(false); // "Remember me" checkbox state

  const navigate = useNavigate(); // Navigation hook for redirecting users

  // Function to handle the form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page on submit
    setError("")
    setLoading(true); // Set loading state to true while processing

    try {
      // Sending a POST request to the login API endpoint with email and password
      const response = await fetch("https://apiv2.blkhedme.com/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json(); // Parse the response data

      if (response.ok) {
        // If login is successful
        localStorage.setItem("token", data.token); // Store the authentication token in localStorage

        // If "Remember me" is checked, save the email to localStorage
        if (rememberMe) {
          localStorage.setItem("email", email);
        } else {
          localStorage.removeItem("email");
        }

        // Redirect to the dashboard or any other protected route
        navigate("/");
      } else {
        setError(data.message || "Invalid credentials, please try again.");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false); // Turn off the loading spinner when the request is complete
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>

            {/* Password Input Field */}
            <div className="mb-4 relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
              {/* Toggle eye icon */}
              <div
                className="absolute right-4 top-4 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
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

            {/* Loading Indicator */}
            {loading && (
              <div className="mb-4 text-blue-600 text-sm">Loading...</div>
            )}

            {/* Remember Me Checkbox */}
            <div className="mb-6 flex items-center text-[#707070]">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="mr-2"
              />
              <label htmlFor="remember">Remember me</label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#0085FF] text-white py-3 rounded-lg font-semibold"
              disabled={loading} // Disable the button while loading
            >
              {loading ? "Signing In..." : "Sign In"} {/* Show loader text */}
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
        <h1 className="text-white text-6xl font-montserrat font-bold opacity-20 -mt-2 transform scale-y-[-1]">
          Blkedme
        </h1>
      </div>
    </div>
  );
};

export default LoginPage;
