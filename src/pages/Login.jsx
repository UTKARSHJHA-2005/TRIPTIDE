import React, { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { app } from "../db";
import google from "../assets/google.jpg";
import { useNavigate } from "react-router-dom";
import { Userstore } from "../Userstore";
import { Plane, MapPin, Globe } from "lucide-react";

const auth = getAuth(app);
const Google = new GoogleAuthProvider();

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { fetchUserInfo } = Userstore();
  const navigate = useNavigate();
  const login = async () => {
    if (!email || !password) {
      alert("Email and password are required");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log("Logged in successfully:", userCredential.user);
      navigate("/home");
    } catch (error) {
      console.error("Error logging in:", error.message);
      alert(error.message);
    }
  };
  const googlesignin = async () => {
    try {
      const result = await signInWithPopup(auth, Google);
      console.log("Google sign-in successful:", result.user);
      navigate("/home");
    } catch (error) {
      console.error("Google sign-in error:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden font-sans">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?auto=format&fit=crop&q=80&w=2070')",
        }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
      </div>

      {/* Main Card */}
      <div className="relative z-10 w-[90%] max-w-[450px] bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl text-white">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-500 p-3 rounded-full mb-4 shadow-lg animate-bounce-slow">
            <Plane size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Ready to Explore?
          </h1>
          <p className="text-blue-100/70 text-sm">
            Sign in to start your next adventure
          </p>
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400 transition-all placeholder:text-gray-300"
              required
            />
          </div>
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400 transition-all placeholder:text-gray-300"
              required
            />
          </div>
        </div>

        {/* Login Button */}
        <button
          onClick={login}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl mt-8 transition-all transform active:scale-95 shadow-lg flex items-center justify-center space-x-2"
        >
          <span>Begin Journey</span>
          <Globe size={18} />
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-white/20"></div>
          <span className="px-3 text-xs uppercase tracking-widest text-white/50">
            Passport Control
          </span>
          <div className="flex-grow border-t border-white/20"></div>
        </div>

        {/* Social Login */}
        <button
          onClick={googlesignin}
          className="w-full bg-white text-gray-900 font-semibold py-3 rounded-xl transition-all flex items-center justify-center space-x-3 hover:bg-gray-100"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="google"
            className="w-5 h-5"
          />
          <span>Quick Board with Google</span>
        </button>

        {/* Footer Link */}
        <div className="mt-8 text-center text-sm">
          <p className="text-white/60">
            Don't have a ticket yet?{" "}
            <button
              className="text-blue-300 hover:text-blue-100 font-bold underline underline-offset-4"
              onClick={() => navigate("/signup")}
            >
              Sign up here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
