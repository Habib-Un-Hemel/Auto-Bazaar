import React from "react";
import PropTypes from "prop-types";

function Description({ carDetail }) {
  console.log("carDetail", carDetail);
  return (
    <div>
      {carDetail?.listingDescription ? (
        <div className="p-5 rounded-xl bg-white shadow-md mt-5 border">
          <h2 className="my-2 font-medium text-2xl">Description</h2>
          <p className="text-black mt-10">{carDetail?.listingDescription}</p>
        </div>
      ) : (
        <div className="w-full rounded-xl h-[100px] bg-slate-200 animate-pulse mt-5"></div>
      )}
    </div>
  );
}

// Description.propTypes = {
//   carDetail: PropTypes.shape({
//     listingDescription: PropTypes.string
//   })
// };

export default Description;
