import React from "react";

function Info() {
  return (
    <section className="bg-[#eef0fc] mt-20">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5 md:items-center">
          {/* Image taking 60% (3 columns out of 5) */}
          <div className="md:col-span-3">
            <img
              src="/bike33.png"
              className="rounded-lg w-full h-[650px] object-cover object-center shadow-lg hover:shadow-xl transition-shadow duration-300"
              alt="Pulser N-160"
            />
          </div>

          {/* Text content taking 40% (2 columns out of 5) */}
          <div className="md:col-span-2">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-900">
                Customer Success Story
              </h2>

              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
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

              <p className="text-lg text-gray-700">
                "As a motorcycle enthusiast, I couldn't have asked for a better
                experience! I rented the Pulsar N-160 for a weekend getaway, and
                it was absolutely fantastic."
              </p>

              <p className="text-gray-600">
                The bike was in pristine condition, and the power delivery was
                smooth throughout the journey. The booking process was seamless,
                and the team was very professional in handling everything from
                pickup to drop-off.
              </p>

              <div className="pt-4">
                <p className="font-semibold text-gray-900">John Smith</p>
                <p className="text-sm text-gray-500">Weekend Rider</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mt-6">
                <h3 className="font-semibold text-gray-900">Ride Details:</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1 mt-2">
                  <li>Bike: Pulsar N-160</li>
                  <li>Duration: Weekend Trip</li>
                  <li>Distance Covered: 300 km</li>
                  <li>Rating: 5/5</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Info;
