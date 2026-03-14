import React, { useState, useEffect } from "react";
import { Userstore } from "../Userstore";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../db";
import { useNavigate, Link } from "react-router-dom";
import { AiFillCamera } from "react-icons/ai";
import { collection, query, where, getDocs } from "firebase/firestore";

const ProfilePage = () => {
  const { currentUser, updateUserInfo } = Userstore();
  const navigate = useNavigate();
  const [name, setName] = useState(currentUser?.name || "");
  const [avatar, setAvatar] = useState(currentUser?.avatar || "");
  const [dob, setDob] = useState(currentUser?.dob || "");
  const [phone, setPhone] = useState(currentUser?.phone || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [trips, setTrips] = useState([]);
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
    navigate("/home");
  };

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const q = query(
          collection(db, "AITrips"),
          where("email", "==", currentUser?.email),
        );

        const querySnapshot = await getDocs(q);

        const userTrips = [];
        querySnapshot.forEach((doc) => {
          userTrips.push({ id: doc.id, ...doc.data() });
        });

        setTrips(userTrips);
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };

    if (currentUser?.email) {
      fetchTrips();
    }
  }, [currentUser]);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center py-10 px-4">
      {/* Background with Travel Aesthetics */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-fixed bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=2000')",
        }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Profile Card */}
        <div className="lg:col-span-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 text-white shadow-2xl flex flex-col items-center h-fit">
          <div className="relative group">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-blue-400 shadow-2xl transition-transform group-hover:scale-105">
              <img
                src={avatar || "https://via.placeholder.com/150"}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <label
              htmlFor="avatarUpload"
              className="absolute bottom-2 right-2 bg-blue-500 hover:bg-blue-400 p-3 rounded-full cursor-pointer shadow-lg transition-colors"
            >
              <AiFillCamera size={22} />
            </label>
            <input
              id="avatarUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>

          <h2 className="mt-6 text-2xl font-bold">{name || "Explorer"}</h2>
          <p className="text-blue-200/60 text-sm tracking-[0.2em] uppercase mt-1">
            Verified Traveler
          </p>

          <div className="w-full mt-8 space-y-4">
            <div className="flex items-center space-x-4 bg-white/5 p-3 rounded-xl">
              <Mail size={18} className="text-blue-400" />
              <span className="text-sm truncate">{email}</span>
            </div>
            <div className="flex items-center space-x-4 bg-white/5 p-3 rounded-xl">
              <Phone size={18} className="text-blue-400" />
              <span className="text-sm">{phone || "No phone added"}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Edit Details & Trips */}
        <div className="lg:col-span-2 space-y-8">
          {/* Edit Section */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 text-white shadow-2xl">
            <h3 className="text-xl font-bold mb-6 flex items-center space-x-2">
              <User className="text-blue-400" />{" "}
              <span>Update Travel Credentials</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-blue-200/50">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-blue-200/50">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold uppercase tracking-widest text-blue-200/50">
                  Contact Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            <button
              onClick={handleSaveChanges}
              className="mt-8 w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-2xl font-bold transition-all transform active:scale-95 shadow-lg shadow-blue-600/20"
            >
              Save Logbook Entries
            </button>
          </div>

          {/* Trips Section */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 text-white shadow-2xl">
            <h3 className="text-xl font-bold mb-6 flex items-center space-x-2">
              <MapPin className="text-emerald-400" />{" "}
              <span>Your Expedition History</span>
            </h3>

            {trips.length === 0 ? (
              <div className="text-center py-10 bg-black/20 rounded-2xl border border-dashed border-white/20">
                <p className="text-gray-400 italic">
                  No stamps in your passport yet...
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trips.map((trip) => (
                  <Link
                    key={trip.id}
                    to={`/view/${trip.id}`}
                    className="group flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/20 transition-all hover:-translate-y-1"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-emerald-500/20 p-3 rounded-lg text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                        <Globe size={20} />
                      </div>
                      <div>
                        <p className="font-bold">{trip.userSelection.place}</p>
                        <p className="text-[10px] uppercase text-gray-400">
                          View Itinerary
                        </p>
                      </div>
                    </div>
                    <ChevronRight
                      size={18}
                      className="text-white/20 group-hover:text-white"
                    />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
