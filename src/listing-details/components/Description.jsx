import React from "react";
import PropTypes from "prop-types";

function Description({ bikeDetail }) {
  console.log("bikeDetail in Description:", bikeDetail);

  // Check if either description field exists
  const hasDescription =
    bikeDetail?.description || bikeDetail?.listingDescription;

  // Get the actual description content from either field
  const descriptionContent =
    bikeDetail?.description || bikeDetail?.listingDescription || "";

  return (
    <div>
      {hasDescription ? (
        <div className="p-5 rounded-xl bg-white shadow-md mt-5 border">
          <h2 className="my-2 font-medium text-2xl">Description</h2>
          <p className="text-black mt-10">{descriptionContent}</p>
        </div>
      ) : (
        <div className="w-full rounded-xl h-[100px] bg-slate-200 animate-pulse mt-5"></div>
      )}
    </div>
  );
}

Description.propTypes = {
  bikeDetail: PropTypes.shape({
    description: PropTypes.string,
    listingDescription: PropTypes.string,
  }),
};

export default Description;
