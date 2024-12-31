import React, { useState } from "react";
import { Userstore } from "../Userstore";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../db";
import { useNavigate } from "react-router-dom";
import { AiFillCamera } from "react-icons/ai"; 

const ProfilePage = () => {
  const { currentUser, updateUserInfo } = Userstore();
  const navigate = useNavigate();
  const [name, setName] = useState(currentUser?.name || "");
  const [avatar, setAvatar] = useState(currentUser?.avatar || "");
  const [dob, setDob] = useState(currentUser?.dob || "");
  const [phone, setPhone] = useState(currentUser?.phone || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async () => {
    const updatedData = { name, avatar, dob, phone, email };
    try {
      const userRef = doc(db, "users", currentUser.id);
      await updateDoc(userRef, updatedData);
      updateUserInfo(updatedData);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Try again later.");
    }
    navigate("/");
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
      <div className="relative mb-6">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300">
          <img
            src={avatar || "https://via.placeholder.com/150"}
            alt="Avatar"
            className="w-full h-full object-cover"/>
        </div>
        <label
          htmlFor="avatarUpload"
          className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer">
          <AiFillCamera size={20} />
        </label>
        <input
          id="avatarUpload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleAvatarChange}/>
      </div>
      <div className="mb-4 w-full max-w-md">
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 py-2 rounded"/>
      </div>
      <div className="mb-4 w-full max-w-md">
        <label className="block text-sm font-medium">Email ID</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-3 py-2 rounded"/>
      </div>
      <div className="mb-4 w-full max-w-md">
        <label className="block text-sm font-medium">Date of Birth</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="w-full border px-3 py-2 rounded"/>
      </div>
      <div className="mb-4 w-full max-w-md">
        <label className="block text-sm font-medium">Phone Number</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border px-3 py-2 rounded"/>
      </div>
      <button
        onClick={handleSaveChanges}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">
        Save Changes
      </button>
    </div>
  );
};

export default ProfilePage;
