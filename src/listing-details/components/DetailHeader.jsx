import React from "react";
import PropTypes from "prop-types";
import { HiCalendarDays } from "react-icons/hi2";
import { BsSpeedometer2 } from "react-icons/bs";
import { GiGearStickPattern } from "react-icons/gi";

function DetailHeader({ carDetail }) {
    // console.log("carDetailsasa", carDetail);
  return (
    <div>
      {carDetail?.listingTitle ? (
        <div>
          <h2 className="font-bold text-3xl">{carDetail?.listingTitle}</h2>
          <p className="text-sm">{carDetail?.tagline}</p>

          <div className="flex gap-2 mt-3">
            <div className="flex items-center gap-2 mt-2 bg-blue-50 rounded-full p-1 px-3">
              <HiCalendarDays className="h-7 w-7 text-primary " />
              <h2 className="text-primary text-sm">{carDetail?.year}</h2>
            </div>
            <div className="flex items-center gap-2 mt-2 bg-blue-50 rounded-full p-1 px-3">
              <BsSpeedometer2 className="h-7 w-7 text-primary" />
              <h2 className="text-primary text-sm">{carDetail?.mileage}</h2>
            </div>
            <div className="flex items-center gap-2 mt-2 bg-blue-50 rounded-full p-1 px-3">
              <GiGearStickPattern className="h-7 w-7 text-primary " />
              <h2 className="text-primary text-sm">
                {carDetail?.transmission}
              </h2>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full rounded-xl  h-[100px] bg-slate-200 animate-pulse mt-5"></div>
      )}
    </div>
  );
}

// DetailHeader.propTypes = {
//   carDetail: PropTypes.shape({
//     listingTitle: PropTypes.string
//   })
// }

export default DetailHeader;
