import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import Navbar from "../components/Navbar";
import { AI_Prompt, generateTripPlan } from "../AIModel";
import { Userstore } from "../Userstore";
import { db } from "../db";
import { useNavigate } from "react-router-dom";
import {
  Compass,
  Calendar,
  Wallet,
  Users,
  Sparkles,
  MapPin,
} from "lucide-react";

export default function Createtrip() {
  const { currentUser } = Userstore();
  const [place, setPlace] = useState("");
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("");
  const [travelGroup, setTravelGroup] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const savetrip = async (tripdata) => {
    const docId = Date.now().toString();

    try {
      // Extract JSON block from AI response
      const jsonMatch = tripdata.match(/\{[\s\S]*\}/);

      if (!jsonMatch) {
        throw new Error("No JSON found in AI response");
      }

      const parsedData = JSON.parse(jsonMatch[0]);

      await setDoc(doc(db, "AITrips", docId), {
        userSelection: { place, days, budget, travelGroup },
        email: currentUser?.email,
        trip: parsedData,
        id: docId,
      });

      navigate("/view/" + docId);

      console.log("Trip Saved");
    } catch (error) {
      console.error("AI JSON error:", error);
      console.log("Raw AI Response:", tripdata);

      alert("Trip generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateTrip = async () => {
    if (!place || !days || !budget || !travelGroup) {
      alert("Please fill in all fields to generate your trip!");
      return;
    }
    setLoading(true);
    try {
      const FINAL_PROMPT = AI_Prompt.replace("{place}", place)
        .replace("{days}", days)
        .replace("{travelGroup}", travelGroup)
        .replace("{budget}", budget);
      const response = await generateTripPlan(FINAL_PROMPT);
      console.log(response);
      savetrip(response);
    } catch (error) {
      setLoading(false);
      console.error("Error generating trip:", error.message);
      alert("Failed to generate trip. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 font-sans pb-20">
      {/* Background Decor */}
      <div
        className="absolute inset-0 z-0 opacity-40 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&q=80&w=2070')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950 z-0" />

      <Navbar />

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-32">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full mb-6 border border-blue-500/30">
            <Sparkles size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">
              AI-Powered Planning
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
            Design Your <span className="text-blue-500">Dream</span> Escape
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Share your vision, and our AI will craft a custom itinerary down to
            the finest detail.
          </p>
        </div>

        <div className="space-y-12">
          {/* Input: Destination & Days */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2rem] hover:border-blue-500/50 transition-all">
              <div className="flex items-center space-x-3 mb-6 text-blue-400">
                <MapPin size={24} />
                <h2 className="text-xl font-bold text-white">Destination</h2>
              </div>
              <input
                type="text"
                className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                placeholder="Ex. Santorini, Greece"
              />
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2rem] hover:border-blue-500/50 transition-all">
              <div className="flex items-center space-x-3 mb-6 text-blue-400">
                <Calendar size={24} />
                <h2 className="text-xl font-bold text-white">Duration</h2>
              </div>
              <input
                type="number"
                min="1"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                placeholder="Number of days"
                className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Selection: Budget */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2rem]">
            <div className="flex items-center space-x-3 mb-8 text-emerald-400">
              <Wallet size={24} />
              <h2 className="text-xl font-bold text-white">
                Select Your Budget
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {["Cheap", "Moderate", "Luxury"].map((option) => (
                <button
                  key={option}
                  onClick={() => setBudget(option)}
                  className={`relative p-6 rounded-2xl border transition-all text-left overflow-hidden group ${
                    budget === option
                      ? "border-blue-500 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.2)]"
                      : "border-white/10 bg-black/20 hover:border-white/30"
                  }`}
                >
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {option}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {option === "Cheap"
                        ? "Smart & Savvy spending."
                        : option === "Moderate"
                          ? "Balanced comfort & cost."
                          : "The ultimate premium experience."}
                    </p>
                  </div>
                  {budget === option && (
                    <div className="absolute top-2 right-2 text-blue-400">
                      <Sparkles size={16} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Selection: Travel Group */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2rem]">
            <div className="flex items-center space-x-3 mb-8 text-orange-400">
              <Users size={24} />
              <h2 className="text-xl font-bold text-white">
                Travel Companions
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Just Me", desc: "Solo explorer" },
                { label: "A Couple", desc: "Romantic duo" },
                { label: "Family", desc: "The whole crew" },
                { label: "Friends", desc: "Group adventure" },
              ].map((group) => (
                <button
                  key={group.label}
                  onClick={() => setTravelGroup(group.label)}
                  className={`p-5 rounded-2xl border transition-all text-center ${
                    travelGroup === group.label
                      ? "border-orange-500 bg-orange-500/10"
                      : "border-white/10 bg-black/20 hover:border-white/30"
                  }`}
                >
                  <h3 className="text-md font-bold text-white">
                    {group.label}
                  </h3>
                  <p className="text-[10px] text-gray-500 uppercase mt-1 tracking-tighter">
                    {group.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <div className="flex justify-center pt-8">
            <button
              disabled={loading}
              onClick={handleGenerateTrip}
              className={`group relative flex items-center space-x-4 bg-blue-600 hover:bg-blue-500 text-white px-12 py-5 rounded-2xl font-black text-xl transition-all transform hover:-translate-y-1 active:scale-95 shadow-2xl shadow-blue-600/20 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              <Compass
                className={`${loading ? "animate-spin" : "group-hover:rotate-90 transition-transform duration-500"}`}
              />
              <span>
                {loading ? "Mapping Routes..." : "Generate Expedition"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
