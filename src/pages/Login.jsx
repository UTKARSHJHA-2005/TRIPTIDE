import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../db";
import google from "../assets/google.jpg";
import { useNavigate } from "react-router-dom"; 
import { Userstore } from "../Userstore";  // Import Userstore for user management

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
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("Logged in successfully:", userCredential.user);
            navigate("/home")
        } catch (error) {
            console.error("Error logging in:", error.message);
            alert(error.message);
        }
    };
    const googlesignin = async () => {
        try {
            const result = await signInWithPopup(auth, Google);
            console.log("Google sign-in successful:", result.user);
            navigate("/home") 
        } catch (error) {
            console.error("Google sign-in error:", error.message);
            alert(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="shadow-lg mt-[70px] md:mt-0 justify-center text-center w-[90%] max-w-[600px] bg-gray-900 bg-opacity-70 rounded-xl p-6 border border-gray-500">
                <div className="text-[25px] text-white font-semibold">Login</div>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Email Address"
                    className="w-full md:w-[400px] h-[50px] mt-[10px] border-white rounded-lg px-3 bg-transparent text-white placeholder-gray-300 focus:outline-none"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    className="w-full md:w-[400px] h-[50px] mt-[10px] border-white rounded-lg px-3 bg-transparent text-white placeholder-gray-300 focus:outline-none"
                    required
                />
                <button
                    type="button"
                    onClick={login}
                    className="bg-blue-800 text-white hover:bg-blue-600 rounded-xl h-[50px] w-full md:w-[400px] mt-[20px]"
                >
                    Login
                </button>
                <div className="flex items-center flex-col mt-[20px]">
                    <button
                        onClick={googlesignin}
                        className="flex items-center justify-center bg-blue-500 rounded-xl h-[50px] text-white hover:bg-blue-700 w-full md:w-[400px] space-x-2"
                    >
                        <img src={google} alt="google" className="w-9 h-9" />
                        <span>Continue with Google</span>
                    </button>
                </div>
                <div className="text-[18px] text-white mt-[20px]">
                    New to the Platform? <br />
                    <button
                        className="text-white font-semibold hover:font-bold hover:text-black"
                        onClick={() => navigate("/signup")} // Use navigate instead of window.location.href
                    >
                        Click Here
                    </button>
                </div>
            </div>
        </div>
    );
}
