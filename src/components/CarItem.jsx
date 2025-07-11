import { Separator } from "./ui/separator";
import React from "react";
import { BsFillFuelPumpDieselFill } from "react-icons/bs";
import { MdSpeed } from "react-icons/md";
import { TbManualGearboxFilled } from "react-icons/tb";
import { IoMdOpen } from "react-icons/io";
import PropTypes from "prop-types";
import { Link } from "react-router";

function CarItem({ car }) {
  if (!car) return null;

  

  return (
    <Link to={"/listing-details/" + car?.id}>
      <div className="rounded-xl bg-white border hover:shadow-md cursor-pointer">
        <h2 className="absolute m-2 bg-green-500 px-2 rounded-full text-sm text-white">
          New
        </h2>
        {car.images?.[0]?.imageUrl && (
          <img
            src={car.images[0].imageUrl}
            alt={car.listingTitle}
            width="100%"
            height={250}
            className="rounded-t-xl h-[180px] object-cover "
          />
        )}
        <div className="p-4">
          <h2 className="font-bold text-black text-lg mb-2">
            {car.listingTitle}
          </h2>
          <Separator />
          <div className="flex justify-between mt-5">
            <div className="flex flex-col items-center">
              <BsFillFuelPumpDieselFill className="text-lg mb-2" />
              <h2>{car.mileage} Miles</h2>
            </div>

            <div className="flex flex-col items-center">
              <MdSpeed className="text-lg mb-2" />
              <h2>{car.fuelType}</h2>
            </div>

            <div className="flex flex-col items-center">
              <TbManualGearboxFilled className="text-lg mb-2" />
              <h2>{car.transmission}</h2>
            </div>
          </div>
          <Separator className="mt-2" />
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-xl">${car.sellingPrice}</h2>
            <h2 className="text-primary text-sm flex gap-2 items-center">
              View Details
              <IoMdOpen />
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
}

CarItem.propTypes = {
  car: PropTypes.shape({
    id: PropTypes.string,
    listingTitle: PropTypes.string,
    mileage: PropTypes.string,
    fuelType: PropTypes.string,
    transmission: PropTypes.string,
    sellingPrice: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        imageUrl: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default CarItem;
