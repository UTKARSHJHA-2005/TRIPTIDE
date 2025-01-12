import React, { useState } from "react";
import google from "../assets/google.jpg";
import { setDoc, doc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app, db } from "../db";
import { useNavigate } from "react-router-dom";

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
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
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
        <div className="flex items-center justify-center min-h-screen">
            <div className="shadow-lg mt-[30px] md:mt-0 text-center bg-gray-900 bg-opacity-80 rounded-xl p-6 border border-gray-500 w-[90%] max-w-[600px]">
                <div className="text-[25px] font-semibold text-white mb-4">SignUp</div>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full md:w-[400px] h-[50px] mt-[10px] border-white rounded-lg px-3 bg-transparent text-white placeholder-gray-300 focus:outline-none"
                    required
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full md:w-[400px] h-[50px] mt-[10px] border-white rounded-lg px-3 bg-transparent text-white placeholder-gray-300 focus:outline-none"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full md:w-[400px] h-[50px] mt-[10px] border-white rounded-lg px-3 bg-transparent text-white placeholder-gray-300 focus:outline-none"
                    required
                />
                <div className="flex text-center justify-between mt-[10px] text-white">
                    <div className=" flex flex-row ml-[100px]">
                        <input
                            type="checkbox"
                            className="ml-[10px]"
                            checked={agreed}
                            onChange={() => setAgreed(!agreed)}
                        />
                        <p className="text-[18px] font-semibold ml-[10px] text-white">Agree to the terms and conditions</p>
                    </div>
                </div>
                <button
                    onClick={register}
                    className="bg-blue-800 text-white hover:bg-blue-600 rounded-xl h-[50px] w-full md:w-[400px] mt-[10px]"                >
                    Sign Up
                </button>
                <button onClick={googlesignin} className="flex items-center ml-[75px] justify-center bg-blue-500 mt-[15px] rounded-xl h-[50px] text-white hover:bg-blue-700 w-full md:w-[400px] space-x-2">
                    <img src={google} alt="google" className="w-9 h-9" />
                    <span>Continue with Google</span>
                </button>
                <div className="mt-[10px]">
                    <div className="text-[16px] text-white">Already have an account? <button onClick={() => navigate("/")} className="text-white font-semibold hover:font-bold hover:text-black">Click Here</button></div>
                </div>
            </div>
        </div>
    );
}
