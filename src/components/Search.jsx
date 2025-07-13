import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import Data from "@/Shared/Data";

function Search({ initialCondition, initialMake, initialPrice }) {
  const [cars, setCars] = useState(initialCondition || "");
  const [make, setMake] = useState(initialMake || "");
  const [price, setPrice] = useState(initialPrice || "");

  // Update state when props change
  useEffect(() => {
    if (initialCondition) setCars(initialCondition);
    if (initialMake) setMake(initialMake);
    if (initialPrice) setPrice(initialPrice);
  }, [initialCondition, initialMake, initialPrice]);

  return (
    <div className="p-2 md:p-5 bg-white rounded-md md:rounded-full flex-col md:flex-row flex items-center justify-between gap-2 w-[60%]">
      <Select value={cars} onValueChange={(value) => setCars(value)}>
        <SelectTrigger className="w-full outline-none md:border-none text-lg shadow-none">
          <SelectValue placeholder="Cars" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="New">New</SelectItem>
          <SelectItem value="Used">Used</SelectItem>
          <SelectItem value="Certified Pre-Owned">
            Certified Pre-Owned
          </SelectItem>
        </SelectContent>
      </Select>

      <Separator orientation="vertical" className="hidden md:block" />

      <Select value={make} onValueChange={(value) => setMake(value)}>
        <SelectTrigger className="w-full outline-none md:border-none text-lg shadow-none">
          <SelectValue placeholder="Car Makes" />
        </SelectTrigger>
        <SelectContent>
          {Data.CarMakes.map((maker, index) => (
            <SelectItem key={index} value={maker.name}>
              {maker.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Separator orientation="vertical" className="hidden md:block" />

      <Select value={price} onValueChange={(value) => setPrice(value)}>
        <SelectTrigger className="w-full outline-none md:border-none text-lg shadow-none">
          <SelectValue placeholder="Pricing" />
        </SelectTrigger>
        <SelectContent>
          {Data.Pricing.map((priceItem, index) => (
            <SelectItem key={index} value={priceItem.amount}>
              {priceItem.amount}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Link
        to={`/search?cars=${cars}&make=${make}&price=${price}`}
        className="flex items-center justify-center"
      >
        <CiSearch className="text-[50px] bg-primary rounded-full p-3 text-white hover:scale-105 transition-all cursor-pointer" />
      </Link>
    </div>
  );
}

export default Search;