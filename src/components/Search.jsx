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
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import Data from "@/Shared/Data";

// ...existing imports

function Search({ initialCondition, initialMake, initialPrice }) {
  const [bikes, setBikes] = useState(initialCondition || "");
  const [make, setMake] = useState(initialMake || "");
  const [price, setPrice] = useState(initialPrice || "");

  useEffect(() => {
    if (initialCondition) setBikes(initialCondition);
    if (initialMake) setMake(initialMake);
    if (initialPrice) setPrice(initialPrice);
  }, [initialCondition, initialMake, initialPrice]);

  return (
    <div className="p-4 bg-white rounded-xl md:rounded-2xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-4 w-full max-w-5xl mx-auto border border-gray-100">
      <div className="w-full md:w-1/3">
        <label className="text-xs text-gray-500 mb-1 block font-medium ml-1">Condition</label>
        <Select value={bikes} onValueChange={(value) => setBikes(value)}>
          <SelectTrigger className="w-full bg-gray-50 border-gray-200 rounded-lg hover:border-primary focus:border-primary focus:ring-1 focus:ring-primary">
            <SelectValue placeholder="Select condition" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="New">New</SelectItem>
            <SelectItem value="Used">Used</SelectItem>
            <SelectItem value="Certified Pre-Owned">Certified Pre-Owned</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full md:w-1/3">
        <label className="text-xs text-gray-500 mb-1 block font-medium ml-1">Make</label>
        <Select value={make} onValueChange={(value) => setMake(value)}>
          <SelectTrigger className="w-full bg-gray-50 border-gray-200 rounded-lg hover:border-primary focus:border-primary focus:ring-1 focus:ring-primary">
            <SelectValue placeholder="Select make" />
          </SelectTrigger>
          <SelectContent className="bg-white max-h-[300px] overflow-y-auto">
            {Data.BikeMakes.map((maker, index) => (
              <SelectItem key={index} value={maker.name}>
                {maker.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-full md:w-1/3">
        <label className="text-xs text-gray-500 mb-1 block font-medium ml-1">Price Range</label>
        <Select value={price} onValueChange={(value) => setPrice(value)}>
          <SelectTrigger className="w-full bg-gray-50 border-gray-200 rounded-lg hover:border-primary focus:border-primary focus:ring-1 focus:ring-primary">
            <SelectValue placeholder="Select price" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {Data.Pricing.map((priceItem, index) => (
              <SelectItem key={index} value={priceItem.amount}>
                {priceItem.amount}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-4 md:mt-0 w-full md:w-auto">
        <Link
          to={`/search?bikes=${bikes}&make=${make}&price=${price}`}
          className="flex items-center justify-center bg-primary hover:bg-primary/90 text-white rounded-lg px-8 py-3 transition-all font-medium gap-2 w-full md:w-auto"
        >
          <IoSearch className="text-xl" />
          <span>Search</span>
        </Link>
      </div>
    </div>
  );
}

// function Search({ initialCondition, initialMake, initialPrice }) {
//   const [cars, setCars] = useState(initialCondition || "");
//   const [make, setMake] = useState(initialMake || "");
//   const [price, setPrice] = useState(initialPrice || "");

//   // Update state when props change
//   useEffect(() => {
//     if (initialCondition) setCars(initialCondition);
//     if (initialMake) setMake(initialMake);
//     if (initialPrice) setPrice(initialPrice);
//   }, [initialCondition, initialMake, initialPrice]);

//   return (
//     <div className="p-2 md:p-5 bg-white rounded-md md:rounded-full flex-col md:flex-row flex items-center justify-between gap-2 w-[60%]">
//       <Select value={cars} onValueChange={(value) => setCars(value)}>
//         <SelectTrigger className="w-full outline-none md:border-none text-lg shadow-none">
//           <SelectValue placeholder="Cars" />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectItem value="New">New</SelectItem>
//           <SelectItem value="Used">Used</SelectItem>
//           <SelectItem value="Certified Pre-Owned">
//             Certified Pre-Owned
//           </SelectItem>
//         </SelectContent>
//       </Select>

//       <Separator orientation="vertical" className="hidden md:block" />

//       <Select value={make} onValueChange={(value) => setMake(value)}>
//         <SelectTrigger className="w-full outline-none md:border-none text-lg shadow-none">
//           <SelectValue placeholder="Car Makes" />
//         </SelectTrigger>
//         <SelectContent>
//           {Data.CarMakes.map((maker, index) => (
//             <SelectItem key={index} value={maker.name}>
//               {maker.name}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>

//       <Separator orientation="vertical" className="hidden md:block" />

//       <Select value={price} onValueChange={(value) => setPrice(value)}>
//         <SelectTrigger className="w-full outline-none md:border-none text-lg shadow-none">
//           <SelectValue placeholder="Pricing" />
//         </SelectTrigger>
//         <SelectContent>
//           {Data.Pricing.map((priceItem, index) => (
//             <SelectItem key={index} value={priceItem.amount}>
//               {priceItem.amount}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>

//       <Link
//         to={`/search?cars=${cars}&make=${make}&price=${price}`}
//         className="flex items-center justify-center"
//       >
//         <CiSearch className="text-[50px] bg-primary rounded-full p-3 text-white hover:scale-105 transition-all cursor-pointer" />
//       </Link>
//     </div>
//   );
// }

export default Search;