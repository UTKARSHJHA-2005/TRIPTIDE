import React, { useState } from "react";
import google from "../assets/google.jpg";
import { setDoc, doc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app, db } from "../db";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Google = new GoogleAuthProvider();
const auth = getAuth(app);

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [agreed, setAgreed] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

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
                trips:[],
                email,
                dob,
                phone,
                id: userCredential.user.uid,
                date: new Date().toISOString(),
            });
            await setDoc(doc(db, "Trips", userCredential.user.uid), {
                trips: [],
            });
            console.log("User signed up successfully:", userCredential.user);
            alert("Sign-up successful!");
            navigate("/"); // Redirect to home page after signup
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
                email: email,
                id: uid,
                date: new Date().toISOString(),
            });
            console.log("Google sign-up successful:", result.user);
            alert("Google sign-up successful!");
            navigate("/"); // Redirect to home page after Google sign-up
        } catch (error) {
            console.error("Google sign-up error:", error.message);
            alert(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="shadow-lg mt-[30px] md:mt-0 text-center bg-gray-900 bg-opacity-80 rounded-xl p-6 border border-gray-500 w-[90%] max-w-[600px]">
                <div className="text-[25px] font-semibold text-white mb-4">SignUp</div>
                <div>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter the Name"
                        className="w-full md:w-[400px] h-[50px] mt-[10px] border-white rounded-lg px-3 bg-transparent text-white placeholder-gray-300 focus:outline-none"
                        required/><br />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Email Address"
                        className="w-full md:w-[400px] h-[50px] mt-[10px] border-white rounded-lg px-3 bg-transparent text-white placeholder-gray-300 focus:outline-none"
                        required/><br />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                        className="w-full md:w-[400px] h-[50px] mt-[10px] border-white rounded-lg px-3 bg-transparent text-white placeholder-gray-300 focus:outline-none"
                        required/><br />
                </div>
                <div className="flex flex-col items-center">
                    <button
                        onClick={googlesignin}
                        className="flex items-center justify-center bg-blue-500 mt-[15px] rounded-xl h-[50px] text-white hover:bg-blue-700 w-full md:w-[400px] space-x-2">
                        <img src={google} alt="google" className="w-9 h-9" />
                        <span>Continue with Google</span>
                    </button>
                </div>
                <div className="mt-[10px] flex items-center justify-center space-x-2">
                    <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                    />
                    <p className="text-[16px] font-semibold text-white">
                        Agree to the terms and conditions
                    </p>
                </div><br />
                <button
                    type="button"
                    onClick={register}
                    className="bg-blue-800 text-white hover:bg-blue-600 rounded-xl h-[50px] w-full md:w-[400px] mt-[10px]">
                    SignUp
                </button>
                <div className="mt-[10px]">
                    <div className="text-[16px] text-white">
                        Already have an account?
                        <br />
                        <button
                            onClick={() => navigate("/login")} 
                            className="text-white font-semibold hover:font-bold hover:text-black">
                            Click Here
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
