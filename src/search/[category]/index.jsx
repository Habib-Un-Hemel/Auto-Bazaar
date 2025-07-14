import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Search from "@/components/Search";
import { useSearchParams, useParams } from "react-router-dom";
import BikeItem from "@/components/BikeItem";
// Fix the db import path - it should come from configs not configs/schema
import { db } from "./../../../configs";
import { and, eq, gte, lte } from "drizzle-orm";
// Fix the schema imports path
import { BikeImages, BikeListing } from "./../../../configs/schema";
import { FormatResult } from "@/Shared/Service";

function SearchPage() {
  const [searchParams] = useSearchParams();
  const { category } = useParams();
  const condition = searchParams.get("bikes");
  const make = searchParams.get("make");
  const priceRange = searchParams.get("price");
  const [bikeList, setBikeList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetBikeList();
  }, [condition, make, priceRange, category]);

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
        const [minPrice, maxPrice] = priceRange.split("-").map(Number);

        if (!isNaN(minPrice) && !isNaN(maxPrice)) {
          whereConditions.push(
            and(
              gte(BikeListing.sellingPrice, minPrice.toString()),
              lte(BikeListing.sellingPrice, maxPrice.toString())
            )
          );
        } else if (priceRange === "1000000+") {
          whereConditions.push(gte(BikeListing.sellingPrice, "1000000"));
        }
      }

      if (category) {
        whereConditions.push(eq(BikeListing.category, category));
      }

      // Apply filters if any exist
      if (whereConditions.length > 0) {
        query = query.where(and(...whereConditions));
      }

      const result = await query;
      const formattedResults = FormatResult(result);

      setBikeList(formattedResults);
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

      <div className="p-10">
        <h2 className="font-bold text-3xl mb-6">Search Results</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            [1, 2, 3, 4].map((item, index) => (
              <div
                key={index}
                className="h-[370px] rounded-xl bg-slate-200 animate-pulse"
              ></div>
            ))
          ) : bikeList?.length > 0 ? (
            bikeList.map((item, index) => (
              <div key={index}>
                <BikeItem bike={item} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-500">
              No bikes found matching your search criteria
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
