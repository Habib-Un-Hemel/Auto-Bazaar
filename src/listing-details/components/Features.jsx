import React from "react";
import { FaCheck } from "react-icons/fa6";
import PropTypes from "prop-types";

function Features({ features }) {
  // Check if features is undefined or empty
  if (!features || Object.keys(features).length === 0) {
    return (
      <div className="p-10 border shadow-md rounded-xl my-7">
        <h2 className="font-medium text-2xl">Features</h2>
        <p className="text-gray-500 mt-5">
          No features available for this vehicle.
        </p>
      </div>
    );
  }

  return (
    <div className="p-10 border shadow-md rounded-xl my-7">
      <h2 className="font-medium text-2xl">Features</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 mt-5 lg:grid-cols-2 gap-4">
        {Object.entries(features).map(([featureName, value], index) => (
          <div key={index} className="flex gap-2 items-center">
            <FaCheck className="text-lg p-1 rounded-full bg-blue-100 text-primary" />
            <h2 className="text-gray-700">{featureName}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

Features.propTypes = {
  features: PropTypes.object,
};

export default Features;
