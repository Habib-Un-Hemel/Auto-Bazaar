import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  IoSearch,
  IoBicycleOutline,
  IoLogoApple,
  IoPricetagOutline,
  IoStarOutline,
} from "react-icons/io5";
import Data from "@/Shared/Data";

function Search() {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="p-3 md:p-4 bg-white rounded-xl md:rounded-full shadow-sm flex flex-col md:flex-row gap-3 md:gap-4 items-center w-full">
        {/* Vehicle Type */}
        <div className="w-full md:w-[200px]">
          <Select>
            <SelectTrigger className="outline-none border-none shadow-none text-base bg-gray-50 rounded-xl md:rounded-full px-4 h-12 w-full">
              <div className="flex items-center gap-2">
                <IoBicycleOutline className="text-lg text-gray-500" />
                <SelectValue placeholder="Vehicle Type" />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {Data.Category.map((category) => (
                <SelectItem
                  key={category.id}
                  value={category.name.toLowerCase()}
                >
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator
          orientation="vertical"
          className="hidden md:block h-6 bg-gray-200"
        />
        {/* Brand */}
        <div className="w-full md:w-[200px]">
          <Select>
            <SelectTrigger className="outline-none border-none shadow-none text-base bg-gray-50 rounded-xl md:rounded-full px-4 h-12 w-full">
              <div className="flex items-center gap-2">
                <IoLogoApple className="text-lg text-gray-500" />
                <SelectValue placeholder="Brand" />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {Data.CarMakes.map((make) => (
                <SelectItem key={make.id} value={make.name.toLowerCase()}>
                  {make.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator
          orientation="vertical"
          className="hidden md:block h-6 bg-gray-200"
        />

        {/* Price Range */}
        <div className="w-full md:w-[180px]">
          <Select>
            <SelectTrigger className="outline-none border-none shadow-none text-base bg-gray-50 rounded-xl md:rounded-full px-4 h-12 w-full">
              <div className="flex items-center gap-2">
                <IoPricetagOutline className="text-lg text-gray-500" />
                <SelectValue placeholder="Price" />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {Data.Pricing.map((price) => (
                <SelectItem key={price.id} value={price.amount}>
                  {price.amount}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator
          orientation="vertical"
          className="hidden md:block h-6 bg-gray-200"
        />

        {/* Rating Filter */}
        <div className="w-full md:w-[180px]">
          <Select>
            <SelectTrigger className="outline-none border-none shadow-none text-base bg-gray-50 rounded-xl md:rounded-full px-4 h-12 w-full">
              <div className="flex items-center gap-2">
                <IoStarOutline className="text-lg text-gray-500" />
                <SelectValue placeholder="Rating" />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="5">★★★★★</SelectItem>
              <SelectItem value="4">★★★★☆ & up</SelectItem>
              <SelectItem value="3">★★★☆☆ & up</SelectItem>
              <SelectItem value="any">Any Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search Button */}
        <button className="bg-primary hover:bg-primary-dark rounded-full p-2 md:p-3 text-white hover:scale-105 transition-all cursor-pointer flex items-center justify-center w-full md:w-auto h-12 md:h-auto mt-2 md:mt-0">
          <IoSearch className="text-xl md:text-2xl" />
          <span className="ml-2 font-medium md:hidden">Find Bikes</span>
        </button>
      </div>
    </div>
  );
}

export default Search;
