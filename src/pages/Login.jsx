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
import { Plane, Globe, Ticket, Fingerprint } from "lucide-react";
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
      {/* Background Image - Midnight Aviation/City Theme */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-[10000ms] scale-110 animate-slow-zoom"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1464012391851-f7114339941c?auto=format&fit=crop&q=80&w=2070')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/70 via-black/50 to-indigo-900/70 backdrop-blur-[2px]"></div>
      </div>

      {/* Main Card - Glassmorphism */}
      <div className="relative z-10 w-[95%] max-w-[480px] bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] text-white">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative">
            <div className="bg-blue-600 p-4 rounded-2xl shadow-xl shadow-blue-500/20 rotate-12 hover:rotate-0 transition-transform duration-500">
              <Ticket size={32} className="text-white" />
            </div>
            <div className="absolute -top-2 -right-2 bg-emerald-500 h-4 w-4 rounded-full border-2 border-white animate-pulse"></div>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight mt-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
            Welcome Back
          </h1>
          <p className="text-blue-100/60 text-sm mt-2 tracking-wide uppercase">
            Terminal Access / Check-In
          </p>
        </div>

        {/* Input Fields */}
        <div className="space-y-5">
          <div className="group relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Registered Email"
              className="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-400 text-lg shadow-inner"
              required
            />
          </div>
          <div className="group relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Security Key"
              className="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-400 text-lg shadow-inner"
              required
            />
          </div>
        </div>

        {/* Login Action */}
        <button
          onClick={login}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl mt-10 transition-all transform active:scale-95 shadow-lg shadow-blue-600/30 flex items-center justify-center space-x-3 text-lg"
        >
          <span>Validate & Board</span>
          <Plane size={20} className="rotate-45" />
        </button>

        {/* Divider */}
        <div className="flex items-center my-8">
          <div className="flex-grow border-t border-white/10"></div>
          <span className="px-4 text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
            Biometric Bypass
          </span>
          <div className="flex-grow border-t border-white/10"></div>
        </div>

        {/* Social Login */}
        <button
          onClick={googlesignin}
          className="w-full bg-white/95 hover:bg-white text-gray-900 font-bold py-4 rounded-2xl transition-all flex items-center justify-center space-x-3 shadow-xl active:scale-95"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="google"
            className="w-6 h-6"
          />
          <span>Google Fast-Pass</span>
        </button>

        {/* Footer Link */}
        <div className="mt-10 text-center">
          <p className="text-white/50 text-sm">
            No reservation yet?{" "}
            <button
              className="text-white font-bold hover:text-blue-300 transition-colors underline underline-offset-4 decoration-blue-500/50"
              onClick={() => navigate("/signup")}
            >
              Get your Ticket
            </button>
          </p>
        </div>
      </div>

      {/* Subtle Bottom Decoration */}
      <div className="absolute bottom-10 left-10 flex items-center space-x-2 text-white/20">
        <Globe size={16} />
        <span className="text-[10px] uppercase tracking-widest">
          Global Access Enabled
        </span>
      </div>
    </div>
  );
}
