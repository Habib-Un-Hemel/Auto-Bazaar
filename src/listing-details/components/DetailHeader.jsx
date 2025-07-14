import React from "react";
import PropTypes from "prop-types";
import { HiCalendarDays } from "react-icons/hi2";
import { BsSpeedometer2 } from "react-icons/bs";
import { GiGearStickPattern } from "react-icons/gi";
import { IoMdBicycle } from "react-icons/io"; // Added bicycle icon for bike type

function DetailHeader({ bikeDetail }) {
  console.log("DetailHeader received:", bikeDetail); // Debug log

  // If bikeDetail is completely undefined or null, show loading state
  if (!bikeDetail) {
    return (
      <div className="w-full rounded-xl h-[100px] bg-slate-200 animate-pulse mt-5">
        <p className="text-center text-gray-500 pt-10">
          Loading bike details...
        </p>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h2 className="font-bold text-3xl">
          {bikeDetail?.listingTitle || "Untitled Bike"}
        </h2>
        <p className="text-sm">
          {bikeDetail?.make || ""} {bikeDetail?.model || ""}
        </p>

        <div className="flex gap-2 mt-3 flex-wrap">
          {bikeDetail?.year && (
            <div className="flex items-center gap-2 mt-2 bg-blue-50 rounded-full p-1 px-3">
              <HiCalendarDays className="h-7 w-7 text-primary " />
              <h2 className="text-primary text-sm">{bikeDetail.year}</h2>
            </div>
          )}

          {bikeDetail?.mileage && (
            <div className="flex items-center gap-2 mt-2 bg-blue-50 rounded-full p-1 px-3">
              <BsSpeedometer2 className="h-7 w-7 text-primary" />
              <h2 className="text-primary text-sm">{bikeDetail.mileage} km</h2>
            </div>
          )}

          {bikeDetail?.transmission && (
            <div className="flex items-center gap-2 mt-2 bg-blue-50 rounded-full p-1 px-3">
              <GiGearStickPattern className="h-7 w-7 text-primary " />
              <h2 className="text-primary text-sm">
                {bikeDetail.transmission}
              </h2>
            </div>
          )}

          {bikeDetail?.engineCapacity && (
            <div className="flex items-center gap-2 mt-2 bg-blue-50 rounded-full p-1 px-3">
              <IoMdBicycle className="h-7 w-7 text-primary " />
              <h2 className="text-primary text-sm">
                {bikeDetail.engineCapacity} cc
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

DetailHeader.propTypes = {
  bikeDetail: PropTypes.shape({
    title: PropTypes.string,
    make: PropTypes.string,
    model: PropTypes.string,
    year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    mileage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    transmission: PropTypes.string,
    engineCapacity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

export default DetailHeader;
