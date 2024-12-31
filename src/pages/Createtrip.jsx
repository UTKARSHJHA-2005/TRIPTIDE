import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import Navbar from '../components/Navbar';
import { AI_Prompt } from '../AIModel';
import { Userstore } from '../Userstore';
import { chatSession } from '../AIModel';
import { db } from '../db';
import { useNavigate } from 'react-router-dom';

export default function Createtrip() {
    const {currentUser}=Userstore()
    const [place, setPlace] = useState('');
    const [days, setDays] = useState('');
    const [budget, setBudget] = useState('');
    const [travelGroup, setTravelGroup] = useState('');
    const navigate = useNavigate();

    
    const savetrip = async (tripdata) => {
        const docId = Date.now().toString();
        const cleanedTripData = tripdata.replace(/```json|```/g, "").trim();
        await setDoc(doc(db, "AITrips", docId), {
            userSelection: { place, days, budget, travelGroup },
            email: currentUser?.email,
            trip: JSON.parse(cleanedTripData),
            id: docId
        });
        navigate('/view/' + docId)
        console.log("Trip Saved")
    };

    const handleGenerateTrip = async () => {
        if (!place || !days || !budget || !travelGroup) {
            alert('Please fill in all fields to generate your trip!');
            return;
        }
        try {
            const FINAL_PROMPT = AI_Prompt
                .replace('{place}', place)
                .replace('{days}', days)
                .replace('{travelGroup}', travelGroup)
                .replace('{budget}', budget);
            const result = await chatSession.sendMessage(FINAL_PROMPT);
            console.log(result?.response?.text());
            savetrip(result?.response?.text());
        } catch (error) {
            console.error('Error generating trip:', error.message);
            alert('Failed to generate trip. Please try again.');
        }
    };

    return (
        <>
            <Navbar />
            <br /><br /><br />
            <div className="mt-5 px-6">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold">Tell Us Your Preferences</h1>
                    <p className="text-lg text-gray-600 mt-3">
                        Just tell us your trip preferences, and we'll provide the best itinerary tailored to your needs.
                    </p>
                </div>
                <div className="max-w-4xl mx-auto">
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold">Where would you like to go?</h2>
                        <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={place} onChange={(e) => setPlace(e.target.value)} placeholder="Ex. Varanasi" />
                    </div>
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold">For how many days?</h2>
                        <input
                            type="number"
                            min="1"
                            value={days}
                            onChange={(e) => setDays(e.target.value)}
                            placeholder="Enter number of days (e.g., 5)"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold">What is your budget?</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                            {['Cheap', 'Moderate', 'Luxury'].map((option) => (
                                <button
                                    key={option}
                                    className={`p-4 border rounded-xl text-center shadow-lg hover:shadow-xl ${budget === option ? 'border-blue-500 bg-blue-100' : ''
                                        }`}
                                    onClick={() => setBudget(option)}>
                                    <div className="text-lg font-bold">{option}</div>
                                    <div className="text-sm text-gray-600">
                                        {option === 'Cheap'
                                            ? 'Stay conscious of costs'
                                            : option === 'Moderate'
                                                ? 'Keep cost on the average side'
                                                : "Don't worry about cost"}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold">Who will you be traveling with?</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                            {[
                                { label: 'Just Me', description: 'A solo traveler in exploration' },
                                { label: 'A Couple', description: 'Two travelers in tandem' },
                                { label: 'Family', description: 'A group of fun-loving adventurers' },
                                { label: 'Friends', description: 'A bunch of thrill-seekers' },
                            ].map((group) => (
                                <button
                                    key={group.label}
                                    className={`p-4 border rounded-xl text-center shadow-lg hover:shadow-xl ${travelGroup === group.label ? 'border-green-500 bg-green-100' : ''
                                        }`}
                                    onClick={() => setTravelGroup(group.label)}>
                                    <div className="text-lg font-bold">{group.label}</div>
                                    <div className="text-sm text-gray-600">{group.description}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="text-center">
                        <button
                            className="bg-black text-white px-6 py-3 items-center rounded-lg shadow-lg hover:bg-gray-800 w-full sm:w-auto"
                            onClick={handleGenerateTrip}>
                            Generate Trip
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
