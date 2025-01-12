import React, { useState, useEffect } from "react";
import { Userstore } from "../Userstore";
import logo from '../assets/logo.jpg';
import avatar from "../assets/avatar.jpg";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, fetchUserInfo } = Userstore(); 
  const navigate = useNavigate();
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("users"));
    if (storedUser) {
      fetchUserInfo(storedUser.id); 
    }
  }, [fetchUserInfo]);

  const handleSignIn = (userData) => {
    localStorage.setItem("users", JSON.stringify(userData));
    fetchUserInfo(userData.id); 
  };

  const handleSignOut = () => {
    localStorage.removeItem("users");
    fetchUserInfo(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white text-black fixed w-full z-50 shadow-lg">
      <div className="max-w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img src={logo} alt="logo" className="h-[60px]"/>
            <h1 className="text-2xl font-bold uppercase">TRIPTIDE</h1>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="/home" className="hover:text-gray-400">Home</a>
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <div className="relative flex items-center space-x-2 group">
                  <img
                    src={currentUser?.avatar || avatar}
                    alt="User Profile"
                    className="h-10 w-10 rounded-full object-cover"/>
                  <span className="text-sm font-semibold">{currentUser?.name || "User"}</span>
                  <div className="absolute top-full right-0 mt-2 w-32 bg-white shadow-lg rounded-md opacity-0 scale-95 transform transition-all duration-200 group-hover:opacity-100 group-hover:scale-100">
                    <button
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-200"
                      onClick={() => navigate("/profile")}>
                      Profile
                    </button>
                    <button
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-200"
                      onClick={handleSignOut}>
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate("/login")}
                  className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-500">
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-500">
                  Sign Up
                </button>
              </div>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="focus:outline-none"
              aria-label="Toggle Menu">
              <span className="block w-8 h-1 bg-black mb-1"></span>
              <span className="block w-8 h-1 bg-black mb-1"></span>
              <span className="block w-8 h-1 bg-black"></span>
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-green-700 text-white md:hidden">
          <div className="flex flex-col space-y-4 p-4">
            <a
              href="#home"
              className="block text-lg hover:bg-green-500 p-2 rounded"
              onClick={() => setIsMenuOpen(false)}>
              Home
            </a>
            {currentUser ? (
              <div>
                <button
                  onClick={handleSignOut}
                  className="bg-red-600 text-white rounded-xl w-full">
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-4">
                <button
                  onClick={() => navigate("/login")}
                  className="bg-blue-600 text-white w-full rounded-xl p-2">
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="bg-green-600 text-white w-full rounded-xl p-2">
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;