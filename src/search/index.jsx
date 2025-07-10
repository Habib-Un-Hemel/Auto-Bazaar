// import { db } from "./../../configs";
// import { CarImages, CarListing } from "./../../configs/schema";
// import { useSearchParams } from "react-router-dom";
// import { eq, and, gte, lte } from "drizzle-orm";
// import { useState, useEffect } from "react";
// import { FormatResult } from "@/Shared/Service";
// import Header from "@/components/Header";
// import Search from "@/components/Search";
// import CarItem from "@/components/CarItem";

// function SearchByOptions() {
//   const [searchParams] = useSearchParams();
//   const [carList, setCarList] = useState([]);
//   // const [loading, setLoading] = useState(false);

//   const condition = searchParams.get("cars");
//   const make = searchParams.get("make");
//   const priceRange = searchParams.get("price");

//   console.log("Condition:", condition);
//   console.log("Make:", make);
//   console.log("Price Range:", priceRange);

//   useEffect(() => {
//     GetCarList();
//   }, []);

//   const GetCarList = async () => {
//     const result = await db
//       .select()
//       .from(CarListing)
//       .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
//       .where(condition !== undefined && eq(CarListing.condition, condition))
//       .where(make !== undefined && eq(CarListing.make, make));

//     const resp = FormatResult(result);
//     console.log("Result:", resp);
//     setCarList(resp);
//   };

//   return (
//     <div>
//       <Header />
//       <div className="p-10 bg-black flex justify-center">
//         <Search />
//       </div>
//       <div>
//         <h2 className="font-bold text-4xl p-10 md:px-20">Search Result</h2>

//         {/* list of the car
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-10 md:px-20">
//           {carList.map((item, index) => (
//             <div key={index}>
//               <CarItem car={item}></CarItem>
//             </div>
//           ))}
//         </div> */}

//         {/* List of CarList */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-10">
//           {carList?.length > 0
//             ? carList.map((item, index) => (
//                 <div key={index}>
//                   <CarItem car={item} />
//                 </div>
//               ))
//             : [1, 2, 3, 4].map((item, index) => (
//                 <div
//                   key={index}
//                   className="h-[370px] rounded-xl bg-slate-200 animate-pulse"
//                 ></div>
//               ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SearchByOptions;











import { db } from "./../../configs";
import { CarImages, CarListing } from "./../../configs/schema";
import { useSearchParams } from "react-router-dom";
import { eq, and, or, ilike, gte, lte } from "drizzle-orm";
import { useState, useEffect } from "react";
import { FormatResult } from "@/Shared/Service";
import Header from "@/components/Header";
import Search from "@/components/Search";
import CarItem from "@/components/CarItem";

function SearchByOptions() {
  const [searchParams] = useSearchParams();
  const [carList, setCarList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get search parameters from URL
  const condition = searchParams.get("cars");
  const make = searchParams.get("make");
  const priceRange = searchParams.get("price");

  console.log("Search params:", { condition, make, priceRange });

  // Run search whenever URL parameters change
  useEffect(() => {
    GetCarList();
  }, [searchParams]); // Add searchParams as dependency

  const GetCarList = async () => {
    try {
      setLoading(true);

      // Build query conditions
      let query = db
        .select()
        .from(CarListing)
        .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId));

      // Add filters based on search params
      let whereConditions = [];

      if (condition) {
        whereConditions.push(eq(CarListing.condition, condition));
      }

      if (make) {
        whereConditions.push(eq(CarListing.make, make));
      }

      if (priceRange) {
        // Parse price range (assuming format like "0-50000")
        const [minPrice, maxPrice] = priceRange.split("-").map(Number);

        if (!isNaN(minPrice) && !isNaN(maxPrice)) {
          whereConditions.push(
            and(
              gte(CarListing.sellingPrice, minPrice.toString()),
              lte(CarListing.sellingPrice, maxPrice.toString())
            )
          );
        }
      }

      // Apply filters if any exist
      if (whereConditions.length > 0) {
        query = query.where(and(...whereConditions));
      }

      const result = await query;
      const formattedResults = FormatResult(result);

      console.log("Search results:", formattedResults);
      setCarList(formattedResults);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="p-10 bg-black flex justify-center">
        <Search
          initialCondition={condition}
          initialMake={make}
          initialPrice={priceRange}
        />
      </div>
      <div>
        <h2 className="font-bold text-4xl p-10 md:px-20">Search Results</h2>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-10">
            {[1, 2, 3, 4].map((item, index) => (
              <div
                key={index}
                className="h-[370px] rounded-xl bg-slate-200 animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-10">
            {carList?.length > 0 ? (
              carList.map((item, index) => (
                <div key={item.id || index}>
                  <CarItem car={item} />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-10">
                No cars found matching your search criteria.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchByOptions;