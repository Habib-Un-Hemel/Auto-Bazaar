import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function Info() {
  const [currentReview, setCurrentReview] = useState(0);

  // Customer reviews data
const reviews = [
  {
    id: 1,
    name: "Habibun Nabi Hemel",
    role: "Weekend Rider",
    image: "/me.png",
    rating: 5,
    quote:
      "As a motorcycle enthusiast, I couldn't have asked for a better experience! I rented the Pulsar N-160 for a weekend getaway, and it was absolutely fantastic.",
    description:
      "The bike was in pristine condition, and the power delivery was smooth throughout the journey. The booking process was seamless, and the team was very professional in handling everything from pickup to drop-off.",
    details: {
      bike: "Pulsar N-160",
      duration: "Weekend Trip",
      distance: "300 km",
      rating: "5/5",
    },
  },
  {
    id: 2,
    name: "Farhan Hossain",
    role: "Adventure Traveler",
    image: "/jubo.jpg",
    rating: 5,
    quote:
      "My cross-country adventure on the Honda Hornet 185 was unforgettable! The power and comfort made those long highways and off-road trails equally enjoyable.",
    description:
      "The team at AutoBazaar went above and beyond, providing me with all the necessary gear and route suggestions. The bike performed flawlessly even in challenging terrain.",
    details: {
      bike: "Honda Hornet 185",
      duration: "One Week",
      distance: "1,200 km",
      rating: "5/5",
    },
  },
  {
    id: 3,
    name: "Mushfiqur Rahman",
    role: "Daily Commuter",
    image: "/mota.jpg",
    rating: 4,
    quote:
      "I've been renting the Suzuki SF 250 for my daily commute for the past month, and it's been saving me so much time and money compared to public transport!",
    description:
      "The fuel efficiency is incredible, and the bike is perfect for navigating through city traffic. The monthly rental plan is affordable and the service team is always responsive.",
    details: {
      bike: "Suzuki SF 250",
      duration: "Monthly Rental",
      distance: "800 km monthly",
      rating: "4/5",
    },
  },
];

  // Navigation functions
  const goToPrev = () => {
    setCurrentReview((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentReview((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const currentReviewData = reviews[currentReview];

  return (
    <section className="bg-[#eef0fc] mt-20 py-12">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Customer Success Stories
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-5 md:items-center">
          {/* Image taking 60% (3 columns out of 5) */}
          <div className="md:col-span-3 relative">
            <img
              src={currentReviewData.image}
              className="rounded-lg w-full h-[550px] md:h-[650px] object-cover object-center shadow-lg transition-all duration-500 ease-in-out"
              alt={`${currentReviewData.name}'s review`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-50 rounded-lg"></div>
          </div>

          {/* Text content taking 40% (2 columns out of 5) */}
          <div className="md:col-span-2">
            <div className="space-y-4 bg-white p-6 rounded-lg shadow-md relative">
              {/* Navigation Arrows */}
              <div className="flex justify-between mb-6 absolute top-0 -translate-y-12 right-0 space-x-4">
                <button
                  onClick={goToPrev}
                  className="bg-white p-3 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors duration-300"
                  aria-label="Previous review"
                >
                  <FaArrowLeft />
                </button>
                <button
                  onClick={goToNext}
                  className="bg-white p-3 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors duration-300"
                  aria-label="Next review"
                >
                  <FaArrowRight />
                </button>
              </div>

              {/* Review Counter */}
              <div className="text-gray-500 font-medium">
                Review {currentReview + 1} of {reviews.length}
              </div>

              <div className="flex items-center space-x-1">
                {[...Array(currentReviewData.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-lg text-gray-700 italic font-light">
                "{currentReviewData.quote}"
              </p>

              <p className="text-gray-600">{currentReviewData.description}</p>

              <div className="pt-4 border-t border-gray-100">
                <p className="font-semibold text-gray-900">
                  {currentReviewData.name}
                </p>
                <p className="text-sm text-gray-500">
                  {currentReviewData.role}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mt-6">
                <h3 className="font-semibold text-gray-900">Ride Details:</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1 mt-2">
                  <li>Bike: {currentReviewData.details.bike}</li>
                  <li>Duration: {currentReviewData.details.duration}</li>
                  <li>
                    Distance Covered: {currentReviewData.details.distance}
                  </li>
                  <li>Rating: {currentReviewData.details.rating}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Indicator Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentReview(index)}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                index === currentReview ? "bg-primary w-6" : "bg-gray-300"
              }`}
              aria-label={`Go to review ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Info;
