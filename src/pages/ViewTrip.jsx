import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import planeimg from "./planetrip.jpg";

export default function Info({ trip }) {
  return (
    <div>
      <img
        src={
          placeImage ||
          "https://unsplash.com/photos/black-dslr-camera-near-sunglasses-and-bag-GOZxrAlNIt4"
        }
        alt="Place"
        className="h-[300px] w-full object-cover rounded-xl"
      />
      <div>
        <div className="text-black font-serif mt-3 text-[35px] font-bold">
          {trip?.userSelection?.place
            ? trip.userSelection.place.charAt(0).toUpperCase() +
              trip.userSelection.place.slice(1)
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
        <p className="text-black font-sans mt-3 text-[30px] font-bold">
          Hotel Recommendations
        </p>
        <div>
          <div className="my-2 flex flex-row gap-[60px]">
            {trip?.trip?.hotels?.length > 0 ? (
              trip?.trip?.hotels?.map((hotel, idx) => (
                <Link
                  key={idx}
                  to={
                    "https://www.google.com/maps/search/?api=1&query=" +
                    hotel.hotel_name +
                    "," +
                    hotel.hotel_address
                  }
                >
                  <div className="hover:scale-110 transition-all">
                    <img
                      src={hotelImages[hotel.hotel_name] || planeimg}
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
        <p className="text-black font-sans mt-3 text-[30px] font-bold">
          Places To Visit
        </p>
        <div className="my-2 gap-[60px] min-w-full">
          {trip?.trip?.itinerary ? (
            Object.keys(trip?.trip?.itinerary).map((key, idx) => {
              const day = trip?.trip?.itinerary[key];
              const dayNumber = key.replace("day", "");
              return (
                <div key={idx}>
                  <h3 className="text-xl font-bold">Day {dayNumber}</h3>
                  <div className="text-lg font-thin">
                    {day?.best_time_to_visit}
                  </div>
                  <div className="flex flex-row gap-4 p-2">
                    {day?.places?.length > 0 ? (
                      day.places.map((place, idx) => (
                        <Link
                          key={idx}
                          to={
                            "https://www.google.com/maps/search/?api=1&query=" +
                            place.place_name
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className="hover:scale-110 transition-all">
                            <img
                              src={
                                itineraryImages[place.place_name] || planeimg
                              }
                              alt="place"
                              className="rounded-xl w-[80%] h-[200px] border border-gray-700"
                            />
                            <p className="font-semibold">{place.place_name}</p>
                            <p className="w-full">{place.place_details}</p>
                            <p>🌟{place.rating}/5</p>
                            <p>💸{place.ticket_pricing}</p>
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
