import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Userstore } from '../Userstore';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../db';
import planeimg from "../pages/view/[tripId]/planetrip.jpg";

const Landing = () => {

  const navigate = useNavigate();
  const handleNavigateToCreateTrip = () => {
    navigate('/create');
  };

  return (
    <div className="font-semibold text-[30px] text-center">
      {/* Header Section */}
      <div>Discover your Adventure with AI: Personal Itineraries in Your Hand</div>
      <p className="text-gray-400 font-light text-[20px]">
        Build, personalize, and optimize your itineraries with our free AI trip planner.<br />
        Designed for vacations, workations, and everyday adventures.
      </p>
      <button
        className="text-white bg-green-600 p-2 w-[300px] h-[70px] rounded-full hover:bg-green-800 mt-5"
        onClick={handleNavigateToCreateTrip}>
        Create Trip
      </button>
    </div>
  );
};

export default Landing;
