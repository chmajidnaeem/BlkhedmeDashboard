import { BsEyeSlash, BsEye } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios'; // For making the API request
import { login } from "../../features/userDetailSlice"; // Redux action to handle login

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Toggle for showing/hiding password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };



  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('https://apiv2.blkhedme.com/api/admin/login', { email, password });
      const { token } = response.data;
  
      if (token) {
        // Save token in localStorage
        localStorage.setItem('authToken', token);
        
        // Dispatch login action with token
        dispatch(login(token));
  
        // Navigate to a protected route
        navigate('/');
      }
    } catch (err) {
      setError('Invalid email or password');
    }
  };
  

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     // Make API request to the login endpoint
  //     const response = await axios.post('https://apiv2.blkhedme.com/api/admin/login', { email, password });
  
  //     const { token } = response.data;  // Destructure the token from response
  //     if (token) {
  //       // Save the JWT token in localStorage
  //       localStorage.setItem('authToken', token);
  
  //       // Dispatch login action to update Redux state
  //       dispatch(login({ token }));
  
  //       // Navigate to the dashboard or protected route
  //       navigate('/');
  //     }
  //   } catch (err) {
  //     // Handle login errors, e.g., invalid credentials
  //     setError('Invalid email or password');
  //   }
  // };


  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-full md:w-1/2 flex flex-col">
        <div className="text-[#2B4DC9] text-3xl font-bold ml-14 mt-10">
          <h1>Blkedme</h1>
        </div>
        <div className="w-full h-screen flex flex-col justify-center items-center relative p-8">
          <form onSubmit={handleLogin} className="w-full sm:w-2/3 font-poppins">
            <div className="flex flex-col items-center text-center mb-6">
              <h2 className="text-3xl font-bold mb-3">Sign In</h2>
              <p className="text-[#707070]">Please enter your credentials</p>
            </div>
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
            <div className="mb-4 relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
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
            {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}
            <div className="mb-6 flex items-center text-[#707070]">
              <input type="radio" id="remember" className="mr-2" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <button
              type="submit"
              className="w-full bg-[#0085FF] text-white py-3 rounded-lg font-semibold"
            >
              Sign In
            </button>
          </form>
          <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-[#2B4DC9] rounded-full"></div>
          <div className="absolute bottom-4 left-4 w-20 h-20 bg-[#2B4DC9] rounded-full"></div>
        </div>
      </div>
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
