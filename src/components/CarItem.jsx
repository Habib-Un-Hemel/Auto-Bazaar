import { Separator } from "./ui/separator";
import React from "react";
import { BsFillFuelPumpDieselFill } from "react-icons/bs";
import { MdSpeed } from "react-icons/md";
import { TbManualGearboxFilled } from "react-icons/tb";
import { IoMdOpen } from "react-icons/io";

function CarItem(car) {
  return (
    <div className="rounded-xl bg-white border hover:shadow-md cursor-pointer">
      {/* debugging */}
      {/* {console.log(car)}
      {/* {console.log(car.car.image)} */}
      {/* {console.log(car?.car.image)} */}
      <h2 className="absolute m-2 bg-green-500 px-2 rounded-full text-sm text-white">
        New
      </h2>
      <img
        src={car?.car.image}
        width={"100%"}
        height={250}
        className="rounded-t-xl"
      ></img>
      <div className="p-4">
        <h2 className="font-bold text-black text-lg mb-2">{car?.car.name}</h2>
        <Separator></Separator>
        {/* <div className="grid gird-cols-3 mt-5"> */}
        <div className="flex justify-between mt-5">
          <div className="flex flex-col items-center">
            <BsFillFuelPumpDieselFill className="text-lg mb-2" />
            <h2>{car.car.miles} Miles</h2>
          </div>

          <div className="flex flex-col items-center">
            <MdSpeed className="text-lg mb-2" />
            <h2>{car.car.fuelType}</h2>
          </div>

          <div className="flex flex-col items-center">
            <TbManualGearboxFilled className="text-lg mb-2" />
            <h2>{car.car.gearType}</h2>
          </div>
        </div>
        <Separator className="mt-2"></Separator>
        <div className="flex justify-between items-center ">
          <h2 className="font-bold text-xl">${car.car.price}</h2>
          <h2 className="text-primary text-sm flex gap-2 items-center">
            View Details
            <IoMdOpen />
          </h2>
        </div>
      </div>
    </div>
  );
}

export default CarItem;
