import { db } from "./../../configs";
import { useSearchParams } from "react-router-dom";
import { eq, and, gte, lte } from "drizzle-orm";
import { useState, useEffect } from "react";
import { FormatResult } from "@/Shared/Service";
import Header from "@/components/Header";
import Search from "@/components/Search";
import BikeItem from "@/components/BikeItem"; // Renamed to match component name
import { BikeListing, BikeImages } from "./../../configs/schema"; // Added missing import

function SearchByOptions() {
  const [searchParams] = useSearchParams();
  const [bikeList, setBikeList] = useState([]); // Renamed for consistency
  const [loading, setLoading] = useState(false);

  // Get search parameters from URL
  const condition = searchParams.get("bikes"); // Changed from "cars" to "bikes"
  const make = searchParams.get("make");
  const priceRange = searchParams.get("price");

  console.log("Search params:", { condition, make, priceRange });

  // Run search whenever URL parameters change
  useEffect(() => {
    GetBikeList(); // Changed function name to match definition below
  }, [searchParams]);

  const GetBikeList = async () => {
    try {
      setLoading(true);

      let query = db
        .select()
        .from(BikeListing)
        .leftJoin(BikeImages, eq(BikeListing.id, BikeImages.bikeListingId));

      let whereConditions = [];

      if (condition) {
        whereConditions.push(eq(BikeListing.condition, condition));
      }

      if (make) {
        whereConditions.push(eq(BikeListing.make, make));
      }

      if (priceRange) {
        if (priceRange.includes("-")) {
          const [minPrice, maxPrice] = priceRange.split("-").map(Number);

          if (!isNaN(minPrice) && !isNaN(maxPrice)) {
            whereConditions.push(
              and(
                gte(BikeListing.sellingPrice, minPrice.toString()),
                lte(BikeListing.sellingPrice, maxPrice.toString())
              )
            );
          }
        } else if (priceRange === "1000000+") {
          // Handle special case for "1000000+"
          whereConditions.push(gte(BikeListing.sellingPrice, "1000000"));
        }
      }

      // Apply filters if any exist
      if (whereConditions.length > 0) {
        query = query.where(and(...whereConditions));
      }

      const result = await query;
      const formattedResults = FormatResult(result);

      setBikeList(formattedResults); // Changed to setBikeList
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    async function checkData() {
      try {
        const allBikes = await db.select().from(BikeListing).limit(10);
        console.log("All bikes in DB:", allBikes);
      } catch (err) {
        console.error("DB check error:", err);
      }
    }
    checkData();
  }, []);
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
            {bikeList?.length > 0 ? (
              bikeList.map((item, index) => (
                <div key={item.id || index}>
                  <BikeItem bike={item} /> {/* Changed car to bike */}
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-10">
                No bikes found matching your search criteria.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchByOptions;
