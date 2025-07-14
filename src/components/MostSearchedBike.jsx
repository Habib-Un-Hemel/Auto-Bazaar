import React, { useEffect, useState } from "react";
import BikeItem from "./BikeItem";
import { FormatResult } from "@/Shared/Service";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BikeListing, BikeImages } from "../../configs/schema";
import { eq, desc } from "drizzle-orm";
import { db } from "../../configs";

function MostSearchedBike() {
  const [bikeList, setBikeList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetPopularBikeList();
  }, []);

  const GetPopularBikeList = async () => {
    try {
      setLoading(true);
      const result = await db
        .select()
        .from(BikeListing)
        .leftJoin(BikeImages, eq(BikeListing.id, BikeImages.bikeListingId))
        .orderBy(desc(BikeListing.id))
        .limit(10);

      const formattedResults = FormatResult(result);
      // console.log("Most Searched Bikes:", formattedResults);
      setBikeList(formattedResults);
    } catch (error) {
      console.error("Error fetching bikes:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="mx-24">
      <h2 className="font-bold text-3xl text-center mt-16 mb-7">
        Most Searched Bikes
      </h2>
      {bikeList.length > 0 ? (
        <Carousel>
          <CarouselContent>
            {bikeList.map((bike, index) => (
              <CarouselItem key={index} className="basis-1/4">
                <BikeItem bike={bike} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <div className="text-center text-gray-500">No bikes found</div>
      )}
    </div>
  );
}

export default MostSearchedBike;
