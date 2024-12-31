import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import planeimg from './planetrip.jpg';

const GetPlace = async (placeName) => {
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${placeName}&client_id=dd9bmKMx4wHj8RCZUj2dnhTlzq3ZMy1Pmpg85eFyvKg`);
    const data = await response.json();
    return data.results[0]?.urls?.regular; // Get the first image URL
};

export default function Info({ trip }) {
    const [placeImage, setPlaceImage] = useState(null);
    const [hotelImages, setHotelImages] = useState({});
    const [itineraryImages, setItineraryImages] = useState({});
    useEffect(() => {
        const fetchPlaceDetails = async (placeName) => {
            try {
                const imageUrl = await GetPlace(placeName);
                setPlaceImage(imageUrl);
                console.log("Fetched Place Image:", imageUrl);
            } catch (error) {
                console.error("Error fetching place details:", error);
            }
        };

        const userSelectedPlace = trip?.userSelection?.place;
        if (userSelectedPlace) {
            fetchPlaceDetails(userSelectedPlace);
        }
    }, [trip]);
    useEffect(() => {
        const fetchHotelImages = async () => {
            if (trip?.trip?.hotels?.length > 0) {
                const images = {};
                for (const hotel of trip.trip.hotels) {
                    const imageUrl = await GetPlace(hotel.hotel_name);
                    images[hotel.hotel_name] = imageUrl;
                }
                setHotelImages(images);
            }
        };

        fetchHotelImages();
    }, [trip]);

    // Fetch images for itinerary places
    useEffect(() => {
        const fetchItineraryImages = async () => {
            if (trip?.trip?.itinerary) {
                const images = {};
                Object.keys(trip.trip.itinerary).forEach(async (key) => {
                    const day = trip.trip.itinerary[key];
                    if (day?.places?.length > 0) {
                        for (const place of day.places) {
                            const imageUrl = await GetPlace(place.place_name);
                            images[place.place_name] = imageUrl;
                        }
                    }
                });
                setItineraryImages(images);
            }
        };

        fetchItineraryImages();
    }, [trip]);

    return (
        <div>
            <img 
                src={placeImage || "https://unsplash.com/photos/black-dslr-camera-near-sunglasses-and-bag-GOZxrAlNIt4"} 
                alt="Place" 
                className="h-[300px] w-full object-cover rounded-xl"
            />
            <div>
                <div className="text-black font-serif mt-3 text-[35px] font-bold">
                    {trip?.userSelection?.place
                        ? trip.userSelection.place.charAt(0).toUpperCase() + trip.userSelection.place.slice(1)
                        : ""}
                </div>
                <div className="flex flex-row gap-6">
                    <div className="text-gray-900 bg-gray-400 w-[90px] p-2 rounded-md text-xs md:text-md">
                        📅{trip.userSelection?.days} Days
                    </div>
                    <div className="text-gray-900 bg-gray-400 w-[160px] p-2 rounded-md text-xs md:text-md">
                        💸{trip.userSelection?.budget} Budget
                    </div>
                    <div className="text-gray-900 bg-gray-400 w-[90px] p-2 rounded-md text-xs md:text-md">
                        🍿{trip.userSelection?.travelGroup}
                    </div>
                </div>
            </div>

            <div className="mt-7">
                <p className="text-black font-sans mt-3 text-[30px] font-bold">Hotel Recommendations</p>
                <div>
                    <div className="my-2 flex flex-row gap-[60px]">
                        {trip?.trip?.hotels?.length > 0 ? (
                            trip?.trip?.hotels?.map((hotel, idx) => (
                                <Link
                                    key={idx}
                                    to={"https://www.google.com/maps/search/?api=1&query=" + hotel.hotel_name + "," + hotel.hotel_address}
                                >
                                    <div className="hover:scale-110 transition-all">
                                        <img
                                            src={hotelImages[hotel.hotel_name] || planeimg} // Use the fetched hotel image or default image
                                            alt={hotel.hotel_name}
                                            className="rounded-xl w-full h-[200px]"
                                        />
                                        <h3 className="font-semibold">✦ {hotel.hotel_name}</h3>
                                        <p>📍 {hotel.hotel_address}</p>
                                        <p>💸{hotel.price_range}</p>
                                        <p>🌟{hotel.rating}/5</p>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p>No hotels found!</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-7">
                <p className="text-black font-sans mt-3 text-[30px] font-bold">Places To Visit</p>
                <div className="my-2 gap-[60px] min-w-full">
                    {trip?.trip?.itinerary ? (
                        Object.keys(trip?.trip?.itinerary).map((key, idx) => {
                            const day = trip?.trip?.itinerary[key];
                            const dayNumber = key.replace('day', '');
                            return (
                                <div key={idx}>
                                    <h3 className="text-xl font-bold">Day {dayNumber}</h3>
                                    <div className="text-lg font-thin">{day?.best_time_to_visit}</div>
                                    <div className="flex flex-row gap-4 p-2">
                                        {day?.places?.length > 0 ? (
                                            day.places.map((place, idx) => (
                                                <Link
                                                    key={idx}
                                                    to={"https://www.google.com/maps/search/?api=1&query=" + place.place_name}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <div className="hover:scale-110 transition-all">
                                                        <img
                                                            src={itineraryImages[place.place_name] || planeimg} // Use the fetched place image or default image
                                                            alt="place"
                                                            className="rounded-xl w-full h-[200px] border border-gray-700"
                                                        />
                                                        <p className="font-semibold">{place.place_name}</p>
                                                        <p className="w-full">{place.place_details}</p>
                                                        <p>🌟{place.rating}/5</p>
                                                        <p>💸{place.ticket_pricing}</p>
                                                        <p>⏱{place.travel_time}</p>
                                                    </div>
                                                </Link>
                                            ))
                                        ) : (
                                            <p>No places for this day!</p>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p>No itinerary found!</p>
                    )}
                </div>
            </div>
        </div>
    );
}
