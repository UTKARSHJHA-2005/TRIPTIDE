import React from "react";
import { FaCopy, FaCogs, FaHeart } from "react-icons/fa"; 
import travel from '../assets/travel.jpg'

const About = () => {
  return (
    <section className="py-10 bg-white sm:py-16 lg:py-24">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="mt-6 text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
            ✈︎"Traveling—it leaves you speechless, then turns you into a storyteller"✈︎
          </h2>
        </div>
        <div className="grid items-center grid-cols-1 mt-12 gap-y-10 lg:grid-cols-5 sm:mt-20 gap-x-4">
          <div className="space-y-8 lg:pr-16 xl:pr-24 lg:col-span-2 lg:space-y-12">
            <div className="flex items-start">
              <FaCopy className="flex-shrink-0 text-green-500 w-9 h-9" />{" "}
              <div className="ml-5">
                <h3 className="text-xl font-semibold text-black">
                  Got a detailed plan
                </h3>
                <p className="mt-3 text-base text-gray-600">
                  AI provides you to have a fully detailed plan for your trip.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <FaCogs className="flex-shrink-0 text-blue-600 w-9 h-9" />{" "}
              <div className="ml-5">
                <h3 className="text-xl font-semibold text-black">
                  Easy to Customize
                </h3>
                <p className="mt-3 text-base text-gray-600">
                  TripTide are highly customizable, allowing
                  developers to easily adapt them to fit any design or brand
                  requirement.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <FaHeart className="flex-shrink-0 text-red-500 w-9 h-9" />{" "}
              <div className="ml-5">
                <h3 className="text-xl font-semibold text-black">
                  Built with Love 
                </h3>
                <p className="mt-3 text-base text-gray-600">
                  TripTide is crafted with precision, to deliver
                  modern, responsive, and flexible components for developers.
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3">
            <img
              className="w-full rounded-lg shadow-xl"
              src={travel}
              alt="Auraui Dashboard"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
