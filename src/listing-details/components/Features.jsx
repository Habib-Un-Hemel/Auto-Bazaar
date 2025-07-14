// import React from "react";
// import { FaCheck } from "react-icons/fa6";
// import PropTypes from "prop-types";

// function Features({ features }) {
//   // Check if features is undefined or empty
//   if (!features || Object.keys(features).length === 0) {
//     return (
//       <div className="p-10 border shadow-md rounded-xl my-7">
//         <h2 className="font-medium text-2xl">Features</h2>
//         <p className="text-gray-500 mt-5">
//           No features available for this vehicle.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-10 border shadow-md rounded-xl my-7">
//       <h2 className="font-medium text-2xl">Features</h2>
//       <div className="grid grid-cols-2 md:grid-cols-3 mt-5 lg:grid-cols-2 gap-4">
//         {Object.entries(features).map(([featureName, value], index) => (
//           <div key={index} className="flex gap-2 items-center">
//             <FaCheck className="text-lg p-1 rounded-full bg-blue-100 text-primary" />
//             <h2 className="text-gray-700">{featureName}</h2>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// Features.propTypes = {
//   features: PropTypes.object,
// };

// export default Features;
import React from "react";
import { FaCheck } from "react-icons/fa6";
import PropTypes from "prop-types";

function Features({ features }) {
  // Handle all possible cases: undefined, empty, string, array, or object
  const renderFeatures = () => {
    // Case: features is undefined or empty
    if (
      !features ||
      (typeof features === "object" && Object.keys(features).length === 0) ||
      (Array.isArray(features) && features.length === 0) ||
      (typeof features === "string" && features.trim() === "")
    ) {
      return (
        <p className="text-gray-500 mt-5">
          No features available for this bike.
        </p>
      );
    }

    // Case: features is an array of strings
    if (Array.isArray(features)) {
      return (
        <div className="grid grid-cols-2 md:grid-cols-3 mt-5 lg:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-2 items-center">
              <FaCheck className="text-lg p-1 rounded-full bg-blue-100 text-primary" />
              <h2 className="text-gray-700">{feature}</h2>
            </div>
          ))}
        </div>
      );
    }

    // Case: features is a string (comma-separated list)
    if (typeof features === "string") {
      const featureArray = features
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean);

      return (
        <div className="grid grid-cols-2 md:grid-cols-3 mt-5 lg:grid-cols-2 gap-4">
          {featureArray.map((feature, index) => (
            <div key={index} className="flex gap-2 items-center">
              <FaCheck className="text-lg p-1 rounded-full bg-blue-100 text-primary" />
              <h2 className="text-gray-700">{feature}</h2>
            </div>
          ))}
        </div>
      );
    }

    // Case: features is an object
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 mt-5 lg:grid-cols-2 gap-4">
        {Object.entries(features).map(([featureName, value], index) => (
          <div key={index} className="flex gap-2 items-center">
            <FaCheck className="text-lg p-1 rounded-full bg-blue-100 text-primary" />
            <h2 className="text-gray-700">{featureName}</h2>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-10 border shadow-md rounded-xl my-7">
      <h2 className="font-medium text-2xl">Features</h2>
      {renderFeatures()}
    </div>
  );
}

Features.propTypes = {
  features: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string,
  ]),
};

export default Features;