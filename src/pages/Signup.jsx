import React, { useState } from "react";
import google from "../assets/google.jpg";
import { setDoc, doc } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { app, db } from "../db";
import { useNavigate } from "react-router-dom";
import { Compass, UserPlus, ShieldCheck, Map } from "lucide-react";
const Google = new GoogleAuthProvider();
const auth = getAuth(app);

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const register = async () => {
    if (!name || !email || !password) {
      alert("All fields are required");
      return;
    }
    if (!agreed) {
      alert("You must agree to the terms and conditions");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await setDoc(doc(db, "users", userCredential.user.uid), {
        name,
        email,
        id: userCredential.user.uid,
        date: new Date().toISOString(),
      });
      console.log("User signed up successfully:", userCredential.user);
      navigate("/home");
    } catch (error) {
      console.error("Signup error:", error.message);
      alert(error.message);
    }
  };

  const googlesignin = async () => {
    try {
      const result = await signInWithPopup(auth, Google);
      const { displayName, email, uid } = result.user;
      await setDoc(doc(db, "users", uid), {
        name: displayName || "Anonymous",
        email,
        id: uid,
        date: new Date().toISOString(),
      });
      console.log("Google sign-up successful:", result.user);
      navigate("/home");
    } catch (error) {
      console.error("Google sign-up error:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* Background Image - Nature/Destination Theme */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2073')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 backdrop-blur-[1px]"></div>
      </div>

      <div className="relative z-10 w-[95%] max-w-[500px] bg-white/10 backdrop-blur-xl border border-white/30 rounded-[2rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] text-white">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-block p-3 bg-emerald-500 rounded-full mb-3 shadow-lg animate-pulse">
            <Compass size={28} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight">
            Apply for Transit
          </h2>
          <p className="text-emerald-100/70 text-sm mt-1">
            Create your account to unlock global deals
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div className="group">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name (as per Passport)"
              className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-400 transition-all placeholder:text-gray-400"
            />
          </div>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-400 transition-all placeholder:text-gray-400"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create Password"
              className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-400 transition-all placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-center mt-6 space-x-3 bg-black/20 p-3 rounded-lg border border-white/10">
          <input
            type="checkbox"
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
            className="w-5 h-5 accent-emerald-500 cursor-pointer"
          />
          <label className="text-xs text-gray-200 leading-tight">
            I agree to the{" "}
            <span className="underline cursor-pointer hover:text-white">
              Travel Policies
            </span>{" "}
            and data privacy guidelines.
          </label>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 space-y-4">
          <button
            onClick={register}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg flex items-center justify-center space-x-2 active:scale-95"
          >
            <UserPlus size={20} />
            <span>Issue My Passport</span>
          </button>

          <div className="flex items-center">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="px-3 text-[10px] uppercase tracking-[0.2em] text-white/40">
              Alternative Route
            </span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          <button
            onClick={googlesignin}
            className="w-full bg-white text-gray-900 font-bold py-3.5 rounded-xl transition-all flex items-center justify-center space-x-3 hover:bg-gray-100 active:scale-95"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="google"
              className="w-5 h-5"
            />
            <span>Sign up with Google</span>
          </button>
        </div>

        {/* Redirect Link */}
        <div className="mt-8 text-center">
          <p className="text-sm text-white/60">
            Already a member?{" "}
            <button
              onClick={() => navigate("/")}
              className="text-emerald-300 font-bold hover:text-emerald-100 transition-colors"
            >
              Log in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
