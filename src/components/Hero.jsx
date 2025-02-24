import Search from "./Search";
import React from "react";

function Hero() {
  return (
    <div className="flex flex-col items-center p-10 py-20 gap-6 h-[660px] w-full bg-[#eef0fc]">
      <h2 className="text-lg"> Find Bike for rent near by you</h2>
      <h2 className="text-[60px] font-bold">Find Your Dream Bike </h2>
      <Search></Search>
      <img src="/tesla.png" className="mt-10"></img>
    </div>
  );
}

export default Hero;
